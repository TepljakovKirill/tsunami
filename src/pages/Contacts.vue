<script setup>
import { ref, onMounted } from 'vue'
import { useContactsStore } from '@/stores/root.js'
import { storeToRefs } from 'pinia'

const rootStore = useContactsStore()
const { contacts } = storeToRefs(rootStore)

const sortDirection = ref('asc')
const editingContact = ref(null)
const isEditing = ref(false)

onMounted(async () => {
  await rootStore.getContacts()
})

const sortContacts = () => {
  contacts.value.sort((a, b) =>
    sortDirection.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  )
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const startEditing = (contact) => {
  editingContact.value = { ...contact }
  isEditing.value = true
}

const saveEditing = async () => {
  if (editingContact.value) {
    try {
      await rootStore.updateContact(editingContact.value)
      await rootStore.getContacts()
      isEditing.value = false
      editingContact.value = null
    } catch (error) {
      console.error('Ошибка сохранения:', error)
    }
  }
}

const cancelEditing = () => {
  isEditing.value = false
  editingContact.value = null
}
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="header-title">Мои контакты</h1>
      <router-link to="/addcontacts" class="header-button">добавить +</router-link>
    </header>
    <main>
      <table class="table">
        <thead>
          <tr>
            <th class="column col-1">
              <p class="col-1__name">Имя</p>
              <img
                class="col-1__img"
                src="@/assets/img/Vector.png"
                alt="Картинка"
                @click="sortContacts"
              />
            </th>
            <th class="column col-2">Email</th>
            <th class="column col-3">Телефон</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id" @click="startEditing(contact)">
            <td class="cell">
              <template v-if="isEditing && editingContact?.id === contact.id">
                <input v-model="editingContact.name" />
              </template>
              <template v-else>
                {{ contact.name }}
              </template>
            </td>
            <td class="cell">
              <template v-if="isEditing && editingContact?.id === contact.id">
                <input v-model="editingContact.email" />
              </template>
              <template v-else>
                {{ contact.email }}
              </template>
            </td>
            <td class="cell">
              <template v-if="isEditing && editingContact?.id === contact.id">
                <input v-model="editingContact.phone" />
              </template>
              <template v-else>
                {{ contact.phone }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isEditing" class="edit-buttons">
        <button class="changes" @click="saveEditing">Сохранить</button>
        <button class="changes" @click="cancelEditing">Отменить</button>
      </div>
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

  .table {
    width: 100%;
    border-collapse: collapse;

    .column {
      padding: 20px 0;
      text-align: left;
      color: #7d7b8e;
      font-size: 14px;
    }

    .col-1 {
      display: flex;
      align-items: center;
      width: 50%;
    }

    .col-1__img {
      padding: 0 5px;
      height: 12px;
      cursor: pointer;
    }

    .col-2 {
      width: 25%;
    }

    .col-3 {
      width: 25%;
    }

    .cell {
      padding: 10px 0;
    }

    .cell:not(:first-child) {
      font-size: 11px;
    }
  }

  .cell input {
    width: 90%;
    padding: 12px 11px;
    font-size: 14px;
    border: 1px solid #eeecf4;
    border-radius: 16px;
    color: #000;
    outline: none;
    background-color: transparent;
  }

  .edit-buttons {
    margin-top: 16px;
  }

  .changes {
    padding: 12px 17px;
    font-family: 'Unbounded', sans-serif;
    font-size: 10px;
    color: #fff;
    border: none;
    border-radius: 30px;
    background-color: #4932d8;
    text-transform: uppercase;
    cursor: pointer;
  }

  .changes:not(:last-child) {
    margin-right: 10px;
  }
}
</style>


