<template>
  <div>
    <input
      type="text"
      class="form-control mb-3 bg-dark text-white border-secondary"
      placeholder="Search products..."
      v-model="search"
    />

    <div class="row">
      <div v-for="p in filteredProducts" :key="p.id" class="col-md-3 mb-4">
        <div class="card h-100 product-card text-white">
          <img :src="p.image" class="card-img-top" alt="Product Image">
          <div class="card-body">
            <h6 class="card-title">{{ p.title }}</h6>
            <p class="card-text">${{ p.price }}</p>
            <button class="btn btn-primary w-100" @click="addToCart(p)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const products = ref([]);
const search = ref("");
const filteredProducts = ref([]);

onMounted(async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  products.value = await res.json();
  filteredProducts.value = products.value;
});

watch(search, (val) => {
  filteredProducts.value = products.value.filter((p) =>
    p.title.toLowerCase().includes(val.toLowerCase())
  );
});

const cart = ref(JSON.parse(localStorage.getItem("cart") || "[]"));

function addToCart(product) {
  const item = cart.value.find((i) => i.id === product.id);
  if (item) {
    item.quantity++;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart.value));
}
</script>

<style scoped>
/* Dark background for the whole products page */
.row {
  background-color: #121212;
  padding: 20px;
  border-radius: 10px;
}

/* Card styling */
.product-card {
  background-color: #1f1f1f;
  border: 1px solid #333;
  transition: 0.3s;
}

/* Neon hover effect */
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 15px #3d7188, 0 0 30px #3d7188, 0 0 45px #3d7188;
}

/* Input field dark mode */
.form-control {
  background-color: #1f1f1f;
  border: 1px solid #555;
  color: rgb(194, 182, 182);
}

.form-control::placeholder {
  color: #aaa;
}
</style>
