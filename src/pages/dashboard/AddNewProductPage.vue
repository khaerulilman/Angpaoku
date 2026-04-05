<template>
  <div>
    <DashboardNavbar
      page-title="Add Product"
      search-placeholder="Search products..."
    />

    <div class="mx-auto w-full p-8">
      <div class="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1
            class="mb-2 text-4xl font-headline font-extrabold tracking-tight text-on-surface"
          >
            Add New Product
          </h1>
          <p class="max-w-3xl text-on-surface-variant">
            Lengkapi data produk, upload gambar, lalu simpan sebagai draft atau
            publish live.
          </p>
        </div>
      </div>

      <form class="grid grid-cols-1 gap-8 lg:grid-cols-12" @submit.prevent>
        <div class="space-y-8 lg:col-span-8">
          <AppCard class="p-8" shadow="sm">
            <h2 class="mb-6 text-xl font-headline font-bold text-on-surface">
              Basic Information
            </h2>

            <div class="space-y-6">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div class="space-y-2">
                  <label
                    class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                    >Product Name</label
                  >
                  <input
                    v-model.trim="form.name"
                    type="text"
                    placeholder="Masterclass Photography 2024"
                    class="h-12 w-full rounded-xl border border-outline-variant/10 bg-surface-container-highest px-4 text-sm font-medium text-on-surface focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div class="space-y-2">
                  <label
                    class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                    >Category</label
                  >
                  <select
                    v-model="form.categoryId"
                    class="h-12 w-full rounded-xl border border-outline-variant/10 bg-surface-container-highest px-4 text-sm font-medium text-on-surface focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select category</option>
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                  <p
                    v-if="categories.length === 0"
                    class="text-xs text-on-surface-variant"
                  >
                    Belum ada category. Tambahkan di halaman Products.
                  </p>
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                  >Description</label
                >
                <textarea
                  v-model.trim="form.description"
                  rows="4"
                  placeholder="Describe what customers will get..."
                  class="w-full rounded-xl border border-outline-variant/10 bg-surface-container-highest px-4 py-3 text-sm font-medium text-on-surface focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <h2 class="mb-6 text-xl font-headline font-bold text-on-surface">
              Product Access
            </h2>

            <div class="space-y-6">
              <div class="space-y-2">
                <label
                  class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                  >Product Link</label
                >
                <input
                  v-model.trim="form.productLink"
                  type="url"
                  placeholder="https://drive.google.com/file/..."
                  class="h-12 w-full rounded-xl border border-outline-variant/10 bg-surface-container-highest px-4 text-sm font-medium text-on-surface focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p
                  class="text-xs"
                  :class="
                    isValidProductLink
                      ? 'text-emerald-600'
                      : 'text-on-surface-variant'
                  "
                >
                  {{
                    isValidProductLink ? "Link verified" : "Link belum valid"
                  }}
                </p>
              </div>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-6 flex items-center gap-3">
              <span
                class="material-symbols-outlined text-primary"
                style="font-variation-settings: &quot;FILL&quot; 1"
                >collections</span
              >
              <h3 class="text-xl font-bold">Product Gallery</h3>
            </div>

            <div class="space-y-6">
              <input
                ref="coverInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onCoverChange"
              />
              <input
                ref="galleryInputRef"
                type="file"
                accept="image/*"
                multiple
                class="hidden"
                @change="onGalleryChange"
              />

              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <button
                  type="button"
                  class="group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 transition-all hover:border-primary hover:bg-primary-fixed/10 md:col-span-2"
                  @click="openCoverPicker"
                >
                  <img
                    v-if="coverPreview"
                    :src="coverPreview"
                    alt="cover preview"
                    class="h-full w-full object-cover"
                  />
                  <div
                    v-else
                    class="flex h-full w-full flex-col items-center justify-center text-slate-400"
                  >
                    <span class="material-symbols-outlined"
                      >add_photo_alternate</span
                    >
                    <p class="mt-1 text-[10px] font-bold">Add Cover Image</p>
                  </div>

                  <div
                    class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    :class="coverPreview ? '' : 'hidden'"
                  >
                    <span class="material-symbols-outlined text-3xl"
                      >cloud_upload</span
                    >
                    <p class="mt-2 text-xs font-bold">Replace Cover Image</p>
                  </div>

                  <div
                    class="absolute left-4 top-4 rounded bg-primary px-2 py-1 text-[10px] font-bold text-white shadow-sm"
                  >
                    Main Cover
                  </div>
                </button>

                <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
                  <button
                    v-for="index in 2"
                    :key="`side-gallery-${index}`"
                    type="button"
                    class="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 transition-all hover:border-primary"
                    @click="openGalleryPicker"
                  >
                    <img
                      v-if="galleryPreviews[index - 1]"
                      :src="galleryPreviews[index - 1]"
                      alt="gallery preview"
                      class="h-full w-full object-cover"
                    />
                    <div v-else class="p-2 text-center">
                      <span
                        class="material-symbols-outlined text-slate-400 group-hover:text-primary"
                        >add_photo_alternate</span
                      >
                      <p
                        class="mt-1 text-[10px] font-bold text-slate-400 group-hover:text-primary"
                      >
                        Add Image
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-4">
                <button
                  v-for="index in 4"
                  :key="`bottom-gallery-${index}`"
                  type="button"
                  class="group flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-surface-container-highest transition-all hover:bg-white"
                  @click="openGalleryPicker"
                >
                  <img
                    v-if="galleryPreviews[index + 1]"
                    :src="galleryPreviews[index + 1]"
                    alt="gallery preview"
                    class="h-full w-full object-cover"
                  />
                  <span
                    v-else
                    class="material-symbols-outlined text-slate-400 group-hover:text-primary"
                    >add</span
                  >
                </button>
              </div>

              <p class="text-[10px] text-on-surface-variant">
                Recommended size: 1200x675px. Max 5MB per image.
              </p>
            </div>
          </AppCard>

          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <AppCard class="p-8" shadow="sm">
              <div class="mb-6 flex items-center gap-3">
                <span
                  class="material-symbols-outlined text-primary"
                  style="font-variation-settings: &quot;FILL&quot; 1"
                  >payments</span
                >
                <h3 class="text-xl font-bold">Pricing</h3>
              </div>

              <div class="space-y-6">
                <div
                  class="flex gap-4 rounded-full bg-surface-container-high p-1"
                >
                  <button
                    type="button"
                    class="flex-1 rounded-full py-2 text-xs font-bold transition-all"
                    :class="
                      form.pricingType === 'paid'
                        ? 'bg-white text-on-surface shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    "
                    @click="form.pricingType = 'paid'"
                  >
                    Paid
                  </button>
                  <button
                    type="button"
                    class="flex-1 rounded-full py-2 text-xs font-bold transition-all"
                    :class="
                      form.pricingType === 'free'
                        ? 'bg-white text-on-surface shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    "
                    @click="
                      form.pricingType = 'free';
                      discountEnabled = false;
                      form.discountPercentage = 0;
                      form.discountEndDate = '';
                    "
                  >
                    Free
                  </button>
                </div>

                <div class="space-y-2">
                  <label
                    class="ml-1 block text-sm font-bold text-on-surface-variant"
                    >Price (IDR)</label
                  >
                  <div
                    class="flex items-center rounded-xl border border-outline-variant/10 bg-surface-container-highest px-3 py-3 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/20"
                  >
                    <span class="mr-3 font-bold text-on-surface-variant"
                      >Rp.</span
                    >
                    <input
                      v-model.trim="form.price"
                      :disabled="form.pricingType === 'free'"
                      type="text"
                      placeholder="49.00"
                      class="w-full bg-transparent font-bold outline-none disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-on-surface-variant"
                    >Enable Discount</span
                  >
                  <label
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      v-model="discountEnabled"
                      type="checkbox"
                      class="peer sr-only"
                      :disabled="form.pricingType === 'free'"
                      @change="onDiscountToggleChange"
                    />
                    <span
                      class="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-disabled:opacity-60"
                    />
                  </label>
                </div>

                <div v-if="discountEnabled" class="space-y-6">
                  <div class="space-y-2">
                    <label
                      class="ml-1 block text-sm font-bold text-on-surface-variant"
                      >Discount Percentage</label
                    >
                    <div class="grid grid-cols-5 gap-2">
                      <button
                        v-for="option in discountOptions"
                        :key="`discount-${option}`"
                        type="button"
                        class="rounded-lg px-2 py-2 text-[11px] font-bold transition-all"
                        :class="
                          form.discountPercentage === option
                            ? 'bg-primary text-white'
                            : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                        "
                        @click="
                          form.discountPercentage = option;
                          if (option === 0) form.discountEndDate = '';
                        "
                      >
                        {{ option === 0 ? "No Disc" : `${option}%` }}
                      </button>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label
                      class="ml-1 block text-sm font-bold text-on-surface-variant"
                      >Discount End Date</label
                    >
                    <input
                      v-model="form.discountEndDate"
                      type="date"
                      :disabled="form.discountPercentage === 0"
                      class="h-11 w-full rounded-xl border-none bg-surface-container-highest px-4 text-sm font-medium text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <p class="text-[10px] text-on-surface-variant">
                      Discount berakhir pada jam 00:00 WIB sesuai tanggal yang
                      dipilih.
                    </p>
                  </div>
                </div>
              </div>
            </AppCard>

            <AppCard class="h-full p-8" shadow="sm">
              <div class="mb-6 flex items-center gap-3">
                <span
                  class="material-symbols-outlined text-primary"
                  style="font-variation-settings: &quot;FILL&quot; 1"
                  >visibility</span
                >
                <h3 class="text-xl font-bold">Status</h3>
              </div>

              <div class="flex flex-col justify-center space-y-8 py-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-bold">Product Visibility</h4>
                    <p class="text-[10px] text-on-surface-variant">
                      Is this product ready for sales?
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span
                      class="text-xs font-bold"
                      :class="
                        form.visibility === 'draft'
                          ? 'text-on-surface'
                          : 'text-on-surface-variant'
                      "
                      >Draft</span
                    >
                    <label
                      class="relative inline-flex cursor-pointer items-center"
                    >
                      <input
                        v-model="isLiveVisibility"
                        type="checkbox"
                        class="peer sr-only"
                      />
                      <span
                        class="h-7 w-14 rounded-full bg-slate-200 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-7"
                      />
                    </label>
                    <span
                      class="text-xs font-bold"
                      :class="
                        form.visibility === 'live'
                          ? 'text-primary'
                          : 'text-on-surface-variant'
                      "
                      >Live</span
                    >
                  </div>
                </div>

                <div
                  class="rounded-xl border border-primary/10 bg-primary/5 p-3"
                >
                  <p
                    class="text-[10px] leading-relaxed text-on-surface-variant"
                  >
                    Your product will be live at
                    <span class="font-bold text-on-surface"
                      >angpao.com/c/{{ finalSlugPreview }}</span
                    >
                    once published.
                  </p>
                </div>
              </div>
            </AppCard>
          </div>

          <footer
            class="mb-12 mt-2 flex flex-col items-start justify-between gap-4 rounded-2xl bg-surface-container-low px-8 py-6 md:flex-row md:items-center"
          >
            <button
              type="button"
              class="rounded-xl px-6 py-3 text-sm font-bold text-on-surface-variant transition-all hover:bg-surface-container-high"
              :disabled="isSubmitting"
              @click="handleCancel"
            >
              Cancel
            </button>
            <div class="flex flex-wrap items-center gap-4">
              <button
                type="button"
                class="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-on-surface shadow-sm transition-all hover:bg-slate-50"
                :disabled="isSubmitting"
                @click="submitProduct('draft')"
              >
                {{ isSubmitting ? "Saving..." : "Save Draft" }}
              </button>
              <button
                type="button"
                class="rounded-full bg-primary px-10 py-3 text-sm font-extrabold text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                :disabled="isSubmitting"
                @click="submitProduct('live')"
              >
                {{ isSubmitting ? "Publishing..." : "Publish Product" }}
              </button>
            </div>
          </footer>

          <p v-if="errorMessage" class="text-sm font-medium text-red-600">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="text-sm font-medium text-emerald-600">
            {{ successMessage }}
          </p>
        </div>

        <div class="space-y-4 lg:col-span-4">
          <AppCard class="p-6" shadow="sm">
            <h3
              class="mb-3 text-sm font-bold uppercase tracking-wider text-tertiary"
            >
              Preview
            </h3>
            <div
              class="relative overflow-hidden rounded-xl bg-surface-container-low"
            >
              <div class="aspect-video bg-surface-container-highest">
                <img
                  v-if="activePreviewImage"
                  :src="activePreviewImage"
                  alt="product preview image"
                  class="h-full w-full object-cover"
                />
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center text-xs font-semibold text-on-surface-variant"
                >
                  Belum ada gambar cover
                </div>
              </div>
              <button
                v-if="hasNextPreviewImage"
                type="button"
                class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
                @click="showNextPreviewImage"
              >
                Next
              </button>
              <div
                v-if="previewImages.length > 1"
                class="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm"
              >
                {{ previewImageIndex + 1 }}/{{ previewImages.length }}
              </div>
            </div>

            <p class="text-lg font-headline font-bold text-on-surface">
              {{ form.name || "Untitled Product" }}
            </p>
            <p class="mt-2 text-xs text-on-surface-variant">
              {{ form.description || "-" }}
            </p>
            <p
              class="mt-4 text-sm font-bold"
              :class="
                form.pricingType === 'free'
                  ? 'text-emerald-600'
                  : 'text-primary'
              "
            >
              {{
                form.pricingType === "free"
                  ? "FREE"
                  : formatIDR(finalPreviewPrice)
              }}
            </p>
            <p
              v-if="hasPreviewDiscount"
              class="mt-1 flex items-center gap-2 text-xs text-on-surface-variant"
            >
              <span class="line-through">{{
                formatIDR(basePreviewPrice)
              }}</span>
              <span class="font-bold text-primary"
                >-{{ form.discountPercentage }}%</span
              >
            </p>
            <p
              v-if="hasPreviewDiscount && form.discountEndDate"
              class="mt-1 text-[10px] text-on-surface-variant"
            >
              Ends at 00:00 WIB, {{ formatPreviewDate(form.discountEndDate) }}
            </p>
            <p class="mt-1 text-xs uppercase text-on-surface-variant">
              {{ form.visibility }}
            </p>
          </AppCard>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import {
  categoriesApi,
  productsApi,
  type Category,
  type CreateProductPayload,
  type ProductVisibility,
} from "@/api";

