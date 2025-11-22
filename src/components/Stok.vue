<template>
  <div class="card shadow p-4 container-fluid">

    <h3 class="fw-bold mb-3">Stok Bahan Ajar</h3>

    <!-- FILTER & SORT -->
    <div class="row g-3 mb-3 align-items-end">

      <div class="col-md-3">
        <label class="form-label fw-semibold small">Kategori</label>
        <select v-model="filterKategori" class="form-select">
          <option value="">Semua</option>
          <option v-for="kat in kategoriList" :key="kat">{{ kat }}</option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label fw-semibold small">UPBJJ</label>
        <select v-model="filterUpbjj" class="form-select">
          <option value="">Semua</option>
          <option v-for="u in upbjjList" :key="u">{{ u }}</option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label fw-semibold small">Lokasi Rak</label>
        <select v-model="filterRak" class="form-select">
          <option value="">Semua</option>
          <option v-for="rak in rakList" :key="rak">{{ rak }}</option>
        </select>
      </div>

      <div class="col-md-2">
        <label class="form-label fw-semibold small">Urutkan</label>
        <select v-model="sortBy" class="form-select">
          <option value="">Default</option>
          <option value="judul-asc">Judul (A-Z)</option>
          <option value="judul-desc">Judul (Z-A)</option>
          <option value="harga-asc">Harga Termurah</option>
          <option value="harga-desc">Harga Termahal</option>
          <option value="qty-desc">Stok Terbanyak</option>
          <option value="qty-asc">Stok Tersedikit</option>
        </select>
      </div>

      <div class="col-md-1">
        <button class="btn btn-secondary btn-sm w-100" @click="resetFilter">Reset</button>
      </div>

    </div>

    <!-- TABEL -->
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
            <th>Catatan</th>
            <th v-if="user.role=='user'">Keranjang</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(buku, index) in sortedData" :key="buku.kode">

            <td>{{ buku.kode }}</td>
            <td class="text-start">{{ buku.judul }}</td>
            <td>{{ buku.upbjj }}</td>
            <td>{{ buku.lokasiRak }}</td>
            <td>Rp {{ buku.harga.toLocaleString() }}</td>

            <td>
              <span class="fw-bold">{{ buku.qty }}</span>
            </td>

            <td class="text-start">
              <span v-html="buku.catatanHTML"></span>
            </td>

            <td v-if="user.role=='user'">
              <button class="btn btn-success btn-sm" @click="addToCart(buku)">
                <i class="bi bi-cart-plus"></i>
              </button>
            </td>

          </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { dataStok } from "../data/stok.js";

const props = defineProps({
  user: Object
});

/* ====================================
   LOAD DATA STOK
==================================== */
const loadStok = () => {
  let saved = localStorage.getItem("stokData");
  if (saved) return JSON.parse(saved);

  localStorage.setItem("stokData", JSON.stringify(dataStok));
  return dataStok;
};

const stok = ref(loadStok());

const saveStok = () =>
  localStorage.setItem("stokData", JSON.stringify(stok.value));

/* ====================================
   FILTER
==================================== */
const filterKategori = ref("");
const filterUpbjj = ref("");
const filterRak = ref("");
const sortBy = ref("");

const kategoriList = [...new Set(stok.value.map(s => s.kategori))];
const upbjjList = [...new Set(stok.value.map(s => s.upbjj))];
const rakList = [...new Set(stok.value.map(s => s.lokasiRak))];

const filteredData = computed(() =>
  stok.value.filter(b =>
    (!filterKategori.value || b.kategori === filterKategori.value) &&
    (!filterUpbjj.value || b.upbjj === filterUpbjj.value) &&
    (!filterRak.value || b.lokasiRak === filterRak.value)
  )
);

/* ====================================
   SORT
==================================== */
const sortedData = computed(() => {
  let data = [...filteredData.value];

  switch (sortBy.value) {
    case "judul-asc": data.sort((a, b) => a.judul.localeCompare(b.judul)); break;
    case "judul-desc": data.sort((a, b) => b.judul.localeCompare(a.judul)); break;
    case "harga-asc": data.sort((a, b) => a.harga - b.harga); break;
    case "harga-desc": data.sort((a, b) => b.harga - a.harga); break;
    case "qty-asc": data.sort((a, b) => a.qty - b.qty); break;
    case "qty-desc": data.sort((a, b) => b.qty - a.qty); break;
  }

  return data;
});

/* ====================================
   RESET FILTER
==================================== */
const resetFilter = () => {
  filterKategori.value = "";
  filterUpbjj.value = "";
  filterRak.value = "";
  sortBy.value = "";
};

/* ====================================
   ADD TO CART (PERBAIKAN BESAR)
==================================== */
const addToCart = (buku) => {
  if (buku.qty <= 0)
    return alert("Stok habis!");

  // 🔥 update qty langsung dari stok utama (aman)
  const item = stok.value.find(s => s.kode === buku.kode);
  if (item) {
    item.qty -= 1;
  }

  // simpan stok terbaru
  saveStok();

  // ambil cart dari localStorage
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  let cartItem = cart.find(c => c.kode === buku.kode);

  if (cartItem) {
    cartItem.jumlah += 1;
  } else {
    cart.push({
      kode: buku.kode,
      judul: buku.judul,
      harga: buku.harga,
      upbjj: buku.upbjj,
      jumlah: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Buku dimasukkan ke keranjang!");
};
</script>
