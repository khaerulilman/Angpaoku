<template>
  <div>
    <DashboardNavbar
      page-title="Withdraw"
      search-placeholder="Search withdrawals..."
    />

    <div class="p-8 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1
          class="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2"
        >
          Withdraw Funds
        </h1>
        <p class="text-on-surface-variant max-w-md leading-relaxed">
          Cash out your earnings instantly. No waiting, no hidden fees.
        </p>
      </div>

      <!-- Verification Warning -->
      <VerificationWarningBanner class="mb-8" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: Withdraw Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Balance Overview -->
          <div
            class="bg-gradient-to-br from-primary to-primary-container p-8 rounded-2xl text-white relative overflow-hidden"
          >
            <div class="relative z-10">
              <p
                class="text-white/70 text-sm font-medium uppercase tracking-widest mb-2"
              >
                Available Balance
              </p>
              <h2 class="text-5xl font-extrabold tracking-tighter mb-4">
                Rp 12.450.000
              </h2>
              <div class="flex items-center gap-4">
                <span
                  class="bg-white/20 px-3 py-1 rounded-full text-xs font-bold"
                  >84,200 Points</span
                >
                <span class="text-white/70 text-xs">≈ $825.00 USD</span>
              </div>
            </div>
            <div
              class="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"
            ></div>
          </div>

          <!-- Withdraw Form -->
          <AppCard class="p-8" shadow="sm">
            <h3 class="font-bold text-lg mb-6">Request Withdrawal</h3>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-on-surface mb-2"
                  >Amount (IDR)</label
                >
                <input
                  type="text"
                  class="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-secondary/10"
                  placeholder="Rp 0"
                  value="Rp 5.000.000"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-on-surface mb-2"
                  >Withdraw Method</label
                >
                <div class="grid grid-cols-3 gap-3">
                  <button
                    v-for="method in methods"
                    :key="method.value"
                    :class="[
                      'py-3 rounded-xl flex flex-col items-center gap-2 text-xs font-medium transition-all',
                      selectedMethod === method.value
                        ? 'bg-white border-2 border-primary text-primary font-bold shadow-sm'
                        : 'bg-surface-container-low border-2 border-transparent hover:border-outline-variant text-on-surface-variant',
                    ]"
                    @click="selectedMethod = method.value"
                  >
                    <span class="material-symbols-outlined">{{
                      method.icon
                    }}</span>
                    {{ method.label }}
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-bold text-on-surface mb-2"
                  >Bank Account</label
                >
                <input
                  type="text"
                  class="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/10"
                  placeholder="Account number"
                  value="•••• •••• •••• 4829"
                />
              </div>
              <AppButton
                variant="brand"
                size="lg"
                class="w-full"
                icon="payments"
              >
                Submit Withdrawal Request
              </AppButton>
            </div>
          </AppCard>
        </div>

        <!-- Right: History -->
        <div class="space-y-6">
          <AppCard class="p-6" shadow="sm">
            <h3 class="font-bold text-lg mb-6">Recent Withdrawals</h3>
            <div class="space-y-5">
              <div
                v-for="tx in history"
                :key="tx.id"
                class="flex items-center gap-4"
              >
                <div
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    tx.iconBg,
                  ]"
                >
                  <span
                    class="material-symbols-outlined text-lg"
                    :class="tx.iconClass"
                    >{{ tx.icon }}</span
                  >
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold truncate">{{ tx.amount }}</p>
                  <p class="text-[10px] text-on-surface-variant">
                    {{ tx.date }}
                  </p>
                </div>
                <AppBadge :variant="tx.statusVariant" :dot="true">{{
                  tx.status
                }}</AppBadge>
              </div>
            </div>
          </AppCard>

          <!-- Info Card -->
          <div class="bg-surface-container-low p-6 rounded-2xl">
            <div class="flex items-start gap-3">
              <span
                class="material-symbols-outlined text-tertiary text-xl mt-0.5"
                >info</span
              >
              <div>
                <p class="text-sm font-bold mb-1">Processing Time</p>
                <p class="text-xs text-on-surface-variant leading-relaxed">
                  Bank transfers typically take 1-3 business days. E-wallet
                  transfers are processed instantly during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import AppButton from "@/components/common/AppButton.vue";
import AppBadge from "@/components/common/AppBadge.vue";
import VerificationWarningBanner from "@/components/common/VerificationWarningBanner.vue";

const selectedMethod = ref("bank");

const methods = [
  { value: "bank", label: "Bank Transfer", icon: "account_balance" },
  { value: "ewallet", label: "E-Wallet", icon: "wallet" },
  { value: "crypto", label: "Crypto", icon: "currency_bitcoin" },
];

const history = [
  {
    id: "1",
    amount: "Rp 3.000.000",
    date: "Oct 20, 2023",
    status: "Completed",
    statusVariant: "success" as const,
    icon: "check_circle",
    iconBg: "bg-green-50",
    iconClass: "text-green-600",
  },
  {
    id: "2",
    amount: "Rp 5.000.000",
    date: "Oct 15, 2023",
    status: "Completed",
    statusVariant: "success" as const,
    icon: "check_circle",
    iconBg: "bg-green-50",
    iconClass: "text-green-600",
  },
  {
    id: "3",
    amount: "Rp 2.500.000",
    date: "Oct 10, 2023",
    status: "Processing",
    statusVariant: "warning" as const,
    icon: "pending",
    iconBg: "bg-amber-50",
    iconClass: "text-amber-600",
  },
  {
    id: "4",
    amount: "Rp 1.000.000",
    date: "Oct 5, 2023",
    status: "Completed",
    statusVariant: "success" as const,
    icon: "check_circle",
    iconBg: "bg-green-50",
    iconClass: "text-green-600",
  },
];
</script>
