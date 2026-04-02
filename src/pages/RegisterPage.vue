<template>
  <main class="flex-grow flex flex-col md:flex-row min-h-screen">
    <section
      class="w-full md:w-1/2 lg:w-[45%] flex flex-col bg-surface-container-lowest px-8 py-12 md:px-16 lg:px-24 relative"
    >
      <div class="w-full flex justify-end mb-4 text-sm text-on-surface-variant">
        <span>Already have an account?</span>
        <RouterLink class="ml-1 font-medium text-primary hover:underline" to="/login">
          Log In
        </RouterLink>
      </div>
      <div class="flex items-center mb-12">
        <span class="text-3xl font-extrabold font-headline tracking-tighter text-on-surface">Angpaoku</span>
      </div>
      <div class="max-w-md w-full mx-auto">
        <header class="mb-10">
          <h1 class="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-3">
            Begin your journey.
          </h1>
          <p class="text-on-surface-variant leading-relaxed">
            Join the elite circle of creators using our digital concierge to manage gifts and connections.
          </p>
        </header>
        <form class="space-y-5" @submit.prevent="handleRegister">
          <div class="space-y-1.5">
            <label class="font-label text-sm font-semibold text-on-surface-variant" for="name">Full Name</label>
            <div class="relative group">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autocomplete="name"
                v-model.trim="form.name"
                required
                class="w-full px-4 py-3 bg-surface-container-highest border-none rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all duration-200 outline-none"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="font-label text-sm font-semibold text-on-surface-variant" for="email">
              Email Address
            </label>
            <div class="relative group">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@creator.com"
                autocomplete="email"
                v-model.trim="form.email"
                required
                class="w-full px-4 py-3 bg-surface-container-highest border-none rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all duration-200 outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="font-label text-sm font-semibold text-on-surface-variant" for="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                autocomplete="new-password"
                v-model="form.password"
                minlength="8"
                required
                class="w-full px-4 py-3 bg-surface-container-highest border-none rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all duration-200 outline-none"
              />
            </div>
            <div class="space-y-1.5">
              <label class="font-label text-sm font-semibold text-on-surface-variant" for="confirm-password">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="********"
                autocomplete="new-password"
                v-model="form.confirmPassword"
                minlength="8"
                required
                class="w-full px-4 py-3 bg-surface-container-highest border-none rounded-lg text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all duration-200 outline-none"
              />
            </div>
          </div>

          <div class="flex items-start gap-3 pt-2">
            <input
              id="terms"
              type="checkbox"
              v-model="form.termsAccepted"
              class="mt-1 rounded text-primary focus:ring-primary border-outline-variant/30"
            />
            <label class="text-xs text-on-surface-variant leading-tight" for="terms">
              I agree to the <span class="text-primary font-semibold">Terms of Service</span> and
              <span class="text-primary font-semibold">Privacy Policy</span> regarding my creator data.
            </label>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-4 bg-[#E63946] text-white font-headline font-bold rounded-full editorial-shadow active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group hover:bg-[#c32d3f]"
            >
              <span>{{ isSubmitting ? 'Creating Account...' : 'Create Account' }}</span>
              <span class="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform"
                >arrow_forward</span
              >
            </button>
          </div>

          <p v-if="errorMessage" class="text-sm font-medium text-red-500">
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </section>

    <section
      class="hidden md:flex md:w-1/2 lg:w-[55%] relative overflow-hidden bg-primary items-center justify-center"
    >
      <div class="absolute inset-0 z-0">
        <img
          alt="Professional creative studio"
          class="w-full h-full object-cover opacity-40 mix-blend-luminosity"
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
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-lg">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">
                verified
              </span>
            </div>
            <div>
              <h3 class="font-headline font-bold text-white text-lg">Curated for Excellence</h3>
              <p class="text-[10px] text-white/80 tracking-widest uppercase font-bold">
                The Digital Concierge Standard
              </p>
            </div>
          </div>
          <p class="text-white leading-relaxed font-light italic">
            "Angpaoku transformed the way I interact with my community. It's not just a platform; it's
            a lifestyle brand for modern creators."
          </p>
          <div class="mt-6 flex gap-2">
            <div class="h-1 w-12 bg-white rounded-full"></div>
            <div class="h-1 w-4 bg-white/30 rounded-full"></div>
            <div class="h-1 w-4 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-tertiary-fixed/10 rounded-full blur-3xl"></div>
      <div class="absolute top-[-5%] left-[-5%] w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
})

const isSubmitting = ref(false)
const errorMessage = ref('')

async function handleRegister() {
  errorMessage.value = ''

  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Confirm password must match password'
    return
  }

  if (!form.termsAccepted) {
    errorMessage.value = 'You must accept Terms of Service and Privacy Policy'
    return
  }

  isSubmitting.value = true
  try {
    await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
    })

    await router.push({ name: 'login', query: { registered: '1' } })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to register'
  } finally {
    isSubmitting.value = false
  }
}
</script>
