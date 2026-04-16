<template>
  <div class="min-h-[max(884px,100dvh)] bg-surface text-on-surface antialiased">
    <header
      class="fixed left-0 right-0 top-0 z-50 mx-auto w-full max-w-md bg-[#fcf8fb]/60 backdrop-blur-xl"
    >
      <div class="flex h-16 items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <button
            class="material-symbols-outlined rounded-full p-2 text-primary transition-colors duration-200 hover:bg-black/5 active:scale-95"
            type="button"
            @click="handleBack"
          >
            arrow_back
          </button>
          <h1 class="text-lg font-bold tracking-tight text-on-surface">
            Angpao Gift
          </h1>
        </div>
        <button
          class="material-symbols-outlined rounded-full p-2 text-primary transition-colors duration-200 hover:bg-black/5 active:scale-95"
          type="button"
          @click="handleShare"
        >
          share
        </button>
      </div>
    </header>

    <main class="mx-auto max-w-md space-y-8 px-6 pb-32 pt-20">
      <section
        class="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-6 shadow-[0px_20px_40px_rgba(187,21,44,0.04)]"
      >
        <div
          class="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5"
        ></div>

        <div v-if="isLoadingPage" class="space-y-4">
          <div
            class="mx-auto h-24 w-24 animate-pulse rounded-full bg-surface-container"
          ></div>
          <div
            class="mx-auto h-5 w-1/2 animate-pulse rounded bg-surface-container"
          ></div>
          <div
            class="mx-auto h-4 w-4/5 animate-pulse rounded bg-surface-container"
          ></div>
        </div>

        <div
          v-else-if="pageError"
          class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {{ pageError }}
        </div>

        <div
          v-else-if="creator"
          class="relative z-10 flex flex-col items-center space-y-4 text-center"
        >
          <div class="relative">
            <img
              :alt="`${creator.full_name} Profile`"
              :src="creator.profile_photo || fallbackAvatar"
              class="h-24 w-24 rounded-full object-cover ring-4 ring-primary/10"
            />
            <div
              v-if="creator.is_verified"
              class="absolute -bottom-1 -right-1 rounded-full bg-tertiary-fixed p-1.5 text-on-tertiary-fixed shadow-sm"
            >
              <span
                class="material-symbols-outlined block text-sm"
                style="font-variation-settings: &quot;FILL&quot; 1"
              >
                verified
              </span>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-extrabold tracking-tight text-on-surface">
              {{ creator.full_name }}
            </h2>
            <p class="mt-1 text-xs font-semibold text-tertiary">
              @{{ creator.username }}
            </p>
            <p class="mt-2 text-sm leading-relaxed text-on-surface-variant">
              {{
                creator.bio || "Support this creator with your best donation."
              }}
            </p>
          </div>

          <RouterLink
            :to="`/store-preview/${creator.username}`"
            class="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-4 py-2 text-xs font-semibold text-on-surface-variant transition hover:bg-primary/10 hover:text-primary"
          >
            <span class="material-symbols-outlined text-sm">storefront</span>
            Go to @{{ creator.username }} store
          </RouterLink>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-on-surface">Choose Amount</h3>
          <span
            class="rounded-md bg-tertiary-fixed px-2 py-1 text-xs font-semibold text-tertiary"
          >
            IDR
          </span>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="amount in presetAmounts"
            :key="amount"
            :class="[
              'flex flex-col items-center justify-center rounded-2xl py-4 transition-all',
              isPresetSelected(amount)
                ? 'bg-primary-container text-on-primary-container shadow-lg shadow-primary/20 active:scale-95'
                : 'bg-surface-container-lowest shadow-sm hover:bg-primary/5 active:bg-primary/10',
            ]"
            type="button"
            @click="selectPresetAmount(amount)"
          >
            <span
              :class="
                isPresetSelected(amount)
                  ? 'text-xs font-medium opacity-80'
                  : 'text-xs font-medium text-on-surface-variant'
              "
            >
              Rp
            </span>
            <span
              :class="
                isPresetSelected(amount)
                  ? 'text-lg font-bold'
                  : 'text-lg font-bold text-on-surface'
              "
            >
              {{ formatCompactAmount(amount) }}
            </span>
          </button>
        </div>

        <div class="group relative">
          <div
            class="pointer-events-none absolute inset-y-0 left-4 flex items-center"
          >
            <span class="text-sm font-semibold text-on-surface-variant"
              >Rp</span
            >
          </div>
          <input
            v-model.number="customAmount"
            class="w-full rounded-2xl border-none bg-surface-container-highest py-4 pl-12 pr-4 font-semibold text-on-surface transition-all placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
            min="0"
            placeholder="Enter custom amount"
            type="number"
          />
        </div>
      </section>

      <section class="space-y-6">
        <h3 class="text-lg font-bold text-on-surface">Supporter Details</h3>
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label
              class="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant"
            >
              Display Name
            </label>
            <input
              v-model.trim="supporterName"
              class="w-full rounded-2xl border-none bg-surface-container-highest px-4 py-4 transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
              placeholder="How should we call you?"
              type="text"
            />
          </div>

          <div class="space-y-1.5">
            <label
              class="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant"
            >
              Email Address
            </label>
            <input
              v-model.trim="supporterEmail"
              class="w-full rounded-2xl border-none bg-surface-container-highest px-4 py-4 transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
              placeholder="your@gmail.com"
              type="email"
            />
            <!-- real-time points display -->
            <div
              v-if="pointsStatus !== 'idle'"
              class="flex items-center gap-1.5 px-1 pt-0.5"
            >
              <span
                v-if="pointsStatus === 'loading'"
                class="text-xs text-on-surface-variant"
                >Mengecek points...</span
              >
              <span
                v-else-if="pointsStatus === 'error'"
                class="text-xs font-medium text-red-500"
                >{{ pointsError }}</span
              >
              <template
                v-else-if="pointsStatus === 'loaded' && donorPoints !== null"
              >
                <span
                  class="material-symbols-outlined text-sm"
                  :class="
                    donorPoints > 0 ? 'text-primary' : 'text-on-surface-variant'
                  "
                  style="font-variation-settings: &quot;FILL&quot; 1"
                  >stars</span
                >
                <span
                  :class="
                    donorPoints > 0
                      ? 'text-xs font-semibold text-primary'
                      : 'text-xs text-on-surface-variant'
                  "
                >
                  {{
                    donorPoints > 0
                      ? `${donorPoints} points tersedia`
                      : "Tidak punya points"
                  }}
                </span>
              </template>
            </div>
          </div>

          <div class="space-y-1.5">
            <label
              class="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant"
            >
              Your Message (Optional)
            </label>
            <textarea
              v-model.trim="supporterMessage"
              class="w-full resize-none rounded-2xl border-none bg-surface-container-highest px-4 py-4 transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
              placeholder="Write a sweet supporting note..."
              rows="3"
            ></textarea>
          </div>
        </div>
      </section>

      <section v-if="checkoutNotice" class="space-y-4">
        <div
          :class="[
            'rounded-2xl border p-4 text-sm font-medium',
            checkoutNoticeClass,
          ]"
        >
          <p>{{ checkoutNotice }}</p>
          <p v-if="currentOrderID" class="mt-2 text-xs opacity-80">
            Order ID: {{ currentOrderID }}
          </p>
        </div>
      </section>

      <section class="space-y-4 pt-4">
        <div
          class="flex items-center justify-center gap-2 text-on-surface-variant/60"
        >
          <span class="material-symbols-outlined text-sm">lock</span>
          <span class="text-xs font-medium"
            >Secure SSL Encrypted Transaction</span
          >
        </div>

        <button
          :disabled="!canSubmit || isSubmitting"
          class="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-primary to-primary-container py-5 text-lg font-extrabold text-on-primary shadow-[0px_20px_40px_rgba(187,21,44,0.15)] transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          @click="submitDonation"
        >
          {{
            isSubmitting ? "Processing..." : `Send Donation ${formattedAmount}`
          }}
          <span class="material-symbols-outlined">favorite</span>
        </button>

        <p class="px-8 text-center text-[10px] text-on-surface-variant/40">
          By clicking Send Donation, you agree to our Terms of Service and
          Privacy Policy. All transactions are non-refundable.
        </p>
      </section>
    </main>

    <div
      class="pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
      style="
        background-image: url(&quot;https://www.transparenttextures.com/patterns/natural-paper.png&quot;);
      "
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  donationsApi,
  type PublicDonationCreator,
  type PublicDonationSummary,
} from "@/api";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RouterLink } from "vue-router";

