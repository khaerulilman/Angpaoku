<template>
  <div class="bg-surface text-on-surface">
    <main class="mx-auto min-h-screen w-full max-w-md bg-surface pb-36">
      <header
        class="relative aspect-[4/5] w-full overflow-hidden bg-surface-container"
      >
        <img
          v-if="product?.cover_image_url"
          :alt="product.name"
          :src="product.cover_image_url"
          class="h-full w-full object-cover"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center text-sm font-semibold text-on-surface-variant"
        >
          No image
        </div>

        <RouterLink
          class="glass-effect absolute left-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/25 text-white"
          to="/"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </RouterLink>
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
            placeholder="you@example.com"
            type="email"
          />
          <p v-if="checkoutError" class="text-sm font-medium text-red-600">
            {{ checkoutError }}
          </p>
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
            :disabled="isCreatingTransaction"
            class="btn-gradient flex-1 rounded-xl px-4 py-3 text-sm font-bold text-on-primary transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            type="button"
            @click="submitCheckout"
          >
            {{ isCreatingTransaction ? "Memproses..." : "Lanjut Bayar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buyOrderApi, publicProductsApi, type ProductRecord } from "@/api";
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
  }
}

const MIDTRANS_SNAP_SCRIPT_URL = "https://app.sandbox.midtrans.com/snap/snap.js";

const route = useRoute();
const authStore = useAuthStore();

const isLoading = ref(false);
const errorMessage = ref("");
const product = ref<ProductRecord | null>(null);

const showCheckoutModal = ref(false);
const isCreatingTransaction = ref(false);
const buyerEmail = ref("");
const checkoutError = ref("");
const checkoutNotice = ref("");
const checkoutNoticeType = ref<NoticeType>("info");
const currentOrderID = ref("");

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
      setCheckoutNotice("success", "Pembayaran berhasil. Produk segera diproses.");
      return;
    }

    if (status === "pending") {
      setCheckoutNotice("warning", "Pembayaran masih pending. Silakan lanjutkan pembayaran.");
      return;
    }

    if (status === "expired") {
      setCheckoutNotice("error", "Pembayaran sudah kedaluwarsa. Silakan buat transaksi baru.");
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

watch(
  () => productId.value,
  () => {
    void loadProduct();
  },
  { immediate: true },
);
</script>
