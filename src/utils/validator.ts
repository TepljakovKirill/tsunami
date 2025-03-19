export const validateEmail = (email: string): string => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email) ? '' : 'Введите корректный email'
}

export const validatePhone = (phone: string): string => {
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
  return phonePattern.test(phone)
    ? ''
    : 'Введите корректный номер телефона в формате +7 (999) 999-99-99'
}
