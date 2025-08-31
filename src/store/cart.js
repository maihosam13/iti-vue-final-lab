import { reactive } from 'vue'

export const cart = reactive({
  items: []
})

export function addToCart(product) {
  const existing = cart.items.find(item => item.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.items.push({ ...product, quantity: 1 })
  }
}

export function getCartCount() {
  return cart.items.reduce((total, item) => total + item.quantity, 0)
}
