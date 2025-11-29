<template>
  <div class="card shadow p-4 container">

    <h3 class="fw-bold mb-3">Stok Bahan Ajar</h3>

    <!-- FILTER -->
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
          <option value="harga-desc">Harga Ter mahal</option>
          <option value="qty-desc">Stok Terbanyak</option>
          <option value="qty-asc">Stok Tersedikit</option>
        </select>
      </div>

      <div class="filter-item">
        <label class="form-label fw-semibold small">Status Stok</label>
        <select v-model="filterStatus" class="form-select filter-control">
          <option value="">Semua</option>
          <option value="aman">Aman</option>
          <option value="menipis">Menipis</option>
          <option value="kosong">Kosong</option>
        </select>
      </div>

      <div class="filter-item reset-wrap">
        <label class="form-label invisible">Reset</label>
        <button class="btn btn-secondary btn-sm w-100 filter-control" @click="resetFilter">Reset</button>
      </div>
    </div>

    <!-- ADD BOOK BTN -->
    <div class="mb-3" v-if="isAdmin">
      <button class="btn btn-primary btn-sm" @click="showAddForm = !showAddForm">
        <i class="bi bi-plus-circle"></i> Tambah Buku
      </button>
    </div>

    <!-- FORM TAMBAH -->
    <div v-if="showAddForm && isAdmin" class="card p-3 mb-3">
      <h5 class="fw-bold mb-3">Tambah Buku Baru</h5>

      <div class="row g-3">

        <div class="col-md-4">
          <input v-model="newBook.kode" placeholder="Kode Buku" class="form-control" @keyup.enter="addBook">
        </div>

        <div class="col-md-8">
          <input v-model="newBook.judul" placeholder="Judul Buku" class="form-control" @keyup.enter="addBook">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.kategori" placeholder="Kategori" class="form-control">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.upbjj" placeholder="UPBJJ" class="form-control">
        </div>

        <div class="col-md-4">
          <input v-model="newBook.lokasiRak" placeholder="Lokasi Rak" class="form-control">
        </div>

        <div class="col-md-4">
          <input v-model.number="newBook.harga" type="number" placeholder="Harga" class="form-control">
        </div>

        <div class="col-md-4">
          <input v-model.number="newBook.qty" type="number" placeholder="Qty" class="form-control">
        </div>

        <div class="col-md-4">
          <input v-model.number="newBook.safety" type="number" placeholder="Safety" class="form-control">
        </div>

        <div class="col-12">
          <textarea v-model="newBook.catatanHTML" rows="2" placeholder="Catatan (opsional)" class="form-control"></textarea>
        </div>

      </div>

      <div class="text-end mt-3">
        <button class="btn btn-secondary btn-sm me-2" @click="showAddForm = false">Batal</button>
        <button class="btn btn-success btn-sm" @click="addBook">Simpan</button>
      </div>
    </div>

    <!-- FORM EDIT -->
    <div v-if="showEditForm && editingBook && isAdmin" class="card p-3 mb-3">
      <h5 class="fw-bold mb-3">Edit Buku</h5>

      <div class="row g-3">

        <div class="col-md-4">
          <input v-model="editingBook.kode" disabled class="form-control">
        </div>

        <div class="col-md-8">
          <input v-model="editingBook.judul" class="form-control" placeholder="Judul Buku">
        </div>

        <div class="col-md-4"><input v-model="editingBook.kategori" class="form-control" placeholder="Kategori"></div>
        <div class="col-md-4"><input v-model="editingBook.upbjj" class="form-control" placeholder="UPBJJ"></div>
        <div class="col-md-4"><input v-model="editingBook.lokasiRak" class="form-control" placeholder="Lokasi Rak"></div>

        <div class="col-md-4"><input v-model.number="editingBook.harga"  type="number" class="form-control" placeholder="Harga"></div>
        <div class="col-md-4"><input v-model.number="editingBook.qty"    type="number" class="form-control" placeholder="Qty"></div>
        <div class="col-md-4"><input v-model.number="editingBook.safety" type="number" class="form-control" placeholder="Safety"></div>

        <div class="col-12">
          <textarea v-model="editingBook.catatanHTML" rows="2" placeholder="Catatan (opsional)" class="form-control"></textarea>
        </div>

      </div>

      <div class="text-end mt-3">
        <button class="btn btn-secondary btn-sm me-2" @click="cancelEdit">Batal</button>
        <button class="btn btn-success btn-sm" @click="saveEdit">Simpan Perubahan</button>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped align-middle text-center">

        <thead class="table-dark">
          <tr>
            <th>Kode</th><th>Judul</th><th>UPBJJ</th><th>Rak</th><th>Harga</th><th>Qty</th>
            <th v-if="isAdmin">Safety</th>
            <th>Status</th>
            <th v-if="isAdmin">Aksi</th>
            <th>Keranjang</th>
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

                <div v-if="isAdmin" class="btn-group mt-1">
                  <button class="btn btn-sm btn-success" @click="increaseQty(buku.kode)">+</button>
                  <button class="btn btn-sm btn-warning" @click="decreaseQty(buku.kode)">-</button>
                </div>
              </div>
            </td>

            <td v-if="isAdmin">{{ buku.safety }} buah</td>

            <td>
              <span class="badge" :class="statusClass(buku)" :title="cleanHTML(buku.catatanHTML)">
                {{ statusText(buku) }}
              </span>
            </td>

            <td v-if="isAdmin">
              <button class="btn btn-warning btn-sm me-1" @click="startEdit(buku)"><i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-danger btn-sm" @click="deleteBook(buku.kode)"><i class="bi bi-trash"></i></button>
            </td>

            <td><button class="btn btn-success btn-sm" @click="addToCart(buku.kode)"><i class="bi bi-cart-plus"></i></button></td>
          </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { dataStok } from "../data/stok.js";

