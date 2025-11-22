<template>
  <div class="container py-4">

    <h3 class="fw-bold mb-4">Tracking DO</h3>

    <!-- ========== FORM CARI DO ========== -->
    <div class="card p-3 mb-4 shadow-sm">
      <h5 class="fw-semibold mb-3">Cari Nomor DO</h5>

      <div class="input-group">
        <input
          v-model="searchDO"
          type="text"
          class="form-control"
          placeholder="Masukkan kode DO, contoh: DO2025-001"
        >
        <button class="btn btn-primary" @click="trackDO">
          Cek Status
        </button>
      </div>

      <div v-if="trackingResult" class="alert mt-3"
           :class="trackingResult.status === 'Selesai' ? 'alert-success' : 'alert-info'">
        <b>{{ trackingResult.kode }}</b><br>
        Status: <b>{{ trackingResult.status }}</b>
      </div>

      <div v-if="trackingResult === false" class="alert alert-danger mt-3">
        Nomor DO tidak ditemukan!
      </div>
    </div>

    <!-- ========== ADMIN: TAMBAH DO BARU ========== -->
    <div v-if="user.role === 'admin'" class="card p-3 mb-4 shadow-sm">
      <h5 class="fw-semibold mb-3">Tambah DO Baru</h5>

      <div class="row g-3">
        <div class="col-md-4">
          <input v-model="newDO.kode" class="form-control" placeholder="Kode DO">
        </div>
        <div class="col-md-4">
          <select v-model="newDO.status" class="form-select">
            <option disabled value="">Pilih Status</option>
            <option>Diproses</option>
            <option>Dikemas</option>
            <option>Dikirim</option>
            <option>Selesai</option>
          </select>
        </div>

        <div class="col-md-4 text-end">
          <button class="btn btn-success" @click="addDO">Simpan</button>
        </div>
      </div>
    </div>

    <!-- ========== ADMIN: LIST SEMUA DO ========== -->
    <div v-if="user.role === 'admin'" class="card p-3 shadow-sm">

      <h5 class="fw-semibold mb-3">Daftar Semua DO</h5>

      <table class="table table-bordered table-striped text-center align-middle">
        <thead class="table-dark">
          <tr>
            <th>Kode DO</th>
            <th>Status</th>
            <th>Tindakan</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in trackingList" :key="i">
            <td>{{ item.kode }}</td>
            <td>
              <select v-model="item.status" class="form-select form-select-sm"
                      @change="saveTracking">
                <option>Diproses</option>
                <option>Dikemas</option>
                <option>Dikirim</option>
                <option>Selesai</option>
              </select>
            </td>
            <td>
              <button class="btn btn-danger btn-sm" @click="deleteDO(i)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  user: Object
});

/* ======================== LOAD LOCAL STORAGE ======================== */
const loadTracking = () => {
  const saved = localStorage.getItem("trackingData");
  return saved ? JSON.parse(saved) : [];
};

const trackingList = ref(loadTracking());

const saveTracking = () => {
  localStorage.setItem("trackingData", JSON.stringify(trackingList.value));
};

/* ======================== USER: TRACK DO ======================== */
const searchDO = ref("");
const trackingResult = ref(null);

const trackDO = () => {
  if (!searchDO.value.trim()) return;

  const item = trackingList.value.find(doItem => doItem.kode === searchDO.value);

  trackingResult.value = item ? item : false;
};

/* ======================== ADMIN: ADD DO ======================== */
const newDO = ref({
  kode: "",
  status: ""
});

const addDO = () => {
  if (!newDO.value.kode || !newDO.value.status) {
    return alert("Kode DO dan status wajib diisi!");
  }

  trackingList.value.push({ ...newDO.value });
  saveTracking();

  newDO.value = { kode: "", status: "" };

  alert("DO berhasil ditambahkan!");
};

/* ======================== ADMIN: DELETE DO ======================== */
const deleteDO = (index) => {
  if (confirm("Hapus DO ini?")) {
    trackingList.value.splice(index, 1);
    saveTracking();
  }
};
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}
</style>
