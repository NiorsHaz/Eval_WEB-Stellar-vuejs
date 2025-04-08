<script>
import NavBar from '@/components/Materials/NavBar.vue';
import CustomButton from '@/components/Materials/CustomButton.vue';
import Link from '@/components/Materials/Link.vue';
import BoxContainer from '@/components/Materials/BoxContainer.vue';
import FooterVue from '../LandingPage/FooterVue.vue';
import ProductList from './ProductList.vue';
import LoginPopup from '@/components/Materials/LoginPopup.vue';
import Popup from '@/components/Materials/Popup.vue';

export default {
    components: {
        NavBar,
        CustomButton,
        Link,
        BoxContainer,
        FooterVue,
        ProductList,
        LoginPopup,
        Popup
    },
    data() {
        return {
            items: [
                { text: 'Acceuil', href: '/' },
                { text: 'Boutique', href: '/boutique' },
                { text: 'DashBoard', href: '/dashboard' },
            ],
            cartItems: {
                type: Array,
                required: true,
            },
            focusedIndex: null,
            showLogin: false,
            showCart: false,
            componentKey: 0,
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.showLogin = true;
        }
    },
    methods: {
        handleBlur() {
            // Wait to see if focus moved to another nav-link
            setTimeout(() => {
                this.focusedIndex = null;
            }, 100);
        },
        async handleLogin({ email, password }) {
            console.log(email, password);

            await this.$userManager.login(email, password);

            if (this.$userManager.isLoggedIn()) {
                this.showLogin = false;
                this.loading = false;
            }
            window.location.reload();
        },
        getWeightUnitLabel(unitValue) {
            const unitMap = {
                0: 'kg',
                '-3': 'g',
                '-6': 'mg',
                3: 't',           // ton
                0.4536: 'lb',     // pound (approx)
                0.0283: 'oz'      // ounce (approx)
            };

            // Round to 4 decimals to match approximated keys
            const rounded = Number(parseFloat(unitValue).toFixed(4));

            return unitMap[rounded] || 'unknown';
        },
        formatNumber(value, options = {}) {
            if (isNaN(value)) return value;

            const {
                decimals = 2,
                locale = 'fr-FR',
                style = 'decimal',
                currency = 'EUR',
                unit = null
            } = options;

            const formatter = new Intl.NumberFormat(locale, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
                style: style,
                ...(style === 'currency' && { currency }),
            });

            const formatted = formatter.format(value);
            return unit ? `${formatted} ${unit}` : formatted;
        },
        async confirmCommande() {
            try {
                await this.$userManager.placeOrder();
            }
            catch (err) {

            }
        },
        removeProduct(productId) {
            // Remove the product from the localStorage basket (if you're storing the basket there)
            let updatedCart = JSON.parse(localStorage.getItem('stellar-basket'));
            this.$userManager.removeFromBasket(productId);
            updatedCart = updatedCart.filter(product => product.id !== productId);

            // Update localStorage with the new basket
            localStorage.setItem('stellar-basket', JSON.stringify(updatedCart));

            // Update the cartItems array (this will ensure the UI updates)
            this.cartItems = updatedCart;
        },
        logout(){
            this.$userManager.logout();
            window.location.reload();
        }
    },
    computed: {
        checkStatus() {
            const token = localStorage.getItem('token');
            if (!token) {
                this.loading = true;
            }
            else {
                this.loading = false;
            }
        },
        handleshowCart() {
            this.showCart = true
            this.cartItems = JSON.parse(localStorage.getItem('stellar-basket'));
            // console.log(JSON.parse(this.cartItems));
        },
        totalPrice() {
            return this.cartItems.reduce((sum, product) => {
                return sum + (product.price * (product.quantity || 1));
            }, 0);
        },
        username(){
            if(!this.$userManager.name){
                return false;
            }
            else{
                return this.$userManager.name;
            }
        },
    },
};
</script>

