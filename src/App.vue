<script setup>
import { ref, computed, onMounted } from "vue";

import LoginForm from "./components/LoginForm.vue";
import Navbar from "./components/Navbar.vue";

/* GANTI Home.vue MENJADI Dashboard.vue */
import Dashboard from "./components/Dashboard.vue";
import Stok from "./components/Stok.vue";
import Tracking from "./components/Tracking.vue";
import Keranjang from "./components/Keranjang.vue";

/* ========================== LOGIN ========================== */
const isLoggedIn = ref(false);
const userData = ref(null);

onMounted(() => {
  let saved = localStorage.getItem("userLogin");
  if (saved) {
    isLoggedIn.value = true;
    userData.value = JSON.parse(saved);
  }
});

/* ========================== PAGE NAVIGATION ========================== */
const currentPage = ref("home");

const changePage = (page) => {
  currentPage.value = page;
};

const logoutUser = () => {
  localStorage.removeItem("userLogin");
  isLoggedIn.value = false;
  userData.value = null;
  currentPage.value = "home";
};

/* ========================== PAGE COMPONENT LOADER ========================== */
const currentPageComponent = computed(() => {
  switch (currentPage.value) {

    /* dashboard sebagai halaman HOME */
    case "home": return Dashboard;

    case "stok": return Stok;
    case "tracking": return Tracking;
    case "keranjang": return Keranjang;

    default: return Dashboard;
  }
});
</script>

<template>
  <div>

    <!-- LOGIN PAGE -->
    <div
      v-if="!isLoggedIn"
      class="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <LoginForm />
    </div>

    <!-- MAIN DASHBOARD -->
    <div v-else>

      <!-- NAVBAR -->
      <Navbar 
        :user="userData"
        :currentPage="currentPage"
        @changePage="changePage"
        @logout="logoutUser"
      />

      <!-- PAGE CONTENT -->
      <div class="mt-5 pt-4 container-fluid">
        <component :is="currentPageComponent" :user="userData"></component>
      </div>

    </div>

  </div>
</template>

<style scoped>
body {
  margin: 0;
}
</style>
