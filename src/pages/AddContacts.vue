<script setup>
import { ref } from 'vue'
import { useContactsStore } from '@/stores/root'
import { useRouter } from 'vue-router'

const store = useContactsStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const phone = ref('')
const nameError = ref('')
const emailError = ref('')
const phoneError = ref('')

const validateName = () => {
  if (name.value.length < 3 || name.value.length > 26) {
    nameError.value = 'Имя должно содержать от 3 до 26 символов'
  } else {
    nameError.value = ''
  }
}

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = emailPattern.test(email.value) ? '' : 'Введите корректный email'
}

const validatePhone = () => {
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
  phoneError.value = phonePattern.test(phone.value)
    ? ''
    : 'Введите корректный номер телефона в формате +7 (999) 999-99-99'
}

const addContact = async (event) => {
  event.preventDefault()

  validateName()
  validateEmail()
  validatePhone()

  if (!nameError.value && !emailError.value && !phoneError.value) {
    const newContact = {
      name: name.value,
      email: email.value,
      phone: phone.value,
    }

    await store.addContact(newContact)

    name.value = ''
    email.value = ''
    phone.value = ''

    router.push('/')
  }
}
</script>

<template>
  <div class="container">
    <h1 class="addContact-title">Новый контакт</h1>
    <div class="form">
      <form @submit="addContact" method="POST" class="form">
        <div class="form-group">
          <label for="name" class="form-group__label">Имя*</label>
          <input
            type="text"
            class="form-group__input"
            id="name"
            name="name"
            v-model="name"
            placeholder="Иванов Иван Иванович"
            @input="validateName"
            required
          />
          <p v-if="nameError" class="error">{{ nameError }}</p>
        </div>

        <div class="form-group">
          <label for="email" class="form-group__label">Email*</label>
          <input
            type="text"
            class="form-group__input"
            id="email"
            name="email"
            v-model="email"
            placeholder="example@mail.com"
            @input="validateEmail"
            required
          />
          <p v-if="emailError" class="error">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label for="phone" class="form-group__label">Телефон*</label>
          <input
            type="text"
            class="form-group__input"
            id="phone"
            v-model="phone"
            name="phone"
            placeholder="+7 (999) 999-99-99"
            @input="validatePhone"
            required
          />
          <p v-if="phoneError" class="error">{{ phoneError }}</p>
        </div>

        <button class="form-button" type="submit">Добавить контакт</button>
      </form>
    </div>
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

  .form {
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      &__label {
        padding-bottom: 5px;
        font-size: 16px;
        color: #2d2a42;
        font-weight: 700;
      }

      &__input {
        padding: 19px 20px;
        font-size: 16px;
        border: 1px solid #eeecf4;
        border-radius: 16px;
        color: #878499;
        outline: none;
        background-color: transparent;
      }

      &__input::placeholder {
        color: #878499;
      }

      .error {
        color: red;
        font-size: 10px;
      }
    }

    .form-button {
      padding: 22px 35px;
      font-family: 'Unbounded', sans-serif;
      font-size: 14px;
      color: #fff;
      border: none;
      border-radius: 30px;
      background-color: #4932d8;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
}
</style>