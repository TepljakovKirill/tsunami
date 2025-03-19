<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <input
      class="form-group__input email-input"
      type="email"
      inputmode="email"
      :value="modelValue"
      @input="handleInput"
      placeholder="example@mail.com"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-group__input {
  font-size: 16px;
  border: none;
  background: transparent;
  color: #878499;
  outline: none;

  &::placeholder {
    color: #878499;
  }
}
</style>
