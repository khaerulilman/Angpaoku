<template>
  <div class="overlay-preview-root">
    <transition-group name="alert" tag="div" class="alert-stack">
      <article
        v-for="alert in displayedAlerts"
        :key="alert.id"
        class="alert-card"
      >
        <div class="alert-header">
          <span class="alert-pill">Donation</span>
          <span class="alert-amount">{{ alert.amountDisplay }}</span>
        </div>

        <p class="alert-title">{{ alert.donorDisplayName }} sent support</p>

        <p v-if="alert.message" class="alert-message">"{{ alert.message }}"</p>

        <p class="alert-time">{{ formatOccurredAt(alert.occurredAt) }}</p>
      </article>
    </transition-group>

    <!-- Empty State -->
    <div v-if="displayedAlerts.length === 0" class="empty-state">
      <span class="text-4xl mb-2">🎉</span>
      <p class="text-sm text-white/60">Donations will appear here</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface OverlayAlert {
  id: string;
  donorDisplayName: string;
  amountDisplay: string;
  message: string;
  occurredAt: string;
}

interface TestAlertData {
  donor_display_name: string;
  amount: number;
  amount_display: string;
  message: string;
}

const props = defineProps<{
  testAlert: TestAlertData | null;
}>();

const alerts = ref<OverlayAlert[]>([]);

const displayedAlerts = computed(() => alerts.value.slice(0, 3));

watch(
  () => props.testAlert,
  (newAlert) => {
    if (newAlert) {
      const alert: OverlayAlert = {
        id: `test-${Date.now()}`,
        donorDisplayName: newAlert.donor_display_name,
        amountDisplay: newAlert.amount_display,
        message: newAlert.message,
        occurredAt: new Date().toISOString(),
      };

      alerts.value = [alert, ...alerts.value].slice(0, 10);

      // Auto-remove after 7 seconds
      setTimeout(() => {
        alerts.value = alerts.value.filter((item) => item.id !== alert.id);
      }, 7000);
    }
  },
);

function formatOccurredAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
</script>

<style scoped>
.overlay-preview-root {
  width: 100%;
  height: 100%;
  background: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-stack {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  pointer-events: none;
}

.alert-card {
  border-radius: 12px;
  padding: 12px 14px;
  background: linear-gradient(
    125deg,
    rgba(34, 20, 58, 0.92),
    rgba(22, 88, 78, 0.94)
  );
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.34);
  color: #f8f8ff;
  backdrop-filter: blur(4px);
  max-width: 320px;
}

.alert-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.alert-pill {
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(235, 255, 242, 0.88);
  background: rgba(151, 255, 217, 0.16);
  border-radius: 999px;
  padding: 2px 8px;
}

.alert-amount {
  font-size: 15px;
  font-weight: 800;
  color: #dbffd5;
}

.alert-title {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
}

.alert-message {
  margin-top: 5px;
  font-size: 12px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  max-height: 48px;
  overflow: hidden;
}

.alert-time {
  margin-top: 6px;
  font-size: 10px;
  font-weight: 600;
  color: rgba(228, 252, 246, 0.72);
}

.alert-enter-active,
.alert-leave-active {
  transition: all 280ms ease;
}

.alert-enter-from {
  transform: translateX(32px) scale(0.98);
  opacity: 0;
}

.alert-leave-to {
  transform: translateX(24px);
  opacity: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}
</style>
