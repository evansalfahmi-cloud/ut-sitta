<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #083b71;">
    <div class="container-fluid">

      <!-- Brand Logo -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img 
          :src="logoUT" 
          alt="UT Logo" 
          style="height: 34px; margin-right: 8px;"
        >
        <span class="fw-bold d-none d-sm-inline" style="font-size: 16px;">
          Universitas Terbuka
        </span>
      </a>

      <!-- Toggle Button Mobile -->
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
            <a class="nav-link" :class="{ active: currentPage === 'home' }" @click="$emit('changePage', 'home')" href="javascript:void(0)">Home</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'stok' }" @click="$emit('changePage', 'stok')" href="javascript:void(0)">Stok</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'tracking' }" @click="$emit('changePage', 'tracking')" href="javascript:void(0)">Tracking</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'keranjang' }" @click="$emit('changePage', 'keranjang')" href="javascript:void(0)">Keranjang</a>
          </li>

        </ul>

        <!-- Welcome -->
        <span class="navbar-text text-white me-3">
          Halo, {{ user.nama.split(' ')[0] }}
        </span>

        <!-- Logout -->
        <button class="btn btn-outline-light btn-sm" @click="$emit('logout')">
          Logout
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup>
import logoUT from '../img/ut-white.svg'

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
