<template>
  <div class="dashboard-wrapper">

    <!-- NAVBAR -->
    <Navbar 
      :user="user"
      :currentPage="currentPage"
      @changePage="setPage"
      @logout="logout"
    />

    <!-- CONTENT WRAPPER -->
    <div class="container py-5">

      <!-- HOME -->
      <div v-if="currentPage === 'home'">
        <div class="card shadow p-4 mx-auto content-card">

          <h3 class="text-center fw-bold mb-4">Dashboard Mahasiswa</h3>

          <div v-if="user">
            <p><strong>Nama:</strong> {{ user.nama }}</p>
            <p><strong>NIM:</strong> {{ user.nim }}</p>
            <p><strong>Program Studi:</strong> {{ user.prodi }}</p>
            <p><strong>UPBJJ:</strong> {{ user.upbjj }}</p>
            <p><strong>Jenis Kelamin:</strong> {{ user.jenis_kelamin }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>

          <button class="btn btn-danger w-100 fw-semibold mt-3" @click="logout">
            Logout
          </button>

        </div>
      </div>

      <!-- STOK -->
      <div v-if="currentPage === 'stok'">
        <h3 class="fw-bold mb-3">Stok Bahan Ajar</h3>
        <div class="card p-4 shadow content-card">
          <p>Halaman stok masih kosong, siap untuk diisi.</p>
        </div>
      </div>

      <!-- TRACKING -->
      <div v-if="currentPage === 'tracking'">
        <h3 class="fw-bold mb-3">Tracking DO</h3>
        <div class="card p-4 shadow content-card">
          <p>Halaman tracking masih kosong.</p>
        </div>
      </div>

      <!-- KERANJANG -->
      <div v-if="currentPage === 'keranjang'">
        <h3 class="fw-bold mb-3">Keranjang</h3>
        <div class="card p-4 shadow content-card">
          <p>Halaman keranjang masih kosong.</p>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <Footer class="mt-auto" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

const user = ref(null)
const currentPage = ref('home')

onMounted(() => {
  const saved = localStorage.getItem("userLogin")
  if (!saved) {
    window.location.href = "/"
  } else {
    user.value = JSON.parse(saved)
  }
})

const setPage = (page) => {
  currentPage.value = page
}

const logout = () => {
  localStorage.removeItem("userLogin")
  window.location.href = "/"
}
</script>

<style scoped>
.dashboard-wrapper {
  background: white;
  min-height: 100vh;

  /* agar footer di bawah */
  display: flex;
  flex-direction: column;
}

/* Semua card utama punya lebar seragam */
.content-card {
  max-width: 600px;
  margin: auto;
  border-radius: 16px;
}
</style>
