<template>
  <!-- Gunakan container-fluid agar lebar penuh -->
  <div class="card shadow p-4 container-fluid">

    <h3 class="fw-bold mb-3">Stok Bahan Ajar</h3>

    <!-- ADMIN: Tombol tambah buku -->
    <div class="mb-3" v-if="user.role === 'admin'">
      <button class="btn btn-primary btn-sm" @click="showAddForm = !showAddForm">
        <i class="bi bi-plus-circle"></i> Tambah Buku
      </button>
    </div>

    <!-- FORM TAMBAH BUKU -->
    <div v-if="showAddForm" class="card p-3 mb-3">
      <h5 class="fw-bold mb-3">Tambah Buku Baru</h5>

      <div class="row g-3">
        <div class="col-md-4">
          <input v-model="newBook.kode" class="form-control" placeholder="Kode Buku">
        </div>
        <div class="col-md-8">
          <input v-model="newBook.judul" class="form-control" placeholder="Judul Buku">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.kategori" class="form-control" placeholder="Kategori">
        </div>
        <div class="col-md-4">
          <input v-model="newBook.upbjj" class="form-control" placeholder="UPBJJ">
        </div>
        <div class="col-md-4">
          <input v-model="newBook.lokasiRak" class="form-control" placeholder="Lokasi Rak">
        </div>

        <div class="col-md-4">
          <input v-model.number="newBook.harga" type="number" class="form-control" placeholder="Harga">
        </div>
        <div class="col-md-4">
          <input v-model.number="newBook.qty" type="number" class="form-control" placeholder="Qty">
        </div>
        <div class="col-md-4">
          <input v-model.number="newBook.safety" type="number" class="form-control" placeholder="Safety">
        </div>

        <div class="col-12">
          <textarea v-model="newBook.catatanHTML" class="form-control" placeholder="Catatan (HTML)"></textarea>
        </div>

        <div class="col-12 text-end mt-2">
          <button class="btn btn-secondary btn-sm me-2" @click="showAddForm = false">Batal</button>
          <button class="btn btn-success btn-sm" @click="addBook">Simpan</button>
        </div>
      </div>
    </div>

    <!-- TABEL BUKU (Responsive) -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped align-middle text-center">
        <thead class="table-dark">
          <tr>
            <th>Kode</th>
            <th>Judul</th>
            <th>UPBJJ</th>
            <th>Rak</th>
            <th>Harga</th>
            <th>Qty</th>
            <th>Safety</th>
            <th>Catatan</th>
            <th v-if="user.role === 'admin'">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(buku, index) in stok" :key="buku.kode">
            <td>{{ buku.kode }}</td>
            <td class="text-start">{{ buku.judul }}</td>
            <td>{{ buku.upbjj }}</td>
            <td>{{ buku.lokasiRak }}</td>
            <td>Rp {{ buku.harga.toLocaleString() }}</td>

            <td>
              <div class="d-flex flex-column align-items-center">
                <span class="fw-bold">{{ buku.qty }}</span>

                <!-- ADMIN BUTTON -->
                <div v-if="user.role === 'admin'" class="btn-group mt-1">
                  <button class="btn btn-sm btn-success" @click="buku.qty++">+</button>
                  <button class="btn btn-sm btn-warning" @click="buku.qty > 0 ? buku.qty-- : null">-</button>
                </div>
              </div>
            </td>

            <td>{{ buku.safety }}</td>

            <td class="text-start">
              <span v-html="buku.catatanHTML"></span>
            </td>

            <td v-if="user.role === 'admin'">
              <button class="btn btn-danger btn-sm" @click="deleteBook(index)">
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
import { ref } from "vue";
import { dataStok } from "../data/stok.js";

const props = defineProps({
  user: Object,
});

const stok = ref([...dataStok]);
const showAddForm = ref(false);

const newBook = ref({
  kode: "",
  judul: "",
  kategori: "",
  upbjj: "",
  lokasiRak: "",
  harga: 0,
  qty: 0,
  safety: 0,
  catatanHTML: "",
});

const addBook = () => {
  if (!newBook.value.kode || !newBook.value.judul) {
    alert("Kode dan Judul wajib diisi!");
    return;
  }

  stok.value.push({ ...newBook.value });

  newBook.value = {
    kode: "",
    judul: "",
    kategori: "",
    upbjj: "",
    lokasiRak: "",
    harga: 0,
    qty: 0,
    safety: 0,
    catatanHTML: "",
  };

  showAddForm.value = false;
};

const deleteBook = (index) => {
  if (confirm("Yakin ingin menghapus buku ini?")) {
    stok.value.splice(index, 1);
  }
};
</script>

<style scoped>
/* HAPUS CONTENT-CARD AGAR FULL WIDTH */
</style>
