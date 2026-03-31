<template>
  <div>
    <DashboardNavbar
      page-title="Inventory"
      search-placeholder="Search products..."
    />

    <div class="p-8 w-full mx-auto">
      <!-- Page Header -->
      <div
        class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <h1
            class="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2"
          >
            Digital Products
          </h1>
          <p class="text-on-surface-variant max-w-md leading-relaxed">
            Manage your digital storefront and optimize your creator revenue
            through curated Angpao offerings.
          </p>
        </div>
        <AppButton variant="brand" size="lg" icon="add">Add Product</AppButton>
      </div>

      <!-- Stats -->
      <div class="products-stats-grid mb-12">
        <AppCard class="p-6" shadow="sm">
          <span
            class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/50 mb-2 block"
            >Total Revenue</span
          >
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-headline font-bold text-on-surface"
              >$12,840.00</span
            >
            <span class="text-tertiary text-sm font-bold">+12%</span>
          </div>
        </AppCard>
        <AppCard class="p-6" shadow="sm">
          <span
            class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/50 mb-2 block"
            >Active Items</span
          >
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-headline font-bold text-on-surface"
              >24</span
            >
            <span class="text-on-surface-variant/60 text-sm">/ 30 slots</span>
          </div>
        </AppCard>
        <AppCard class="p-6" shadow="sm">
          <span
            class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/50 mb-2 block"
            >Conversion Rate</span
          >
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-headline font-bold text-on-surface"
              >8.4%</span
            >
            <span class="text-secondary text-sm font-bold">↑ 2.1%</span>
          </div>
        </AppCard>
      </div>

      <!-- Filters -->
      <div
        class="mb-6 flex flex-col gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-4"
      >
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div class="flex flex-wrap gap-3">
            <div class="flex w-full flex-col gap-2 md:w-[260px]">
              <span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Search</span
              >
              <div class="relative">
              <span
                class="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-on-surface-variant/60"
                >search</span
              >
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search products..."
                class="h-11 w-full rounded-xl border border-outline-variant/20 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-on-surface shadow-sm transition-colors hover:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              </div>
            </div>

            <div class="flex w-full flex-col gap-2 md:w-[200px]">
              <span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Category</span
              >
              <div class="relative">
              <select
                v-model="filters.category"
                :class="[
                  'h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm font-medium text-on-surface shadow-sm transition-colors hover:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  filters.category !== 'All'
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-outline-variant/20',
                ]"
              >
                <option v-for="category in categories" :key="category">
                  {{ category }}
                </option>
              </select>
              <span
                class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant/70"
                >expand_more</span
              >
              </div>
            </div>

            <div class="flex w-full flex-col gap-2 md:w-[180px]">
              <span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Status</span
              >
              <div class="relative">
              <select
                v-model="filters.status"
                :class="[
                  'h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm font-medium text-on-surface shadow-sm transition-colors hover:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  filters.status !== 'All'
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-outline-variant/20',
                ]"
              >
                <option v-for="status in statuses" :key="status">
                  {{ status }}
                </option>
              </select>
              <span
                class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant/70"
                >expand_more</span
              >
              </div>
            </div>

            <div class="flex w-full flex-col gap-2 md:w-[170px]">
              <span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Price</span
              >
              <div class="relative">
              <select
                v-model="filters.price"
                :class="[
                  'h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm font-medium text-on-surface shadow-sm transition-colors hover:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  filters.price !== 'All'
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-outline-variant/20',
                ]"
              >
                <option v-for="price in prices" :key="price">
                  {{ price }}
                </option>
              </select>
              <span
                class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant/70"
                >expand_more</span
              >
              </div>
            </div>

            <div class="flex w-full flex-col gap-2 md:w-[170px]">
              <span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Sales</span
              >
              <div class="relative">
              <select
                v-model="filters.sales"
                :class="[
                  'h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm font-medium text-on-surface shadow-sm transition-colors hover:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  filters.sales !== 'All'
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-outline-variant/20',
                ]"
              >
                <option v-for="sales in salesOptions" :key="sales">
                  {{ sales }}
                </option>
              </select>
              <span
                class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant/70"
                >expand_more</span
              >
              </div>
            </div>

            <div class="flex w-full flex-col gap-2 md:w-[200px]">
              <span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Sort by</span
              >
              <div class="relative">
              <select
                v-model="filters.sort"
                :class="[
                  'h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm font-medium text-on-surface shadow-sm transition-colors hover:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  filters.sort !== 'Newest'
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-outline-variant/20',
                ]"
              >
                <option v-for="sortOption in sortOptions" :key="sortOption">
                  {{ sortOption }}
                </option>
              </select>
              <span
                class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant/70"
                >expand_more</span
              >
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 md:flex-nowrap">
            <button
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-outline-variant/30 bg-white px-4 text-sm font-semibold text-on-surface transition-colors hover:border-outline-variant/50 hover:bg-surface-container-low"
            >
              Reset Filters
            </button>
            <button
              class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-outline-variant/30 bg-white px-4 text-sm font-bold text-on-surface transition-colors hover:border-outline-variant/50 hover:bg-surface-container-low"
            >
              <span class="material-symbols-outlined text-lg">add</span>
              Add Category
            </button>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <AppCard
        shadow="sm"
        class="overflow-hidden border border-outline-variant/5"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th
                  class="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60"
                >
                  Product Details
                </th>
                <th
                  class="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60"
                >
                  Price ($)
                </th>
                <th
                  class="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60"
                >
                  Sales
                </th>
                <th
                  class="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60 text-center"
                >
                  Status
                </th>
                <th class="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr
                v-for="product in products"
                :key="product.id"
                class="group hover:bg-surface-container-low/30 transition-colors"
              >
                <td class="px-8 py-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0"
                    >
                      <img
                        v-if="product.image"
                        :src="product.image"
                        alt="Product"
                        :class="[
                          'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500',
                          product.status === 'draft' ? 'opacity-60' : '',
                        ]"
                      />
                    </div>
                    <div>
                      <p
                        :class="[
                          'font-headline font-bold group-hover:text-primary transition-colors',
                          product.status === 'draft'
                            ? 'text-on-surface/60'
                            : 'text-on-surface',
                        ]"
                      >
                        {{ product.name }}
                      </p>
                      <p
                        :class="[
                          'text-xs font-medium',
                          product.status === 'draft'
                            ? 'text-on-surface-variant/60'
                            : 'text-on-surface-variant',
                        ]"
                      >
                        {{ product.type }} • {{ product.fileSize }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <span
                    :class="[
                      'font-headline font-semibold',
                      product.status === 'draft'
                        ? 'text-on-surface/60'
                        : 'text-on-surface',
                    ]"
                  >
                    {{ product.price }}
                  </span>
                </td>
                <td class="px-8 py-6">
                  <div class="flex flex-col">
                    <span
                      :class="[
                        'font-bold',
                        product.status === 'draft'
                          ? 'text-on-surface/60'
                          : 'text-on-surface',
                      ]"
                    >
                      {{ product.sales.toLocaleString() }}
                    </span>
                    <span
                      v-if="product.isTopSeller"
                      class="text-[10px] text-tertiary font-bold"
                      >TOP SELLER</span
                    >
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex justify-center">
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        product.status === 'active'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-high text-on-surface-variant',
                      ]"
                    >
                      {{ product.status }}
                    </span>
                  </div>
                </td>
                <td class="px-8 py-6 text-right">
                  <button
                    class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                  >
                    more_vert
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="px-8 py-4 bg-surface-container-low/20 flex items-center justify-between border-t border-outline-variant/5"
        >
          <span class="text-xs text-on-surface-variant font-medium"
            >Showing 4 of 24 products</span
          >
          <div class="flex gap-2">
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-lowest border border-outline-variant/10 text-on-surface-variant hover:bg-white transition-all"
            >
              <span class="material-symbols-outlined text-sm"
                >chevron_left</span
              >
            </button>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-on-primary text-xs font-bold"
            >
              1
            </button>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-lowest border border-outline-variant/10 text-on-surface-variant hover:bg-white transition-all text-xs font-bold"
            >
              2
            </button>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-lowest border border-outline-variant/10 text-on-surface-variant hover:bg-white transition-all"
            >
              <span class="material-symbols-outlined text-sm"
                >chevron_right</span
              >
            </button>
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import AppButton from "@/components/common/AppButton.vue";
import type { Product } from "@/types";
import { computed, ref } from "vue";

