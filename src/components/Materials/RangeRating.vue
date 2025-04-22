<template>
    <div>
        <svg
            v-for="index in max"
            :key="index"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :width="40"
            :height="40"
            @click="updateRating(index)"
            @mouseover="hoverRating = index"
            @mouseleave="hoverRating = 0"
        >
            <path
                :fill="getFill(index)"
                d="M10.2,21.2l1-7H4.8l9-11.5l-1,8l6.5,0L10.2,21.2z"
                class="st1"
            />
        </svg>
    </div>
</template>

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
        getFill(index) {
            const value = this.hoverRating || this.modelValue;
            if (value >= index) return 'yellow';  // Full fill color
            if (value + 0.5 >= index) return 'orange';  // Half fill color
            return '#ccc';  // Empty color
        }
    }
};
</script>

<style scoped>
.st1 {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
}
</style>