interface CachedImageDraft {
  fileName: string;
  mimeType: string;
  dataUrl: string;
}

interface AddProductDraftCache {
  form: {
    name: string;
    categoryId: string;
    description: string;
    productLink: string;
    pricingType: "paid" | "free";
    price: string;
    discountPercentage: number;
    discountEndDate: string;
    visibility: ProductVisibility;
    slug: string;
  };
  discountEnabled: boolean;
  coverImage: CachedImageDraft | null;
  galleryImages: CachedImageDraft[];
  previewImageIndex: number;
}

const router = useRouter();

const LOCAL_STORAGE_DRAFT_KEY = "angpaoku:add-product:draft:v1";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_GALLERY_IMAGES = 6;

const categories = ref<Category[]>([]);
const coverFile = ref<File | null>(null);
const coverPreview = ref("");
const coverCache = ref<CachedImageDraft | null>(null);
const galleryFiles = ref<File[]>([]);
const galleryPreviews = ref<string[]>([]);
const galleryCache = ref<CachedImageDraft[]>([]);
const coverInputRef = ref<HTMLInputElement | null>(null);
const galleryInputRef = ref<HTMLInputElement | null>(null);
const discountEnabled = ref(false);
const previewImageIndex = ref(0);
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const isHydratingDraft = ref(false);