const categories = [
  "All",
  "Digital Art",
  "Video Course",
  "E-book",
  "Templates",
];

const statuses = ["All", "Active", "Inactive", "Draft"];
const prices = ["All", "$0 - $10", "$10 - $50", "$50+"];
const salesOptions = ["All", "Top Selling", "Low Sales", "No Sales"];
const sortOptions = [
  "Newest",
  "Oldest",
  "Price: Low to High",
  "Price: High to Low",
  "Most Sales",
];

const filters = ref({
  category: "All",
  status: "All",
  price: "All",
  sales: "All",
  sort: "Newest",
  search: "",
});

const hasActiveFilters = computed(() => {
  return (
    filters.value.category !== "All" ||
    filters.value.status !== "All" ||
    filters.value.price !== "All" ||
    filters.value.sales !== "All" ||
    filters.value.sort !== "Newest" ||
    filters.value.search.trim() !== ""
  );
});

const resetFilters = () => {
  filters.value = {
    category: "All",
    status: "All",
    price: "All",
    sales: "All",
    sort: "Newest",
    search: "",
  };
};

const products: Product[] = [
  {
    id: "1",
    name: "Exclusive Wallpapers Pack",
    type: "Digital Art",
    fileSize: "42 MB",
    price: "$15.00",
    sales: 1204,
    status: "active",
    isTopSeller: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHP4_fXGzMWttSgWKslFkcLVmp4HSitpwW4h9t__XNHNBpDO_6Ch_IZ9R9zpCmv-JDcz4slkFP1mhcEq0N-OcX-dCZ0iksZrfDMtO6KgF6j3q2fYCpEjR7Bhe_owgft0d55HVj6MZU06a38-INSZUtq291moFppWhtU7ZPD9bfzqKqcKiRt571Py8_yBQF1a6AMMo9bRCJ55MCZB3QRVRfRTigJpCRyn7W1HCLQq6R38A63rhSr_345_1bKEpVuRFMFbNsHhZrHKE",
  },
  {
    id: "2",
    name: "Creator Masterclass Vol 1",
    type: "Video Course",
    fileSize: "2.4 GB",
    price: "$49.00",
    sales: 352,
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzgSvf9-A3nlckSvGMQo9Wi9Exr7jdQzeSHWPUbatvaTe5RaG-bvI-8HCGCVuGhemDNo-IOps0Tpel3afJIb605QEk0fXIgJxJYBVBmkazFaNrzbgnFX6KdMWy7KfRPz_1_KudArxeRmttef1hyGg9CbbavpYf2d-e4t6T0uQePFrFyHF1UVFmLATEAz3y-f7U6ZQD_bSUbkoOu3dQaFq81YQno9dKoJMSTcGr-2m126nxNmweDUjoypeHC4JwKZWmB4OoDl57Bjw",
  },
  {
    id: "3",
    name: "Lightroom Presets - Autumn",
    type: "Assets",
    fileSize: "15 MB",
    price: "$12.00",
    sales: 0,
    status: "draft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtKxE6YXh5EWOTHZqzlDsTxWDrHob6F4M8ujX1rDh6JFIQ2MxrDPV6bbU8voXYfDjR1U4QDteUr5nLeq3JYDpWdg16m8RB4-ObQqzUWMNX7ryXwITj4IwAo5Nk9oQ-ut3-stenZZysq0rPqwo9e7R183IN0rx-AZyoqC9xAD4JhkRpsuXCHxm2yxMZpkvDXUv0iAYjgO8Y9JY1iS8Udc8BKMmHbphmo6TmLo06bqHGHO47VVl1o9j6iunNKpdsVORrmIobKH3btnA",
  },
  {
    id: "4",
    name: "1-on-1 Consulting Session",
    type: "Service",
    fileSize: "1 Hour",
    price: "$150.00",
    sales: 18,
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4jjIV5XziAzGH0rIvEQldR1WtNFwh2bJ3_oHMRpraxaS3B3TAwQq3QgaAYcesnQzj-DApfnCCqWZ1k44txjiIqBafAvzjhP9ijzMXuohEcr3CahSCHEcE27fd4Le1lAlDRxhdaf5ZJEN0-XS4TRZkFcRxRoo_v9hzZoMAmun78gniKGFBkzuF8auz0Y8LBeYVmHdBkNonCyLlK4Fe29Zu0JTKCmdQBqtukAztb1D7OsfV4fcc4tQ6wViDTn29IkOsUmvzSkpNm9w",
  },
];
</script>

<style scoped>
.products-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
</style>
