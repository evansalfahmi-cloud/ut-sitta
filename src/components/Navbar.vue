<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-nav">
    <div class="container-fluid">

      <!-- Brand -->
      <a class="navbar-brand fw-bold text-uppercase small-brand" href="#">
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 small-menu">

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'home' }" 
               @click="$emit('changePage', 'home')" href="#">
               Home
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'stok' }" 
               @click="$emit('changePage', 'stok')" href="#">
               Stok
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'tracking' }" 
               @click="$emit('changePage', 'tracking')" href="#">
               Tracking
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentPage === 'keranjang' }" 
               @click="$emit('changePage', 'keranjang')" href="#">
               Keranjang
            </a>
          </li>

        </ul>

        <!-- Welcome -->
        <span class="navbar-text text-white me-3 small-text">
          Halo, {{ user.nama.split(' ')[0] }}
        </span>

        <!-- Logout -->
        <button class="btn btn-outline-light btn-sm small-btn" @click="$emit('logout')">
          Logout
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup>
defineProps({
  user: Object,
  currentPage: String
})
</script>

<style scoped>
/* Navbar biru */
.custom-nav {
  background-color: #083b71 !important;
  height: 55px; /* diperkecil */
  padding-top: 0;
  padding-bottom: 0;
}

/* Brand kecil */
.small-brand {
  font-size: 17px;
}

/* Ukuran menu kecil */
.small-menu .nav-link {
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* Tulisan halo */
.small-text {
  font-size: 14px;
}

/* Tombol logout kecil */
.small-btn {
  font-size: 13px;
  padding: 5px 10px;
}

/* Active highlight kuning */
.nav-link.active {
  font-weight: bold;
  color: #ffc107 !important;
}
</style>
