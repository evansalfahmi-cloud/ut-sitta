<template>
  <div class="card p-4 shadow" style="width: 350px;">
    <h3 class="text-center mb-4">Login SITTA UT</h3>
    
    <form @submit.prevent="login">
      <!-- Username -->
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input 
          type="text" 
          v-model="username" 
          class="form-control" 
          id="username" 
          placeholder="Masukkan username"
          required
        >
      </div>

      <!-- Password -->
      <div class="mb-3 position-relative">
        <label for="password" class="form-label">Password</label>
        <input 
          :type="showPassword ? 'text' : 'password'" 
          v-model="password" 
          class="form-control" 
          id="password" 
          placeholder="Masukkan password"
          required
        >
        <!-- Icon mata untuk toggle password -->
        <i 
          class="bi" 
          :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'" 
          @click="togglePassword" 
          style="position:absolute; right:10px; top:38px; cursor:pointer;"
        ></i>
      </div>

      <!-- Login Button -->
      <button 
        type="submit" 
        class="btn btn-primary w-100" 
        :disabled="!username || !password || loading"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        Login
      </button>
    </form>

    <!-- Error Message -->
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loading: false,
      error: ''
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    login() {
      this.error = '';
      this.loading = true;

      // Simulasi delay login (misal call API backend)
      setTimeout(() => {
        this.loading = false;
        if (this.username === 'admin' && this.password === '1234') {
          alert('Login berhasil!');
          this.error = '';
          // nanti bisa redirect ke dashboard
        } else {
          this.error = 'Username atau password salah!';
        }
      }, 1500);
    }
  }
}
</script>
