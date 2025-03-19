<script setup>
import ContactForm from '@/components/ContactForm.vue'
</script>


<template>
  <div class="container">
    <h1 class="addContact-title">Новый контакт</h1>
    <ContactForm />
  </div>
</template>


<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 0;

  .addContact-title {
    padding-bottom: 20px;
    color: #2d2a42;
    font-weight: bold;
  }
}
</style>