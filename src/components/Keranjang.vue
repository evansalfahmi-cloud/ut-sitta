<template>
  <div class="container mt-4">

    <h3 class="fw-bold mb-4">Keranjang Buku</h3>

    <!-- Jika keranjang kosong -->
    <div v-if="cart.length === 0" class="alert alert-info text-center">
      Keranjang masih kosong.
    </div>

    <!-- Jika ada buku -->
    <div v-else class="card p-3 shadow">

      <table class="table table-striped align-middle">
        <thead class="table-dark">
          <tr>
            <th>Kode</th>
            <th>Judul</th>
            <th>UPBJJ</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(buku, i) in cart" :key="i">
            <td>{{ buku.kode }}</td>
            <td>{{ buku.judul }}</td>
            <td>{{ buku.upbjj }}</td>
            <td>Rp {{ buku.harga.toLocaleString() }}</td>

            <td>
              <button class="btn btn-danger btn-sm" @click="removeFromCart(i)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>

      </table>

      <!-- TOTAL HARGA -->
      <div class="text-end fw-bold fs-5 mt-3">
        Total: Rp {{ totalHarga.toLocaleString() }}
      </div>

      <!-- BUTTON CHECKOUT -->
      <div class="text-end mt-3">
        <button class="btn btn-success" @click="checkout">
          <i class="bi bi-check-circle"></i> Checkout
        </button>
      </div>

    </div>

    <!-- POPUP CHECKOUT -->
    <div v-if="checkoutSuccess" class="popup-overlay">
      <div class="popup-box text-center">
        <i class="bi bi-bag-check-fill text-success" style="font-size:60px"></i>
        <h4 class="mt-3 fw-bold">Checkout Berhasil</h4>
        <button class="btn btn-primary mt-3" @click="closePopup">Tutup</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

/* ================= LOAD DATA ================= */

const cart = ref([]);

const loadCart = () => {
  const saved = localStorage.getItem("cart");
  cart.value = saved ? JSON.parse(saved) : [];
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

/* ================= STOK HANDLING ================= */

const loadStok = () => {
  const saved = localStorage.getItem("stokData");
  return saved ? JSON.parse(saved) : [];
};

const saveStok = (stok) => {
  localStorage.setItem("stokData", JSON.stringify(stok));
};

/* ================= REMOVE ITEM ================= */

const removeFromCart = (index) => {
  const buku = cart.value[index];

  // kembalikan stok
  let stok = loadStok();
  const item = stok.find((b) => b.kode === buku.kode);
  if (item) item.qty++;

  saveStok(stok);

  // hapus dari keranjang
  cart.value.splice(index, 1);
  saveCart();
};

/* ================= TOTAL HARGA ================= */

const totalHarga = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.harga, 0);
});

/* ================= CHECKOUT ================= */

const checkoutSuccess = ref(false);

const checkout = () => {
  if (cart.value.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  checkoutSuccess.value = true;

  // kosongkan keranjang
  cart.value = [];
  saveCart();
};

const closePopup = () => {
  checkoutSuccess.value = false;
};

/* ================= INIT ================= */

onMounted(loadCart);
</script>

<style scoped>
/* Popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
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
