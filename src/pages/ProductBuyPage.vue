<template>
  <div class="bg-surface text-on-surface">
    <main class="mx-auto min-h-screen w-full max-w-md bg-surface pb-36">
      <header
        class="relative aspect-[4/5] w-full overflow-hidden bg-surface-container"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div
          class="flex h-full transition-transform duration-300 ease-in-out will-change-transform"
          :style="{ transform: `translateX(-${currentSlideIndex * 100}%)` }"
        >
          <div
            v-for="(slide, i) in slides"
            :key="i"
            class="relative h-full w-full shrink-0"
          >
            <img
              :alt="product?.name ?? 'Product image'"
              :src="slide"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <div
          v-if="slides.length === 0"
          class="absolute inset-0 flex items-center justify-center text-sm font-semibold text-on-surface-variant"
        >
          No image
        </div>

        <RouterLink
          class="glass-effect absolute left-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/25 text-white"
          :to="storePreviewPath"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </RouterLink>

        <template v-if="slides.length > 1">
          <button
            class="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 active:scale-95"
            type="button"
            @click="prevSlide"
          >
            <span class="material-symbols-outlined text-[20px]"
              >chevron_left</span
            >
          </button>
          <button
            class="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 active:scale-95"
            type="button"
            @click="nextSlide"
          >
            <span class="material-symbols-outlined text-[20px]"
              >chevron_right</span
            >
          </button>

          <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            <button
              v-for="(_, i) in slides"
              :key="i"
              type="button"
              class="h-1.5 rounded-full transition-all duration-200"
              :class="
                i === currentSlideIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
              "
              @click="currentSlideIndex = i"
            />
          </div>
        </template>
      </header>

      <div class="space-y-10 px-6 py-8">
        <section v-if="isLoading" class="space-y-4">
          <div
            class="h-4 w-24 animate-pulse rounded bg-surface-container"
          ></div>
          <div
            class="h-8 w-3/4 animate-pulse rounded bg-surface-container"
          ></div>
          <div
            class="h-4 w-1/2 animate-pulse rounded bg-surface-container"
          ></div>
        </section>

        <section
          v-else-if="errorMessage"
          class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {{ errorMessage }}
        </section>

        <template v-else-if="product">
          <section>
            <p
              class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-tertiary"
            >
              {{
                product.pricing_type === "free"
                  ? "Free Product"
                  : "Premium Product"
              }}
            </p>
            <h1 class="text-3xl font-extrabold leading-tight tracking-tight">
              {{ product.name }}
            </h1>
            <div
              class="mt-3 flex items-center gap-2 text-sm text-on-surface/75"
            >
              <span
                class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"
              >
                <span class="material-symbols-outlined filled text-[13px]"
                  >verified</span
                >
              </span>
              <p class="font-medium">By {{ creatorLabel }}</p>
            </div>
          </section>

          <section>
            <p class="leading-relaxed text-on-surface-variant">
              {{ product.description || "No description available." }}
            </p>
          </section>

          <section
            v-if="checkoutNotice"
            :class="[
              'rounded-2xl border p-4 text-sm font-medium',
              checkoutNoticeClass,
            ]"
          >
            <p>{{ checkoutNotice }}</p>
            <p v-if="currentOrderID" class="mt-2 text-xs opacity-80">
              Order ID: {{ currentOrderID }}
            </p>
          </section>
        </template>

        <footer class="space-y-4 py-8 text-center">
          <div
            class="flex justify-center gap-5 text-xs font-semibold text-tertiary"
          >
            <a class="transition-colors hover:text-primary" href="#"
              >Privacy Policy</a
            >
            <a class="transition-colors hover:text-primary" href="#"
              >Terms of Service</a
            >
            <a class="transition-colors hover:text-primary" href="#"
              >Help Center</a
            >
          </div>
          <p class="text-xs text-on-surface-variant/70">
            &copy; 2026 Marketplace. All rights reserved.
          </p>
        </footer>
      </div>
    </main>

    <div class="fixed inset-x-0 bottom-0 z-50">
      <div
        class="mx-auto w-full max-w-md rounded-t-3xl bg-white/70 px-6 pb-8 pt-4 shadow-angpao glass-effect"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <div v-if="showDiscount" class="mb-1 flex items-center gap-2">
              <span
                class="rounded bg-secondary-container px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-tight text-on-secondary-container"
              >
                {{ product?.discount_percentage }}% OFF
              </span>
              <span class="text-xs text-on-surface-variant line-through">
                {{ displayOriginalPrice }}
              </span>
            </div>
            <p class="text-xl font-extrabold text-primary">
              {{ displayFinalPrice }}
            </p>
          </div>

          <button
            :disabled="!canBuy || isCreatingTransaction"
            class="btn-gradient rounded-full px-8 py-4 text-sm font-bold text-on-primary shadow-angpao-lg transition hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            @click="buyNow"
          >
            {{ buyButtonLabel }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showCheckoutModal"
      class="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 px-4 pb-8 md:items-center"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 class="text-xl font-bold text-on-surface">Guest Checkout</h2>
        <p class="mt-2 text-sm text-on-surface-variant">
          Masukkan email untuk melanjutkan pembayaran Midtrans.
        </p>

        <div class="mt-5 space-y-2">
          <label
            class="block text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant"
            for="guest-email"
          >
            Email
          </label>
          <input
            id="guest-email"
            v-model="buyerEmail"
            autocomplete="email"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-primary transition focus:border-primary focus:ring-1"
            placeholder="you@gmail.com"
            type="email"
          />
          <p v-if="checkoutError" class="text-sm font-medium text-red-600">
            {{ checkoutError }}
          </p>
          <!-- points display -->
          <div v-if="pointsStatus !== 'idle'" class="flex items-center gap-1.5">
            <span
              v-if="pointsStatus === 'loading'"
              class="text-xs text-on-surface-variant"
              >Mengecek points...</span
            >
            <span
              v-else-if="pointsStatus === 'error'"
              class="text-xs font-medium text-red-500"
              >{{ pointsError }}</span
            >
            <template v-else-if="pointsStatus === 'loaded'">
              <span
                class="material-symbols-outlined filled text-[14px] text-primary"
                >stars</span
              >
              <span class="text-xs font-semibold text-primary"
                >You have {{ donorPoints ?? 0 }} points</span
              >
            </template>
          </div>
        </div>

        <div class="mt-6 space-y-3">
          <label
            class="block text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant"
            >Payment Method</label
          >
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                v-model="paymentMethod"
                type="radio"
                value="pay"
                class="cursor-pointer"
              />
              <span class="text-sm font-medium text-on-surface">Pay Only</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                v-model="paymentMethod"
                type="radio"
                value="pay-with-points"
                class="cursor-pointer"
              />
              <span class="text-sm font-medium text-on-surface"
                >Pay + Points</span
              >
            </label>
          </div>
        </div>

        <!-- Google email match status -->
        <div
          v-if="paymentMethod === 'pay-with-points' && isGoogleLoggedIn"
          class="mt-4 space-y-2"
        >
          <div v-if="loadingMatchCheck" class="flex items-center gap-1.5">
            <span class="text-xs text-on-surface-variant"
              >Memverifikasi email...</span
            >
          </div>
          <div
            v-else-if="isEmailMatch === true"
            class="flex items-center gap-1.5"
          >
            <span
              class="material-symbols-outlined filled text-[14px] text-emerald-600"
              >check_circle</span
            >
            <span class="text-xs font-semibold text-emerald-600"
              >Email terverifikasi via Google</span
            >
          </div>
          <div v-else-if="isEmailMatch === false" class="space-y-2">
            <div class="flex items-center gap-1.5">
              <span
                class="material-symbols-outlined filled text-[14px] text-red-500"
                >error</span
              >
              <span class="text-xs font-medium text-red-500"
                >Email tidak sesuai dengan akun Google</span
              >
            </div>
            <button
              type="button"
              class="text-xs font-semibold text-primary underline"
              @click="disconnectGoogle"
            >
              Disconnect Google Account
            </button>
          </div>
        </div>

        <div class="mt-6 flex gap-3">
          <button
            class="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-on-surface transition hover:bg-slate-100"
            type="button"
            @click="closeCheckoutModal"
          >
            Batal
          </button>
          <button
            v-if="paymentMethod === 'pay-with-points' && !isGoogleLoggedIn"
            :disabled="isCreatingTransaction"
            class="btn-gradient flex-1 rounded-xl px-4 py-3 text-sm font-bold text-on-primary transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            type="button"
            @click="signInWithGoogle"
          >
            <span class="inline-flex items-center gap-2">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </span>
          </button>
          <button
            v-else-if="
              paymentMethod === 'pay-with-points' &&
              isGoogleLoggedIn &&
              isEmailMatch
            "
            :disabled="isCreatingTransaction"
            class="btn-gradient flex-1 rounded-xl px-4 py-3 text-sm font-bold text-on-primary transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            type="button"
            @click="submitCheckout"
          >
            {{ isCreatingTransaction ? "Memproses..." : "Buy Product" }}
          </button>
          <button
            v-else-if="
              paymentMethod === 'pay-with-points' &&
              isGoogleLoggedIn &&
              !isEmailMatch
            "
            disabled
            class="btn-gradient flex-1 rounded-xl px-4 py-3 text-sm font-bold text-on-primary opacity-60 cursor-not-allowed"
            type="button"
          >
            {{ loadingMatchCheck ? "Memverifikasi..." : "Email Mismatch" }}
          </button>
          <button
            v-else
            :disabled="isCreatingTransaction"
            class="btn-gradient flex-1 rounded-xl px-4 py-3 text-sm font-bold text-on-primary transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            type="button"
            @click="submitCheckout"
          >
            {{ isCreatingTransaction ? "Memproses..." : "Processed Payment" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  buyOrderApi,
  donationsApi,
  publicProductsApi,
  type ProductRecord,
} from "@/api";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

type NoticeType = "success" | "warning" | "error" | "info";

interface SnapCallbackResult {
  order_id?: string;
  transaction_status?: string;
  status_message?: string;
}

interface MidtransSnap {
  pay: (
    token: string,
    options?: {
      onSuccess?: (result: SnapCallbackResult) => void;
      onPending?: (result: SnapCallbackResult) => void;
      onError?: (result: SnapCallbackResult) => void;
      onClose?: () => void;
    },
  ) => void;
}

declare global {
  interface Window {
    snap?: MidtransSnap;
    google?: {
      accounts: {
        id: {
          disableAutoSelect: () => void;
        };
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: {
              access_token: string;
              error?: string;
            }) => void;
          }) => { requestAccessToken: () => void };
          revoke: (token: string, callback?: () => void) => void;
        };
      };
    };
  }
}

