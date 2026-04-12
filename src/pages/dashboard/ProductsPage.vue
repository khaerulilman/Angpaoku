<template>
  <div>
    <DashboardNavbar
      page-title="Inventory"
      search-placeholder="Search products..."
    />

    <div class="mx-auto w-full p-8">
      <div
        class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1
            class="mb-2 text-4xl font-headline font-extrabold tracking-tight text-on-surface"
          >
            Digital Products
          </h1>
          <p class="max-w-2xl text-on-surface-variant">
            Manage your digital products and categories from one dashboard.
          </p>
        </div>

        <AppButton variant="brand" size="lg" icon="add" @click="goToAddProduct"
          >Add Product</AppButton
        >
      </div>

      <!-- Verification Warning -->
      <VerificationWarningBanner class="mb-4" />

      <p v-if="actionError" class="mb-4 text-sm font-medium text-red-600">
        {{ actionError }}
      </p>
      <p v-if="actionMessage" class="mb-4 text-sm font-medium text-emerald-600">
        {{ actionMessage }}
      </p>

      <AppCard class="mb-6 border border-outline-variant/10 p-4" shadow="sm">
        <div
          class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div class="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
            <div class="space-y-2">
              <label
                class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Search</label
              >
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search product name..."
                class="h-11 w-full rounded-xl border border-outline-variant/20 bg-white px-4 text-sm font-medium text-on-surface focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div class="space-y-2">
              <label
                class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Category</label
              >
              <select
                v-model="filters.category"
                class="h-11 w-full rounded-xl border border-outline-variant/20 bg-white px-4 text-sm font-medium text-on-surface focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="All">All</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.slug"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="space-y-2">
              <label
                class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Visibility</label
              >
              <select
                v-model="filters.visibility"
                class="h-11 w-full rounded-xl border border-outline-variant/20 bg-white px-4 text-sm font-medium text-on-surface focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="All">All</option>
                <option value="live">Live</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-outline-variant/30 bg-white px-4 text-sm font-semibold text-on-surface hover:bg-surface-container-low"
              @click="resetFilters"
            >
              Reset
            </button>
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-outline-variant/30 bg-white px-4 text-sm font-bold text-on-surface hover:bg-surface-container-low"
              @click="showManageCategoryCard = !showManageCategoryCard"
            >
              <span class="material-symbols-outlined text-lg">category</span>
              Manage Category
            </button>
          </div>
        </div>
      </AppCard>

      <AppCard
        v-if="showManageCategoryCard"
        class="mb-6 border border-primary/20 p-6"
        shadow="sm"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-headline font-bold text-on-surface">
            Manage Categories
          </h2>
          <button
            type="button"
            class="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white hover:bg-primary/90"
            @click="startCreateCategory"
          >
            <span class="material-symbols-outlined text-sm">add</span>
            Add New
          </button>
        </div>

        <!-- Inline create / edit form -->
        <form
          v-if="showCategoryForm"
          class="mb-5 grid grid-cols-1 gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-low/40 p-4 md:grid-cols-3"
          @submit.prevent="submitCategory"
        >
          <div class="space-y-2 md:col-span-1">
            <label
              class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
              >Category Name</label
            >
            <input
              v-model.trim="categoryForm.name"
              type="text"
              placeholder="Digital Asset"
              class="h-11 w-full rounded-xl border border-outline-variant/20 bg-white px-4 text-sm font-medium text-on-surface focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div class="space-y-2 md:col-span-1">
            <label
              class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
              >Slug (Optional)</label
            >
            <input
              v-model.trim="categoryForm.slug"
              type="text"
              placeholder="digital-asset"
              class="h-11 w-full rounded-xl border border-outline-variant/20 bg-white px-4 text-sm font-medium text-on-surface focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div class="flex items-end gap-3 md:col-span-1">
            <button
              type="submit"
              :disabled="isSubmittingCategory"
              class="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{
                isSubmittingCategory
                  ? editingCategoryId
                    ? "Saving..."
                    : "Creating..."
                  : editingCategoryId
                    ? "Save Changes"
                    : "Create Category"
              }}
            </button>
            <button
              type="button"
              :disabled="isSubmittingCategory"
              class="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-outline-variant/30 bg-white px-4 text-sm font-semibold text-on-surface hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-60"
              @click="cancelCategoryForm"
            >
              Cancel
            </button>
          </div>

          <p
            v-if="categoryError"
            class="md:col-span-3 mt-1 text-sm font-medium text-red-600"
          >
            {{ categoryError }}
          </p>
          <p
            v-if="categorySuccess"
            class="md:col-span-3 mt-1 text-sm font-medium text-emerald-600"
          >
            {{ categorySuccess }}
          </p>
        </form>

        <!-- Category list -->
        <div
          v-if="categories.length === 0"
          class="py-6 text-center text-sm text-on-surface-variant"
        >
          No categories yet. Click "Add New" to create one.
        </div>
        <ul v-else class="divide-y divide-outline-variant/10">
          <li
            v-for="cat in categories"
            :key="cat.id"
            class="flex items-center justify-between gap-3 py-3 px-1"
          >
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-on-surface">
                {{ cat.name }}
              </p>
              <p class="truncate text-xs text-on-surface-variant">
                {{ cat.slug }}
              </p>
            </div>
            <div class="flex shrink-0 items-center gap-1">
              <button
                type="button"
                class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                title="Edit category"
                @click="startEditCategory(cat)"
              >
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button
                type="button"
                :disabled="isDeletingCategory === cat.id"
                class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                title="Delete category"
                @click="deleteCategory(cat)"
              >
                <span
                  v-if="isDeletingCategory === cat.id"
                  class="material-symbols-outlined text-[18px] animate-spin"
                  >progress_activity</span
                >
                <span v-else class="material-symbols-outlined text-[18px]"
                  >close</span
                >
              </button>
            </div>
          </li>
        </ul>

        <p
          v-if="!showCategoryForm && categoryError"
          class="mt-3 text-sm font-medium text-red-600"
        >
          {{ categoryError }}
        </p>
        <p
          v-if="!showCategoryForm && categorySuccess"
          class="mt-3 text-sm font-medium text-emerald-600"
        >
          {{ categorySuccess }}
        </p>
      </AppCard>

      <AppCard
        class="overflow-hidden border border-outline-variant/10"
        shadow="sm"
      >
        <div v-if="isLoadingProducts" class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Image
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Name
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Category
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Price
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Discount
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Final Price
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Type
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Visibility
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr
                v-for="index in 6"
                :key="`skeleton-${index}`"
                class="hover:bg-surface-container-low/30"
              >
                <td class="px-6 py-4">
                  <div
                    class="h-14 w-14 rounded-lg bg-surface-container-high animate-pulse"
                  ></div>
                </td>
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <div
                      class="h-4 w-32 rounded bg-surface-container-high animate-pulse"
                    ></div>
                    <div
                      class="h-3 w-24 rounded bg-surface-container-high animate-pulse"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="h-4 w-20 rounded bg-surface-container-high animate-pulse"
                  ></div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="h-4 w-24 rounded bg-surface-container-high animate-pulse"
                  ></div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="h-4 w-12 rounded bg-surface-container-high animate-pulse"
                  ></div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="h-4 w-24 rounded bg-surface-container-high animate-pulse"
                  ></div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="h-4 w-16 rounded bg-surface-container-high animate-pulse"
                  ></div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="h-8 w-16 rounded-full bg-surface-container-high animate-pulse"
                  ></div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <div
                      class="h-8 w-8 rounded bg-surface-container-high animate-pulse"
                    ></div>
                    <div
                      class="h-8 w-8 rounded bg-surface-container-high animate-pulse"
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Image
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Name
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Category
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Price
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Discount
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Final Price
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Type
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Visibility
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr
                v-for="product in filteredProducts"
                :key="product.id"
                class="hover:bg-surface-container-low/30"
              >
                <td class="px-6 py-4">
                  <div
                    class="h-14 w-14 overflow-hidden rounded-lg bg-surface-container-high"
                  >
                    <img
                      v-if="product.cover_image_url"
                      :src="product.cover_image_url"
                      :alt="`${product.name} cover`"
                      class="h-full w-full object-cover"
                    />
                    <div
                      v-else
                      class="flex h-full w-full items-center justify-center text-[10px] font-bold text-on-surface-variant"
                    >
                      No Image
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="font-semibold text-on-surface">
                    {{ product.name }}
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-on-surface">
                  {{ product.category?.name ?? "-" }}
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-on-surface">
                  {{ formatIDR(product.price) }}
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-on-surface">
                  {{
                    product.discount_percentage > 0
                      ? `${product.discount_percentage}%`
                      : "-"
                  }}
                </td>
                <td class="px-6 py-4 text-sm font-semibold">
                  <span
                    :class="
                      product.pricing_type === 'free'
                        ? 'text-emerald-600'
                        : 'text-primary'
                    "
                  >
                    {{
                      product.pricing_type === "free"
                        ? "FREE"
                        : formatIDR(getFinalPrice(product))
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm uppercase text-on-surface">
                  {{ product.pricing_type }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'rounded-full px-3 py-1 text-xs font-bold uppercase',
                      product.visibility === 'live'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600',
                    ]"
                  >
                    {{ product.visibility }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      title="Edit product"
                      @click="goToEditProduct(product)"
                    >
                      <span class="material-symbols-outlined text-lg"
                        >edit</span
                      >
                    </button>
                    <button
                      type="button"
                      :disabled="isDeletingProduct"
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      :class="
                        isDeletingProduct ? 'cursor-not-allowed opacity-60' : ''
                      "
                      title="Delete product"
                      @click="openDeleteConfirm(product)"
                    >
                      <span class="material-symbols-outlined text-lg"
                        >delete</span
                      >
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            v-if="filteredProducts.length === 0"
            class="p-6 text-sm text-on-surface-variant"
          >
            No products found.
          </div>
        </div>
      </AppCard>
    </div>

    <div
      v-if="showDeleteConfirm && productToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[1px]"
      @click.self="closeDeleteConfirm"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600"
          >
            <span class="material-symbols-outlined">delete</span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-on-surface">Delete Product</h3>
            <p class="text-xs text-on-surface-variant">Confirmation Flow</p>
          </div>
        </div>

        <div
          class="mb-4 rounded-xl border border-outline-variant/20 bg-surface-container-low p-4"
        >
          <p class="text-sm font-semibold text-on-surface">
            {{ productToDelete.name }}
          </p>
          <p class="mt-1 text-xs text-on-surface-variant">
            1. Pastikan produk yang dipilih sudah benar.
          </p>
          <p class="text-xs text-on-surface-variant">
            2. Klik tombol delete untuk menghapus permanen.
          </p>
        </div>

        <p v-if="deleteError" class="mb-4 text-sm font-medium text-red-600">
          {{ deleteError }}
        </p>

        <div class="flex items-center justify-end gap-3">
          <button
            type="button"
            class="inline-flex h-10 items-center justify-center rounded-xl border border-outline-variant/30 px-4 text-sm font-semibold text-on-surface hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isDeletingProduct"
            @click="closeDeleteConfirm"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isDeletingProduct"
            @click="confirmDeleteProduct"
          >
            {{ isDeletingProduct ? "Deleting..." : "Delete Product" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import AppButton from "@/components/common/AppButton.vue";
import VerificationWarningBanner from "@/components/common/VerificationWarningBanner.vue";
import {
  categoriesApi,
  productsApi,
  type Category,
  type ProductRecord,
} from "@/api";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const isLoadingProducts = ref(false);
const isSubmittingCategory = ref(false);
const isDeletingProduct = ref(false);
const isDeletingCategory = ref<string | null>(null);
const showDeleteConfirm = ref(false);
const categoryError = ref("");
const categorySuccess = ref("");
const actionError = ref("");
const actionMessage = ref("");
const deleteError = ref("");
const showManageCategoryCard = ref(false);
const showCategoryForm = ref(false);
const editingCategoryId = ref<string | null>(null);

const products = ref<ProductRecord[]>([]);
const categories = ref<Category[]>([]);
const productToDelete = ref<ProductRecord | null>(null);

const filters = ref({
  search: "",
  category: "All",
  visibility: "All",
});

const categoryForm = ref({
  name: "",
  slug: "",
});

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const bySearch =
      filters.value.search.trim() === "" ||
      product.name
        .toLowerCase()
        .includes(filters.value.search.trim().toLowerCase());

    const byCategory =
      filters.value.category === "All" ||
      product.category?.slug === filters.value.category;

    const byVisibility =
      filters.value.visibility === "All" ||
      product.visibility === filters.value.visibility;

    return bySearch && byCategory && byVisibility;
  });
});

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function resetFilters(): void {
  filters.value = {
    search: "",
    category: "All",
    visibility: "All",
  };
}

function goToAddProduct(): void {
  if (!authStore.user?.is_verified) {
    actionError.value =
      'Akun kamu harus diverifikasi terlebih dahulu sebelum bisa menambahkan produk digital. Klik "Verifikasi Sekarang" di panel peringatan di atas.';
    return;
  }
  router.push({ name: "add-product" });
}

function goToEditProduct(product: ProductRecord): void {
  router.push({ name: "edit-product", params: { id: product.id } });
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

function startCreateCategory(): void {
  editingCategoryId.value = null;
  categoryForm.value = { name: "", slug: "" };
  categoryError.value = "";
  categorySuccess.value = "";
  showCategoryForm.value = true;
}

function startEditCategory(cat: Category): void {
  editingCategoryId.value = cat.id;
  categoryForm.value = { name: cat.name, slug: cat.slug };
  categoryError.value = "";
  categorySuccess.value = "";
  showCategoryForm.value = true;
}

function cancelCategoryForm(): void {
  showCategoryForm.value = false;
  editingCategoryId.value = null;
  categoryForm.value = { name: "", slug: "" };
  categoryError.value = "";
  categorySuccess.value = "";
}

function openDeleteConfirm(product: ProductRecord): void {
  deleteError.value = "";
  productToDelete.value = product;
  showDeleteConfirm.value = true;
}

function closeDeleteConfirm(): void {
  if (isDeletingProduct.value) {
    return;
  }
  deleteError.value = "";
  productToDelete.value = null;
  showDeleteConfirm.value = false;
}

async function loadProducts(): Promise<void> {
  isLoadingProducts.value = true;
  try {
    products.value = await productsApi.getAll();
  } catch (error) {
    products.value = [];
    actionError.value =
      error instanceof Error ? error.message : "Gagal memuat product.";
  } finally {
    isLoadingProducts.value = false;
  }
}

async function loadCategories(): Promise<void> {
  try {
    categories.value = await categoriesApi.getAll();
  } catch {
    categories.value = [];
  }
}

async function submitCategory(): Promise<void> {
  categoryError.value = "";
  categorySuccess.value = "";

  if (categoryForm.value.name.trim().length < 2) {
    categoryError.value = "Category name minimum 2 karakter.";
    return;
  }

  isSubmittingCategory.value = true;
  try {
    if (editingCategoryId.value) {
      const updated = await categoriesApi.update(editingCategoryId.value, {
        name: categoryForm.value.name.trim(),
        slug: categoryForm.value.slug.trim() || undefined,
      });
      const idx = categories.value.findIndex((c) => c.id === updated.id);
      if (idx !== -1) {
        categories.value[idx] = updated;
      }
      categorySuccess.value = "Category berhasil diupdate.";
    } else {
      const created = await categoriesApi.create({
        name: categoryForm.value.name.trim(),
        slug: categoryForm.value.slug.trim() || undefined,
      });
      categories.value = [created, ...categories.value];
      categorySuccess.value = "Category berhasil dibuat.";
    }
    showCategoryForm.value = false;
    editingCategoryId.value = null;
    categoryForm.value = { name: "", slug: "" };
  } catch (error) {
    categoryError.value =
      error instanceof Error ? error.message : "Gagal menyimpan category.";
  } finally {
    isSubmittingCategory.value = false;
  }
}

async function deleteCategory(cat: Category): Promise<void> {
  categoryError.value = "";
  categorySuccess.value = "";
  isDeletingCategory.value = cat.id;
  try {
    await categoriesApi.delete(cat.id);
    categories.value = categories.value.filter((c) => c.id !== cat.id);
    categorySuccess.value = `Category "${cat.name}" berhasil dihapus.`;
  } catch (error) {
    categoryError.value =
      error instanceof Error ? error.message : "Gagal menghapus category.";
  } finally {
    isDeletingCategory.value = null;
  }
}

async function confirmDeleteProduct(): Promise<void> {
  if (!productToDelete.value) {
    return;
  }

  deleteError.value = "";
  actionError.value = "";
  actionMessage.value = "";
  isDeletingProduct.value = true;

  const selected = productToDelete.value;
  try {
    await productsApi.delete(selected.id);
    products.value = products.value.filter((item) => item.id !== selected.id);
    actionMessage.value = `Product "${selected.name}" berhasil dihapus.`;
    showDeleteConfirm.value = false;
    productToDelete.value = null;
  } catch (error) {
    deleteError.value =
      error instanceof Error ? error.message : "Gagal menghapus product.";
  } finally {
    isDeletingProduct.value = false;
  }
}

onMounted(async () => {
  await Promise.all([loadCategories(), loadProducts()]);
});
</script>
