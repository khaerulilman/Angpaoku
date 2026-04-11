<template>
  <div class="min-h-[max(884px,100dvh)] bg-surface text-on-surface antialiased">
    <header class="fixed left-0 right-0 top-0 z-50 mx-auto w-full max-w-md bg-[#fcf8fb]/60 backdrop-blur-xl">
      <div class="flex h-16 items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <button
            class="material-symbols-outlined rounded-full p-2 text-primary transition-colors duration-200 hover:bg-black/5 active:scale-95"
            type="button"
            @click="handleBack"
          >
            arrow_back
          </button>
          <h1 class="text-lg font-bold tracking-tight text-on-surface">Angpao Gift</h1>
        </div>
        <button
          class="material-symbols-outlined rounded-full p-2 text-primary transition-colors duration-200 hover:bg-black/5 active:scale-95"
          type="button"
          @click="handleShare"
        >
          share
        </button>
      </div>
    </header>

    <main class="mx-auto max-w-md space-y-8 px-6 pb-32 pt-20">
      <section class="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-6 shadow-[0px_20px_40px_rgba(187,21,44,0.04)]">
        <div class="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5"></div>
        <div class="relative z-10 flex flex-col items-center space-y-4 text-center">
          <div class="relative">
            <img
              :alt="`${creator.name} Profile`"
              :src="creator.avatar"
              class="h-24 w-24 rounded-full object-cover ring-4 ring-primary/10"
            />
            <div class="absolute -bottom-1 -right-1 rounded-full bg-tertiary-fixed p-1.5 text-on-tertiary-fixed shadow-sm">
              <span class="material-symbols-outlined block text-sm" style="font-variation-settings: 'FILL' 1">
                verified
              </span>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-extrabold tracking-tight text-on-surface">{{ creator.name }}</h2>
            <p class="mt-2 text-sm leading-relaxed text-on-surface-variant">
              {{ creator.bio }}
            </p>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-on-surface">Choose Amount</h3>
          <span class="rounded-md bg-tertiary-fixed px-2 py-1 text-xs font-semibold text-tertiary">IDR</span>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="amount in presetAmounts"
            :key="amount"
            :class="[
              'flex flex-col items-center justify-center rounded-2xl py-4 transition-all',
              isPresetSelected(amount)
                ? 'bg-primary-container text-on-primary-container shadow-lg shadow-primary/20 active:scale-95'
                : 'bg-surface-container-lowest shadow-sm hover:bg-primary/5 active:bg-primary/10',
            ]"
            type="button"
            @click="selectPresetAmount(amount)"
          >
            <span :class="isPresetSelected(amount) ? 'text-xs font-medium opacity-80' : 'text-xs font-medium text-on-surface-variant'">Rp</span>
            <span :class="isPresetSelected(amount) ? 'text-lg font-bold' : 'text-lg font-bold text-on-surface'">
              {{ formatCompactAmount(amount) }}
            </span>
          </button>
        </div>

        <div class="group relative">
          <div class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <span class="text-sm font-semibold text-on-surface-variant">Rp</span>
          </div>
          <input
            v-model.number="customAmount"
            class="w-full rounded-2xl border-none bg-surface-container-highest py-4 pl-12 pr-4 font-semibold text-on-surface transition-all placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
            min="0"
            placeholder="Enter custom amount"
            type="number"
          />
        </div>
      </section>

      <section class="space-y-6">
        <h3 class="text-lg font-bold text-on-surface">Supporter Details</h3>
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label class="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Display Name</label>
            <input
              v-model.trim="supporterName"
              class="w-full rounded-2xl border-none bg-surface-container-highest px-4 py-4 transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
              placeholder="How should we call you?"
              type="text"
            />
          </div>

          <div class="space-y-1.5">
            <label class="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
            <input
              v-model.trim="supporterEmail"
              class="w-full rounded-2xl border-none bg-surface-container-highest px-4 py-4 transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
              placeholder="your@email.com"
              type="email"
            />
          </div>

          <div class="space-y-1.5">
            <label class="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Your Message (Optional)</label>
            <textarea
              v-model.trim="supporterMessage"
              class="w-full resize-none rounded-2xl border-none bg-surface-container-highest px-4 py-4 transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
              placeholder="Write a sweet supporting note..."
              rows="3"
            ></textarea>
          </div>
        </div>
      </section>

      <section class="space-y-4 pt-4">
        <div class="flex items-center justify-center gap-2 text-on-surface-variant/60">
          <span class="material-symbols-outlined text-sm">lock</span>
          <span class="text-xs font-medium">Secure SSL Encrypted Transaction</span>
        </div>

        <button
          :disabled="!canSubmit"
          class="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-primary to-primary-container py-5 text-lg font-extrabold text-on-primary shadow-[0px_20px_40px_rgba(187,21,44,0.15)] transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          @click="submitDonation"
        >
          Send Donation {{ formattedAmount }}
          <span class="material-symbols-outlined">favorite</span>
        </button>

        <p class="px-8 text-center text-[10px] text-on-surface-variant/40">
          By clicking Send Donation, you agree to our Terms of Service and Privacy Policy. All transactions are non-refundable.
        </p>
      </section>
    </main>

    <div
      class="pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
      style="background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png')"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const creator = {
  username: 'khaerulilman',
  name: 'Khaerul Ilman',
  bio: 'Thank you for supporting my creative journey. Every donation helps me keep making educational content and useful tools.',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBfEQsbkynq_CwV8-iUNHToYlegX0vyewuOy-tux3-IBBu1YTAMYODycfyLnPkADsb_xqAXWkrQNZkG85g6FDM8qAS6G4sH0UiJazl5-qf0csfm4hOUVbU_Gv-gPgjMjy3diKidTb1QpNv5qAl8wnX12mXJrpLgVpOLgO6DUNMWzlk0b8jZuPdwyOI_FF_0CSob3fkSEINpRIKoqWdSSKGzfYfr6fyF8SjeZZcEHO_Vy0Jted829QX3qEEsjQHQVlsxks47p5oxfLE',
}