const MIDTRANS_SNAP_SCRIPT_URL =
  "https://app.sandbox.midtrans.com/snap/snap.js";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const GOOGLE_GIS_SCRIPT_URL = "https://accounts.google.com/gsi/client";

const route = useRoute();
const authStore = useAuthStore();

const isLoading = ref(false);
const errorMessage = ref("");
const product = ref<ProductRecord | null>(null);

const currentSlideIndex = ref(0);
let touchStartX = 0;

const slides = computed(() => {
  if (!product.value) return [];
  const all = [
    product.value.cover_image_url,
    ...(product.value.gallery_images ?? []),
  ];
  return all.filter((url) => url.trim() !== "");
});

const storePreviewPath = computed(() => {
  if (!product.value || !product.value.username?.trim()) return "/";
  return `/store-preview/${product.value.username.trim()}`;
});

function nextSlide(): void {
  if (slides.value.length === 0) return;
  currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length;
}

function prevSlide(): void {
  if (slides.value.length === 0) return;
  currentSlideIndex.value =
    (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length;
}

function onTouchStart(e: TouchEvent): void {
  touchStartX = e.touches[0]?.clientX ?? 0;
}

function onTouchEnd(e: TouchEvent): void {
  const endX = e.changedTouches[0]?.clientX ?? 0;
  const delta = touchStartX - endX;
  if (Math.abs(delta) < 40) return;
  if (delta > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
}

const showCheckoutModal = ref(false);
const isCreatingTransaction = ref(false);
const buyerEmail = ref("");
const checkoutError = ref("");
const checkoutNotice = ref("");
const checkoutNoticeType = ref<NoticeType>("info");
const currentOrderID = ref("");
const paymentMethod = ref<"pay" | "pay-with-points">("pay-with-points");

const donorPoints = ref<number | null>(null);
const pointsStatus = ref<"idle" | "loading" | "loaded" | "error">("idle");
const pointsError = ref("");
let pointsDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let pointsAbort: AbortController | null = null;

const isGoogleLoggedIn = ref(false);
const googleEmail = ref("");
const googleAccessToken = ref("");
const isEmailMatch = ref<boolean | null>(null);
const loadingMatchCheck = ref(false);
let matchCheckAbort: AbortController | null = null;
let matchCheckDebounceTimer: ReturnType<typeof setTimeout> | null = null;

const productId = computed(() => String(route.params.productId ?? "").trim());
const buyerUserID = computed(() => authStore.user?.id?.trim() ?? "");

const creatorLabel = computed(() => {
  if (!product.value) {
    return "Unknown Creator";
  }
  return product.value.username?.trim() || "Unknown Creator";
});

const showDiscount = computed(() => {
  if (!product.value || product.value.pricing_type === "free") {
    return false;
  }
  return Number(product.value.discount_percentage ?? 0) > 0;
});

const displayOriginalPrice = computed(() => {
  if (!product.value) {
    return "Rp 0";
  }
  return formatIDR(Number(product.value.price ?? 0));
});

const displayFinalPrice = computed(() => {
  if (!product.value) {
    return "Rp 0";
  }
  if (product.value.pricing_type === "free") {
    return "FREE";
  }

  return formatIDR(getFinalPrice(product.value));
});

const canBuy = computed(() => {
  if (!product.value) {
    return false;
  }

  if (product.value.pricing_type === "free") {
    return product.value.product_link.trim() !== "";
  }

  return true;
});

const buyButtonLabel = computed(() => {
  if (!product.value) {
    return "Buy Now";
  }

  if (isCreatingTransaction.value) {
    return "Memproses...";
  }

  return product.value.pricing_type === "free" ? "Get for Free" : "Buy Now";
});

const checkoutNoticeClass = computed(() => {
  switch (checkoutNoticeType.value) {
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "error":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
});

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getFinalPrice(data: ProductRecord): number {
  if (data.pricing_type === "free") {
    return 0;
  }

  if (data.discount_percentage <= 0) {
    return Number(data.price ?? 0);
  }

  const discounted = Math.round(
    (Number(data.price ?? 0) * (100 - Number(data.discount_percentage ?? 0))) /
      100,
  );
  return Math.max(discounted, 0);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isGmailEmail(email: string): boolean {
  return (
    isValidEmail(email) && email.trim().toLowerCase().endsWith("@gmail.com")
  );
}

async function fetchDonorPoints(email: string): Promise<void> {
  if (pointsAbort) {
    pointsAbort.abort();
  }
  pointsAbort = new AbortController();
  pointsStatus.value = "loading";
  pointsError.value = "";

  try {
    const result = await donationsApi.checkPoints(email, pointsAbort.signal);
    donorPoints.value = result.total_points;
    pointsStatus.value = "loaded";
  } catch {
    if (pointsAbort?.signal.aborted) return;
    donorPoints.value = null;
    pointsStatus.value = "error";
    pointsError.value = "Gagal mengambil data points";
  }
}

function setCheckoutNotice(type: NoticeType, message: string): void {
  checkoutNoticeType.value = type;
  checkoutNotice.value = message;
}

async function loadProduct(): Promise<void> {
  if (productId.value === "") {
    errorMessage.value = "Product ID pada URL tidak valid.";
    product.value = null;
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    product.value = await publicProductsApi.getById(productId.value);
  } catch (error) {
    product.value = null;
    errorMessage.value =
      error instanceof Error ? error.message : "Gagal memuat produk.";
  } finally {
    isLoading.value = false;
  }
}

function openFreeProduct(): void {
  if (!product.value || product.value.product_link.trim() === "") {
    return;
  }

  window.open(product.value.product_link, "_blank", "noopener,noreferrer");
}

function buyNow(): void {
  if (!canBuy.value || !product.value || isCreatingTransaction.value) {
    return;
  }

  if (product.value.pricing_type === "free") {
    openFreeProduct();
    return;
  }

  checkoutError.value = "";
  showCheckoutModal.value = true;
}

function closeCheckoutModal(): void {
  if (isCreatingTransaction.value) {
    return;
  }

  showCheckoutModal.value = false;
  checkoutError.value = "";
  if (pointsAbort) pointsAbort.abort();
  pointsStatus.value = "idle";
  pointsError.value = "";
  donorPoints.value = null;
  buyerEmail.value = "";
  disconnectGoogle();
}

function resolveOrderID(
  fallbackOrderID: string,
  callbackResult?: SnapCallbackResult,
): string {
  const callbackOrderID = callbackResult?.order_id?.trim();
  if (callbackOrderID) {
    return callbackOrderID;
  }
  return fallbackOrderID;
}

async function refreshTransactionStatus(orderID: string): Promise<void> {
  if (orderID.trim() === "") {
    return;
  }

  try {
    const statusResult = await buyOrderApi.getTransactionStatus(orderID);
    const status = statusResult.payment_status;

    if (status === "success") {
      setCheckoutNotice(
        "success",
        "Pembayaran berhasil. Produk segera diproses.",
      );
      return;
    }

    if (status === "pending") {
      setCheckoutNotice(
        "warning",
        "Pembayaran masih pending. Silakan lanjutkan pembayaran.",
      );
      return;
    }

    if (status === "expired") {
      setCheckoutNotice(
        "error",
        "Pembayaran sudah kedaluwarsa. Silakan buat transaksi baru.",
      );
      return;
    }

    if (status === "failed") {
      setCheckoutNotice("error", "Pembayaran gagal atau dibatalkan.");
      return;
    }

    setCheckoutNotice("info", `Status pembayaran terbaru: ${status}`);
  } catch (error) {
    setCheckoutNotice(
      "warning",
      error instanceof Error
        ? error.message
        : "Tidak bisa mengecek status transaksi.",
    );
  }
}

async function ensureGoogleGISLoaded(): Promise<void> {
  if (window.google?.accounts?.oauth2) return;

  const existing = document.querySelector<HTMLScriptElement>(
    "script[data-google-gis='true']",
  );
  if (existing) existing.remove();

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GOOGLE_GIS_SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-google-gis", "true");
    script.onload = () => {
      if (window.google?.accounts?.oauth2) {
        resolve();
      } else {
        reject(new Error("Google Identity Services gagal dimuat."));
      }
    };
    script.onerror = () =>
      reject(new Error("Gagal memuat Google Identity Services."));
    document.body.appendChild(script);
  });
}

async function signInWithGoogle(): Promise<void> {
  try {
    await ensureGoogleGISLoaded();
    if (!window.google?.accounts?.oauth2) {
      checkoutError.value = "Google Sign-In tidak tersedia.";
      return;
    }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "email profile",
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          checkoutError.value = "Google Sign-In gagal.";
          return;
        }
        try {
          const res = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            },
          );
          const data = (await res.json()) as { email?: string };
          const email = (data.email ?? "").trim().toLowerCase();
          if (!email) {
            checkoutError.value = "Tidak dapat mengambil email dari Google.";
            return;
          }
          googleEmail.value = email;
          googleAccessToken.value = tokenResponse.access_token;
          isGoogleLoggedIn.value = true;
          void checkEmailMatchBackend();
        } catch {
          checkoutError.value = "Gagal mengambil info email dari Google.";
        }
      },
    });

    client.requestAccessToken();
  } catch (error) {
    checkoutError.value =
      error instanceof Error ? error.message : "Google Sign-In gagal.";
  }
}

