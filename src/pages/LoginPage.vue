<template>
  <main class="flex-grow flex flex-col md:flex-row min-h-screen">
    <section
      class="w-full md:w-1/2 lg:w-[45%] flex flex-col bg-surface-container-lowest px-8 py-12 md:px-16 lg:px-24 justify-between relative"
    >
      <div class="w-full flex justify-end mb-4 text-sm text-on-surface-variant">
        <span>Don't have an account?</span>
        <RouterLink class="ml-1 font-medium text-primary hover:underline" to="/register">
          Sign Up
        </RouterLink>
      </div>
      <div class="flex items-center mb-12">
        <div class="flex items-center gap-2">
          <span class="text-3xl font-extrabold font-headline tracking-tighter text-on-surface"
            >Angpaoku</span
          >
        </div>
      </div>

      <div class="max-w-md w-full mx-auto">
        <header class="mb-10">
          <h1 class="text-4xl font-extrabold font-headline text-on-surface tracking-tight mb-3">
            Welcome back
          </h1>
          <p class="text-on-surface-variant font-body">
            Enter your details to manage your digital concierge.
          </p>
        </header>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-on-surface-variant" for="email">
              Email Address
            </label>
            <div class="relative">
              <input
                id="email"
                type="email"
                placeholder="name@creator.com"
                autocomplete="email"
                v-model.trim="form.email"
                required
                class="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg border-none focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all placeholder:text-outline"
              />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-semibold text-on-surface-variant" for="password">
                Password
              </label>
              <a class="text-xs font-semibold text-tertiary hover:opacity-80 transition-opacity" href="#">
                Forgot Password?
              </a>
            </div>
            <div class="relative">
              <input
                id="password"
                type="password"
                placeholder="********"
                autocomplete="current-password"
                v-model="form.password"
                minlength="8"
                required
                class="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg border-none focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all placeholder:text-outline"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="remember"
              type="checkbox"
              class="w-4 h-4 rounded text-primary border-outline-variant focus:ring-primary/20 bg-surface-container-highest"
            />
            <label class="ml-2 text-sm text-on-surface-variant" for="remember">Remember Me</label>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full editorial-shadow active:scale-[0.98] transition-all hover:opacity-90"
          >
            {{ isSubmitting ? 'Logging in...' : 'Log In' }}
          </button>

          <p v-if="errorMessage" class="text-sm font-medium text-red-500">
            {{ errorMessage }}
          </p>
          <p v-if="registeredMessage" class="text-sm font-medium text-green-600">
            {{ registeredMessage }}
          </p>

        </form>

        <div class="mt-10">
          <div class="relative flex items-center py-4">
            <div class="flex-grow border-t border-outline-variant/30"></div>
            <span class="flex-shrink mx-4 text-xs font-medium text-outline uppercase tracking-widest"
              >Or continue with</span
            >
            <div class="flex-grow border-t border-outline-variant/30"></div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container-high hover:bg-surface-container transition-colors"
            >
              <img
                alt="Google"
                class="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVrflbX0qUZCq8bePrHTwD4xoa4AxAGSd7qW7B1rO0iMEEn-18M4o2hxkLV4Yusgw2FV1bq2lZL3VB-DiEm71Nc5sz0rfZEj7d7pz0gZQ17u_j0HJ-KyGUFNRsbsMz8t8m2eoW4r3v2J4xNzDhj84TdPHN3H-Joxdm5akkt6luuZ3cXaO3TJq4v33yBHFI4kRVDiwH1c6XoYBmz_8nmKEP-AoUz1Lpm4t8jNo-sqDCVGRQgpEnSz1AkcDY3NRy_Tk13U0Gi3pdPcw"
              />
              <span class="text-sm font-semibold">Google</span>
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container-high hover:bg-surface-container transition-colors"
            >
              <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">ios</span>
              <span class="text-sm font-semibold">Apple</span>
            </button>
          </div>
        </div>
      </div>

      <footer class="mt-12 flex justify-center md:justify-start gap-6 text-xs text-outline font-medium">
        <a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
        <a class="hover:text-primary transition-colors" href="#">Terms of Service</a>
        <a class="hover:text-primary transition-colors" href="#">Help Center</a>
      </footer>
    </section>

    <section
      class="hidden md:flex md:w-1/2 lg:w-[55%] bg-primary relative overflow-hidden items-center justify-center"
    >
      <div class="absolute inset-0 z-0">
        <img
          alt="Professional creative studio"
          class="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          data-alt="Modern professional music studio with warm neon lighting and high-end equipment, cinematic lighting, editorial style photo"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRP8_kARcrPVT7mHr3fOJFvO551izPh3AS0R-EVf0X0bpQPoWzybvAPclpQHUroRDcAPF4_pApWpzxZ4-DSGdpIDbjQEMvA78zUztZ87LxL09Y_QSeOuBL54frw6eDueHDCFvUimx7GBR96vWd9Dou2pMI7KLBkftev6ibbTKVjqHnclYIRl3ExnzmUhh57b-fbli3-k8yV0g23qGlCW8wC-621VSgjLpOGRZPytSVNr3BQ-02iIPAE5b2ccgHEyDZRnuwnCWvRPU"
        />
        <div class="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-secondary/40"></div>
      </div>

      <div class="relative z-10 px-12 lg:px-20 text-on-primary max-w-2xl">
        <div class="mb-8">
          <span
            class="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold tracking-wide mb-6"
          >
            The Premium Choice for Creators
          </span>
          <h2 class="text-5xl lg:text-6xl font-extrabold font-headline leading-[1.1] tracking-tighter mb-6">
            Elevate your content, automate your gifts.
          </h2>
          <p class="text-xl text-primary-fixed leading-relaxed opacity-90">
            Join 50,000+ top creators who use Angpaoku to manage their digital presence and fan
            appreciation.
          </p>
        </div>

        <div class="mt-12 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 editorial-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-fixed">
              <img
                alt="Creator Profile"
                data-alt="Close up portrait of a young smiling creative woman with soft studio lighting and clean background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRyVZBllI4t9TdHK7jSDTBiiG6CSzDtD0lFSNd8ZLWuxfaIhfT5laZichZpGkQvgQRHim129WVZR2-Z5-_vD9hywf3kLH9empFPAPmptVyzjaY5AptrUsoQ6YY0fODyQbtoqfOPKAoeivUTkSSQNaEmmp4dvsFps3nqgXyMLbrcR99ZQUS5UtJ9FOLqh4JD5XudD73rmTOZim7b-1CU1MLCA_cugHdsJM-iwp6D59pemCBcFVS5jjq3u2kqKAo1W1A3sG9cDzt39A"
              />
            </div>
            <div>
              <p class="font-bold text-lg">Alex Rivera</p>
              <p class="text-sm text-primary-fixed opacity-70">Lifestyle Influencer</p>
            </div>
            <div class="ml-auto text-tertiary-fixed flex items-center gap-1">
              <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="font-bold">Pro</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div class="h-full w-3/4 bg-tertiary-fixed rounded-full"></div>
            </div>
            <div class="flex justify-between text-sm font-medium">
              <span>Monthly Goal</span>
              <span class="text-tertiary-fixed">$12,450 / $15,000</span>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-tertiary-fixed/10 rounded-full blur-3xl"></div>
      <div class="absolute top-[-5%] left-[-5%] w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const isSubmitting = ref(false)
const errorMessage = ref('')

const registeredMessage = computed(() =>
  route.query.registered === '1' ? 'Register success. Please login with your account.' : '',
)

async function handleLogin() {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await authStore.login({
      email: form.email,
      password: form.password,
    })

    const redirectTarget = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    await router.push(redirectTarget)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to login'
  } finally {
    isSubmitting.value = false
  }
}
</script>
