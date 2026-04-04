<template>
  <div>
    <DashboardNavbar
      page-title="Add Product"
      search-placeholder="Search products..."
    />

    <div class="w-full mx-auto p-8">
      <div class="mb-10 flex items-start gap-4 md:gap-6">
        <button
          type="button"
          class="mt-1 rounded-2xl bg-surface-container-lowest p-3 text-on-surface shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors hover:bg-surface-container-high"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>

        <div>
          <h1
            class="mb-2 text-4xl font-headline font-extrabold tracking-tight text-on-surface"
          >
            Add New Product
          </h1>
          <p class="max-w-2xl leading-relaxed text-on-surface-variant">
            Create and publish your digital product using a secure external
            link. We handle the transactions while you manage the content.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div class="space-y-8 lg:col-span-8">
          <AppCard class="p-8" shadow="sm">
            <div class="mb-6 flex items-center gap-3">
              <span
                class="material-symbols-outlined text-primary"
                style="font-variation-settings: &quot;FILL&quot; 1"
                >info</span
              >
              <h2 class="text-xl font-headline font-bold text-on-surface">
                Basic Information
              </h2>
            </div>

            <div class="space-y-6">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div class="space-y-2">
                  <label
                    class="ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                    >Product Name</label
                  >
                  <input
                    type="text"
                    placeholder="e.g. Masterclass Photography 2024"
                    class="h-12 w-full rounded-xl border border-outline-variant/10 bg-surface-container-highest px-4 text-sm font-medium text-on-surface transition-colors placeholder:text-on-surface-variant/50 focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div class="space-y-2">
                  <label
                    class="ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                    >Category</label
                  >
                  <div class="relative">
                    <select
                      class="h-12 w-full appearance-none rounded-xl border border-outline-variant/10 bg-surface-container-highest px-4 pr-10 text-sm font-medium text-on-surface transition-colors focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option>Digital Asset</option>
                      <option>E-book</option>
                      <option>Online Course</option>
                      <option>Software</option>
                    </select>
                    <span
                      class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant/70"
                      >expand_more</span
                    >
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                  >Description</label
                >
                <textarea
                  rows="4"
                  placeholder="Describe what customers will get..."
                  class="w-full rounded-xl border border-outline-variant/10 bg-surface-container-highest px-4 py-3 text-sm font-medium text-on-surface transition-colors placeholder:text-on-surface-variant/50 focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-6 flex items-center gap-3">
              <span
                class="material-symbols-outlined text-primary"
                style="font-variation-settings: &quot;FILL&quot; 1"
                >link</span
              >
              <h2 class="text-xl font-headline font-bold text-on-surface">
                Product Access
              </h2>
            </div>

            <div class="space-y-6">
              <div class="space-y-2">
                <label
                  class="ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                  >Product Link</label
                >
                <div class="relative">
                  <input
                    type="text"
                    value="https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J"
                    class="h-12 w-full rounded-xl border border-outline-variant/10 bg-surface-container-highest pl-4 pr-12 text-sm font-medium text-on-surface transition-colors focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <div
                    class="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 text-emerald-600"
                  >
                    <span class="material-symbols-outlined text-sm"
                      >check_circle</span
                    >
                  </div>
                </div>
                <div class="flex items-center justify-between px-1">
                  <p class="text-xs text-on-surface-variant">
                    Paste your Google Drive or external download link
                  </p>
                  <p class="text-xs font-bold text-emerald-600">
                    Link verified
                  </p>
                </div>
              </div>

              <div
                class="flex items-center justify-between rounded-xl bg-surface-container-low p-4"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
                  >
                    <span class="material-symbols-outlined text-primary"
                      >public</span
                    >
                  </div>
                  <div>
                    <p class="text-sm font-bold text-on-surface">
                      Public access
                    </p>
                    <p class="text-[10px] text-on-surface-variant">
                      Anyone with the direct link can access the product after
                      purchase.
                    </p>
                  </div>
                </div>

                <label class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" class="peer sr-only" checked />
                  <div
                    class="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"
                  />
                </label>
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
              <h2 class="text-xl font-headline font-bold text-on-surface">
                Product Gallery
              </h2>
            </div>

            <div class="space-y-6">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div
                  class="group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-outline-variant/40 bg-surface-container-high md:col-span-2"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8JHolmD3h_LKtIp08Ng-pi2hjoU57jZ4d5fkRxR_Ab-selDI7QZ9eqGIGv97cmfHTk3kiR9YEwweCGh2ceJxO_YA8wxM4SC_DGDVSEV9CeXbdR3eZj5Vsyqn5whW1n968v9sKtZ5klF4WxLJzKxEXVUBFtJdM34O64R0Ib0oyiGWQVV57P6R_yKt-HeV6u4w24KXjVhnYlg0TbdpMYKnW5gOok3U2TUE1iiIgsKpn1nihNKE1Qiev2KkMoQS-6FATrLaSI6XxJAY"
                    alt="Product cover"
                    class="h-full w-full object-cover"
                  />
                  <div
                    class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
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
                </div>

                <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
                  <div
                    class="group flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-outline-variant/40 bg-surface-container-high transition-colors hover:border-primary"
                  >
                    <div class="p-2 text-center">
                      <span
                        class="material-symbols-outlined text-on-surface-variant/70 group-hover:text-primary"
                        >add_photo_alternate</span
                      >
                      <p
                        class="mt-1 text-[10px] font-bold text-on-surface-variant/70 group-hover:text-primary"
                      >
                        Add Image
                      </p>
                    </div>
                  </div>
                  <div
                    class="group flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-outline-variant/40 bg-surface-container-high transition-colors hover:border-primary"
                  >
                    <div class="p-2 text-center">
                      <span
                        class="material-symbols-outlined text-on-surface-variant/70 group-hover:text-primary"
                        >add_photo_alternate</span
                      >
                      <p
                        class="mt-1 text-[10px] font-bold text-on-surface-variant/70 group-hover:text-primary"
                      >
                        Add Image
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-4">
                <div
                  v-for="slot in 4"
                  :key="slot"
                  class="group flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-outline-variant/20 bg-surface-container-highest transition-colors hover:bg-white"
                >
                  <span
                    class="material-symbols-outlined text-on-surface-variant/70 group-hover:text-primary"
                    >add</span
                  >
                </div>
              </div>

              <p class="text-xs text-on-surface-variant">
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
                <h2 class="text-xl font-headline font-bold text-on-surface">
                  Pricing
                </h2>
              </div>

              <div class="space-y-6">
                <div
                  class="flex gap-4 rounded-full bg-surface-container-high p-1"
                >
                  <button
                    type="button"
                    class="flex-1 rounded-full bg-white py-2 text-xs font-bold text-on-surface shadow-sm"
                  >
                    Paid
                  </button>
                  <button
                    type="button"
                    class="flex-1 py-2 text-xs font-bold text-on-surface-variant"
                  >
                    Free
                  </button>
                </div>
                <div class="space-y-2">
                  <label
                    class="ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
                  >
                    Price (IDR)
                  </label>

                  <div class="relative">
                    <span
                      class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant"
                    >
                      Rp.
                    </span>

                    <input
                      type="text"
                      value="200.000"
                      class="h-12 w-full rounded-xl border border-outline-variant/10 bg-surface-container-highest pl-14 pr-4 text-sm font-bold text-on-surface transition-colors focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
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
                <h2 class="text-xl font-headline font-bold text-on-surface">
                  Status
                </h2>
              </div>

              <div class="flex flex-col justify-center space-y-8 py-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-bold text-on-surface">
                      Product Visibility
                    </h3>
                    <p class="text-[10px] text-on-surface-variant">
                      Is this product ready for sales?
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-on-surface-variant"
                      >Draft</span
                    >
                    <label
                      class="relative inline-flex cursor-pointer items-center"
                    >
                      <input type="checkbox" class="peer sr-only" checked />
                      <div
                        class="h-7 w-14 rounded-full bg-slate-200 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-7"
                      />
                    </label>
                    <span class="text-xs font-bold text-primary">Live</span>
                  </div>
                </div>

                <div
                  class="rounded-xl border border-primary/10 bg-primary/5 p-3 text-[10px] leading-relaxed text-on-surface-variant"
                >
                  Your product will be live at
                  <span class="font-bold text-on-surface"
                    >angpao.com/c/masterclass-photo</span
                  >
                  once published.
                </div>
              </div>
            </AppCard>
          </div>

          <div
            class="mb-12 mt-2 flex flex-col items-start justify-between gap-4 rounded-2xl bg-surface-container-low px-8 py-6 md:flex-row md:items-center"
          >
            <button
              type="button"
              class="rounded-xl px-6 py-3 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
            >
              Cancel
            </button>
            <div class="flex flex-wrap items-center gap-4">
              <button
                type="button"
                class="rounded-xl border border-outline-variant/30 bg-white px-6 py-3 text-sm font-bold text-on-surface shadow-sm transition-colors hover:bg-surface-container-low"
              >
                Save Draft
              </button>
              <button
                type="button"
                class="rounded-full bg-primary px-10 py-3 text-sm font-extrabold text-white shadow-[0_20px_40px_rgba(187,21,44,0.16)] transition-all hover:bg-primary-container"
              >
                Publish Product
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-8 lg:col-span-4">
          <AppCard class="p-6" shadow="sm">
            <div class="mb-4 flex items-center gap-2 text-tertiary">
              <span
                class="material-symbols-outlined"
                style="font-variation-settings: &quot;FILL&quot; 1"
                >lightbulb</span
              >
              <h3 class="text-sm font-bold uppercase tracking-wider">
                Creator Tips
              </h3>
            </div>

            <ul class="space-y-4">
              <li class="flex gap-3">
                <div
                  class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tertiary"
                />
                <p class="text-xs leading-relaxed text-on-surface-variant">
                  Make sure your Google Drive file is set to
                  <span class="font-bold text-on-surface"
                    >"Anyone with the link can view"</span
                  >
                  so customers can access it immediately.
                </p>
              </li>
              <li class="flex gap-3">
                <div
                  class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tertiary"
                />
                <p class="text-xs leading-relaxed text-on-surface-variant">
                  Use high-resolution 16:9 thumbnails to increase conversion by
                  up to <span class="font-bold text-on-surface">35%</span>.
                </p>
              </li>
              <li class="flex gap-3">
                <div
                  class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tertiary"
                />
                <p class="text-xs leading-relaxed text-on-surface-variant">
                  Adding a full gallery of images helps build trust and
                  increases buyer confidence.
                </p>
              </li>
            </ul>
          </AppCard>

          <AppCard class="sticky top-24 overflow-hidden" shadow="md">
            <div
              class="flex items-center gap-2 border-b border-outline-variant/10 bg-surface-container px-4 py-4"
            >
              <div class="flex gap-1.5">
                <div class="h-2.5 w-2.5 rounded-full bg-error/40" />
                <div class="h-2.5 w-2.5 rounded-full bg-tertiary/40" />
                <div class="h-2.5 w-2.5 rounded-full bg-emerald-400/40" />
              </div>
              <span
                class="ml-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60"
                >Product Preview</span
              >
            </div>

            <div class="aspect-video overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADwfxPW0LiiV26IFs6vGbaMylx6THlYdeUePYtsklZeP_7yumGh1o1X43jcCM-CUJArKsaf_9o68_zmAmYq3cXYljjDOZLuPU5zI59KRN4CyrR4a2GzYqeMV8MjzRAQDUYrscy2DbcRbEIxRznCPJvY456pqVu0EjMZ2fFWqAlM0BufX4YJic-r6yaQvr-uJl_GKGA50Wju16XvHpoQ8FiEvoBgh7nuiesM_38y190HVxfVNVQbOJoWfV7HGF0SqSqLTAeYlNMT4E"
                alt="Product preview"
                class="h-full w-full object-cover"
              />
            </div>

            <div class="space-y-4 p-6">
              <div>
                <h3
                  class="text-lg font-headline font-extrabold text-on-surface"
                >
                  Masterclass Photography 2024
                </h3>
                <p class="mt-2 text-xs text-on-surface-variant">
                  Learn the secrets of lighting, composition, and professional
                  editing from industry veterans in this comprehensive course.
                </p>
              </div>

              <div
                class="flex items-center justify-between border-t border-surface-container pt-4"
              >
                <div>
                  <p
                    class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    Price
                  </p>
                  <p class="text-xl font-black text-primary">$49.00</p>
                </div>
                <button
                  type="button"
                  class="rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-[0_10px_24px_rgba(187,21,44,0.2)]"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div class="bg-surface-container-low p-4 text-center">
              <p class="text-[10px] italic text-on-surface-variant">
                This is a simulation of how customers will see your product
                page.
              </p>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
</script>
