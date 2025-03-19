import { defineStore } from 'pinia'
import axios from 'axios'
import { CONTACTS_URL } from '../constants'

export interface Contact {
  id?: number
  name: string
  email: string
  phone: string
}

export const useContactsStore = defineStore('root', {
  state: () => ({
    contacts: [] as Contact[],
  }),

  actions: {
    async getContacts(): Promise<void> {
      try {
        const response = await axios.get<Contact[]>(CONTACTS_URL)
        this.contacts = response.data
      } catch (error) {
        console.error('Ошибка загрузки контактов:', error)
      }
    },

    async addContact(newContact: Contact): Promise<void> {
      try {
        const response = await axios.post<Contact>(CONTACTS_URL, newContact)
        this.contacts.push(response.data)
      } catch (error) {
        console.error('Ошибка при добавлении контакта:', error)
      }
    },

    async updateContact(updatedContact: Contact): Promise<void> {
      try {
        const response = await axios.patch<Contact>(
          `${CONTACTS_URL}/${updatedContact.id}`,
          updatedContact,
        )
        const index = this.contacts.findIndex((c) => c.id === updatedContact.id)
        if (index !== -1) {
          this.contacts.splice(index, 1, response.data)
        }
      } catch (error) {
        console.error('Ошибка при обновлении контакта:', error)
      }
    },
  },
})