type NoticeType = "success" | "warning" | "error" | "info";

interface SnapCallbackResult {
  order_id?: string;
  transaction_status?: string;
  status_message?: string;
}

interface MidtransSnap {
  pay: (
    token: string,
    options?: {
      onSuccess?: (result: SnapCallbackResult) => void;
      onPending?: (result: SnapCallbackResult) => void;
      onError?: (result: SnapCallbackResult) => void;
      onClose?: () => void;
    },
  ) => void;
}

declare global {
  interface Window {
    snap?: MidtransSnap;
  }
}

const MIDTRANS_SNAP_SCRIPT_URL =
  "https://app.sandbox.midtrans.com/snap/snap.js";
const fallbackAvatar =
  "https://ui-avatars.com/api/?background=F3E8EA&color=B10D21&bold=true&name=Creator";

const route = useRoute();
const router = useRouter();

const isLoadingPage = ref(false);
const pageError = ref("");
const creator = ref<PublicDonationCreator | null>(null);
const summary = ref<PublicDonationSummary>({
  total_amount: 0,
  total_donations: 0,
  unique_donors: 0,
});

const presetAmounts = [10000, 50000, 100000];
const selectedAmount = ref(50000);
const customAmount = ref<number | null>(null);
const supporterName = ref("");
const supporterEmail = ref("");
const supporterMessage = ref("");

