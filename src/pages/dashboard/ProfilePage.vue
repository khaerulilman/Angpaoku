<template>
  <div>
    <DashboardNavbar
      page-title="Profile"
      search-placeholder="Search settings..."
    />

    <div class="mx-auto w-full p-8">
      <div
        class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1
            class="mb-2 text-4xl font-headline font-extrabold tracking-tight text-on-surface"
          >
            Profile Settings
          </h1>
          <p class="max-w-2xl leading-relaxed text-on-surface-variant">
            Manage your public identity, creator branding, social channels, and
            account security from one curated profile workspace.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div class="space-y-6 xl:col-span-4">
          <AppCard class="overflow-hidden" shadow="sm">
            <!-- Banner Image -->
            <div class="relative h-48 w-full">
              <img
                class="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=300&fit=crop"
                alt="Profile banner"
              />
              <div
                class="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20"
              ></div>
              <button
                class="absolute right-4 top-4 rounded-full border border-outline-variant/20 bg-white/90 p-2 text-primary shadow-sm transition-transform hover:scale-110"
                type="button"
              >
                <span class="material-symbols-outlined text-sm"
                  >photo_camera</span
                >
              </button>
            </div>

            <!-- Profile Content -->
            <div class="flex flex-col items-center px-8 pb-8 pt-0 text-center">
              <div class="relative -mt-20 mb-6">
                <div
                  class="h-40 w-40 overflow-hidden rounded-full border-4 border-primary-fixed-dim bg-white"
                >
                  <img
                    class="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABIm_EBNcnD3VD4Kzx94u-Xygh_j5rz1oLVliUnVMW9_jMksaj0PUuRYMnoNAG54zaZYbpY1gKlsDuQHnAoUG3DRzRf12Ophl-TyouOr6FhaHNnX_qMnJFs9k4ng-jfiBoIYj2hIgCWVGeQvQqAPsJB3D6kMDETjzVyWy21d76L_caeLpNeAdC8jT_NpFhcKXfOZdpmRlqR2Q2zQjcIwAzw3R_uBTfjLsJPwZaqSTvh5MK_naIq2lGHmiGJsi-gRAjxQBFenzJPBc"
                    alt="Creator profile"
                  />
                </div>
                <button
                  class="absolute bottom-2 right-2 rounded-full border border-outline-variant/20 bg-white p-2 text-primary shadow-sm transition-transform hover:scale-110"
                  type="button"
                >
                  <span class="material-symbols-outlined text-sm"
                    >photo_camera</span
                  >
                </button>
              </div>

              <h2 class="mb-1 flex items-center gap-2 text-2xl font-bold">
                Anya Richardson
                <span
                  class="material-symbols-outlined text-xl text-blue-500"
                  style="font-variation-settings: &quot;FILL&quot; 1"
                  >verified</span
                >
              </h2>
              <p class="mb-4 font-medium text-on-surface-variant">
                @anyacreates
              </p>
              <p class="mb-6 text-sm leading-relaxed text-on-surface-variant">
                Digital artist and content strategist helping creators build
                sustainable ecosystems through authentic connection.
              </p>
              <div class="flex w-full gap-3">
                <button
                  class="flex-1 rounded-full bg-gradient-to-br from-primary to-primary-container py-2.5 font-semibold text-on-primary shadow-[0_20px_40px_rgba(187,21,44,0.06)] transition-all active:scale-95"
                  type="button"
                >
                  Edit Profile
                </button>
                <button
                  class="rounded-full bg-surface-container-high p-2.5 text-on-surface transition-colors hover:bg-surface-container-highest active:scale-95"
                  type="button"
                >
                  <span class="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
          </AppCard>

          <AppCard class="bg-surface-container-low p-6" shadow="sm">
            <h3
              class="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70"
            >
              Creator Stats
            </h3>
            <div class="space-y-4">
              <div
                class="flex items-center justify-between rounded-xl bg-surface-container-lowest p-4"
              >
                <div>
                  <p class="text-xs text-on-surface-variant">Total Sales</p>
                  <p class="text-xl font-bold text-on-surface">1,240</p>
                </div>
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed-dim/30 text-primary"
                >
                  <span class="material-symbols-outlined">shopping_bag</span>
                </div>
              </div>
              <div
                class="flex items-center justify-between rounded-xl bg-surface-container-lowest p-4"
              >
                <div>
                  <p class="text-xs text-on-surface-variant">Total Revenue</p>
                  <p class="text-xl font-bold text-on-surface">$15,400</p>
                </div>
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-tertiary-fixed-dim/30 text-tertiary"
                >
                  <span class="material-symbols-outlined">payments</span>
                </div>
              </div>
              <div
                class="flex items-center justify-between rounded-xl bg-surface-container-lowest p-4"
              >
                <div>
                  <p class="text-xs text-on-surface-variant">
                    Products Created
                  </p>
                  <p class="text-xl font-bold text-on-surface">12</p>
                </div>
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container/30 text-secondary"
                >
                  <span class="material-symbols-outlined">inventory_2</span>
                </div>
              </div>
            </div>
          </AppCard>
        </div>

        <div class="space-y-8 xl:col-span-8">
          <AppCard class="p-8" shadow="sm">
            <div class="mb-8 flex items-center gap-3">
              <div class="h-8 w-1.5 rounded-full bg-primary"></div>
              <h3 class="text-xl font-bold text-on-surface">
                Personal Information
              </h3>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  for="fullName"
                  >Full Name</label
                >
                <input
                  id="fullName"
                  class="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/10"
                  type="text"
                  value="Anya Richardson"
                />
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  for="username"
                  >Username</label
                >
                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                    >@</span
                  >
                  <input
                    id="username"
                    class="w-full rounded-xl bg-surface-container-highest py-3 pl-9 pr-4 text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/10"
                    type="text"
                    value="anyacreates"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  for="email"
                  >Email Address (Readonly)</label
                >
                <div class="relative">
                  <input
                    id="email"
                    class="w-full cursor-not-allowed rounded-xl bg-surface-container-low px-4 py-3 text-on-surface-variant/70"
                    readonly
                    type="email"
                    value="anya.richardson@example.com"
                  />
                  <span
                    class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant"
                    >lock</span
                  >
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  for="phone"
                  >Phone Number</label
                >
                <input
                  id="phone"
                  class="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/10"
                  type="tel"
                  value="+62 812-3456-7890"
                />
              </div>

              <div class="space-y-2 md:col-span-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  for="location"
                  >Location</label
                >
                <div class="relative">
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                    >location_on</span
                  >
                  <input
                    id="location"
                    class="w-full rounded-xl bg-surface-container-highest py-3 pl-12 pr-4 text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/10"
                    type="text"
                    value="Jakarta, Indonesia"
                  />
                </div>
              </div>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-8 flex items-center gap-3">
              <div class="h-8 w-1.5 rounded-full bg-tertiary"></div>
              <h3 class="text-xl font-bold text-on-surface">
                Bio and Branding
              </h3>
            </div>

            <div class="space-y-6">
              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  for="tagline"
                  >Creator Tagline</label
                >
                <input
                  id="tagline"
                  class="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/10"
                  placeholder="Creating magic through digital art"
                  type="text"
                />
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  for="bio"
                  >Bio</label
                >
                <textarea
                  id="bio"
                  class="w-full resize-none rounded-xl bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/10"
                  rows="4"
                >
