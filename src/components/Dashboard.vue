<template>
  <div class="dashboard-wrapper">

    <!-- NAVBAR -->
    <Navbar 
      :user="user"
      :currentPage="currentPage"
      @changePage="setPage"
      @logout="logout"
    />

    <!-- CONTENT -->
    <div class="container dashboard-content" v-if="user">

      <!-- HOME -->
      <div v-if="currentPage === 'home'">
        <div class="card shadow p-4 mx-auto content-card">

          <h3 class="text-center fw-bold mb-3">Dashboard Mahasiswa</h3>

          <div class="text-center mb-4">
            <img 
              :src="user.jenis_kelamin === 'Laki-laki' ? avatarLaki : avatarPerempuan"
              alt="Avatar"
              class="avatar-img shadow"
            >
          </div>

          <table class="table table-bordered table-striped">
            <tbody>
              <tr><th width="40%">Nama</th><td>{{ user.nama }}</td></tr>
              <tr><th>NIM</th><td>{{ user.nim }}</td></tr>
              <tr><th>Program Studi</th><td>{{ user.prodi }}</td></tr>
              <tr><th>UPBJJ</th><td>{{ user.upbjj }}</td></tr>
              <tr><th>Jenis Kelamin</th><td>{{ user.jenis_kelamin }}</td></tr>
              <tr><th>Email</th><td>{{ user.email }}</td></tr>
              <tr><th>Role</th><td class="fw-bold text-primary">{{ user.role }}</td></tr> <!-- ✅ UPDATE -->
            </tbody>
          </table>

          <button class="btn btn-danger w-100 fw-semibold mt-3" @click="logout">
            Logout
          </button>

        </div>
      </div>

      <!-- STOK -->
      <div v-if="currentPage === 'stok'">
        <Stok :user="user" />
      </div>

      <!-- TRACKING (User) -->
      <div v-if="currentPage === 'tracking' && user.role === 'user'"> <!-- ✅ UPDATE -->
        <Tracking :user="user" />
      </div>

      <!-- TRACKING ADMIN -->
      <div v-if="currentPage === 'tracking-admin' && user.role === 'admin'">
        <TrackingAdmin :user="user" />
      </div>

      <!-- KERANJANG -->
      <div v-if="currentPage === 'keranjang' && user.role === 'user'"> <!-- ✅ UPDATE -->
        <Keranjang :user="user" />
      </div>

    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'  // ✅ UPDATE

import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

import Stok from './Stok.vue'
import Tracking from './Tracking.vue'
import TrackingAdmin from './TrackingAdmin.vue'
import Keranjang from './Keranjang.vue'

import avatarLaki from '../img/lakilaki.png'
import avatarPerempuan from '../img/perempuan.png'

const user = ref(null)
const currentPage = ref('home')

// LOAD USER LOGIN
onMounted(() => {
  const saved = localStorage.getItem("userLogin")

  if (!saved) {
    return window.location.href = "/"
  }

  user.value = JSON.parse(saved)

  // Jika user bukan admin, cegah buka halaman admin
  if (currentPage.value === "tracking-admin" && user.value.role !== "admin") {
    currentPage.value = "home"   // ✅ UPDATE
  }
})

// Watcher untuk memonitor perpindahan halaman (nilai tugas)
watch(currentPage, (baru) => {
  console.log("Halaman berubah menjadi:", baru)   // ✅ UPDATE
})

const setPage = (page) => {
  // Validasi role agar tidak bisa akses halaman admin lewat navbar custom
  if (page === "tracking-admin" && user.value.role !== "admin") return  // ✅ UPDATE
  if (page === "keranjang" && user.value.role !== "user") return       // ✅ UPDATE
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
  display: flex;
  flex-direction: column;
}

.dashboard-content {
  padding-bottom: 40px;
}

.content-card {
  max-width: 600px;
  margin: auto;
  border-radius: 16px;
}

.avatar-img {
  width: 90px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
