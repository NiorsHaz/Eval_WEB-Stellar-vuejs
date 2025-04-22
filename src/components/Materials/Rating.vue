<script>
export default {
    props: {
        modelValue: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            hoverRating: 0
        };
    },
    methods: {
        updateRating(value) {
            console.log(value);
            this.$emit('update:modelValue', value);
        },
        getIcon(index) {
            const value = this.hoverRating || this.modelValue;

            if (value >= index) {
                return '/static-stuff/icon_rating_fill.svg';
            } else if (value + 0.5 >= index) {
                return '/static-stuff/icon_rating__half_fill.svg';
            } else {
                return '/static-stuff/icon_rating.svg';
            }
        }
    }
};
</script>

<template>
    <div>
        <img v-for="index in max" :key="index" :src="getIcon(index)" class="thunder"
            @click="updateRating(index)" @mouseover="hoverRating = index" @mouseleave="hoverRating = 0"
            alt="thunder-icon"/>
    </div>
</template>

<style scoped>
    .thunder {
        cursor: pointer;
        width: 40px;
        transition: all;
    }
</style>