// === Bootstrap (CSS → JS → Icons) ===
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// === Style global kamu ===
import './style.css';

// === Vue App ===
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
