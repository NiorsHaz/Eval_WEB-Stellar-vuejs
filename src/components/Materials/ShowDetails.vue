<script>
import CustomButton from './CustomButton.vue';
import Rating from './Rating.vue';
import {bridge} from '@/api/bridge';

export default {
    components: {
        CustomButton,
        Rating
    },
    data() {
        return {
            quantity: 1,
            rating: 0,
        }
    },
    props: {
        product: Object,
        show: Boolean
    },
    methods: {
        close() {
            this.$emit("close");
        },
        addcart() {
            this.$userManager.addToBasket(this.product, this.quantity - 1);
        },

        addquantity() {
            this.quantity += 1
        },
        decreasequantity() {
            if (this.quantity > 1) {
                this.quantity -= 1
            }
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
        async handleRanting(){
            var finalvalue = 0;
            if(this.product.array_options['options_rating'] > 0){
                finalvalue = (this.product.array_options['options_rating']+ this.rating)/2;
            }
            else{
                finalvalue = this.rating;
            }
            // console.log(finalvalue);
            try{
                await bridge.updateRatingProduct(this.product.id, this.product.label, finalvalue);
            }
            catch(err){

            }
            finally{
                window.location.reload();
            }
                
        }
    },
    computed: {
    }
};
</script>

<template>
    <transition name="slide-up" mode="in-out">
        <div v-if="show" class="overlay" @click.self="close">
            <div class="detail-container">
                <button class="close-button" @click="close">×</button>
                <div class="item-display">
                    <img :src="product?.image || '/static-stuff/ride.png'" class="product-image" />
                    <div class="spotlight"></div>
                </div>
                <div class="text-section">
                    <h1 class="name">{{ product?.label }}</h1>
                    <div class="category-box">
                        <p class="category">{{ formatNumber(product.weight) }} {{
                            getWeightUnitLabel(product.weight_units) }}</p>
                        <p v-if="product.array_options['options_rating'] > 0" class="category" style="display: flex; flex-direction: row;">{{
                            formatNumber(product.array_options['options_rating']) }}
                            <img :src="'/static-stuff/icon_rating_fill_display.svg'" :alt="product.libelle" />
                        </p>
                        <p v-else class="category">
                            No rating
                        </p>
                    </div>
                    <div class="give-rating">
                        <!-- <input type="number" v-model="rating" min="0" max="5"> -->
                        <Rating v-model="rating"/>
                        <button class="submit-rating" @click="handleRanting">Noter</button>
                    </div>
                    <p class="description">{{ product?.nature }}</p>
                    <p class="price">Ar. {{ formatNumber(product?.price) }}</p>
                    <div class="chooser">
                        <button class="arrow" @click="decreasequantity">
                            < </button>
                                <p class="number">{{ quantity }}</p>
                                <button class="arrow" @click="addquantity"> > </button>
                    </div>
                    <CustomButton text="Aujouter au panier" @click="addcart" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;

    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: flex-end;

    z-index: 1000;
}

.give-rating {
    display: flex;
    flex-direction: column;

    gap: 15px;
}

.detail-container {
    background: #292929;
    width: 100%;
    max-height: 90%;
    min-height: 70%;
    padding: 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    position: relative;
    gap: 30%;
}

.submit-rating {
    /* position: absolute; */
    /* top: 20px; */
    /* right: 30px; */
    font-size: 16px;
    justify-self: center;
    align-self: center;

    padding: 5px 15px;
    border-radius: 15px;
    cursor: pointer;

    color: #000;
}

.close-button {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 28px;
    background: none;
    border: none;
    cursor: pointer;

    color: #fff;
}

.product-image {
    max-height: 300px;
    margin-bottom: 20px;
}

.text-section {
    text-align: center;
}

.name {
    font-family: anton-regular;
    font-size: 36px;

    text-transform: uppercase;
}

.category-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 50px;

    justify-content: center;
    align-items: center;
    gap: 15px;

}

.chooser {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 50px;

    justify-content: center;
    align-items: center;
    gap: 15px;

    font-family: anton-regular;
    font-size: 26px;

}

.chooser .arrow {
    background-color: #ddd;
    color: #000;
    font-family: PaperClip;
    font-size: 24px;
    padding: 4px 12px;
    border-radius: 20px;
    margin: 10px 0;

    cursor: pointer;

}

.category {
    background-color: #ddd;
    color: #000;
    font-family: PaperClip;
    font-size: 24px;
    padding: 4px 12px;
    border-radius: 20px;
    margin: 10px 0;
}

.description {
    font-size: 18px;
    margin: 15px 0;
}

.price {
    font-size: 22px;
    font-weight: bold;
    color: #f2f2f2;
}

.spotlight {
    /* position: absolute; */
    width: 550px;
    height: 100px;
    flex-shrink: 0;

    align-self: center;

    background: radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, rgba(115, 115, 115, 0.00) 86.5%);
}

.item-display {
    line-height: 0px;
}
</style>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}
</style>