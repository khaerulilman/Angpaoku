<template>
  <div class="min-h-screen bg-surface text-on-background">
    <!-- <nav class="fixed inset-x-0 top-0 z-50 px-6 py-4">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <RouterLink
          class="group flex items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-2 text-on-surface shadow-sm transition-all hover:bg-surface-container"
          to="/"
        >
          <span
            class="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1"
          >
            arrow_back
          </span>
          <span class="text-sm font-medium">Back to Marketplace</span>
        </RouterLink>

        <p
          class="rounded-full bg-surface-container-lowest px-4 py-2 text-xs font-semibold text-on-surface-variant"
        >
          Public Store Preview
        </p>
      </div>
    </nav> -->

    <main class="mx-auto max-w-7xl px-6 pb-24 pt-10">
      <header
        class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-surface-container-low to-tertiary/10"
      >
        <!-- Banner photo -->
        <div
          class="relative h-36 w-full overflow-hidden rounded-t-3xl bg-surface-container md:h-48"
        >
          <img
            v-if="profile?.banner_photo"
            :src="profile.banner_photo"
            alt="Store banner"
            class="h-full w-full object-cover"
          />
          <div
            v-else
            class="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/10 blur-2xl"
          ></div>
          <div
            v-if="!profile?.banner_photo"
            class="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-tertiary/10 blur-2xl"
          ></div>
        </div>

        <div class="relative p-6 md:p-8">
          <!-- Avatar + name row -->
          <div
            class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div class="flex items-end gap-4">
              <!-- Profile photo -->
              <div
                class="-mt-12 h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-surface-container-lowest bg-surface-container shadow-md md:-mt-16 md:h-24 md:w-24"
              >
                <img
                  v-if="profile?.profile_photo"
                  :src="profile.profile_photo"
                  :alt="profileDisplayName"
                  class="h-full w-full object-cover"
                />
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-extrabold text-primary"
                >
                  {{ profileDisplayName.charAt(0).toUpperCase() }}
                </div>
              </div>

              <div class="space-y-1 pb-1">
                <p
                  class="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant"
                >
                  Creator Store
                </p>
                <h1
                  class="text-2xl font-extrabold tracking-tight text-on-surface md:text-4xl"
                >
                  {{ profileDisplayName }}
                </h1>
                <p class="text-sm text-on-surface-variant">
                  @<span class="font-semibold text-on-surface">{{
                    previewUsername || "-"
                  }}</span>
                </p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div
                v-for="stat in storeStats"
                :key="stat.label"
                class="rounded-2xl bg-surface-container-lowest/80 px-4 py-3 text-center shadow-sm"
              >
                <p class="text-xl font-extrabold text-on-surface md:text-2xl">
                  {{ stat.value }}
                </p>
                <p
                  class="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant md:text-xs"
                >
                  {{ stat.label }}
                </p>
              </div>
            </div>
          </div>

          <!-- Bio / tagline / location -->
          <div
            v-if="profile?.tagline || profile?.bio || profile?.location"
            class="mt-5 space-y-2"
          >
            <p
              v-if="profile?.tagline"
              class="text-sm font-semibold italic text-on-surface"
            >
              "{{ profile.tagline }}"
            </p>
            <p
              v-if="profile?.bio"
              class="max-w-2xl text-sm leading-relaxed text-on-surface-variant"
            >
              {{ profile.bio }}
            </p>
            <p
              v-if="profile?.location"
              class="flex items-center gap-1 text-xs text-on-surface-variant"
            >
              <span class="material-symbols-outlined text-base"
                >location_on</span
              >
              {{ profile.location }}
            </p>
          </div>

          <!-- Social links & website -->
          <div
            v-if="
              profile?.website ||
              profile?.youtube_url ||
              profile?.instagram_username ||
              profile?.tiktok_username ||
              profile?.x_username ||
              profile?.discord_link
            "
            class="mt-4 flex flex-wrap gap-3"
          >
            <a
              v-if="profile?.website"
              :href="profile.website"
              class="flex items-center gap-1 rounded-full bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="material-symbols-outlined text-sm">language</span>
              Website
            </a>
            <a
              v-if="profile?.youtube_url"
              :href="profile.youtube_url"
              class="flex items-center gap-1 rounded-full bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="material-symbols-outlined text-sm">play_circle</span>
              YouTube
            </a>
            <a
              v-if="profile?.instagram_username"
              :href="`https://instagram.com/${profile.instagram_username}`"
              class="flex items-center gap-1 rounded-full bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="material-symbols-outlined text-sm"
                >photo_camera</span
              >
              @{{ profile.instagram_username }}
            </a>
            <a
              v-if="profile?.tiktok_username"
              :href="`https://tiktok.com/@${profile.tiktok_username}`"
              class="flex items-center gap-1 rounded-full bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="material-symbols-outlined text-sm">music_note</span>
              @{{ profile.tiktok_username }}
            </a>
            <a
              v-if="profile?.x_username"
              :href="`https://x.com/${profile.x_username}`"
              class="flex items-center gap-1 rounded-full bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="material-symbols-outlined text-sm"
                >alternate_email</span
              >
              @{{ profile.x_username }}
            </a>
            <a
              v-if="profile?.discord_link"
              :href="profile.discord_link"
              class="flex items-center gap-1 rounded-full bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="material-symbols-outlined text-sm">forum</span>
              Discord
            </a>
          </div>
        </div>
      </header>

      <section class="mt-12">
        <div
          class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h2
              class="text-2xl font-bold tracking-tight text-on-surface md:text-3xl"
            >
              Public Products
            </h2>
            <p class="text-sm text-on-surface-variant">
              List product dengan visibility public (live).
            </p>
          </div>

          <div class="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="filter in filters"
              :key="filter"
              :class="[
                'whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors md:text-sm',
                selectedFilter === filter
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-primary',
              ]"
              type="button"
              @click="selectedFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>

        <div
          v-if="isLoading"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="index in 6"
            :key="`store-preview-skeleton-${index}`"
            class="overflow-hidden rounded-3xl bg-surface-container-lowest"
          >
            <div class="h-52 animate-pulse bg-surface-container"></div>
            <div class="space-y-3 p-5">
              <div
                class="h-4 w-2/3 animate-pulse rounded bg-surface-container"
              ></div>
              <div
                class="h-3 w-full animate-pulse rounded bg-surface-container"
              ></div>
              <div
                class="h-3 w-4/5 animate-pulse rounded bg-surface-container"
              ></div>
            </div>
          </div>
        </div>

        <div
          v-else-if="errorMessage"
          class="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-medium text-red-700"
        >
          {{ errorMessage }}
        </div>

        <div
          v-else-if="filteredProducts.length === 0"
          class="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-8 text-center"
        >
          <p class="text-lg font-semibold text-on-surface">
            Belum ada produk public.
          </p>
          <p class="mt-2 text-sm text-on-surface-variant">
            Produk akan muncul di halaman ini ketika visibility diset ke
            <strong>live</strong>.
          </p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="product in filteredProducts"
            :key="product.id"
            class="group overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0px_16px_30px_rgba(17,24,39,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_24px_40px_rgba(17,24,39,0.1)]"
          >
            <div class="relative h-56 overflow-hidden bg-surface-container">
              <img
                v-if="product.cover_image_url"
                :alt="product.name"
                :src="product.cover_image_url"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center text-sm font-semibold text-on-surface-variant"
              >
                No image
              </div>

              <div
                class="absolute left-3 top-3 rounded-full bg-surface-container-lowest/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary"
              >
                {{ product.category?.name ?? "Uncategorized" }}
              </div>
            </div>

            <div class="space-y-4 p-5">
              <div>
                <h3 class="text-lg font-bold text-on-surface">
                  {{ product.name }}
                </h3>
                <p class="mt-2 line-clamp-2 text-sm text-on-surface-variant">
                  {{ product.description || "No description available." }}
                </p>
              </div>

              <div class="flex items-end justify-between gap-4">
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant"
                  >
                    Price
                  </p>
                  <p class="text-xl font-extrabold text-on-surface">
                    {{ displayPrice(product) }}
                  </p>
                </div>

                <button
                  class="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-on-primary transition-colors hover:brightness-95"
                  @click="router.push(`/product-buy/${product.id}`)"
                >
                  Open
                  <span class="material-symbols-outlined text-sm"
                    >arrow_forward</span
                  >
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  storePreviewApi,
  type ProductRecord,
  type StorePreviewProfile,
} from "@/api";

