// === Bootstrap (CSS → JS → Icons) ===
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// === Style global kamu ===
import "./style.css";

// === Vue App ===
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// ===============================
//     GLOBAL FILTER (UT WAJIB)
// ===============================

// 1. Daftar filter
app.config.globalProperties.$filters = {
  // Format angka → Rupiah
  currency(value) {
    if (value === null || value === undefined || value === "") return "Rp 0";
    return "Rp " + Number(value).toLocaleString("id-ID");
  },

  // Ubah teks → Uppercase
  upper(value) {
    if (!value) return "";
    return String(value).toUpperCase();
  },

  // Format teks Capitalize (opsional)
  capitalize(value) {
    if (!value) return "";
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  }
};

// 2. Cara memanggil filter dari template
//    {{ $applyFilter(buku.harga, 'currency') }}
app.config.globalProperties.$applyFilter = (value, filterName) => {
  const fn = app.config.globalProperties.$filters[filterName];
  return fn ? fn(value) : value;
};

// === Mount App ===
app.mount("#app");