function disconnectGoogle(): void {
  if (googleAccessToken.value && window.google?.accounts?.oauth2) {
    window.google.accounts.oauth2.revoke(googleAccessToken.value);
  }
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
  isGoogleLoggedIn.value = false;
  googleEmail.value = "";
  googleAccessToken.value = "";
  isEmailMatch.value = null;
  loadingMatchCheck.value = false;
  if (matchCheckAbort) matchCheckAbort.abort();
}

async function checkEmailMatchBackend(): Promise<void> {
  const inputEmail = buyerEmail.value.trim().toLowerCase();
  const gEmail = googleEmail.value.trim().toLowerCase();

  if (!inputEmail || !gEmail) {
    isEmailMatch.value = null;
    return;
  }

  if (matchCheckAbort) matchCheckAbort.abort();
  matchCheckAbort = new AbortController();
  loadingMatchCheck.value = true;
  isEmailMatch.value = null;

  try {
    const result = await donationsApi.checkEmailMatch(
      inputEmail,
      gEmail,
      matchCheckAbort.signal,
    );
    isEmailMatch.value = result.is_match;
  } catch {
    if (matchCheckAbort?.signal.aborted) return;
    isEmailMatch.value = null;
    checkoutError.value = "Gagal memverifikasi email.";
  } finally {
    loadingMatchCheck.value = false;
  }
}

