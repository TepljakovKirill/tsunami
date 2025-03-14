import { createRouter, createWebHistory } from 'vue-router'
import Contacts from '@/pages/Contacts.vue'
import AddContacts from '@/pages/AddContacts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contacts',
      component: Contacts,
    },
    {
      path: '/addcontacts',
      name: 'addcontacts',
      component: AddContacts,
    },

  ],
})

export default router