const props = defineProps({ user:Object });
const isAdmin = computed(()=> props.user && props.user.role==='admin');

/* CLEAN HTML */
const cleanHTML = html => html ? String(html).replace(/<[^>]*>?/gm,""): "";

/* LOAD STORAGE */
const loadStok = ()=> JSON.parse(localStorage.getItem("stokData") || "null") || dataStok;
const stok = ref(loadStok());
const saveStok =()=> localStorage.setItem("stokData",JSON.stringify(stok.value));

/* FILTER */
const filterKategori = ref("");
const filterUpbjj   = ref("");
const filterRak     = ref("");
const filterStatus  = ref("");
const sortBy        = ref("");

watch(filterKategori, v=>console.log("Kategori:",v));
watch(filterStatus,  v=>console.log("Status:",v));

/* DROPDOWN LISTS */
const kategoriList = computed(()=> [...new Set(stok.value.map(i=>i.kategori))].filter(Boolean));
const upbjjList    = computed(()=> [...new Set(stok.value.map(i=>i.upbjj))].filter(Boolean));
const rakList      = computed(()=> [...new Set(stok.value.map(i=>i.lokasiRak))].filter(Boolean));

/* FILTER + SORT */
const filteredData = computed(()=> stok.value.filter(b=>{
  if(filterKategori.value && b.kategori!==filterKategori.value) return false;
  if(filterUpbjj.value   && b.upbjj   !==filterUpbjj.value)   return false;
  if(filterRak.value     && b.lokasiRak!==filterRak.value)   return false;

  if(filterStatus.value==="aman"    && !(b.qty>=b.safety)) return false;
  if(filterStatus.value==="menipis" && !(b.qty<b.safety && b.qty>0)) return false;
  if(filterStatus.value==="kosong"  && b.qty!==0) return false;
  return true;
}));

const sortedData = computed(()=>{
  let d=[...filteredData.value];
  if(sortBy.value==="judul-asc")  d.sort((a,b)=>a.judul.localeCompare(b.judul));
  if(sortBy.value==="judul-desc") d.sort((a,b)=>b.judul.localeCompare(a.judul));
  if(sortBy.value==="harga-asc")  d.sort((a,b)=>a.harga-b.harga);
  if(sortBy.value==="harga-desc") d.sort((a,b)=>b.harga-a.harga);
  if(sortBy.value==="qty-asc")    d.sort((a,b)=>a.qty-b.qty);
  if(sortBy.value==="qty-desc")   d.sort((a,b)=>b.qty-a.qty);
  return d;
});