async function ensureMidtransSnapLoaded(clientKey: string): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("Midtrans Snap hanya dapat dijalankan di browser.");
  }

  if (window.snap) {
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(
    "script[data-midtrans-snap='true']",
  );
  if (existing) {
    existing.remove();
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = MIDTRANS_SNAP_SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-midtrans-snap", "true");
    script.setAttribute("data-client-key", clientKey);

    script.onload = () => {
      if (window.snap) {
        resolve();
        return;
      }
      reject(new Error("Midtrans Snap gagal dimuat."));
    };

    script.onerror = () => {
      reject(new Error("Gagal memuat script Midtrans Snap."));
    };

    document.body.appendChild(script);
  });
}

async function submitCheckout(): Promise<void> {
  if (!product.value) {
    checkoutError.value = "Data produk belum tersedia.";
    return;
  }

  const normalizedEmail = buyerEmail.value.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    checkoutError.value = "Masukkan email yang valid.";
    return;
  }

  checkoutError.value = "";
  isCreatingTransaction.value = true;

  try {
    const checkoutResult = await buyOrderApi.createTransaction({
      product_id: product.value.id,
      email: normalizedEmail,
      gross_amount: getFinalPrice(product.value),
      product_name: product.value.name,
      user_id: product.value.user_id,
      buyer_user_id: buyerUserID.value || undefined,
      quantity: 1,
    });

    const orderID = checkoutResult.transaction.order_id;
    currentOrderID.value = orderID;

    await ensureMidtransSnapLoaded(checkoutResult.midtrans_client_key);
    if (!window.snap) {
      throw new Error("Midtrans Snap tidak tersedia.");
    }

    showCheckoutModal.value = false;
    isCreatingTransaction.value = false;

    window.snap.pay(checkoutResult.transaction.snap_token, {
      onSuccess: (result) => {
        const resolvedOrderID = resolveOrderID(orderID, result);
        currentOrderID.value = resolvedOrderID;
        setCheckoutNotice(
          "success",
          "Pembayaran berhasil. Kami sedang memverifikasi status terbaru.",
        );
        void refreshTransactionStatus(resolvedOrderID);
      },
      onPending: (result) => {
        const resolvedOrderID = resolveOrderID(orderID, result);
        currentOrderID.value = resolvedOrderID;
        setCheckoutNotice(
          "warning",
          "Pembayaran masih pending. Selesaikan pembayaran untuk mengaktifkan produk.",
        );
        void refreshTransactionStatus(resolvedOrderID);
      },
      onError: (result) => {
        const resolvedOrderID = resolveOrderID(orderID, result);
        currentOrderID.value = resolvedOrderID;
        setCheckoutNotice(
          "error",
          "Terjadi kendala saat proses pembayaran. Silakan coba lagi.",
        );
        void refreshTransactionStatus(resolvedOrderID);
      },
      onClose: () => {
        setCheckoutNotice(
          "info",
          "Pembayaran ditutup sebelum selesai. Kamu bisa lanjutkan transaksi kapan saja.",
        );
      },
    });
  } catch (error) {
    checkoutError.value =
      error instanceof Error ? error.message : "Gagal membuat transaksi.";
    isCreatingTransaction.value = false;
  }
}

