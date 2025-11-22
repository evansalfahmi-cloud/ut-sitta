<template>
  <div class="container mt-4">

    <h3 class="fw-bold mb-4">Keranjang Buku</h3>

    <!-- Jika keranjang kosong -->
    <div v-if="cart.length === 0" class="alert alert-info text-center">
      Keranjang masih kosong.
    </div>

    <!-- Jika keranjang ada isi -->
    <div v-else class="card p-3 shadow">

      <table class="table table-striped align-middle">
        <thead class="table-dark">
          <tr>
            <th>Kode</th>
            <th>Judul</th>
            <th>UPBJJ</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Total</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(buku, i) in cart" :key="i">
            <td>{{ buku.kode }}</td>
            <td class="text-start">{{ buku.judul }}</td>
            <td>{{ buku.upbjj }}</td>
            <td>Rp {{ buku.harga.toLocaleString() }}</td>
            <td>{{ buku.jumlah }}</td>
            <td>Rp {{ (buku.harga * buku.jumlah).toLocaleString() }}</td>

            <td>
              <button class="btn btn-danger btn-sm" @click="removeFromCart(i)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>

      </table>

      <!-- TOTAL HARGA BUKU -->
      <div class="text-end fw-bold fs-5 mt-3">
        Total Harga Buku:  
        <span class="text-primary">Rp {{ totalHarga.toLocaleString() }}</span>
      </div>

      <!-- PILIH KURIR -->
      <div class="mt-3">
        <label class="fw-semibold">Pilih Kurir:</label>
        <select v-model="kurir" class="form-select mt-1">
          <option value="">-- Pilih Kurir --</option>
          <option value="REG">REG - Regular (3–5 hari) - Rp 20.000</option>
          <option value="EXP">EXP - Express (2–3 hari) - Rp 35.000</option>
        </select>
      </div>

      <!-- ONGKIR & TOTAL AKHIR -->
      <div v-if="kurir" class="mt-3 p-3 bg-light border rounded">

        <div class="d-flex justify-content-between fw-semibold">
          <span>Ongkos Kirim ({{ kurir }}):</span>
          <span>Rp {{ ongkir.toLocaleString() }}</span>
        </div>

        <div class="d-flex justify-content-between fs-5 mt-2 fw-bold">
          <span>Total Pembayaran:</span>
          <span class="text-success">Rp {{ totalAkhir.toLocaleString() }}</span>
        </div>
      </div>

      <!-- BUTTON CHECKOUT -->
      <div class="text-end mt-3">
        <button 
          class="btn btn-success"
          :disabled="kurir === ''"
          @click="checkout"
        >
          <i class="bi bi-check-circle"></i> Checkout
        </button>
      </div>

    </div>

    <!-- POPUP CHECKOUT -->
    <div v-if="checkoutSuccess" class="popup-overlay">
      <div class="popup-box text-center">
        <i class="bi bi-bag-check-fill text-success" style="font-size:60px"></i>

        <h4 class="mt-3 fw-bold">Checkout Berhasil</h4>

        <p class="mt-2">
          Total Pembayaran:<br>
          <span class="fw-bold text-primary">Rp {{ totalAkhir.toLocaleString() }}</span>
        </p>

        <p class="text-muted small">
          Kurir: {{ kurir }} — 
          <span v-if="kurir === 'REG'">Estimasi 3–5 hari</span>
          <span v-if="kurir === 'EXP'">Estimasi 2–3 hari</span>
        </p>

        <button class="btn btn-primary mt-2" @click="closePopup">Tutup</button>
      </div>
    </div>

  </div>
</template>

  <script setup>
import { ref, computed, onMounted } from "vue";

/* =======================================================
   LOAD CART
======================================================= */
const cart = ref([]);

const loadCart = () => {
  cart.value = JSON.parse(localStorage.getItem("cart") || "[]");
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

/* =======================================================
   LOAD & SAVE STOK
======================================================= */
const loadStok = () => JSON.parse(localStorage.getItem("stokData") || "[]");

const saveStok = (data) =>
  localStorage.setItem("stokData", JSON.stringify(data));

/* =======================================================
   REMOVE ITEM
======================================================= */
const removeFromCart = (index) => {
  const buku = cart.value[index];

  let stok = loadStok();
  let item = stok.find((s) => s.kode === buku.kode);

  if (item) {
    item.qty += buku.jumlah;
    saveStok(stok);
  }

  cart.value.splice(index, 1);
  saveCart();
};

/* =======================================================
   TOTAL HARGA BUKU
======================================================= */
const totalHarga = computed(() =>
  cart.value.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0
  )
);

/* =======================================================
   KURIR & ONGKIR
======================================================= */
const kurir = ref("");

const ongkir = computed(() => {
  if (kurir.value === "REG") return 20000;
  if (kurir.value === "EXP") return 35000;
  return 0;
});

const totalAkhir = computed(() => totalHarga.value + ongkir.value);

/* =======================================================
   TRACKING GENERATOR
======================================================= */
const generateDOCode = () => {
  let all = JSON.parse(localStorage.getItem("tracking") || "[]");
  let next = String(all.length + 1).padStart(4, "0");
  return `DO2025-${next}`;
};

/* =======================================================
   CHECKOUT
======================================================= */
const checkoutSuccess = ref(false);

const checkout = () => {
  if (kurir.value === "")
    return alert("Silakan pilih kurir terlebih dahulu.");

  if (cart.value.length === 0)
    return alert("Keranjang masih kosong.");

  // Ambil user login
  const user = JSON.parse(localStorage.getItem("userLogin") || "{}");

  // Buat kode DO
  const kodeDO = generateDOCode();

  // Tanggal kirim realtime
  const now = new Date();
  const tgl =
    now.toLocaleDateString("id-ID") +
    " " +
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  // Simpan ke localStorage tracking
  let trackingList = JSON.parse(localStorage.getItem("tracking") || "[]");

  trackingList.push({
    do: kodeDO,
    tanggal: tgl,
    kurir: kurir.value,
    ongkir: ongkir.value,
    totalBayar: totalAkhir.value,
    status: "Dalam Proses Pengiriman",
    user: {
      nama: user.nama,
      nim: user.nim,
      prodi: user.prodi,
      upbjj: user.upbjj
    },
    buku: cart.value
  });

  localStorage.setItem("tracking", JSON.stringify(trackingList));

  // Kosongkan keranjang
  cart.value = [];
  saveCart();

  checkoutSuccess.value = true;
};

const closePopup = () => (checkoutSuccess.value = false);

onMounted(loadCart);
</script>


<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-box {
  background: white;
  padding: 30px;
  border-radius: 18px;
  width: 260px;
}
</style>