const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const errorMessage = ref("");
const profileName = ref("");
const profile = ref<import("@/api").StorePreviewProfile | null>(null);
const products = ref<ProductRecord[]>([]);
const selectedFilter = ref("All");

const previewUsername = computed(() =>
  String(route.params.username ?? "").trim(),
);

const profileDisplayName = computed(() => {
  const name = (profile.value?.full_name || profileName.value).trim();
  return name === "" ? "Creator Store" : name;
});

const filters = computed(() => {
  const unique = new Set<string>();

  for (const product of products.value) {
    const categoryName = product.category?.name?.trim();
    if (categoryName) {
      unique.add(categoryName);
    }
  }

  return ["All", ...Array.from(unique)];
});

const filteredProducts = computed(() => {
  if (selectedFilter.value === "All") {
    return products.value;
  }

  return products.value.filter(
    (product) => (product.category?.name ?? "") === selectedFilter.value,
  );
});

const storeStats = computed(() => {
  const total = products.value.length;
  const free = products.value.filter(
    (product) => product.pricing_type === "free",
  ).length;
  const paid = total - free;

  return [
    { label: "Public Products", value: String(total) },
    { label: "Paid", value: String(paid) },
    { label: "Free", value: String(free) },
  ];
});

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getFinalPrice(product: ProductRecord): number {
  if (product.pricing_type === "free") {
    return 0;
  }

  if (product.discount_percentage <= 0) {
    return product.price;
  }

  const discounted = Math.round(
    (product.price * (100 - product.discount_percentage)) / 100,
  );
  return Math.max(discounted, 0);
}

function displayPrice(product: ProductRecord): string {
  if (product.pricing_type === "free") {
    return "FREE";
  }

  return formatIDR(getFinalPrice(product));
}

async function loadStorePreview(): Promise<void> {
  if (previewUsername.value === "") {
    errorMessage.value = "Username pada URL tidak valid.";
    products.value = [];
    profile.value = null;
    profileName.value = "";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const data = await storePreviewApi.getByUsername(previewUsername.value);
    profile.value = data.profile;
    profileName.value = data.profile?.username ?? data.username ?? "";
    products.value = data.products ?? [];

    if (!filters.value.includes(selectedFilter.value)) {
      selectedFilter.value = "All";
    }
  } catch (error) {
    profile.value = null;
    profileName.value = "";
    products.value = [];
    errorMessage.value =
      error instanceof Error ? error.message : "Gagal memuat store preview.";
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => previewUsername.value,
  () => {
    selectedFilter.value = "All";
    void loadStorePreview();
  },
  { immediate: true },
);
</script>