/* +++++++++++++++++++++++++++++++
     FORM ADD
++++++++++++++++++++++++++++++++*/
const showAddForm = ref(false);
const newBook = ref({
  kode:"", judul:"", kategori:"", upbjj:"", lokasiRak:"",
  harga:null, qty:null, safety:null, catatanHTML:""
});

const addBook =()=>{
  if(!newBook.value.kode||!newBook.value.judul) return alert("Kode & Judul wajib!");

  if(stok.value.some(s=>s.kode===newBook.value.kode)) return alert("Kode sudah ada!");

  stok.value.push({
    ...newBook.value,
    harga:Number(newBook.value.harga||0),
    qty:Number(newBook.value.qty||0),
    safety:Number(newBook.value.safety||0),
    catatanHTML:newBook.value.catatanHTML||""
  });

  saveStok();

  newBook.value={ kode:"",judul:"",kategori:"",upbjj:"",lokasiRak:"",
    harga:null,qty:null,safety:null,catatanHTML:"" };

  showAddForm.value=false;
};

/* +++++++++++++++++++++++++++++++
     EDIT
++++++++++++++++++++++++++++++++*/
const showEditForm=ref(false);
const editingBook=ref(null);

const startEdit = b=>{
  editingBook.value={...b};
  showEditForm.value=true;
};

const cancelEdit =()=>{
  editingBook.value=null;
  showEditForm.value=false;
};

const saveEdit =()=>{
  let i=stok.value.findIndex(s=>s.kode===editingBook.value.kode);
  if(i<0) return alert("Data tidak ditemukan!");

  stok.value[i]={...editingBook.value,
    harga:Number(editingBook.value.harga||0),
    qty:Number(editingBook.value.qty||0),
    safety:Number(editingBook.value.safety||0)
  };

  saveStok();
  cancelEdit();
  alert("Data berhasil diperbaharui.");
};

/* DELETE */
const deleteBook = kode=>{
  if(confirm("Hapus buku ini?")){
    stok.value=stok.value.filter(b=>b.kode!==kode);
    saveStok();
  }
};

/* QTY */
const increaseQty = kode=>{
  let b=stok.value.find(s=>s.kode===kode);
  if(b){ b.qty++; saveStok(); }
};

const decreaseQty = kode=>{
  let b=stok.value.find(s=>s.kode===kode);
  if(b && b.qty>0){ b.qty--; saveStok();}
};

/* CART */
const addToCart = kode=>{
  let item=stok.value.find(b=>b.kode===kode);
  if(!item) return alert("Tidak ditemukan");
  if(item.qty<=0) return alert("Stok habis!");

  item.qty--; saveStok();

  let cart=JSON.parse(localStorage.getItem("cart")||"[]");
  let c=cart.find(i=>i.kode===kode);

  c?c.jumlah++:cart.push({kode:item.kode,judul:item.judul,harga:item.harga,upbjj:item.upbjj,jumlah:1});
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("Masuk keranjang!");
};

/* STATUS */
const statusText =b=> !b.qty?"Kosong":(b.qty<b.safety?"Menipis":"Aman");
const statusClass=b=> !b.qty?"bg-danger":(b.qty<b.safety?"bg-warning":"bg-success");

/* RESET FILTER */
const resetFilter =()=> filterKategori.value=filterUpbjj.value=filterRak.value=filterStatus.value=sortBy.value="";
</script>

<style scoped>
.filters-row { display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end; }
.filter-item{ flex:1 1 160px; min-width:140px; }
.reset-wrap { flex:0 0 120px; min-width:100px;}
.filter-control{ height:38px;font-size:14px;width:100%;}
.table{ font-size:14px; }
.card textarea{ resize:vertical; }
</style>
