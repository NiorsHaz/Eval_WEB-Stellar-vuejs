<script>
import LogoStellar from './LogoStellar.vue';

export default {
    components: {
        LogoStellar,
    }
}
</script>

<template>
    <nav class="navbar">
        <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="147" viewBox="0 0 354 147" fill="none">
                <path
                    d="M287.18 0.193237C287.18 42.3009 246.944 66.665 216.9 67.9892C199.561 70.5051 61.781 72.6237 0.236511 73.5506C61.781 74.4775 199.561 76.5961 217.032 78.9795C247.076 80.4361 287.312 104.668 287.312 146.775C287.312 107.316 314.974 77.1257 353.224 73.4182C314.974 69.843 287.18 39.6526 287.18 0.193237Z"
                    fill="#C6C6D0" />
            </svg>
        </div>
        <div class="navigation">
            <slot></slot>
        </div>
    </nav>
</template>

<style scoped>
*{
    z-index: 999;
}
.navbar {
    height: 100px;
    width: 100%;
    position: fixed;

    display: flex;
    flex-direction: row;

    align-items: center;
    /* justify-content: center; */

    padding: 0px 50px;

    background-color: rgb(0,0,0, 0.8);

    gap: 40%;
}

.navigation{
    /* position: relative; */
    display: flex;

    font-family: PaperClip;
    font-size: 24px;

    /* background-color: aqua; */
    
    flex-direction: row-reverse;
    flex-wrap: wrap;
    flex-shrink: 0;
    flex-grow: initial;

    gap: 100px;

    /* right: 0; */
}
</style>