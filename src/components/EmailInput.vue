<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const handleInput = (event: Event): void => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
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