Digital artist and content strategist. Helping creators build sustainable ecosystems through authentic connection.</textarea
                >
                <p class="text-right text-xs text-on-surface-variant">
                  102 / 300 characters
                </p>
              </div>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-8 flex items-center gap-3">
              <div class="h-8 w-1.5 rounded-full bg-secondary"></div>
              <h3 class="text-xl font-bold text-on-surface">
                Social Media Links
              </h3>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div
                class="flex items-center gap-3 rounded-xl bg-surface-container-low p-2"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600"
                >
                  <span class="material-symbols-outlined">smart_display</span>
                </div>
                <input
                  class="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  placeholder="YouTube URL"
                  type="text"
                />
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-surface-container-low p-2"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-600"
                >
                  <span class="material-symbols-outlined">photo_camera</span>
                </div>
                <input
                  class="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  placeholder="Instagram Username"
                  type="text"
                />
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-surface-container-low p-2"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white"
                >
                  <span class="material-symbols-outlined">music_note</span>
                </div>
                <input
                  class="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  placeholder="TikTok Username"
                  type="text"
                />
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-surface-container-low p-2"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white"
                >
                  X
                </div>
                <input
                  class="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  placeholder="X Username"
                  type="text"
                />
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-surface-container-low p-2"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600"
                >
                  <span class="material-symbols-outlined">language</span>
                </div>
                <input
                  class="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  placeholder="Personal Website"
                  type="text"
                />
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-surface-container-low p-2"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"
                >
                  <span class="material-symbols-outlined">forum</span>
                </div>
                <input
                  class="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  placeholder="Discord Link"
                  type="text"
                />
              </div>
            </div>
          </AppCard>

          <AppCard class="relative overflow-hidden p-8" shadow="sm">
            <div
              class="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-secondary-container/10 blur-3xl"
            ></div>
            <div
              class="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
            >
              <div class="flex items-center gap-4">
                <div
                  class="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600"
                >
                  <span class="material-symbols-outlined text-4xl"
                    >verified_user</span
                  >
                </div>
                <div>
                  <h3 class="text-xl font-bold text-on-surface">
                    Verification Status
                  </h3>
                  <p
                    class="mt-1 flex items-center gap-1 font-bold text-green-600"
                  >
                    <span
                      class="material-symbols-outlined text-base"
                      style="font-variation-settings: &quot;FILL&quot; 1"
                      >check_circle</span
                    >
                    Verified (KTP Verified)
                  </p>
                </div>
              </div>

              <button
                class="rounded-full bg-surface-container-highest px-6 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
                type="button"
              >
                View Certificate
              </button>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-8 flex items-center gap-3">
              <div class="h-8 w-1.5 rounded-full bg-error"></div>
              <h3 class="text-xl font-bold text-on-surface">
                Security Settings
              </h3>
            </div>

            <div class="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div
                class="flex items-center justify-between rounded-xl bg-surface-container-low p-4"
              >
                <div class="flex items-center gap-4">
                  <span
                    class="material-symbols-outlined text-on-surface-variant"
                    >password</span
                  >
                  <div>
                    <p class="text-sm font-bold text-on-surface">Password</p>
                    <p class="text-xs text-on-surface-variant">
                      Last updated 3 months ago
                    </p>
                  </div>
                </div>
                <button
                  class="text-sm font-bold text-primary hover:underline"
                  type="button"
                >
                  Change
                </button>
              </div>

              <div
                class="flex items-center justify-between rounded-xl bg-surface-container-low p-4"
              >
                <div class="flex items-center gap-4">
                  <span
                    class="material-symbols-outlined text-on-surface-variant"
                    >security</span
                  >
                  <div>
                    <p class="text-sm font-bold text-on-surface">
                      Two-Factor Auth
                    </p>
                    <p class="text-xs text-on-surface-variant">
                      Add extra security
                    </p>
                  </div>
                </div>
                <label class="relative inline-flex cursor-pointer items-center">
                  <input checked class="peer sr-only" type="checkbox" />
                  <span
                    class="h-6 w-11 rounded-full bg-surface-container-highest after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"
                  ></span>
                </label>
              </div>
            </div>
          </AppCard>

          <div
            class="flex items-center justify-end gap-4 rounded-2xl bg-surface-container-low p-4"
          >
            <button
              class="rounded-full px-8 py-3 font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
              type="button"
            >
              Cancel
            </button>
            <button
              class="rounded-full bg-gradient-to-br from-primary to-primary-container px-10 py-3 font-bold text-on-primary shadow-[0_20px_40px_rgba(187,21,44,0.06)] transition-all hover:scale-[1.02] active:scale-95"
              type="button"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
</script>
