<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #083b71;">
    <div class="container-fluid">

      <!-- Brand (Logo UT) -->
      <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
        <img :src="logoUT" alt="logo" height="34" class="me-2">
        SITTA UT
      </a>

      <!-- Toggle Mobile -->
      <button 
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu -->
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'home' }"
               @click="$emit('changePage','home')" href="#">Home</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'stok' }"
               @click="$emit('changePage','stok')" href="#">Stok</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'tracking' }"
               @click="$emit('changePage','tracking')" href="#">Tracking</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'keranjang' }"
               @click="$emit('changePage','keranjang')" href="#">Keranjang</a>
          </li>

        </ul>

        <!-- NAMA USER + ROLE -->
        <span class="navbar-text text-white me-3 fw-semibold">
          {{ user.nama.split(" ")[0] }}
          <span v-if="user.role === 'admin'" class="badge bg-warning text-dark ms-2">
            Admin
          </span>
        </span>

        <button class="btn btn-outline-light btn-sm" @click="$emit('logout')">
          Logout
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup>
import logoUT from '../img/ut.svg'

defineProps({
  user: Object,
  currentPage: String
})
</script>

<style scoped>
.nav-link.active {
  font-weight: bold;
  color: #ffc107 !important;
}
</style>