<template>
    <div class="page-container">
        <LoginPopup v-model="showLogin" @login="handleLogin" />
        <header>
            <NavBar style="position: relative; display: flex; justify-content: center; flex-shrink: 0; gap: 30%;">
                <div style="display: flex; flex-direction: row;">
                    <CustomButton size="small" style="background: none;" @click="handleshowCart()">
                        <template #icon>
                            <img src="/static-stuff/panier.svg" alt="panier" width="48">
                        </template>
                    </CustomButton>
                    
                    <CustomButton v-if="!username" text="Se Connecter" size="small" @click="showLogin = true" />
                    <div v-else style="display: flex; flex-direction: row; align-items: center;">
                        <h1 style="color: #fff;">{{ username }}</h1>
                        <CustomButton text="Deconnecter" size="small" @click="logout()" />
                    </div> 
                </div>
                <span style="display: flex; flex-direction: row; max-width: 400px; gap: 80px;">
                    <div v-for="(item, i) in items" :key="i" class="nav-link" :class="{
                        focused: focusedIndex === i,
                        blurred: focusedIndex !== null && focusedIndex !== i
                    }" @mouseenter="focusedIndex = i" @mouseleave="focusedIndex = null">
                        <Link :text="item.text" :to="item.href" />
                    </div>
                </span>
            </NavBar>
        </header>

        <main>
            <Popup v-model="showCart">
                <h1 class="title">Votre Panier</h1>
                <div class="cart-items">
                    <div v-for="(product, index) in cartItems" :key="index" class="cart-item">
                        <h2 style="font-size: 16px; color: #fff;">{{ product.label }}</h2>
                        <p class="category">{{ formatNumber(product.weight) }} {{
                            getWeightUnitLabel(product.weight_units) }}
                        </p>
                        <p class="price">{{ product.price }}</p>
                        <p class="price">{{ product.quantity }}</p>
                        <CustomButton size="small" text="retirer"
                            style="width: 70px; height: 30px;text-transform: uppercase; font-size: smaller;"
                            @click="removeProduct(product.id)" />
                    </div>
                </div>
                <div v-if="!cartItems" class="empty-cart">
                    <p style="font-size: 36px;">Votre panier est vide.</p>
                </div>
                <div v-if="cartItems && cartItems.length" class="cart-total"
                    style="text-align: right; margin-top: 1rem;">
                    <h3 style="color: white; font-size: 24px;">Total: {{ totalPrice }} DA</h3>
                    <CustomButton size="small" text="confirmer" @click="confirmCommande" />
                </div>

            </Popup>
            <ProductList />
        </main>

        <footer>
            <FooterVue />
        </footer>
    </div>
</template>

<style scoped>
.cart-items {
    min-height: 300px;

    max-height: 300px;
    overflow-y: scroll;
}

.cart-item {
    display: flex;
    flex-direction: row;

    justify-content: flex-start;

    gap: 24px;
    line-height: 50px;

    flex: 1;
    /* max-height: 200px; */
}

.cart-total {
    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 50px;
    bottom: 0;
}

.empty-item {
    display: flex;
    flex-direction: column;

    align-items: center;

}

.cart-item h2,
.cart-item .category,
.cart-item .price {
    text-align: left;
    text-transform: uppercase;
    flex: 1;
    /* equal width */
    min-width: 120px;
    max-width: 200px;
}

.icon {
    width: 50px;
    height: 50px;
    fill: white;
}

.nav-link {
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: scale(1);
}

.nav-link.focused {
    transform: scale(1.3);
}

.nav-link.blurred {
    transform: scale(0.9);
    opacity: 0.6;
}

.page-container {
    /* background-image: linear-gradient(180deg, #242424 0%, #3A3A3A 100%); */
    background-size: contain;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;

    min-height: 80em;

    overflow-x: hidden;
}

main {
    flex: 1;
}

.masked-image {
    color: #fff;
}
</style>