const isSubmitting = ref(false);
const checkoutNotice = ref("");
const checkoutNoticeType = ref<NoticeType>("info");
const currentOrderID = ref("");

const donorPoints = ref<number | null>(null);
const pointsStatus = ref<"idle" | "loading" | "loaded" | "error">("idle");
const pointsError = ref("");
let pointsDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let pointsAbort: AbortController | null = null;

const routeUsername = computed(() =>
  String(route.params.username ?? "")
    .trim()
    .toLowerCase(),
);

const activeAmount = computed(() => {
  if (customAmount.value && customAmount.value > 0) {
    return customAmount.value;
  }

  return selectedAmount.value;
});

const formattedAmount = computed(() => formatIDR(activeAmount.value));

const canSubmit = computed(() => {
  return (
    creator.value !== null &&
    supporterName.value !== "" &&
    supporterEmail.value !== "" &&
    activeAmount.value > 0
  );
});

const checkoutNoticeClass = computed(() => {
  switch (checkoutNoticeType.value) {
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "error":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
});

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatCompactAmount(value: number): string {
  if (value >= 1000) {
    return `${Math.floor(value / 1000)}k`;
  }

  return String(value);
}

function isPresetSelected(amount: number): boolean {
  return (
    (!customAmount.value || customAmount.value <= 0) &&
    selectedAmount.value === amount
  );
}

function selectPresetAmount(amount: number): void {
  selectedAmount.value = amount;
  customAmount.value = null;
}

function setCheckoutNotice(type: NoticeType, message: string): void {
  checkoutNoticeType.value = type;
  checkoutNotice.value = message;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isGmailEmail(email: string): boolean {
  return (
    isValidEmail(email) && email.trim().toLowerCase().endsWith("@gmail.com")
  );
}

async function fetchDonorPoints(email: string): Promise<void> {
  if (pointsAbort) pointsAbort.abort();
  pointsAbort = new AbortController();
  pointsStatus.value = "loading";
  pointsError.value = "";

  try {
    const result = await donationsApi.checkPoints(email, pointsAbort.signal);
    donorPoints.value = result.total_points;
    pointsStatus.value = "loaded";
  } catch {
    if (pointsAbort?.signal.aborted) return;
    donorPoints.value = null;
    pointsStatus.value = "error";
    pointsError.value = "Gagal mengambil data points";
  }
}

async function loadCreatorPage(): Promise<void> {
  if (routeUsername.value === "") {
    pageError.value = "Username creator pada URL tidak valid.";
    creator.value = null;
    summary.value = {
      total_amount: 0,
      total_donations: 0,
      unique_donors: 0,
    };
    return;
  }

  isLoadingPage.value = true;
  pageError.value = "";

  try {
    const result = await donationsApi.getPublicByUsername(routeUsername.value);
    creator.value = result.creator;
    summary.value = result.summary;
  } catch (error) {
    creator.value = null;
    summary.value = {
      total_amount: 0,
      total_donations: 0,
      unique_donors: 0,
    };
    pageError.value =
      error instanceof Error ? error.message : "Failed to load donation page.";
  } finally {
    isLoadingPage.value = false;
  }
}

function resolveOrderID(
  fallbackOrderID: string,
  callbackResult?: SnapCallbackResult,
): string {
  const callbackOrderID = callbackResult?.order_id?.trim();
  if (callbackOrderID) {
    return callbackOrderID;
  }
  return fallbackOrderID;
}

async function refreshDonationStatus(orderID: string): Promise<void> {
  const normalizedOrderID = orderID.trim();
  if (normalizedOrderID === "") {
    return;
  }

  try {
    const statusResult =
      await donationsApi.getDonationStatus(normalizedOrderID);
    const status = statusResult.payment_status;

    if (status === "success") {
      setCheckoutNotice(
        "success",
        "Donation successful. Thank you for your support.",
      );
      return;
    }

    if (status === "pending") {
      setCheckoutNotice(
        "warning",
        "Payment is still pending. Please complete your payment.",
      );
      return;
    }

    if (status === "expired") {
      setCheckoutNotice(
        "error",
        "Payment expired. Please create a new donation.",
      );
      return;
    }

    if (status === "failed") {
      setCheckoutNotice("error", "Payment failed or canceled.");
      return;
    }

    setCheckoutNotice("info", `Latest payment status: ${status}`);
  } catch (error) {
    setCheckoutNotice(
      "warning",
      error instanceof Error
        ? error.message
        : "Unable to refresh donation status.",
    );
  }
}

async function ensureMidtransSnapLoaded(clientKey: string): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("Midtrans Snap hanya tersedia di browser.");
  }

  if (window.snap) {
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(
    "script[data-midtrans-snap='true']",
  );
  if (existing) {
    existing.remove();
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = MIDTRANS_SNAP_SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-midtrans-snap", "true");
    script.setAttribute("data-client-key", clientKey);

    script.onload = () => {
      if (window.snap) {
        resolve();
        return;
      }
      reject(new Error("Midtrans Snap gagal dimuat."));
    };

    script.onerror = () => {
      reject(new Error("Gagal memuat script Midtrans Snap."));
    };

    document.body.appendChild(script);
  });
}

