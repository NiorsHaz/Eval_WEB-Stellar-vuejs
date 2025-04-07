<template>
    <div class="box-container">
        <slot></slot>
    </div>
</template>

<style scoped>
    .box-container{
        width: 1050px;
        height: 604px;
        flex-shrink: 0;

        border-radius: 40px;
        border: 4px solid rgba(198, 204, 208, 0.54);
        background: #292929;
    }
</style>