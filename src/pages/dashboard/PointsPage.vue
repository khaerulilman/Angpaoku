<template>
  <div>
    <DashboardNavbar
      page-title="Points"
      search-placeholder="Search donations..."
    />

    <div class="pt-4 px-10 pb-16 mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2
            class="text-3xl font-extrabold tracking-tight text-on-surface mb-2"
          >
            My Points
          </h2>
          <p class="text-on-surface-variant max-w-md">
            Track your gift performance and manage your earnings with ease.
          </p>
        </div>
        <AppButton variant="brand" size="lg" icon="account_balance_wallet"
          >Withdraw Points</AppButton
        >
      </div>

      <!-- Dashboard Bento -->
      <div class="grid grid-cols-12 gap-8 mb-12">
        <!-- Balance Card -->
        <div
          class="col-span-12 lg:col-span-5 bg-surface-container-lowest p-8 rounded-[2rem] relative overflow-hidden group"
        >
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"
          ></div>
          <div
            class="absolute -bottom-20 -left-20 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"
          ></div>
          <div class="relative z-10 h-full flex flex-col">
            <div class="flex justify-between items-start mb-10">
              <div class="p-3 bg-primary-fixed-dim/30 rounded-2xl">
                <span
                  class="material-symbols-outlined text-primary text-3xl"
                  style="font-variation-settings: &quot;FILL&quot; 1"
                  >toll</span
                >
              </div>
              <span
                class="text-tertiary font-bold text-xs bg-tertiary-fixed px-3 py-1 rounded-full uppercase tracking-wider"
                >Active Balance</span
              >
            </div>
            <div class="mt-auto">
              <span class="text-on-surface-variant font-medium mb-1 block"
                >Total Points</span
              >
              <div class="flex items-baseline gap-2 mb-6">
                <h3
                  class="text-5xl font-extrabold text-on-surface tracking-tighter"
                >
                  1,245,000
                </h3>
                <span class="text-on-surface-variant font-bold">pts</span>
              </div>
              <div
                class="bg-surface-container-low p-5 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <p
                    class="text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-1"
                  >
                    IDR Equivalent
                  </p>
                  <p class="text-2xl font-bold text-secondary">Rp 12.450.000</p>
                </div>
                <div class="text-right">
                  <span
                    class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md"
                    >+12% this week</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="col-span-12 lg:col-span-7 points-stats-grid">
          <div
            class="bg-surface-container-low p-6 rounded-[1.5rem] flex flex-col justify-between hover:bg-surface-container-high transition-colors"
          >
            <span
              class="material-symbols-outlined text-tertiary-container text-4xl mb-4"
              >redeem</span
            >
            <div>
              <p class="text-on-surface-variant text-sm font-medium">
                Total Gifts Received
              </p>
              <p class="text-2xl font-bold">4,128</p>
            </div>
          </div>
          <div
            class="bg-surface-container-low p-6 rounded-[1.5rem] flex flex-col justify-between hover:bg-surface-container-high transition-colors"
          >
            <span class="material-symbols-outlined text-secondary text-4xl mb-4"
              >group</span
            >
            <div>
              <p class="text-on-surface-variant text-sm font-medium">
                Unique Donors
              </p>
              <p class="text-2xl font-bold">892</p>
            </div>
          </div>
          <div
            class="col-span-2 bg-surface-container-lowest p-6 rounded-[1.5rem] flex items-center gap-6 relative overflow-hidden"
          >
            <div class="flex-1">
              <div class="flex justify-between items-center mb-4">
                <h4 class="font-bold">Withdrawal Progress</h4>
                <span class="text-sm font-medium text-tertiary"
                  >75% of goal</span
                >
              </div>
              <div
                class="w-full h-3 bg-tertiary-fixed rounded-full overflow-hidden"
              >
                <div class="h-full bg-tertiary w-3/4 rounded-full"></div>
              </div>
              <p class="text-xs text-on-surface-variant mt-3 italic">
                Threshold reached! You can withdraw your funds anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Donation History -->
      <AppCard shadow="sm" class="rounded-[2rem] p-1 overflow-hidden">
        <div
          class="p-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <h3 class="text-xl font-bold text-on-surface">Donation History</h3>
          <div class="flex items-center gap-3">
            <div
              class="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2"
            >
              <span
                class="material-symbols-outlined text-on-surface-variant text-sm"
                >filter_list</span
              >
              <select
                class="bg-transparent border-none text-sm font-medium text-on-surface-variant focus:ring-0 cursor-pointer"
              >
                <option>All Time</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div
              class="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2"
            >
              <span
                class="material-symbols-outlined text-on-surface-variant text-sm"
                >sort</span
              >
              <span class="text-sm font-medium text-on-surface-variant"
                >Newest First</span
              >
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table
            class="w-full text-left border-separate border-spacing-y-2 px-8"
          >
            <thead
              class="text-on-surface-variant/60 uppercase text-[10px] font-bold tracking-[0.15em]"
            >
              <tr>
                <th class="pb-4 pl-4">User</th>
                <th class="pb-4">Date/Time</th>
                <th class="pb-4">Message</th>
                <th class="pb-4">Points Received</th>
                <th class="pb-4">IDR Equivalent</th>
                <th class="pb-4 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="donation in donations"
                :key="donation.id"
                class="group hover:bg-surface-container-low transition-all cursor-default"
              >
                <td class="py-5 pl-4 rounded-l-2xl">
                  <div class="flex items-center gap-3">
                    <AppAvatar
                      :src="donation.user.avatar"
                      :name="donation.user.name"
                      v-if="!donation.user.isAnonymous"
                    />
                    <div
                      v-else
                      class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center"
                    >
                      <span
                        class="material-symbols-outlined text-on-surface-variant"
                        >person</span
                      >
                    </div>
                    <div>
                      <p class="font-bold text-on-surface text-sm">
                        {{ donation.user.name }}
                      </p>
                      <p class="text-xs text-on-surface-variant">
                        {{ donation.user.username }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="py-5">
                  <p class="text-sm font-medium text-on-surface">
                    {{ donation.date }}
                  </p>
                  <p class="text-[10px] text-on-surface-variant">
                    {{ donation.time }}
                  </p>
                </td>
                <td class="py-5 max-w-[200px]">
                  <p class="text-sm text-on-surface-variant truncate italic">
                    {{ donation.message }}
                  </p>
                </td>
                <td class="py-5">
                  <div class="flex items-center gap-1.5">
                    <span
                      class="material-symbols-outlined text-primary text-lg"
                      style="font-variation-settings: &quot;FILL&quot; 1"
                      >toll</span
                    >
                    <span class="font-bold text-on-surface">{{
                      donation.points
                    }}</span>
                  </div>
                </td>
                <td class="py-5">
                  <p class="font-bold text-on-surface">
                    {{ donation.idrEquivalent }}
                  </p>
                </td>
                <td class="py-5 pr-4 rounded-r-2xl">
                  <AppBadge
                    :variant="
                      donation.status === 'completed' ? 'success' : 'warning'
                    "
                  >
                    {{ donation.status }}
                  </AppBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="p-8 border-t border-outline-variant/10 flex items-center justify-between"
        >
          <p class="text-xs text-on-surface-variant font-medium">
            Showing <span class="text-on-surface">1-4</span> of
            <span class="text-on-surface">128</span> entries
          </p>
          <div class="flex gap-2">
            <button
              class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <span class="material-symbols-outlined text-sm"
                >chevron_left</span
              >
            </button>
            <button
              class="w-8 h-8 rounded-full bg-primary text-on-primary text-xs font-bold"
            >
              1
            </button>
            <button
              class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors"
            >
              2
            </button>
            <button
              class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors"
            >
              3
            </button>
            <button
              class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
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
import AppButton from "@/components/common/AppButton.vue";
import AppCard from "@/components/common/AppCard.vue";
import AppBadge from "@/components/common/AppBadge.vue";
import AppAvatar from "@/components/common/AppAvatar.vue";
import type { Donation } from "@/types";

const donations: Donation[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      username: "@sarahchen88",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmGxzsp35TZElYBSpf1R6dXzkdbaF0MsRIhKgzbBKOKvRFrqTV6xVZ0QLoO-9BcUv_pMKlM6qM19a5IohXAngsD_D9Fo2DeJGIz64KlK07Qu9vC6-scpFOEPxN1oNkjFHQTLAY6tYzKp_dR1bWwKXHsRz1i-7YbW0Px7p0guYCRgI1Hz8P0mWul-QBmb9DoibUK-nbbBYBGDKDzigojzng_gGc_nAj9GYHZd3PDwG2Ml-kLcOTe5VtCnSW6VSBbMNf74suPuBmG-g",
    },
    date: "Oct 24, 2023",
    time: "14:20 PM",
    message: '"Keep up the great work! Your last video was amazing..."',
    points: "5,000 pts",
    idrEquivalent: "Rp 50.000",
    status: "completed",
  },
  {
    id: "2",
    user: {
      name: "Marcus Kim",
      username: "@marcus_dev",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmFWOym6_huF271Eii8qFMgd3AW3abylw61z7U_2H99UCUIlU4wLMpP_UecKBS_eCDY6glYyJtkK0VZJCi1aZPqeZOpFsmimx9UEKNDHJPJqBnW0BUkoSTXSz-o5aEludcuPjA3derNI93mypbwlsK9HzhfDxiutsJ6CvO_9o2XpKgxXbL7IhX_VknS9-GQYw1C7de38ClNg4UVWHr1gnC4bePymEpFVfXg0ty7fgsjch5zp_4ihrYwYctZHm1mP-mBSZzbtijeoc",
    },
    date: "Oct 24, 2023",
    time: "11:05 AM",
    message: '"Supporting from Seoul!"',
    points: "25,000 pts",
    idrEquivalent: "Rp 250.000",
    status: "completed",
  },
  {
    id: "3",
    user: {
      name: "Anonymous Donor",
      username: "private sender",
      isAnonymous: true,
    },
    date: "Oct 23, 2023",
    time: "23:58 PM",
    message: "—",
    points: "1,000 pts",
    idrEquivalent: "Rp 10.000",
    status: "pending",
  },
  {
    id: "4",
    user: {
      name: "Jessica Lee",
      username: "@jesslee_arts",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB1hlspWF3ySKQITwLXIxnY8LCywmS3i8GoQpa7Chm6-PgicWOJrT-VeGUG5OMwDmANrX-XKKpcAlVr8RAibpKD_otsI2-BVeWpYoUe7ckf-KqfU1tE5EXCDIuwi_oEnlXFq8b-nQkzTZFvcx7qPlUtFVD07kFrezeM5HKUmcVm2ZoWHEX9d27dKZN0JGI39zhP7LStLyMHdW8Pgpc0SzSS8fTSm9lSnPJ9rseqoUmSa_aIWiOnrey1UmJ1Ttn6wlz8FuZy6FsSPhE",
    },
    date: "Oct 23, 2023",
    time: "09:12 AM",
    message: '"Happy birthday! Use this for a nice dinner!"',
    points: "50,000 pts",
    idrEquivalent: "Rp 500.000",
    status: "completed",
  },
];
</script>