async function submitDonation(): Promise<void> {
  if (!canSubmit.value || !creator.value || isSubmitting.value) {
    return;
  }

  const normalizedEmail = supporterEmail.value.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    setCheckoutNotice("error", "Please enter a valid email address.");
    return;
  }

  isSubmitting.value = true;
  setCheckoutNotice("info", "Creating donation transaction...");

  try {
    const checkoutResult = await donationsApi.createTransaction({
      username: creator.value.username,
      display_name: supporterName.value.trim(),
      email: normalizedEmail,
      amount: activeAmount.value,
      message: supporterMessage.value.trim() || undefined,
    });

    const orderID = checkoutResult.donation.order_id;
    currentOrderID.value = orderID;

    await ensureMidtransSnapLoaded(checkoutResult.midtrans_client_key);
    if (!window.snap) {
      throw new Error("Midtrans Snap not available.");
    }

    isSubmitting.value = false;

    window.snap.pay(checkoutResult.donation.snap_token, {
      onSuccess: (result) => {
        const resolvedOrderID = resolveOrderID(orderID, result);
        currentOrderID.value = resolvedOrderID;
        setCheckoutNotice(
          "success",
          "Payment success. Verifying latest status...",
        );
        void refreshDonationStatus(resolvedOrderID);
      },
      onPending: (result) => {
        const resolvedOrderID = resolveOrderID(orderID, result);
        currentOrderID.value = resolvedOrderID;
        setCheckoutNotice(
          "warning",
          "Payment pending. Continue to complete your payment.",
        );
        void refreshDonationStatus(resolvedOrderID);
      },
      onError: (result) => {
        const resolvedOrderID = resolveOrderID(orderID, result);
        currentOrderID.value = resolvedOrderID;
        setCheckoutNotice(
          "error",
          "There was a payment issue. Please try again.",
        );
        void refreshDonationStatus(resolvedOrderID);
      },
      onClose: () => {
        setCheckoutNotice(
          "info",
          "Payment popup closed before completion. You can continue later.",
        );
      },
    });
  } catch (error) {
    isSubmitting.value = false;
    setCheckoutNotice(
      "error",
      error instanceof Error ? error.message : "Failed to create donation.",
    );
  }
}

function handleBack(): void {
  if (window.history.length > 1) {
    router.back();
    return;
  }

  void router.push("/");
}

async function handleShare(): Promise<void> {
  const creatorName = creator.value?.full_name ?? "Creator";
  const shareData = {
    title: `Donation for ${creatorName}`,
    text: `Support ${creatorName} on Angpaoku`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch {
      // Ignore native share cancellation.
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(window.location.href);
    window.alert("Donation link copied to clipboard.");
  }
}

watch(supporterEmail, (newEmail) => {
  if (pointsDebounceTimer) clearTimeout(pointsDebounceTimer);

  const normalized = newEmail.trim().toLowerCase();

  if (normalized === "") {
    if (pointsAbort) pointsAbort.abort();
    pointsStatus.value = "idle";
    pointsError.value = "";
    donorPoints.value = null;
    return;
  }

  if (!isGmailEmail(normalized)) {
    if (pointsAbort) pointsAbort.abort();
    pointsStatus.value = "idle";
    donorPoints.value = null;
    return;
  }

  pointsDebounceTimer = setTimeout(() => {
    void fetchDonorPoints(normalized);
  }, 400);
});

watch(
  () => routeUsername.value,
  () => {
    void loadCreatorPage();
  },
  { immediate: true },
);
</script>
