<template>
  <main
    class="min-h-screen bg-gradient-to-br from-surface via-surface-container-low to-primary-fixed/20 px-4 py-10 sm:px-8"
  >
    <section class="mx-auto w-full max-w-2xl rounded-3xl bg-surface-container-lowest p-6 shadow-angpao-lg sm:p-8">
      <header class="mb-8">
        <p class="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Verification Request
        </p>
        <h1 class="text-3xl font-extrabold text-on-surface sm:text-4xl">Get Verified</h1>
        <p class="mt-2 text-sm text-on-surface-variant sm:text-base">
          Isi data berikut. Setelah submit, backend akan memproses verifikasi selama kurang lebih 1 menit.
        </p>
        <button
          type="button"
          class="mt-4 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:text-primary"
          @click="router.push('/dashboard/profile')"
        >
          Back to Profile
        </button>
      </header>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-on-surface-variant" for="full-name">
            Full Name
          </label>
          <input
            id="full-name"
            v-model.trim="form.fullName"
            type="text"
            minlength="2"
            maxlength="120"
            required
            :disabled="isFormLocked"
            placeholder="Masukkan nama lengkap"
            class="w-full rounded-xl border border-outline-variant bg-surface-container-highest px-4 py-3 text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold text-on-surface-variant">Is Verified</p>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              :disabled="isFormLocked"
              class="rounded-xl border px-4 py-3 text-sm font-semibold transition"
              :class="
                form.isVerified
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-outline-variant bg-surface-container-low text-on-surface hover:border-primary/60'
              "
              @click="form.isVerified = true"
            >
              Yes
            </button>
            <button
              type="button"
              :disabled="isFormLocked"
              class="rounded-xl border px-4 py-3 text-sm font-semibold transition"
              :class="
                !form.isVerified
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-outline-variant bg-surface-container-low text-on-surface hover:border-primary/60'
              "
              @click="form.isVerified = false"
            >
              No
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isFormLocked"
          class="w-full rounded-xl bg-gradient-to-r from-primary to-primary-container px-4 py-3 text-sm font-bold text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {{ submitButtonLabel }}
        </button>
      </form>

      <p
        v-if="isAlreadyVerified"
        class="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
      >
        User telah melakukan verifikasi.
      </p>

      <p
        v-else-if="isWaitingOnServer"
        class="mt-4 rounded-lg border border-secondary/30 bg-secondary-fixed/30 px-4 py-3 text-sm text-on-surface-variant"
      >
        Request sedang diproses di server. Estimasi selesai dalam {{ countdownLabel }}.
      </p>

      <p v-if="errorMessage" class="mt-4 rounded-lg bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
        {{ errorMessage }}
      </p>

      <p
        v-if="successMessage"
        class="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
      >
        {{ successMessage }}
      </p>

      <div v-if="currentUser" class="mt-6 rounded-2xl border border-outline-variant bg-surface-container-low p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">Latest User State</p>
        <p class="mt-2 text-sm text-on-surface"><span class="font-semibold">Full Name:</span> {{ currentUser.full_name }}</p>
        <p class="mt-1 text-sm text-on-surface">
          <span class="font-semibold">Is Verified:</span>
          {{ currentUser.is_verified ? "Yes" : "No" }}
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authApi, verificationApi, type AuthUser } from "@/api";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const form = reactive({
  fullName: authStore.user?.full_name ?? "",
  isVerified: true,
});

const isSubmitting = ref(false);
const secondsLeft = ref(0);
const errorMessage = ref("");
const successMessage = ref("");
const currentUser = ref<AuthUser | null>(authStore.user);
const routeUserID = computed(() => {
  const rawValue = route.params.userId;
  return typeof rawValue === "string" ? rawValue.trim() : "";
});

let countdownInterval: ReturnType<typeof setInterval> | null = null;
let statusPollInterval: ReturnType<typeof setInterval> | null = null;

