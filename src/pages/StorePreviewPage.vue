<template>
  <div class="min-h-screen bg-surface text-on-background">
    <nav class="fixed inset-x-0 top-0 z-50 px-6 py-4">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <RouterLink
          class="group flex items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-2 text-on-surface shadow-sm transition-all hover:bg-surface-container"
          to="/"
        >
          <span
            class="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1"
            >arrow_back</span
          >
          <span class="text-sm font-medium">Back to Marketplace</span>
        </RouterLink>

        <div class="flex gap-3">
          <button
            class="rounded-full bg-surface-container-lowest p-2 text-on-surface shadow-sm transition-colors hover:text-primary"
            type="button"
          >
            <span class="material-symbols-outlined">share</span>
          </button>
          <button
            class="rounded-full bg-surface-container-lowest p-2 text-on-surface shadow-sm transition-colors hover:text-primary"
            type="button"
          >
            <span class="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </div>
    </nav>

    <main class="pb-24 pt-20">
      <header class="relative w-full">
        <div class="h-[320px] w-full overflow-hidden md:h-[450px]">
          <img
            alt="Store Banner"
            class="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjeXgU-M4q64zJXuKxiSsCgn8ONM9WS_rv8X7TtqFupNztNbqpqTQJSz939V5kUtc4zvAJbeviQs06gZhXj1WI5iCRfV75RWFnfhyvXfj8Mk73tpXKKnwG0e9i7jwLVLm04ja8zgt7eaPEQdZcy5ba0j82rSX8znAG-0NMPRWCH9Som01s3gB6sIqRB3Wq8JCLm1joaJjnyn3A5tw_IG0VUsKD4pqU8AESk75m5b8oLT4xPvcm4Vglm6I-_IYOdkYDx5_RLM1d3-I"
          />
        </div>

        <div class="relative mx-auto max-w-7xl px-6">
          <div class="absolute -top-20 left-6 md:left-12">
            <div class="rounded-full bg-surface p-2">
              <div
                class="h-32 w-32 overflow-hidden rounded-full ring-4 ring-surface-container-lowest shadow-xl md:h-44 md:w-44"
              >
                <img
                  alt="Sarah Jenkins profile"
                  class="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAO1EjSeS51eOeBqkLW3lyGDjDstJGJFe2lUZYGV3ai_6q1o2pbRKBh_H6icM2nqPagKc2psJ0cczz2oCPWyHM-v739P_oqT26Hn_KlJRTkkjSyBvz7sRiH6z1Nm7oX24QvVukadyS1WIf8V5z7zP6h3Oq5it4WXF3jmRPcZxTFtRv1R09r6MU96aWKbyF8NAWHXdGWuKWxpAwuz0FMs4UDUf32fEguj4ivnB1aVGVNFehdmsd5J63NntTUJcT268gTL7ABmcKqV0"
                />
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-start justify-between gap-8 pt-24 md:flex-row md:items-end md:pt-32"
          >
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <h1
                  class="text-3xl font-extrabold tracking-tighter text-on-surface md:text-5xl"
                >
                  Luma Media
                </h1>
                <span
                  class="material-symbols-outlined text-2xl text-primary filled"
                  >verified</span
                >
              </div>
              <p class="flex items-center gap-1 text-lg font-medium text-primary">
                Sarah Jenkins
              </p>
              <p class="max-w-xl text-base leading-relaxed text-on-surface-variant">
                Curating premium digital assets for modern storytellers.
                Specialized in high-end Lightroom presets and editorial templates.
              </p>
            </div>

            <div class="flex flex-wrap gap-4">
              <button
                class="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-container px-8 py-4 font-bold text-on-primary shadow-angpao-lg transition-all hover:scale-[1.02] active:scale-95"
                type="button"
              >
                <span class="material-symbols-outlined text-xl">chat_bubble</span>
                Chat with Seller
              </button>
              <button
                class="flex items-center gap-2 rounded-full bg-surface-container-high px-6 py-4 font-semibold text-on-surface transition-colors hover:bg-surface-container-highest"
                type="button"
              >
                <span class="material-symbols-outlined text-xl">flag</span>
                Report Store
              </button>
            </div>
          </div>

          <div class="mt-12 grid grid-cols-3 gap-4 pt-8 md:flex md:gap-16">
            <div v-for="stat in storeStats" :key="stat.label" class="text-center md:text-left">
              <p class="text-2xl font-bold text-on-surface md:text-3xl">{{ stat.value }}</p>
              <p
                class="text-xs font-medium uppercase tracking-widest text-on-surface-variant md:text-sm"
              >
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section class="mx-auto mt-20 max-w-7xl px-6">
        <div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div class="space-y-1">
            <h2 class="text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              Digital Collection
            </h2>
            <p class="text-on-surface-variant">
              Exclusive digital goods by Luma Media
            </p>
          </div>

          <div class="hide-scrollbar flex gap-3 overflow-x-auto pb-2">
            <button
              v-for="filter in filters"
              :key="filter"
              :class="[
                'whitespace-nowrap rounded-full px-6 py-2 text-sm transition-colors',
                selectedFilter === filter
                  ? 'bg-primary font-bold text-on-primary'
                  : 'bg-surface-container-lowest font-medium text-on-surface-variant hover:text-primary',
              ]"
              type="button"
              @click="selectedFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="product in filteredProducts"
            :key="product.name"
            class="group overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0px_20px_40px_rgba(187,21,44,0.04)] transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(187,21,44,0.08)]"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :alt="product.name"
                :src="product.image"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                class="absolute left-4 top-4 rounded-full bg-surface-container-lowest/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md"
              >
                {{ product.tag }}
              </div>
            </div>

            <div class="space-y-4 p-6">
              <div>
                <h3 class="text-xl font-bold text-on-surface transition-colors group-hover:text-primary">
                  {{ product.name }}
                </h3>
                <p class="mt-2 line-clamp-2 text-sm text-on-surface-variant">
                  {{ product.description }}
                </p>
              </div>
              <div class="flex items-center justify-between pt-4">
                <span class="text-lg font-extrabold text-on-surface">
                  {{ product.price }}
                </span>
                <button
                  class="rounded-full bg-primary/5 p-3 text-primary transition-all hover:bg-primary hover:text-on-primary"
                  type="button"
                >
                  <span class="material-symbols-outlined text-xl">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-16 flex justify-center">
          <button
            class="group flex items-center gap-2 rounded-full bg-surface-container-low px-10 py-4 font-bold text-on-surface transition-all hover:bg-surface-container"
            type="button"
          >
            View Entire Collection
            <span class="material-symbols-outlined transition-transform group-hover:translate-y-1">
              expand_more
            </span>
          </button>
        </div>
      </section>

      <section class="mx-auto mt-32 max-w-7xl px-6">
        <div class="relative overflow-hidden rounded-[2rem] bg-surface-container-low p-12 text-center md:p-24">
          <div
            class="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          ></div>
          <div
            class="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl"
          ></div>
          <div class="relative space-y-8">
            <span class="material-symbols-outlined text-5xl text-primary/30">
              format_quote
            </span>
            <h2
              class="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tighter text-on-surface md:text-5xl"
            >
              "Great design isn't just what it looks like, but how it enables your
              creative freedom."
            </h2>
            <div class="space-y-1">
              <p class="text-xl font-bold text-primary">Sarah Jenkins</p>
              <p class="font-medium text-on-surface-variant">Founder of Luma Media</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="mt-24 w-full bg-surface-container-low">
      <div class="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-8 py-20 text-left md:grid-cols-4 lg:px-12">
        <div class="space-y-6">
          <p class="text-xl font-black tracking-tighter text-on-surface">
            Angpao Marketplace
          </p>
          <p class="text-sm leading-relaxed text-on-surface-variant">
            The premier destination for high-end digital assets and creator-led
            commerce. Empowerment through curation.
          </p>
        </div>

        <div v-for="section in footerSections" :key="section.title">
          <p class="mb-6 font-bold text-on-surface">{{ section.title }}</p>
          <ul class="space-y-4">
            <li v-for="item in section.items" :key="item">
              <a class="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
                {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <div class="space-y-6">
          <p class="font-bold text-on-surface">Subscribe to Luma Media</p>
          <div class="relative">
            <input
              class="w-full rounded-full border-none bg-surface-container-lowest px-6 py-3 text-sm focus:ring-2 focus:ring-primary"
              placeholder="Email address"
              type="email"
            />
            <button
              class="absolute bottom-1 right-2 top-1 rounded-full bg-primary px-4 text-xs font-bold text-on-primary"
              type="button"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div
        class="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 border-t border-outline-variant/20 px-8 py-8 md:flex-row lg:px-12"
      >
        <p class="text-sm text-on-surface-variant">
          &copy; 2024 Angpao Digital Concierge. All rights reserved.
        </p>
        <div class="flex gap-6">
          <a
            v-for="icon in socialIcons"
            :key="icon"
            class="text-on-surface-variant transition-all hover:text-primary"
            href="#"
          >
            <span class="material-symbols-outlined">{{ icon }}</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const storeStats = [
  { label: "Total Sales", value: "1.2k" },
  { label: "Followers", value: "4.8k" },
  { label: "Active Products", value: "24" },
];

const filters = ["All Products", "Presets", "E-Books", "Templates"];
const selectedFilter = ref("All Products");

interface ProductCard {
  name: string;
  tag: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

const products: ProductCard[] = [
  {
    name: "Editorial Workflow Bundle",
    tag: "Masterclass",
    category: "Presets",
    description:
      "Complete set of Lightroom presets and PDF guide for creating magazine-ready visuals.",
    price: "Rp 450.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxFs3lJQ8z-7B3KMt4R7HY-hrxshbieId6XHhGOnzkpTQDvI1_S7hXujBaios1m2z-xjJumWp8cjfPEJikqpPQ7iOQahtCXqI4yCR4yBInrlz-evW4QyaYTXAvL362OhxaIPRhaeRX7jSpcZM2xwIfsUEPu3NmDopV6n8q2ajhk1HCK-6C4wl4krUdt-qoypbnlmGNFnUTJgEi38Yb3BKkJhS6CssnwuVdrGfZdc4bUgjEnv6LbjjGHyDlOlra3uneBiorUNVpQtI",
  },
  {
    name: "Creator Story Kit",
    tag: "Template",
    category: "Templates",
    description:
      "50+ minimalist Instagram story templates designed for high conversion engagement.",
    price: "Rp 225.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcK0tZ8JBpRBdVhvDGzlQtfpU-_BthqZyLheWSO-323-EdFQiWW00bfIfyivVK1rtjCKD1zup0PO-2XAX2Z5FrGNe-07ULNNmL9cTviJjJ7rKrVaaCfzmsyD0bqh1OG_kxKSx762SDscEtuOaUQaRaSKa91cW4Fv6Cjxjtk2Fmy8o2aowCjsdvKmLyAUFus5pblhQJYXhsYzXTgoXbuQB5YsmuKpZNlzqjh0sc4W580qZNj1cErjion_p3IY1vG5x3G5yH9sq49Ac",
  },
  {
    name: "The Solopreneur Guide",
    tag: "E-Book",
    category: "E-Books",
    description:
      "A comprehensive 120-page guide on scaling your creative agency from scratch.",
    price: "Rp 385.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArgFCjL0me837PxJU5FVLrLaZksCAiiPO392DXbdEgAaCM7yp_LChRU9Kh-qbDxQ46scFWtJh21o-x-_gZ_JmKP2L3Hwg9QkYqsY64-gDn4GzpD7PbSK-cJJiZTEuCPmGb_qXSgHwmHkCG-MwiULomLIqRFOyLJJUesEj41yC3n6kX2uwcCbbONGr1rucIF7HtHCp7VqcKEd5waxkjdOUG6Vrz-Wb07VpJjiXfXCXTUdSo8BF-9yA62SA9n5dbIv8Kxbqu-ZqFn5E",
  },
  {
    name: "Content Planner Pro",
    tag: "System",
    category: "All Products",
    description:
      "Ultimate Notion operating system for managing YouTube, TikTok, and newsletters.",
    price: "Rp 190.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBE46szOkhBIKHCdPMkorWRlzZCGKhkBP3dcso29ROZFx0qayrPVY8TH_v8c2BOzGR5rDfANp3RAsixMKJhRjyIHyHUdm9PnGkklB9rVa7mD-No3waj36xtPJhrno0J50k3QpZwrlA9lgQNl_mwLgj9ux2vj97Gz3zj20qViYvHa8rNBJ0M5psiSduWYYi_U8QuzmxBvX5-LpF1AOWRXR8jm_qXxLCEZPSV_MyuzzM0C4uI7KgM8bLOM2GlBASwoWhCCCmSu_5p0Nc",
  },
  {
    name: "Cinematic LUTs Pack",
    tag: "Video",
    category: "All Products",
    description:
      "12 professional LUTs for Premiere Pro and Final Cut to achieve a filmic look.",
    price: "Rp 520.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4r-WxRrfD7QAuL24k7brkEh95CghJQknGZ0pI8CqgLAQ8DoOK6HXeP9ijV7XqlFo9nglPN2uDlq0VVCTIVFvnXZHAtAQJGnCYpx-mBlKJBJy0gtL3PmwACKO2yw7EG8GgigJ7diagDSdlBchOX64g5NV1wkPeaNWUuXSJyKcLZ72wFp5eW04jomrCh4zXD7WxMaiqHD1NFxULrmOEAaHLCBTf0j2bmzBiQy5EA1jAhozoQjiasjr4PCF97ipXNvy9hSvBcjmrCv8",
  },
  {
    name: "Texture Overlays Vol. 1",
    tag: "Assets",
    category: "All Products",
    description:
      "High-resolution paper, dust, and grain textures for adding organic depth to photos.",
    price: "Rp 150.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDRMShiPqaRFZaui3NUgxr7OmBwqZNxvTEp-ABehx10tpv2L6X4zC1w4f9l0Csl83kNPR0YiYhDZH4JL3YUpaoCopGA-SZoTq0UqrPxJGjR6GudCnuE54OHDRj3bwiFSRnNS6Gi-QytORqqJLrQ7FIhxV2J602mi-1P4G95c_HN-J-cPRxlOieZoYJLvo5RHWgM4v0uwkFMP-YXZPjHrcT1WwQredudvLIauosdNff88Gdt4xFsubUjxLqhocJfxhJFDlfdMC7Z6w",
  },
];

const filteredProducts = computed(() => {
  if (selectedFilter.value === "All Products") return products;
  return products.filter((product) => product.category === selectedFilter.value);
});

const footerSections = [
  {
    title: "Platform",
    items: ["Discover", "Creators", "Collections", "Guides"],
  },
  {
    title: "Legal",
    items: [
      "Terms of Service",
      "Privacy Policy",
      "Creator Agreement",
      "Help Center",
    ],
  },
];

const socialIcons = ["public", "camera_enhance", "alternate_email"];
</script>
