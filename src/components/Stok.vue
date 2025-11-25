<template>
  <div class="card shadow p-4 container">

    <h3 class="fw-bold mb-3">Stok Bahan Ajar</h3>

    <!-- FILTER (semua kontrol punya panjang seragam) -->
    <div class="filters-row mb-3">

      <div class="filter-item">
        <label class="form-label fw-semibold small">Kategori</label>
        <select v-model="filterKategori" class="form-select filter-control">
          <option value="">Semua</option>
          <option v-for="kat in kategoriList" :key="kat">{{ kat }}</option>
        </select>
      </div>

      <div class="filter-item">
        <label class="form-label fw-semibold small">UPBJJ</label>
        <select v-model="filterUpbjj" class="form-select filter-control">
          <option value="">Semua</option>
          <option v-for="up in upbjjList" :key="up">{{ up }}</option>
        </select>
      </div>

      <div class="filter-item">
        <label class="form-label fw-semibold small">Lokasi Rak</label>
        <select v-model="filterRak" class="form-select filter-control">
          <option value="">Semua</option>
          <option v-for="rak in rakList" :key="rak">{{ rak }}</option>
        </select>
      </div>

      <div class="filter-item">
        <label class="form-label fw-semibold small">Urutkan</label>
        <select v-model="sortBy" class="form-select filter-control">
          <option value="">Default</option>
          <option value="judul-asc">Judul (A-Z)</option>
          <option value="judul-desc">Judul (Z-A)</option>
          <option value="harga-asc">Harga Termurah</option>
          <option value="harga-desc">Harga Termahal</option>
          <option value="qty-desc">Stok Terbanyak</option>
          <option value="qty-asc">Stok Tersedikit</option>
        </select>
      </div>

      <div class="filter-item">
        <label class="form-label fw-semibold small">Status Stok</label>
        <select v-model="filterStatus" class="form-select filter-control">
          <option value="">Semua</option>
          <option value="aman">Stok Aman</option>
          <option value="menipis">Stok Menipis</option>
          <option value="kosong">Stok Kosong</option>
        </select>
      </div>

      <div class="filter-item reset-wrap">
        <label class="form-label fw-semibold small invisible">Reset</label>
        <button class="btn btn-secondary btn-sm w-100 filter-control" @click="resetFilter">
          Reset
        </button>
      </div>
    </div>

    <!-- ADMIN: Tambah Buku -->
    <div class="mb-3" v-if="user && user.role === 'admin'">
      <button class="btn btn-primary btn-sm" @click="showAddForm = !showAddForm">
        <i class="bi bi-plus-circle"></i> Tambah Buku
      </button>
    </div>

    <!-- FORM ADMIN: TAMBAH -->
    <div v-if="showAddForm && user && user.role === 'admin'" class="card p-3 mb-3">
      <h5 class="fw-bold mb-3">Tambah Buku Baru</h5>

      <div class="row g-3">

        <div class="col-md-4">
          <input v-model="newBook.kode" class="form-control"
                 placeholder="Kode Buku" @keyup.enter="addBook">
        </div>

        <div class="col-md-8">
          <input v-model="newBook.judul" class="form-control"
                 placeholder="Judul Buku" @keyup.enter="addBook">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.kategori" class="form-control"
                 placeholder="Kategori" @keyup.enter="addBook">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.upbjj" class="form-control"
                 placeholder="UPBJJ" @keyup.enter="addBook">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.lokasiRak" class="form-control"
                 placeholder="Lokasi Rak" @keyup.enter="addBook">
        </div>

        <div class="col-md-4">
          <input v-model.number="newBook.harga" class="form-control" type="number"
                 placeholder="Harga" @keyup.enter="addBook">
        </div>

        <div class="col-md-4">
          <input v-model.number="newBook.qty" class="form-control" type="number"
                 placeholder="Qty" @keyup.enter="addBook">
        </div>

        <div class="col-md-4">
          <input v-model.number="newBook.safety" class="form-control" type="number"
                 placeholder="Safety" @keyup.enter="addBook">
        </div>

        <div class="col-12">
          <textarea v-model="newBook.catatanHTML" class="form-control" rows="2" placeholder="Catatan (HTML) — opsional"></textarea>
        </div>
      </div>

      <div class="col-12 mt-3 text-end">
        <button class="btn btn-secondary btn-sm me-2"
                @click="showAddForm = false">Batal</button>
        <button class="btn btn-success btn-sm"
                @click="addBook">Simpan</button>
      </div>
    </div>

    <!-- FORM EDIT (ADMIN) -->
    <div v-if="showEditForm && editingBook && user && user.role === 'admin'" class="card p-3 mb-3">
      <h5 class="fw-bold mb-3">Edit Buku</h5>

      <div class="row g-3">
        <div class="col-md-4">
          <input v-model="editingBook.kode" class="form-control" disabled>
        </div>

        <div class="col-md-8">
          <input v-model="editingBook.judul" class="form-control" placeholder="Judul Buku">
        </div>

        <div class="col-md-4">
          <input v-model="editingBook.kategori" class="form-control" placeholder="Kategori">
        </div>

        <div class="col-md-4">
          <input v-model="editingBook.upbjj" class="form-control" placeholder="UPBJJ">
        </div>

        <div class="col-md-4">
          <input v-model="editingBook.lokasiRak" class="form-control" placeholder="Lokasi Rak">
        </div>

        <div class="col-md-4">
          <input v-model.number="editingBook.harga" class="form-control" type="number" placeholder="Harga">
        </div>

        <div class="col-md-4">
          <input v-model.number="editingBook.qty" class="form-control" type="number" placeholder="Qty">
        </div>

        <div class="col-md-4">
          <input v-model.number="editingBook.safety" class="form-control" type="number" placeholder="Safety">
        </div>

        <div class="col-12">
          <textarea v-model="editingBook.catatanHTML" class="form-control" rows="2" placeholder="Catatan (HTML)"></textarea>
        </div>
      </div>

      <div class="col-12 mt-3 text-end">
        <button class="btn btn-secondary btn-sm me-2" @click="cancelEdit">Batal</button>
        <button class="btn btn-success btn-sm" @click="saveEdit">Simpan Perubahan</button>
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
            <th v-if="user && user.role==='admin'">Safety</th>
            <th>Status</th>
            <th v-if="user && user.role==='admin'">Aksi</th>
            <th>Keranjang</th> <!-- ditampilkan untuk semua role -->
          </tr>
        </thead>

        <tbody>
          <tr v-for="buku in sortedData" :key="buku.kode">

            <td>{{ buku.kode }}</td>
            <td class="text-start">{{ buku.judul }}</td>
            <td>{{ buku.upbjj }}</td>
            <td>{{ buku.lokasiRak }}</td>
            <td>Rp {{ Number(buku.harga).toLocaleString() }}</td>

            <td>
              <div class="d-flex flex-column align-items-center">
                <span class="fw-bold">{{ buku.qty }} buah</span>

                <div v-if="user && user.role==='admin'" class="btn-group mt-1">
                  <button class="btn btn-sm btn-success"
                          @click="increaseQty(buku.kode)">+</button>
                  <button class="btn btn-sm btn-warning"
                          @click="decreaseQty(buku.kode)">-</button>
                </div>
              </div>
            </td>

            <td v-if="user && user.role==='admin'">{{ buku.safety }} buah</td>

            <!-- STATUS + TOOLTIP (catatan muncul saat hover) -->
            <td>
              <span
                class="badge"
                :class="statusClass(buku)"
                :title="cleanHTML(buku.catatanHTML)"
              >
                {{ statusText(buku) }}
              </span>
            </td>

            <!-- ADMIN ACTIONS: EDIT + DELETE -->
            <td v-if="user && user.role==='admin'">
              <button class="btn btn-warning btn-sm me-1" @click="startEdit(buku)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteBook(buku.kode)">
                <i class="bi bi-trash"></i>
              </button>
            </td>

            <!-- ADD TO CART (tersedia untuk semua role) -->
            <td>
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
import { ref, computed, watch } from "vue";
import { dataStok } from "../data/stok.js";

