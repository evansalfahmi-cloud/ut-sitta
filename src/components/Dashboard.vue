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
    <div class="container py-5">

      <!-- HOME -->
      <div v-if="currentPage === 'home'">
        <div class="card shadow p-4 mx-auto content-card">

          <h3 class="text-center fw-bold mb-3">Dashboard Mahasiswa</h3>

          <!-- AVATAR -->
          <div class="text-center mb-4">
            <img 
              :src="user.jenis_kelamin === 'Laki-laki' ? avatarLaki : avatarPerempuan"
              alt="Avatar"
              class="shadow"
              style="
                width: 90px;
                height: 120px;
                object-fit: cover;
                border-radius: 8px;
              "
            >
          </div>

          <!-- TABEL -->
          <table class="table table-bordered table-striped">
            <tbody>
              <tr>
                <th width="40%">Nama</th>
                <td>{{ user.nama }}</td>
              </tr>

              <tr>
                <th>NIM</th>
                <td>{{ user.nim }}</td>
              </tr>

              <tr>
                <th>Program Studi</th>
                <td>{{ user.prodi }}</td>
              </tr>

              <tr>
                <th>UPBJJ</th>
                <td>{{ user.upbjj }}</td>
              </tr>

              <tr>
                <th>Jenis Kelamin</th>
                <td>{{ user.jenis_kelamin }}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>

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

    <Footer class="mt-auto" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

// avatar
import avatarLaki from '../img/lakilaki.png'
import avatarPerempuan from '../img/perempuan.png'

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
  display: flex;
  flex-direction: column;
}

.content-card {
  max-width: 600px;
  margin: auto;
  border-radius: 16px;
}
</style>
