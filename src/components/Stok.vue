<template>
  <div class="card shadow p-4 container">

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

    <!-- ADMIN: Tambah Buku -->
    <div class="mb-3" v-if="user.role === 'admin'">
      <button class="btn btn-primary btn-sm" @click="showAddForm = !showAddForm">
        <i class="bi bi-plus-circle"></i> Tambah Buku
      </button>
    </div>

    <!-- FORM ADMIN -->
    <div v-if="showAddForm && user.role === 'admin'" class="card p-3 mb-3">
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

        <!-- FIXED → tidak pakai v-model.number -->
        <div class="col-md-4">
          <input v-model="newBook.harga" type="number" class="form-control" placeholder="Harga">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.qty" type="number" class="form-control" placeholder="Qty">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.safety" type="number" class="form-control" placeholder="Safety">
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
            <th v-if="user.role==='admin'">Safety</th>
            <th>Status</th>
            <th>Catatan</th>
            <th v-if="user.role==='admin'">Aksi</th>
            <th v-if="user.role==='user'">Keranjang</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="buku in sortedData" :key="buku.kode">

            <td>{{ buku.kode }}</td>
            <td class="text-start">{{ buku.judul }}</td>
            <td>{{ buku.upbjj }}</td>
            <td>{{ buku.lokasiRak }}</td>
            <td>Rp {{ buku.harga.toLocaleString() }}</td>

            <td>
              <div class="d-flex flex-column align-items-center">
                <span class="fw-bold">{{ buku.qty }}</span>

                <div v-if="user.role==='admin'" class="btn-group mt-1">
                  <button class="btn btn-sm btn-success" @click="increaseQty(buku.kode)">+</button>
                  <button class="btn btn-sm btn-warning" @click="decreaseQty(buku.kode)">-</button>
                </div>
              </div>
            </td>

            <td v-if="user.role==='admin'">{{ buku.safety }}</td>

            <!-- STATUS untuk semua role -->
            <td>
              <span class="badge" :class="statusClass(buku)">
                {{ statusText(buku) }}
              </span>
            </td>

            <td class="text-start">
              <span v-html="buku.catatanHTML"></span>
            </td>

            <td v-if="user.role==='admin'">
              <button class="btn btn-danger btn-sm" @click="deleteBook(buku.kode)">
                <i class="bi bi-trash"></i>
              </button>
            </td>

            <td v-if="user.role==='user'">
              <button class="btn btn-success btn-sm" @click="addToCart(buku.kode)">
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

const props = defineProps({ user: Object });

/* LOAD STOK */
const loadStok = () => {
  let saved = localStorage.getItem("stokData");
  return saved ? JSON.parse(saved) : dataStok;
};

const stok = ref(loadStok());
const saveStok = () => localStorage.setItem("stokData", JSON.stringify(stok.value));

/* FILTER STATES */
const filterKategori = ref("");
const filterUpbjj = ref("");
const filterRak = ref("");
const sortBy = ref("");

/* LISTS */
const kategoriList = computed(() => [...new Set(stok.value.map(s => s.kategori))].filter(Boolean));
const upbjjList = computed(() => [...new Set(stok.value.map(s => s.upbjj))].filter(Boolean));
const rakList = computed(() => [...new Set(stok.value.map(s => s.lokasiRak))].filter(Boolean));

/* FILTER + SORT */
const filteredData = computed(() =>
  stok.value.filter(b =>
    (!filterKategori.value || b.kategori === filterKategori.value) &&
    (!filterUpbjj.value || b.upbjj === filterUpbjj.value) &&
    (!filterRak.value || b.lokasiRak === filterRak.value)
  )
);

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

/* ADMIN FORM */
const showAddForm = ref(false);

const newBook = ref({
  kode: "",
  judul: "",
  kategori: "",
  upbjj: "",
  lokasiRak: "",
  harga: "",
  qty: "",
  safety: "",
  catatanHTML: ""
});

const addBook = () => {
  if (!newBook.value.kode || !newBook.value.judul) {
    return alert("Kode dan Judul wajib diisi!");
  }

  stok.value.push({
    kode: newBook.value.kode,
    judul: newBook.value.judul,
    kategori: newBook.value.kategori,
    upbjj: newBook.value.upbjj,
    lokasiRak: newBook.value.lokasiRak,
    harga: Number(newBook.value.harga || 0),
    qty: Number(newBook.value.qty || 0),
    safety: Number(newBook.value.safety || 0),
    catatanHTML: newBook.value.catatanHTML
  });

  saveStok();

  newBook.value = {
    kode: "",
    judul: "",
    kategori: "",
    upbjj: "",
    lokasiRak: "",
    harga: "",
    qty: "",
    safety: "",
    catatanHTML: ""
  };

  showAddForm.value = false;
};

const deleteBook = (kode) => {
  if (!confirm("Hapus buku ini?")) return;
  stok.value = stok.value.filter(b => b.kode !== kode);
  saveStok();
};

const increaseQty = (kode) => {
  let item = stok.value.find(s => s.kode === kode);
  if (item) {
    item.qty++;
    saveStok();
  }
};

const decreaseQty = (kode) => {
  let item = stok.value.find(s => s.kode === kode);
  if (item && item.qty > 0) {
    item.qty--;
    saveStok();
  }
};

/* CART */
const addToCart = (kode) => {
  let item = stok.value.find(b => b.kode === kode);

  if (!item) return alert("Buku tidak ditemukan.");
  if (item.qty <= 0) return alert("Stok habis!");

  item.qty--;
  saveStok();

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let exist = cart.find(c => c.kode === kode);

  if (exist) {
    exist.jumlah++;
  } else {
    cart.push({
      kode: item.kode,
      judul: item.judul,
      harga: item.harga,
      upbjj: item.upbjj,
      jumlah: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Buku ditambahkan ke keranjang!");
};

/* STATUS */
const statusText = (b) => {
  if (b.qty === 0) return "Kosong";
  if (b.qty < b.safety) return "Menipis";
  return "Aman";
};

const statusClass = (b) => {
  if (b.qty === 0) return "bg-danger";
  if (b.qty < b.safety) return "bg-warning";
  return "bg-success";
};

/* RESET */
const resetFilter = () => {
  filterKategori.value = "";
  filterUpbjj.value = "";
  filterRak.value = "";
  sortBy.value = "";
};
</script>