const props = defineProps({ user: Object });

/* CLEAN HTML FOR TOOLTIP */
const cleanHTML = (html) => html ? String(html).replace(/<[^>]*>?/gm, "") : "";

/* LOAD STOK */
const loadStok = () => {
  const saved = localStorage.getItem("stokData");
  return saved ? JSON.parse(saved) : dataStok;
};

const stok = ref(loadStok());
const saveStok = () =>
  localStorage.setItem("stokData", JSON.stringify(stok.value));

/* FILTER STATES */
const filterKategori = ref("");
const filterUpbjj = ref("");
const filterRak = ref("");
const filterStatus = ref("");
const sortBy = ref("");

/* WATCHERS (minimal 2 watchers wajib) */
watch(filterKategori, (baru, lama) => {
  console.log("Filter kategori →", baru, "(sebelumnya:", lama, ")");
});
watch(filterStatus, (baru) => {
  console.log("Filter status stok →", baru);
});

/* LISTS (unique values) */
const kategoriList = computed(() =>
  [...new Set(stok.value.map((s) => s.kategori))].filter(Boolean)
);

const upbjjList = computed(() =>
  [...new Set(stok.value.map((s) => s.upbjj))].filter(Boolean)
);

const rakList = computed(() =>
  [...new Set(stok.value.map((s) => s.lokasiRak))].filter(Boolean)
);

