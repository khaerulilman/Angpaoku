<template>
  <div class="bg-surface text-on-surface">
    <main class="mx-auto min-h-screen w-full max-w-md bg-surface pb-40">
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

      <div class="space-y-8 px-6 py-8">
        <section v-if="isLoading" class="space-y-4">
          <div class="h-4 w-24 animate-pulse rounded bg-surface-container"></div>
          <div class="h-8 w-3/4 animate-pulse rounded bg-surface-container"></div>
          <div class="h-4 w-1/2 animate-pulse rounded bg-surface-container"></div>
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
              {{ product.pricing_type === "free" ? "Free Product" : "Premium Product" }}
            </p>
            <h1 class="text-3xl font-extrabold leading-tight tracking-tight">
              {{ product.name }}
            </h1>
            <div class="mt-3 space-y-2 text-sm text-on-surface/75">
              <p class="font-medium">By {{ creatorLabel }}</p>
              <p class="font-medium">{{ soldCountLabel }}</p>
            </div>
          </section>

          <section>
            <p class="leading-relaxed text-on-surface-variant">
              {{ product.description || "No description available." }}
            </p>
          </section>

          <section class="space-y-4 rounded-2xl bg-surface-container-low p-4">
            <h2 class="text-sm font-bold uppercase tracking-wider text-on-surface">
              Checkout
            </h2>

            <label class="block space-y-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Buyer Email
              </span>
              <input
                v-model="buyerEmail"
                autocomplete="email"
                class="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
                placeholder="you@example.com"
                type="email"
              />
            </label>

            <p class="rounded-xl bg-primary/5 px-3 py-2 text-xs text-on-surface-variant">
              Metode pembayaran dipilih nanti langsung di halaman Midtrans Snap.
            </p>

            <p
              v-if="checkoutError"
              class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
            >
              {{ checkoutError }}
            </p>
          </section>
        </template>

        <footer class="space-y-4 py-6 text-center">
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
            :disabled="!product || isSubmitting"
            class="btn-gradient rounded-full px-7 py-4 text-sm font-bold text-on-primary shadow-angpao-lg transition hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            @click="buyNow"
          >
            {{ isSubmitting ? "Processing..." : "Buy Now" }}
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

const route = useRoute();

const isLoading = ref(false);
const errorMessage = ref("");
const isSubmitting = ref(false);
const checkoutError = ref("");
const product = ref<ProductRecord | null>(null);
const buyerEmail = ref("");

const productId = computed(() => String(route.params.productId ?? "").trim());

const creatorLabel = computed(() => {
  if (!product.value) {
    return "Unknown Creator";
  }
  return product.value.username?.trim() || "Unknown Creator";
});

const soldCountLabel = computed(() => {
  const soldCount = Number(product.value?.sold_count ?? 0);
  return `${soldCount.toLocaleString("id-ID")} sold`;
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

function isValidEmail(value: string): boolean {
  const normalized = value.trim();
  if (normalized === "") {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

async function buyNow(): Promise<void> {
  checkoutError.value = "";
  if (!product.value) {
    return;
  }
  if (!isValidEmail(buyerEmail.value)) {
    checkoutError.value = "Masukkan buyer email yang valid.";
    return;
  }
  if (product.value.pricing_type === "free") {
    checkoutError.value = "Produk gratis tidak membutuhkan pembayaran.";
    return;
  }

  isSubmitting.value = true;
  try {
    const result = await buyOrderApi.createOrder({
      product_id: product.value.id,
      buyer_email: buyerEmail.value.trim(),
    });

    if (!result.snap_url) {
      throw new Error("snap url tidak tersedia");
    }
    window.location.href = result.snap_url;
  } catch (error) {
    checkoutError.value =
      error instanceof Error ? error.message : "Gagal membuat order.";
  } finally {
    isSubmitting.value = false;
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
