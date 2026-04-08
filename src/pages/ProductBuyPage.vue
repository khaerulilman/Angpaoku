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
            :disabled="!canBuy"
            class="btn-gradient rounded-full px-8 py-4 text-sm font-bold text-on-primary shadow-angpao-lg transition hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            @click="buyNow"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { publicProductsApi, type ProductRecord } from "@/api";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isLoading = ref(false);
const errorMessage = ref("");
const product = ref<ProductRecord | null>(null);

const productId = computed(() => String(route.params.productId ?? "").trim());

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
  return product.value.product_link.trim() !== "";
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

function buyNow(): void {
  if (!canBuy.value || !product.value) {
    return;
  }
  window.open(product.value.product_link, "_blank", "noopener,noreferrer");
}

watch(
  () => productId.value,
  () => {
    void loadProduct();
  },
  { immediate: true },
);
</script>