const form = reactive({
  name: "",
  categoryId: "",
  description: "",
  productLink: "",
  pricingType: "paid" as "paid" | "free",
  price: "",
  discountPercentage: 0,
  discountEndDate: "",
  visibility: "draft" as ProductVisibility,
  slug: "",
});

const discountOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

const isValidProductLink = computed(() => {
  try {
    if (form.productLink.trim() === "") {
      return false;
    }
    const parsed = new URL(form.productLink);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
});

const finalSlugPreview = computed(() => {
  const source = form.slug.trim() || form.name.trim() || "product";
  return source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
});

const isLiveVisibility = computed({
  get: () => form.visibility === "live",
  set: (isLive) => {
    form.visibility = isLive ? "live" : "draft";
  },
});

const basePreviewPrice = computed(() => parsePrice(form.price));

const hasPreviewDiscount = computed(
  () =>
    form.pricingType === "paid" &&
    discountEnabled.value &&
    form.discountPercentage > 0,
);

const finalPreviewPrice = computed(() => {
  if (form.pricingType === "free") {
    return 0;
  }

  if (!hasPreviewDiscount.value) {
    return basePreviewPrice.value;
  }

  const discounted = Math.round(
    (basePreviewPrice.value * (100 - form.discountPercentage)) / 100,
  );
  return Math.max(discounted, 0);
});

const previewImages = computed(() => {
  const images: string[] = [];
  if (coverPreview.value.trim() !== "") {
    images.push(coverPreview.value);
  }
  if (galleryPreviews.value.length > 0) {
    images.push(...galleryPreviews.value);
  }
  return images;
});

const activePreviewImage = computed(
  () => previewImages.value[previewImageIndex.value] || "",
);

const hasNextPreviewImage = computed(() => previewImages.value.length > 1);

function parsePrice(value: string): number {
  const normalized = value.replace(/rp/gi, "").replace(/[^0-9]/g, "");
  if (normalized === "") {
    return 0;
  }

  const parsed = Number.parseInt(normalized, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPreviewDate(value: string): string {
  if (!value) {
    return "-";
  }

  const date = new Date(`${value}T00:00:00+07:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function onDiscountToggleChange(): void {
  if (!discountEnabled.value) {
    form.discountPercentage = 0;
    form.discountEndDate = "";
  }
}

function clearDiscountIfFree(): void {
  if (form.pricingType === "free") {
    discountEnabled.value = false;
    form.discountPercentage = 0;
    form.discountEndDate = "";
  }
}

function openCoverPicker(): void {
  coverInputRef.value?.click();
}

function openGalleryPicker(): void {
  galleryInputRef.value?.click();
}

function buildCachedImage(file: File, dataUrl: string): CachedImageDraft {
  return {
    fileName: file.name,
    mimeType: file.type,
    dataUrl,
  };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("failed to read image"));
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () => reject(new Error("failed to read image"));
    reader.readAsDataURL(file);
  });
}

function dataUrlToFile(image: CachedImageDraft): File {
  const separatorIndex = image.dataUrl.indexOf(",");
  if (separatorIndex === -1) {
    throw new Error("invalid data url");
  }

  const meta = image.dataUrl.slice(0, separatorIndex);
  const base64 = image.dataUrl.slice(separatorIndex + 1);
  const mimeMatch = meta.match(/^data:(.*?);base64$/i);
  const mimeType = mimeMatch?.[1] || image.mimeType || "image/jpeg";

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], image.fileName || "image-upload.jpg", {
    type: mimeType,
  });
}

function getDraftSnapshot(): AddProductDraftCache {
  return {
    form: {
      name: form.name,
      categoryId: form.categoryId,
      description: form.description,
      productLink: form.productLink,
      pricingType: form.pricingType,
      price: form.price,
      discountPercentage: form.discountPercentage,
      discountEndDate: form.discountEndDate,
      visibility: form.visibility,
      slug: form.slug,
    },
    discountEnabled: discountEnabled.value,
    coverImage: coverCache.value,
    galleryImages: galleryCache.value,
    previewImageIndex: previewImageIndex.value,
  };
}

function clearDraftStorage(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
}

async function saveDraftToStorage(): Promise<void> {
  if (typeof window === "undefined" || isHydratingDraft.value) {
    return;
  }

  try {
    const snapshot = getDraftSnapshot();
    window.localStorage.setItem(
      LOCAL_STORAGE_DRAFT_KEY,
      JSON.stringify(snapshot),
    );
  } catch (error) {
    console.warn("failed to save add product draft", error);
  }
}

async function restoreDraftFromStorage(): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_DRAFT_KEY);
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw) as AddProductDraftCache;
    isHydratingDraft.value = true;

    form.name = parsed.form?.name ?? "";
    form.categoryId = parsed.form?.categoryId ?? "";
    form.description = parsed.form?.description ?? "";
    form.productLink = parsed.form?.productLink ?? "";
    form.pricingType = parsed.form?.pricingType === "free" ? "free" : "paid";
    form.price = parsed.form?.price ?? "";
    form.discountPercentage = Number(parsed.form?.discountPercentage ?? 0);
    form.discountEndDate = parsed.form?.discountEndDate ?? "";
    form.visibility = parsed.form?.visibility === "live" ? "live" : "draft";
    form.slug = parsed.form?.slug ?? "";

    discountEnabled.value = Boolean(parsed.discountEnabled);
    clearDiscountIfFree();

    coverCache.value = parsed.coverImage ?? null;
    coverPreview.value = coverCache.value?.dataUrl ?? "";
    coverFile.value = null;
    if (coverCache.value) {
      try {
        coverFile.value = dataUrlToFile(coverCache.value);
      } catch (error) {
        console.warn("failed to restore cover file", error);
      }
    }

    galleryCache.value = (parsed.galleryImages ?? []).slice(
      0,
      MAX_GALLERY_IMAGES,
    );
    galleryPreviews.value = galleryCache.value.map((image) => image.dataUrl);
    galleryFiles.value = [];
    for (const image of galleryCache.value) {
      try {
        galleryFiles.value.push(dataUrlToFile(image));
      } catch (error) {
        console.warn("failed to restore gallery file", error);
      }
    }

    previewImageIndex.value = Number(parsed.previewImageIndex ?? 0);
    if (previewImageIndex.value < 0) {
      previewImageIndex.value = 0;
    }
  } catch (error) {
    console.warn("failed to restore add product draft", error);
    clearDraftStorage();
  } finally {
    isHydratingDraft.value = false;
  }
}

function validateImage(file: File): boolean {
  if (!file.type.startsWith("image/")) {
    errorMessage.value = `${file.name} bukan file gambar.`;
    return false;
  }

  if (file.size > MAX_IMAGE_BYTES) {
    errorMessage.value = `${file.name} melebihi 5MB.`;
    return false;
  }

  return true;
}

function showNextPreviewImage(): void {
  if (previewImages.value.length <= 1) {
    return;
  }

  previewImageIndex.value =
    (previewImageIndex.value + 1) % previewImages.value.length;
}

async function onCoverChange(event: Event): Promise<void> {
  errorMessage.value = "";
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) {
    coverFile.value = null;
    coverPreview.value = "";
    coverCache.value = null;
    return;
  }

  if (!validateImage(file)) {
    target.value = "";
    return;
  }

  try {
    const dataUrl = await fileToDataUrl(file);
    coverFile.value = file;
    coverPreview.value = dataUrl;
    coverCache.value = buildCachedImage(file, dataUrl);
    previewImageIndex.value = 0;
  } catch {
    errorMessage.value = "Gagal memuat preview cover image.";
  }
  target.value = "";
}

async function onGalleryChange(event: Event): Promise<void> {
  errorMessage.value = "";
  const target = event.target as HTMLInputElement;
  const files = target.files ? Array.from(target.files) : [];

  if (files.length === 0) {
    return;
  }

  const validFiles = files.filter((file) => validateImage(file));
  if (validFiles.length === 0) {
    target.value = "";
    return;
  }

  const nextCachedImages: CachedImageDraft[] = [];
  const nextFiles: File[] = [];

  for (const file of validFiles) {
    try {
      const dataUrl = await fileToDataUrl(file);
      nextCachedImages.push(buildCachedImage(file, dataUrl));
      nextFiles.push(file);
    } catch {
      errorMessage.value = `Gagal membaca file ${file.name}.`;
    }
  }

  galleryCache.value = [...galleryCache.value, ...nextCachedImages].slice(
    0,
    MAX_GALLERY_IMAGES,
  );
  galleryFiles.value = [...galleryFiles.value, ...nextFiles].slice(
    0,
    MAX_GALLERY_IMAGES,
  );
  galleryPreviews.value = galleryCache.value.map((image) => image.dataUrl);
  target.value = "";
}

function handleCancel(): void {
  clearDraftStorage();
  router.push({ name: "products" });
}

async function loadCategories(): Promise<void> {
  try {
    categories.value = await categoriesApi.getAll();
  } catch {
    categories.value = [];
  }
}

async function submitProduct(visibility: ProductVisibility): Promise<void> {
  errorMessage.value = "";
  successMessage.value = "";
  clearDraftStorage();

  if (form.name.trim().length < 2) {
    errorMessage.value = "Product name minimal 2 karakter.";
    return;
  }

  if (form.categoryId === "") {
    errorMessage.value = "Category wajib dipilih.";
    return;
  }

  if (!isValidProductLink.value) {
    errorMessage.value = "Product link tidak valid.";
    return;
  }

  const priceValue = form.pricingType === "free" ? 0 : parsePrice(form.price);
  if (form.pricingType === "paid" && priceValue <= 0) {
    errorMessage.value = "Price wajib diisi jika tipe Paid.";
    return;
  }

  if (form.pricingType === "free" && discountEnabled.value) {
    errorMessage.value = "Discount hanya tersedia untuk produk berbayar.";
    return;
  }

  if (
    discountEnabled.value &&
    form.discountPercentage > 0 &&
    form.discountEndDate.trim() === ""
  ) {
    errorMessage.value = "Pilih tanggal akhir discount.";
    return;
  }

  isSubmitting.value = true;

  try {
    const payload: CreateProductPayload = {
      name: form.name.trim(),
      category_id: form.categoryId,
      description: form.description.trim(),
      product_link: form.productLink.trim(),
      link_verified: isValidProductLink.value,
      pricing_type: form.pricingType,
      price: priceValue,
      discount_percentage: discountEnabled.value ? form.discountPercentage : 0,
      discount_end_date:
        discountEnabled.value && form.discountPercentage > 0
          ? form.discountEndDate
          : undefined,
      visibility,
      slug: form.slug.trim() || undefined,
      product_cover: coverFile.value,
      gallery_images: galleryFiles.value,
    };

    const product = await productsApi.create(payload);
    successMessage.value = `Product berhasil dibuat: ${product.name}`;
    form.visibility = visibility;
    clearDraftStorage();

    // Redirect to products page after brief delay to show success message
    setTimeout(() => {
      router.push({ name: "products" });
    }, 1500);
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "Gagal membuat product.";
  } finally {
    isSubmitting.value = false;
  }
}

watch(previewImages, (images) => {
  if (images.length === 0) {
    previewImageIndex.value = 0;
    return;
  }

  if (previewImageIndex.value >= images.length) {
    previewImageIndex.value = 0;
  }
});

watch(
  [form, discountEnabled, coverCache, galleryCache],
  () => {
    void saveDraftToStorage();
  },
  { deep: true },
);

watch(previewImageIndex, () => {
  void saveDraftToStorage();
});

onMounted(async () => {
  await restoreDraftFromStorage();
  await loadCategories();
});
</script>
