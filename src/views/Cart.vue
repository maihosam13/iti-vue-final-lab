<template>
  <div>
    <h2>Shopping Cart</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th><th>Price</th><th>Quantity</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.title }}</td>
          <td>${{ item.price }}</td>
          <td>
            <button class="btn btn-sm btn-secondary" @click="decrease(item)">-</button>
            <span class="mx-2">{{ item.quantity }}</span>
            <button class="btn btn-sm btn-secondary" @click="increase(item)">+</button>
          </td>
          <td>
            <button class="btn btn-danger btn-sm" @click="remove(item)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h4>Total: ${{ total }}</h4>

    <!-- زرار الدفع -->
    <button class="btn btn-success mt-3">Proceed to Checkout</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const cart = ref(JSON.parse(localStorage.getItem("cart") || "[]"));

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart.value));
}

function increase(item) {
  item.quantity++;
  updateCart();
}

function decrease(item) {
  if (item.quantity > 1) item.quantity--;
  else remove(item);
  updateCart();
}

function remove(item) {
  cart.value = cart.value.filter((i) => i.id !== item.id);
  updateCart();
}

const total = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)
);
</script>
