<script>
export default {
    props: {
    placeholder: {
      type: String,
      default: 'Enter text...'
    },
    size: {
      type: String,
      default: 'medium'
    }
    },
    computed: {
        sizeClass() {
        return {
            small: 'small',
            medium: 'medium',
            large: 'large'
        }[this.size] || 'medium';
        }
    },
    data() {
        return {
        textValue: ''
        };
    }
};
</script>

<template>
    <input
      :placeholder="placeholder"
      :class="sizeClass"
      v-model="textValue"
      @input="$emit('update', textValue)"
      class="textfield"
    />
</template>
  

  
<style scoped>
    .textfield {
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: 8px;
        width: 100%;
        height: 50px;
    }

    .small {
        font-size: 0.875rem;
    }

    .medium {
        font-size: 1rem;
    }

    .large {
        font-size: 1.25rem;
    }
</style>