
import { defineStore } from 'pinia'
import axios from 'axios'
import { CONTACTS_URL } from '../constants'

export const useContactsStore = defineStore('root', {
  state: () => ({
    contacts: []
  }),
  actions: {
    async getContacts() {
      try {
        const response = await axios.get(CONTACTS_URL)
        this.contacts = response.data
      } catch (error) {
        console.error('Ошибка загрузки контактов:', error)
      }
    },
    async addContact(newContact) {
      try {
        const response = await axios.post(CONTACTS_URL, newContact)
        this.contacts.push(response.data)
      } catch (error) {
        console.error('Ошибка при добавлении контакта:', error)
      }
    },
    async updateContact(updatedContact) {
      try {
        const response = await axios.patch(`${CONTACTS_URL}/${updatedContact.id}`, updatedContact)
        const index = this.contacts.findIndex((c) => c.id === updatedContact.id)
        if (index !== -1) {
          this.contacts.splice(index, 1, response.data)
        }
      } catch (error) {
        console.error('Ошибка при обновлении контакта:', error)
      }
    }
  }
})