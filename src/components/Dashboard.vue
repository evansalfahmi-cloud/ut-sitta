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

      <!-- TRACKING -->
      <div v-if="currentPage === 'tracking'">
        <Tracking :user="user" />
      </div>

      <!-- KERANJANG -->
      <div v-if="currentPage === 'keranjang'">
        <Keranjang :user="user" />
      </div>

    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

import Stok from './Stok.vue'
import Tracking from './Tracking.vue'
import Keranjang from './Keranjang.vue'

import avatarLaki from '../img/lakilaki.png'
import avatarPerempuan from '../img/perempuan.png'

const user = ref(null)
const currentPage = ref('home')

onMounted(() => {
  const saved = localStorage.getItem("userLogin")
  if (!saved) return window.location.href = "/"

  user.value = JSON.parse(saved)
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
  display: flex;
  flex-direction: column;
}

.dashboard-content {
   /* navbar fix */
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
