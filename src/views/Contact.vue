<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");
const success = ref("");
const errors = ref({});

function submitForm() {
  errors.value = {};
  if (!name.value) errors.value.name = "Name is required";
  if (!email.value) errors.value.email = "Email is required";
  if (!message.value) errors.value.message = "Message is required";

  if (Object.keys(errors.value).length === 0) {
    success.value = "Thank you for contacting us!";
    name.value = email.value = message.value = "";
  }
}
</script>

<template>
  <div>
    <h2>Contact Us</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" v-model="name" class="form-control">
        <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" v-model="email" class="form-control">
        <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
      </div>

      <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea v-model="message" class="form-control"></textarea>
        <small v-if="errors.message" class="text-danger">{{ errors.message }}</small>
      </div>

      <button class="btn btn-primary">Submit</button>
    </form>

    <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
  </div>
</template>
