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
  <textarea
    :placeholder="placeholder"
    :class="[sizeClass, 'custom-textarea']"
    v-model="textValue"
    @input="$emit('update', textValue)"
  ></textarea>
</template>

<style scoped>
.custom-textarea {
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 8px;
  width: 100%;
  min-height: 200px;
  resize: vertical;
  font-family: inherit;
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
