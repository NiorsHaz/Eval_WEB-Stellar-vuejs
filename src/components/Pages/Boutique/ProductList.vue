<script>
import BoxContainer from '@/components/Materials/BoxContainer.vue';
import ShowDetails from '@/components/Materials/ShowDetails.vue';
import { computed } from 'vue';

export default {
    components: {
        BoxContainer,
        ShowDetails
    },
    data() {
        return {
            // products: [
            //     { ref_produit: 1, libelle: "Stellar Grip", categorie: "Gants", prix_vente: 850, nature: "Gant haute adherence pour un controle parfait", image: "/static-stuff/gloves.png" },
            //     { ref_produit: 2, libelle: "Stellar E-Ride", categorie: "Velo", prix_vente: 875, nature: "Le vtt electrique aliant puissance et autonomie", image: "/static-stuff/ride.png" },
            //     { ref_produit: 3, libelle: "Stellar Shield", categorie: "Casque", prix_vente: 900, nature: "Casque ultra-leger avec protection avancee", image: "/static-stuff/shield.png" },
            // ],
            selectedProduct: null,
            showDetail: false,
            products: Array(0),
            loading: true,
        };
    },
    computed: {
        emptySlots() {
            const remainder = this.products.length % 3;
            return remainder === 0 ? 0 : 3 - remainder;
        },
    },
    methods: {
        openDetail(product) {
            this.selectedProduct = product;
            this.showDetail = true;
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
        }
    },
    async mounted() {
        const token = localStorage.getItem('token');
        if (!token) {
            // Show login popup here
            this.loading = false;
            return;
        }

        await this.$productManager.init();
        this.products = this.$productManager.getAll();
        this.loading = false;
    }

}

</script>

<template v-if="!loading">
    <section class="List">
        <!-- <div class="product-grid"> -->
        <BoxContainer v-for="product in products" :key="product.id" class="product" @click="openDetail(product)">
            <div class="item-display">
                <img :src="product.image || '/static-stuff/ride.png'" :alt="product.libelle" />
            </div>
            <div class="info">
                <h1 class="item-name">{{ product.label }}</h1>
                <span>{{ formatNumber(product.price) }}</span>
                <div class="category-box">
                    <p class="category">{{ product.categorie }}</p>
                </div>
            </div>
        </BoxContainer>

        <!-- Add invisible placeholders to fill the row -->
        <BoxContainer v-for="n in emptySlots" :key="'empty-' + n" class="product empty" />

        <!-- Product Details, shows when clicking a product -->
        <ShowDetails :product="selectedProduct" :show="showDetail" @close="showDetail = false" />
        <!-- </div> -->
    </section>
</template>

<style scoped>
.Hero {
    display: flex;

    justify-content: center;

    margin: 15px;
}

.showcase {
    width: 70%;
    min-height: 720px;
}

.List {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
    flex-basis: 80px;

    padding: 15px;
    gap: 30px;
    justify-content: center;
    align-self: center;
}

.product {
    display: flex;
    flex-direction: column;

    /* justify-content: center; */
    align-content: center;

    width: 500px;
    border-color: rgba(198, 204, 208, 0.2);
    box-shadow: 0px 0px 10px rgba(198, 204, 208, 0.0);

    padding: 20px 21px;

    transition: all 0.3s ease;

    cursor: pointer;
}

.product .item-display {
    /* max-height: 500px; */
    display: flex;
    max-height: 400px;
    min-height: 400px;

    min-width: 400px;
    max-width: 450px;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    /* background-color: antiquewhite; */

    align-items: center;
    justify-content: center;
}

.product .item-display img {
    max-height: 400px;
    min-height: 400px;

    min-width: 400px;
    max-width: 450px;
}

.product:hover {
    border-color: rgba(198, 204, 208, 0.54);
    box-shadow: 0px 0px 10px rgba(198, 204, 208);
    color: #fff;
}

.item-name {
    font-family: anton-regular;
    font-size: 36px;
}

.info span {
    font-family: PaperClip;
    font-size: 24px;
}

.info .category {
    font-family: PaperClip;
    font-size: 24px;

    background-color: rgba(198, 204, 208, 0.54);
    color: black;
    padding: 0px 12px;

    border-radius: 40px;
}

.info .category-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 50px;

    justify-content: center;
    align-items: center;
    gap: 15px;

}

.product.empty {
    visibility: hidden;
}
</style>