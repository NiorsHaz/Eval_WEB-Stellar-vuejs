<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'medium',
            validator: (value) => ['small', 'medium', 'large'].includes(value)
        }
    },
    computed: {
        sizeClass() {
            return `btn-${this.size}`;
        }
    }
};
</script>

<template>
    <button @click="$emit('click')" :class="['custom-button', sizeClass]">
        <slot name="icon"></slot>
        <span v-if="text" class="text">{{ text }}</span>
    </button>
</template>

<style scoped>
.custom-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    position: relative;
    padding: 8px 12px;
    border: none;
    border-radius: 40px;
    cursor: pointer;

    font-family: anton-regular;
    color: var(--text-color);
    background: #061e27;
    mix-blend-mode: multiply;
    transition: 0.5s ease-in-out;
}

.text {
    mix-blend-mode: normal;
}

/* Hover effect */
.custom-button:hover {
    background: #104C64;
    mix-blend-mode: normal;
}

/* Size Variants */
.btn-small {
    width: 200px;
    height: 50px;
    font-size: 18px;
}

.btn-medium {
    width: 360px;
    height: 70px;
    font-size: 24px;
}

.btn-large {
    width: 540px;
    height: 90px;
    font-size: 32px;
}
</style>
