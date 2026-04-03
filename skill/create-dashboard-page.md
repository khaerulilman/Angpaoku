# Skill: Create New Dashboard Page (Vue + Tailwind)

## Tujuan

Panduan cepat membuat page baru di area dashboard dengan pola UI yang konsisten, mengikuti referensi:

- `frontend/src/pages/dashboard/ProductsPage.vue`
- `frontend/src/layouts/DashboardLayout.vue`
- `frontend/src/components/dashboard/DashboardNavbar.vue`
- `frontend/src/components/dashboard/DashboardSidebar.vue`

## Prinsip Utama Layout

1. Sidebar, navbar, dan footer **sudah disediakan oleh layout** `DashboardLayout.vue`.
2. Page baru cukup fokus ke konten utama (section/filters/cards/table).
3. Navbar per-page dipanggil dari komponen halaman dengan `DashboardNavbar`.

Contoh pemakaian navbar di page:

```vue
<DashboardNavbar page-title="Page Title" search-placeholder="Search data..." />
```

## Template Cepat File Page Baru

Buat file baru di `frontend/src/pages/dashboard/ContohPage.vue`:

```vue
<template>
  <div>
    <DashboardNavbar
      page-title="Contoh Page"
      search-placeholder="Search item..."
    />

    <div class="w-full mx-auto p-8">
      <div
        class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1
            class="mb-2 text-4xl font-headline font-extrabold tracking-tight text-on-surface"
          >
            Contoh Dashboard Section
          </h1>
          <p class="max-w-md leading-relaxed text-on-surface-variant">
            Deskripsi singkat fitur page ini.
          </p>
        </div>
      </div>

      <AppCard class="p-6" shadow="sm">
        <p class="text-sm text-on-surface-variant">Isi konten utama di sini.</p>
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
</script>
```

## Integrasi Route Dashboard

Tambahkan child route baru di `frontend/src/router/index.ts` pada parent path `/dashboard`:

```ts
{
  path: "contoh-page",
  name: "contoh-page",
  component: () => import("@/pages/dashboard/ContohPage.vue"),
  meta: { title: "Contoh Page | Angpaoku Dashboard" },
}
```

## Integrasi Menu Sidebar

Tambahkan item baru di `frontend/src/stores/dashboard.ts` pada `navItems`:

```ts
{ label: "Contoh Page", icon: "dashboard_customize", route: "/dashboard/contoh-page" }
```

## Pola Responsive Yang Dipakai

Ikuti pola utility class yang sudah dipakai di `ProductsPage.vue`:

- Gunakan `flex flex-col md:flex-row` untuk layout yang stack di mobile dan sejajar di desktop.
- Gunakan `w-full` untuk elemen form/filter dan batasi lebar desktop dengan `md:w-[...]`.
- Untuk tabel/list lebar, bungkus dengan `overflow-x-auto`.
- Jaga jarak konsisten dengan `p-8`, `mb-6`, `mb-10`, `gap-3`, `gap-4`.
- Hindari fixed width tanpa breakpoint agar tidak pecah di layar kecil.

## Pola Design / Style

1. Typography:

- Heading utama: `font-headline font-extrabold tracking-tight`
- Label kecil: `text-xs uppercase tracking-widest font-bold`
- Body text: `text-on-surface-variant leading-relaxed`

2. Surface dan border:

- Gunakan token warna design system: `bg-surface*`, `text-on-surface*`, `border-outline-variant/*`
- Card utama: `AppCard` + `shadow="sm"` + radius rounded dari component.

3. Interaction state:

- Hover: `hover:bg-*`, `hover:border-*`, `hover:text-primary`
- Focus input/select: `focus:ring-2 focus:ring-primary/20 focus:outline-none`
- Transition: `transition-colors` atau `transition-all` seperlunya.

## Checklist Sebelum Selesai

- File page baru sudah dibuat di `src/pages/dashboard`.
- Route baru sudah terdaftar di router dashboard.
- Menu sidebar sudah muncul dan route aktif terbaca benar.
- Tampilan aman di mobile (< md), tablet (md), desktop (lg+).
- Footer tetap muncul dari `DashboardLayout.vue` tanpa duplikasi footer di page.