/* FILTER + SORT */
const filteredData = computed(() =>
  stok.value.filter((b) => {
    if (filterKategori.value && b.kategori !== filterKategori.value) return false;
    if (filterUpbjj.value && b.upbjj !== filterUpbjj.value) return false;
    if (filterRak.value && b.lokasiRak !== filterRak.value) return false;

    // Status stok dropdown: AMAN / MENIPIS / KOSONG
    if (filterStatus.value === "aman" && !(Number(b.qty) >= Number(b.safety))) return false;
    if (filterStatus.value === "menipis" && !(Number(b.qty) < Number(b.safety) && Number(b.qty) > 0)) return false;
    if (filterStatus.value === "kosong" && Number(b.qty) !== 0) return false;

    return true;
  })
);

const sortedData = computed(() => {
  const data = [...filteredData.value];

  switch (sortBy.value) {
    case "judul-asc":
      data.sort((a, b) => a.judul.localeCompare(b.judul));
      break;
    case "judul-desc":
      data.sort((a, b) => b.judul.localeCompare(a.judul));
      break;
    case "harga-asc":
      data.sort((a, b) => Number(a.harga) - Number(b.harga));
      break;
    case "harga-desc":
      data.sort((a, b) => Number(b.harga) - Number(a.harga));
      break;
    case "qty-asc":
      data.sort((a, b) => Number(a.qty) - Number(b.qty));
      break;
    case "qty-desc":
      data.sort((a, b) => Number(b.qty) - Number(a.qty));
      break;
  }

  return data;
});

/* ADMIN FORM (tambah) */
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
    return alert("Kode & Judul wajib!");
  }

  // Cek duplikat kode (opsional, tapi membantu)
  if (stok.value.some(s => s.kode === newBook.value.kode)) {
    return alert("Kode sudah ada. Gunakan kode unik.");
  }

  stok.value.push({
    ...newBook.value,
    harga: Number(newBook.value.harga || 0),
    qty: Number(newBook.value.qty || 0),
    safety: Number(newBook.value.safety || 0),
    catatanHTML: newBook.value.catatanHTML || ""
  });

  saveStok();

  // Reset form
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

/* EDIT (UPDATE DATA BUKU) */
const editingBook = ref(null);
const showEditForm = ref(false);