const presetAmounts = [10000, 50000, 100000]
const selectedAmount = ref(50000)
const customAmount = ref<number | null>(null)
const supporterName = ref('')
const supporterEmail = ref('')
const supporterMessage = ref('')

const activeAmount = computed(() => {
  if (customAmount.value && customAmount.value > 0) {
    return customAmount.value
  }

  return selectedAmount.value
})

const formattedAmount = computed(() => formatIDR(activeAmount.value))

const canSubmit = computed(() => {
  return supporterName.value !== '' && supporterEmail.value !== '' && activeAmount.value > 0
})

function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatCompactAmount(value: number): string {
  if (value >= 1000) {
    return `${Math.floor(value / 1000)}k`
  }

  return String(value)
}

function isPresetSelected(amount: number): boolean {
  return (!customAmount.value || customAmount.value <= 0) && selectedAmount.value === amount
}

function selectPresetAmount(amount: number): void {
  selectedAmount.value = amount
  customAmount.value = null
}

function handleBack(): void {
  if (window.history.length > 1) {
    router.back()
    return
  }

  void router.push('/')
}

async function handleShare(): Promise<void> {
  const shareData = {
    title: `Donation for ${creator.name}`,
    text: `Support ${creator.name} on Angpaoku`,
    url: window.location.href,
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
      return
    } catch {
      // If user cancels native share, keep silent and fallback below.
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(window.location.href)
    window.alert('Donation link copied to clipboard.')
  }
}

function submitDonation(): void {
  if (!canSubmit.value) {
    return
  }

  const payload = {
    creator: creator.username,
    amount: activeAmount.value,
    name: supporterName.value,
    email: supporterEmail.value,
    message: supporterMessage.value,
  }

  console.info('Donation payload', payload)
  window.alert(`Thank you, ${supporterName.value}! Donation ${formattedAmount.value} is ready to process.`)
}
</script>