const countdownLabel = computed(() => {
  const safeSeconds = Math.max(secondsLeft.value, 0);
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (safeSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

const isAlreadyVerified = computed(() => currentUser.value?.is_verified === true);

const isWaitingOnServer = computed(() => {
  if (isAlreadyVerified.value) {
    return false;
  }

  const dueAt = currentUser.value?.verification_due_at;
  return typeof dueAt === "string" && dueAt.trim() !== "";
});

const isFormLocked = computed(
  () => isSubmitting.value || isWaitingOnServer.value || isAlreadyVerified.value,
);

const submitButtonLabel = computed(() => {
  if (isSubmitting.value) {
    return "Submitting...";
  }

  if (isAlreadyVerified.value) {
    return "Sudah Terverifikasi";
  }

  if (isWaitingOnServer.value) {
    return `Menunggu Verifikasi... ${countdownLabel.value}`;
  }

  return "Submit Verification";
});

function clearCountdownTimer() {
  if (!countdownInterval) {
    return;
  }

  clearInterval(countdownInterval);
  countdownInterval = null;
}

function clearStatusPollTimer() {
  if (!statusPollInterval) {
    return;
  }

  clearInterval(statusPollInterval);
  statusPollInterval = null;
}

function clearTimers() {
  clearCountdownTimer();
  clearStatusPollTimer();
}

function startCountdown(dueAtValue?: string | null) {
  clearCountdownTimer();

  if (!dueAtValue || dueAtValue.trim() === "") {
    secondsLeft.value = 0;
    return;
  }

  const dueAtMs = Date.parse(dueAtValue);
  if (Number.isNaN(dueAtMs)) {
    secondsLeft.value = 0;
    return;
  }

  const updateCountdown = () => {
    const remainingSeconds = Math.max(0, Math.ceil((dueAtMs - Date.now()) / 1000));
    secondsLeft.value = remainingSeconds;
  };

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function applyUserState(user: AuthUser) {
  currentUser.value = user;
  authStore.user = user;
  form.fullName = user.full_name ?? form.fullName;
  startCountdown(user.verification_due_at ?? null);
}

async function refreshUserState(showError = false) {
  try {
    const user = await authApi.me();
    applyUserState(user);
    startStatusPolling();
  } catch (error) {
    if (!showError) {
      return;
    }

    errorMessage.value =
      error instanceof Error ? error.message : "Gagal memuat status verifikasi.";
  }
}

function startStatusPolling() {
  clearStatusPollTimer();

  if (!isWaitingOnServer.value) {
    return;
  }

  statusPollInterval = setInterval(() => {
    void refreshUserState(false);
  }, 5000);
}

async function submitVerification() {
  try {
    if (routeUserID.value === "") {
      throw new Error("invalid user id on route");
    }

    const payload = {
      full_name: form.fullName.trim(),
      is_verified: form.isVerified,
    };
    const result = await verificationApi.submitGetVerified(routeUserID.value, payload);

    applyUserState(result.user);
    startStatusPolling();

    if (result.status === "verified" || result.user.is_verified) {
      successMessage.value = "User telah melakukan verifikasi.";
      return;
    }

    successMessage.value = "Permintaan verifikasi diterima. Tunggu sekitar 1 menit.";
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Gagal mengirim permintaan verifikasi. Silakan coba lagi.";
  } finally {
    isSubmitting.value = false;
  }
}

async function handleSubmit() {
  if (routeUserID.value === "") {
    errorMessage.value = "User ID tidak valid di URL.";
    return;
  }

  const activeUserID = (currentUser.value?.id ?? authStore.user?.id ?? "").trim();
  if (activeUserID !== "" && activeUserID !== routeUserID.value) {
    errorMessage.value = "User ID pada URL tidak sesuai dengan akun login.";
    return;
  }

  if (isAlreadyVerified.value) {
    successMessage.value = "User telah melakukan verifikasi.";
    return;
  }

  if (isWaitingOnServer.value) {
    successMessage.value = "Permintaan verifikasi sedang diproses.";
    return;
  }

  const normalizedFullName = form.fullName.trim();
  if (normalizedFullName.length < 2) {
    errorMessage.value = "Full name minimal 2 karakter.";
    return;
  }

  errorMessage.value = "";
  successMessage.value = "";
  isSubmitting.value = true;
  await submitVerification();
}

onMounted(async () => {
  await refreshUserState(true);
  startStatusPolling();
});

onBeforeUnmount(() => {
  clearTimers();
});
</script>
