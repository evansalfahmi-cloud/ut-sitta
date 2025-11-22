<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
    <div class="container-fluid">

      <!-- Logo UT + Brand -->
      <a class="navbar-brand fw-medium d-flex align-items-center" href="#" @click.prevent="$emit('changePage','home')">
        <img :src="logoUT" alt="logo" height="30" class="me-2">
        Universitas Terbuka
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 small">

          <!-- HOME -->
          <li class="nav-item">
            <a class="nav-link"
               :class="{ active: currentPage === 'home' }"
               href="#"
               @click.prevent="$emit('changePage','home')">
              Home
            </a>
          </li>

          <!-- STOK -->
          <li class="nav-item">
            <a class="nav-link"
               :class="{ active: currentPage === 'stok' }"
               href="#"
               @click.prevent="$emit('changePage','stok')">
              Stok
            </a>
          </li>
          
           <!-- KERANJANG -->
          <li class="nav-item">
            <a class="nav-link"
               :class="{ active: currentPage === 'keranjang' }"
               href="#"
               @click.prevent="$emit('changePage','keranjang')">
              Keranjang
            </a>
          </li>

          <!-- TRACKING -->
          <li class="nav-item">
            <a class="nav-link"
               :class="{ active: currentPage === 'tracking' }"
               href="#"
               @click.prevent="$emit('changePage','tracking')">
              Tracking
            </a>
          </li>

         

        </ul>

        <!-- USER + ROLE -->
        <span class="navbar-text text-white me-3 fw-semibold small">
          {{ user.nama.split(" ")[0] }}
          <span v-if="user.role === 'admin'" class="badge bg-warning text-dark ms-1">
            Admin
          </span>
        </span>

        <!-- LOGOUT -->
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
.custom-navbar {
  background-color: #083b71;
  height: 54px;
  padding-top: 4px;
  padding-bottom: 4px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
}

.nav-link.active {
  font-weight: bold;
  color: #ffc107 !important;
}

.nav-link {
  font-size: 14px;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  cursor: pointer;
}
</style>