watch(buyerEmail, (newEmail) => {
  if (pointsDebounceTimer) clearTimeout(pointsDebounceTimer);
  if (matchCheckDebounceTimer) clearTimeout(matchCheckDebounceTimer);

  const normalized = newEmail.trim().toLowerCase();

  if (normalized === "") {
    if (pointsAbort) pointsAbort.abort();
    pointsStatus.value = "idle";
    pointsError.value = "";
    donorPoints.value = null;
    isEmailMatch.value = null;
    return;
  }

  if (!isGmailEmail(normalized)) {
    if (pointsAbort) pointsAbort.abort();
    pointsStatus.value = "error";
    pointsError.value = "Email tidak valid";
    donorPoints.value = null;
    isEmailMatch.value = null;
    return;
  }

  pointsDebounceTimer = setTimeout(() => {
    void fetchDonorPoints(normalized);
  }, 400);

  if (isGoogleLoggedIn.value && googleEmail.value) {
    matchCheckDebounceTimer = setTimeout(() => {
      void checkEmailMatchBackend();
    }, 400);
  }
});

watch(paymentMethod, (newMethod) => {
  if (newMethod !== "pay-with-points") {
    disconnectGoogle();
  }
});

watch(
  () => productId.value,
  () => {
    currentSlideIndex.value = 0;
    void loadProduct();
  },
  { immediate: true },
);
</script>
