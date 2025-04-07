<script>
import BoxContainer from './BoxContainer.vue';

export default {
    components: {
        BoxContainer
    },
    props: {
        modelValue: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:modelValue'],
    methods: {
        close() {
            this.$emit('update:modelValue', false);
        }
    }
};
</script>

<template>
    <div v-if="modelValue" class="popup-overlay" @click.self="close">
        <BoxContainer class="popup-content">
            <section>
                <div class="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="189" height="78" viewBox="0 0 189 78" fill="none">
                        <path
                            d="M153.638 0C153.638 22.4065 132.094 35.3713 116.008 36.0759C106.724 37.4146 32.9528 38.542 0 39.0352C32.9528 39.5285 106.724 40.6558 116.079 41.9241C132.165 42.6992 153.709 55.5935 153.709 78C153.709 57.0027 168.52 40.9377 189 38.9648C168.52 37.0623 153.638 20.9973 153.638 0Z"
                            fill="#C6C6D0" />
                    </svg>
                </div>
                <button class="close-button" @click="close">&times;</button>
            </section>
            
            <slot></slot>
        </BoxContainer>
    </div>
</template>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.popup-content {
    /* background: white; */
    padding: 2rem;
    border-radius: 16px;
    max-width: 800px;
    width: 90%;
    position: relative;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
}

.close-button {
    position: absolute;
    top: 12px;
    right: 16px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #fff;
}

.logo{
    position: relative;
    justify-self: left;
}
</style>