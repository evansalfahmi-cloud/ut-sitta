<template>
  <div class="container mt-4">

    <h3 class="fw-bold mb-3">Buat Delivery Order Baru</h3>

    <!-- PILIH MAHASISWA -->
    <div class="card p-3 mb-3">
      <h5 class="fw-bold">Data Mahasiswa</h5>

      <select v-model="selectedUser" class="form-select">
        <option value="">-- Pilih Mahasiswa --</option>

        <option 
          v-for="m in dataMahasiswa" 
          :key="m.nim"
          :value="m"
        >
          {{ m.nama }} - {{ m.nim }} - {{ m.prodi }}
        </option>

      </select>
    </div>

    <!-- PILIH BUKU -->
    <div class="card p-3 mb-3">
      <h5 class="fw-bold">Pilih Buku</h5>

      <table class="table table-bordered text-center">
        <thead class="table-dark">
          <tr>
            <th></th>
            <th>Kode</th>
            <th>Judul</th>
            <th>Harga</th>
            <th>Qty</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="b in stok" :key="b.kode">
            <td>
              <input type="checkbox" v-model="selectedBooks" :value="b" />
            </td>

            <td>{{ b.kode }}</td>
            <td class="text-start">{{ b.judul }}</td>
            <td>Rp {{ b.harga.toLocaleString() }}</td>

            <td>
              <input 
                type="number" 
                min="1"
                class="form-control form-control-sm"
                v-model.number="qty[b.kode]"
                :disabled="!selectedBooks.includes(b)"
              >
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <!-- KURIR -->
    <div class="card p-3 mb-3">
      <h5 class="fw-bold">Pilih Kurir</h5>

      <select v-model="kurir" class="form-select">
        <option value="">-- Pilih Kurir --</option>
        <option value="REG">REG (Rp 20.000 / 3–5 hari)</option>
        <option value="EXP">EXP (Rp 35.000 / 2–3 hari)</option>
      </select>
    </div>

    <!-- RINGKASAN -->
    <div class="card p-3 mb-3">
      <h5 class="fw-bold">Ringkasan</h5>

      <p>Total Buku: <strong>Rp {{ totalBuku.toLocaleString() }}</strong></p>
      <p>Ongkir: <strong>Rp {{ ongkir.toLocaleString() }}</strong></p>

      <p class="fs-5">
        Total Pembayaran:
        <strong class="text-primary">Rp {{ totalBayar.toLocaleString() }}</strong>
      </p>
    </div>

    <!-- BUTTON -->
    <button class="btn btn-primary w-100" @click="buatDO">
      Buat Delivery Order
    </button>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { dataMahasiswa } from "../data/datauser.js";   // ✔ benar
import { dataStok } from "../data/stok.js";             // ✔ benar

/* STATE */
const selectedUser = ref("");
const selectedBooks = ref([]);
const qty = ref({});
const kurir = ref("");

/* DATA */
const stok = ref(dataStok);

/* HITUNG TOTAL */
const totalBuku = computed(() => {
  return selectedBooks.value.reduce((sum, b) => {
    const jumlah = qty.value[b.kode] || 1;
    return sum + b.harga * jumlah;
  }, 0);
});

const ongkir = computed(() => {
  if (kurir.value === "REG") return 20000;
  if (kurir.value === "EXP") return 35000;
  return 0;
});

const totalBayar = computed(() => totalBuku.value + ongkir.value);

/* KODE DO OTOMATIS */
const generateDO = () => {
  let track = JSON.parse(localStorage.getItem("tracking") || "[]");
  const next = (track.length + 1).toString().padStart(4, "0");
  return `DO2025-${next}`;
};

/* SIMPAN KE TRACKING */
const buatDO = () => {
  if (!selectedUser.value) return alert("Pilih mahasiswa!");
  if (selectedBooks.value.length === 0) return alert("Pilih buku!");
  if (!kurir.value) return alert("Pilih kurir!");

  const bukuFinal = selectedBooks.value.map(b => ({
    kode: b.kode,
    judul: b.judul,
    harga: b.harga,
    upbjj: b.upbjj,
    jumlah: qty.value[b.kode] || 1
  }));

  let tracking = JSON.parse(localStorage.getItem("tracking") || "[]");

  tracking.push({
    do: generateDO(),
    tanggal: new Date().toLocaleString(),
    status: "Dalam Proses",
    kurir: kurir.value,
    ongkir: ongkir.value,
    totalBayar: totalBayar.value,
    user: selectedUser.value,
    buku: bukuFinal
  });

  localStorage.setItem("tracking", JSON.stringify(tracking));

  alert("Delivery Order berhasil dibuat!");

  // redirect ke halaman tracking
  window.location.hash = "#/tracking";
};
</script>