const startEdit = (buku) => {
  editingBook.value = { ...buku }; // salin untuk edit (prevent direct mutate)
  showEditForm.value = true;
  // scroll ke atas kecil kalau perlu (opsional)
  // window.scrollTo({ top: 0, behavior: "smooth" });
};

const cancelEdit = () => {
  editingBook.value = null;
  showEditForm.value = false;
};

const saveEdit = () => {
  if (!editingBook.value || !editingBook.value.kode) return;
  const idx = stok.value.findIndex(s => s.kode === editingBook.value.kode);
  if (idx === -1) return alert("Buku tidak ditemukan untuk diupdate.");

  stok.value[idx] = {
    ...editingBook.value,
    harga: Number(editingBook.value.harga || 0),
    qty: Number(editingBook.value.qty || 0),
    safety: Number(editingBook.value.safety || 0),
    catatanHTML: editingBook.value.catatanHTML || ""
  };

  saveStok();
  showEditForm.value = false;
  editingBook.value = null;
  alert("Data buku berhasil diperbaharui.");
};

/* DELETE */
const deleteBook = (kode) => {
  if (!confirm("Hapus buku ini?")) return;
  stok.value = stok.value.filter((b) => b.kode !== kode);
  saveStok();
};

/* QTY +/- */
const increaseQty = (kode) => {
  const item = stok.value.find((s) => s.kode === kode);
  if (item) {
    item.qty = Number(item.qty) + 1;
    saveStok();
  }
};

const decreaseQty = (kode) => {
  const item = stok.value.find((s) => s.kode === kode);
  if (item && Number(item.qty) > 0) {
    item.qty = Number(item.qty) - 1;
    saveStok();
  }
};

/* CART */
const addToCart = (kode) => {
  const item = stok.value.find((b) => b.kode === kode);
  if (!item) return alert("Buku tidak ditemukan.");
  if (Number(item.qty) <= 0) return alert("Stok habis!");

  item.qty = Number(item.qty) - 1;
  saveStok();

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const exist = cart.find((c) => c.kode === kode);

  if (exist) exist.jumlah = Number(exist.jumlah) + 1;
  else
    cart.push({
      kode: item.kode,
      judul: item.judul,
      harga: item.harga,
      upbjj: item.upbjj,
      jumlah: 1,
    });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Buku ditambahkan ke keranjang!");
};

/* STATUS */
const statusText = (b) => {
  if (Number(b.qty) === 0) return "Kosong";
  if (Number(b.qty) < Number(b.safety)) return "Menipis";
  return "Aman";
};

const statusClass = (b) => {
  if (Number(b.qty) === 0) return "bg-danger";
  if (Number(b.qty) < Number(b.safety)) return "bg-warning";
  return "bg-success";
};

/* RESET FILTER */
const resetFilter = () => {
  filterKategori.value = "";
  filterUpbjj.value = "";
  filterRak.value = "";
  filterStatus.value = "";
  sortBy.value = "";
};
</script>

<style scoped>
/* ===============================
   FILTER TAMPILAN SERAGAM
   - semua filter-control memiliki lebar sama karena parent .filters-row menggunakan flex
==================================*/
.filters-row {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
}

/* setiap filter diberi proporsi yang sama */
.filter-item {
  flex: 1 1 160px; /* tumbuh, shrink, basis 160px */
  min-width: 140px;
  display: flex;
  flex-direction: column;
}

.reset-wrap {
  flex: 0 0 120px; /* reset tetap lebih kecil namun aligned */
  min-width: 100px;
}

/* kontrol filter (select / button) agar tinggi sama */
.filter-control {
  height: 38px;
  font-size: 14px;
  width: 100%;
}

/* label rapih */
.form-label {
  margin-bottom: 6px;
}

/* tabel responsive: font ukuran wajar */
.table {
  font-size: 14px;
}

/* buat ikon tombol sedikit rapih */
.btn .bi {
  vertical-align: -2px;
}

/* agar textarea form tidak terlalu besar */
.card textarea {
  resize: vertical;
}
</style>
