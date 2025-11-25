<script setup>
import { ref, computed, onMounted } from "vue";

import LoginForm from "./components/LoginForm.vue";
import Navbar from "./components/Navbar.vue";

import Dashboard from "./components/Dashboard.vue";
import Stok from "./components/Stok.vue";
import Tracking from "./components/Tracking.vue";
import TrackingAdmin from "./components/TrackingAdmin.vue";
import Keranjang from "./components/Keranjang.vue";

/* ============================
   LOGIN STATE
============================ */
const isLoggedIn = ref(false);
const userData = ref(null);

onMounted(() => {
  const saved = localStorage.getItem("userLogin");
  if (saved) {
    userData.value = JSON.parse(saved);
    isLoggedIn.value = true;
  }
});

/* Dipanggil dari LoginForm.vue */
const handleLoginSuccess = (data) => {
  userData.value = data;
  isLoggedIn.value = true;
  localStorage.setItem("userLogin", JSON.stringify(data));
};

/* ============================
   NAVIGASI HALAMAN
============================ */
const currentPage = ref("dashboard");

const changePage = (page) => {
  currentPage.value = page;
};

const logoutUser = () => {
  localStorage.removeItem("userLogin");
  isLoggedIn.value = false;
  userData.value = null;
  currentPage.value = "dashboard";
};

/* ============================
   DYNAMIC COMPONENT LOADER
============================ */
const currentPageComponent = computed(() => {
  if (!userData.value) return Dashboard;

  switch (currentPage.value) {
    case "dashboard":
      return Dashboard;

    case "stok":
      return Stok;

    case "tracking":
      return userData.value.role === "admin"
        ? TrackingAdmin
        : Tracking;

    case "keranjang":
      return Keranjang;

    default:
      return Dashboard;
  }
});
</script>

<template>
  <div>

    <!-- ============================
         HALAMAN LOGIN
    ============================= -->
    <div 
      v-if="!isLoggedIn"
      class="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <LoginForm @loginSuccess="handleLoginSuccess" />
    </div>

    <!-- ============================
         HALAMAN UTAMA 
    ============================= -->
    <div v-else>

      <!-- NAVBAR -->
      <Navbar
        :user="userData"
        :currentPage="currentPage"
        @changePage="changePage"
        @logout="logoutUser"
      />

      <!-- KONTEN HALAMAN -->
      <div class="mt-5 pt-4 container-fluid">
        <component 
          :is="currentPageComponent"
          :user="userData"
        />
      </div>

    </div>

  </div>
</template>
