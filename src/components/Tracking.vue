<template>
  <div class="container mt-4">

    <h3 class="fw-bold mb-3">Tracking Pengiriman</h3>

    <!-- 🔍 PENCARIAN KHUSUS ADMIN -->
    <div v-if="user?.role === 'admin'" class="mb-3">
      <label class="form-label fw-semibold">Cari berdasarkan Kode DO</label>
      <input 
        type="text" 
        class="form-control"
        v-model="searchDO"
        placeholder="Masukkan Kode DO..."
      >
    </div>

    <div v-if="filteredTracking.length === 0" class="alert alert-info text-center">
      Tidak ada data pengiriman yang cocok.
    </div>

    <div v-else>
      <div
        v-for="(data, index) in filteredTracking"
        :key="index"
        class="card shadow p-3 mb-4"
      >
        <h5 class="fw-bold text-primary">Kode DO: {{ data.do }}</h5>
        <p class="mb-1"><strong>Tanggal Kirim:</strong> {{ data.tanggal }}</p>
        <p class="mb-1">
          <strong>Status:</strong>
          <span class="badge bg-warning">{{ data.status }}</span>
        </p>
        <p class="mb-1">
          <strong>Kurir:</strong>
          {{ data.kurir }} - Ongkir Rp {{ data.ongkir.toLocaleString() }}
        </p>
        <p class="mb-3">
          <strong>Total Bayar:</strong>
          Rp {{ data.totalBayar.toLocaleString() }}
        </p>

        <hr>

        <!-- DATA USER -->
        <h6 class="fw-bold">Data Mahasiswa</h6>
        <table class="table table-bordered mb-3">
          <tr><th>Nama</th><td>{{ data.user.nama }}</td></tr>
          <tr><th>NIM</th><td>{{ data.user.nim }}</td></tr>
          <tr><th>Program Studi</th><td>{{ data.user.prodi }}</td></tr>
          <tr><th>UPBJJ</th><td>{{ data.user.upbjj }}</td></tr>
        </table>

        <!-- DATA BUKU -->
        <h6 class="fw-bold">Daftar Buku</h6>
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th>Kode</th>
              <th>Judul</th>
              <th>UPBJJ</th>
              <th>Harga</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in data.buku" :key="i">
              <td>{{ b.kode }}</td>
              <td class="text-start">{{ b.judul }}</td>
              <td>{{ b.upbjj }}</td>
              <td>Rp {{ b.harga.toLocaleString() }}</td>
              <td>{{ b.jumlah }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const tracking = ref([]);
const user = ref(null);

/* SEARCH INPUT (ADMIN ONLY) */
const searchDO = ref("");

/* LOAD TRACKING */
const loadTracking = () => {
  tracking.value = JSON.parse(localStorage.getItem("tracking") || "[]");
};

/* LOAD USER LOGIN */
const loadUser = () => {
  user.value = JSON.parse(localStorage.getItem("userLogin") || "{}");
};

/* FILTERING:
   - Admin: semua data, tapi bisa cari DO
   - User biasa: hanya datanya sendiri
*/
const filteredTracking = computed(() => {
  if (!user.value) return [];

  let data = [];

  if (user.value.role === "admin") {
    data = tracking.value;

    // 🔍 FILTER PENCARIAN DO
    if (searchDO.value.trim() !== "") {
      data = data.filter((t) =>
        t.do.toLowerCase().includes(searchDO.value.toLowerCase())
      );
    }

    return data;
  }

  // user biasa → hanya data miliknya
  return tracking.value.filter((t) => t.user.nim === user.value.nim);
});

onMounted(() => {
  loadUser();
  loadTracking();
});
</script>
