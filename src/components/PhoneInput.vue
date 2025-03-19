
<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue'
import Inputmask from 'inputmask'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])
const phoneInput = ref(null)

const handleInput = (event) => {
  let value = event.target.value
  if (value.startsWith('8')) {
    value = value.replace(/^8/, '+7')
  }
  emit('update:modelValue', value)
}

onMounted(() => {
  if (phoneInput.value) {
    Inputmask({
      mask: '+7 (999) 999-99-99',
      placeholder: '_',
      clearIncomplete: true,
      showMaskOnHover: false,
    }).mask(phoneInput.value)
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (phoneInput.value && phoneInput.value.value !== newValue) {
      phoneInput.value.value = newValue
    }
  }
)
</script>

<template>
  <div>
    <input
      ref="phoneInput"
      class="form-group__input phone-input"
      type="tel"
      :value="modelValue"
      @input="handleInput"
      placeholder="+7 (___) ___-__-__"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-group__input {
  font-size: 16px;
  border: none;
  color: #878499;
  outline: none;
  background-color: transparent;

  &::placeholder {
    color: #878499;
  }
}
</style>


