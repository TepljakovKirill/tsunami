<script setup lang="ts">
import { ref } from 'vue'
import { useContactsStore } from '@/stores/root'
import { useRouter } from 'vue-router'
import EmailInput from '@/components/EmailInput.vue'
import PhoneInput from '@/components/PhoneInput.vue'
import { validateEmail, validatePhone } from '@/utils/validator'

const name = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')
const nameError = ref<string>('')
const emailError = ref<string>('')
const phoneError = ref<string>('')

const store = useContactsStore()
const router = useRouter()

const validateName = (): void => {
  nameError.value =
    name.value.length < 3 || name.value.length > 26
      ? 'Имя должно содержать от 3 до 26 символов'
      : ''
}

interface Contact {
  name: string
  email: string
  phone: string
}

const addContact = async (event: Event) => {
  event.preventDefault()

  validateName()
  emailError.value = validateEmail(email.value)
  phoneError.value = validatePhone(phone.value)

  if (!nameError.value && !emailError.value && !phoneError.value) {
    const newContact: Contact = {
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
        <EmailInput
          type="text"
          class="form-group__input"
          id="email"
          name="email"
          v-model="email"
          placeholder="example@mail.com"
          @input="() => (emailError = validateEmail(email))"
          required
        />
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>

      <div class="form-group">
        <label for="phone" class="form-group__label">Телефон*</label>
        <PhoneInput
          type="text"
          class="form-group__input"
          id="phone"
          v-model="phone"
          name="phone"
          :errorMessage="phoneError"
          @input="() => (phoneError = validatePhone(phone))"
          required
        />
        <p v-if="phoneError" class="error">{{ phoneError }}</p>
      </div>

      <button class="form-button" type="submit">Добавить контакт</button>
    </form>
  </div>
</template>


<style lang="scss" scoped>
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
</style>