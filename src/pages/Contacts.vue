<script setup>
import ContactTable from '@/components/ContactTable.vue'
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="header-title">Мои контакты</h1>
      <router-link to="/addcontacts" class="header-button">добавить +</router-link>
    </header>
    <main>
      <ContactTable />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 850px;
  margin: 0 auto;
  padding: 40px 0;

  .header {
    padding: 20px 0;
    display: flex;
    align-items: center;

    &-title {
      margin-right: 30px;
      color: #2d2a42;
      font-weight: bold;
    }

    &-button {
      padding: 10px 30px;
      font-family: 'Unbounded', sans-serif;
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      border-radius: 30px;
      color: #4932d8;
      background-color: #edebf8;
      cursor: pointer;
    }
  }
}
</style>


