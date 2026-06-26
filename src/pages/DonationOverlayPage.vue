<template>
  <div class="overlay-root">
    <transition-group name="alert" tag="div" class="alert-stack">
      <article
        v-for="alert in visibleAlerts"
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

    <div v-if="debugMode" class="debug-indicator">
      WS: {{ connectionLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

interface OverlayEventData {
  order_id: string;
  donor_display_name: string;
  amount: number;
  amount_display?: string;
  message?: string;
  occurred_at?: string;
}

interface OverlayEnvelope {
  type: string;
  data?: OverlayEventData;
}

interface OverlayAlert {
  id: string;
  orderID: string;
  donorDisplayName: string;
  amountDisplay: string;
  message: string;
  occurredAt: string;
}

const ALERT_MAX_VISIBLE = 3;
const ALERT_TIMEOUT_MS = 7000;

const route = useRoute();
const alerts = ref<OverlayAlert[]>([]);
const connectionLabel = ref("disconnected");

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let reconnectAttempt = 0;
const activeAlertTimers = new Map<string, ReturnType<typeof setTimeout>>();

const username = computed(() =>
  String(route.params.username ?? "")
    .trim()
    .toLowerCase(),
);
const debugMode = computed(() => String(route.query.debug ?? "") === "1");
const visibleAlerts = computed(() => alerts.value.slice(0, ALERT_MAX_VISIBLE));

function buildWebSocketURL(): string {
  const envURL = String(import.meta.env.VITE_DONATIONS_WS_URL ?? "").trim();
  const apiURL = String(import.meta.env.VITE_DONATIONS_API_URL ?? "").trim();

  let baseURL = envURL;
  if (baseURL === "") {
    baseURL = apiURL;
  }
  if (baseURL === "") {
    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    baseURL = `${wsProtocol}//${window.location.host}`;
  }

  baseURL = baseURL.replace(/\/+$/, "");
  baseURL = baseURL.replace(/\/api\/v1$/i, "");

  if (baseURL.startsWith("https://")) {
    baseURL = `wss://${baseURL.slice("https://".length)}`;
  } else if (baseURL.startsWith("http://")) {
    baseURL = `ws://${baseURL.slice("http://".length)}`;
  }

  if (!baseURL.startsWith("ws://") && !baseURL.startsWith("wss://")) {
    baseURL = `ws://${baseURL}`;
  }

  return `${baseURL}/api/v1/overlay/ws/${encodeURIComponent(username.value)}`;
}

function scheduleAlertRemoval(id: string): void {
  const existing = activeAlertTimers.get(id);
  if (existing) {
    clearTimeout(existing);
  }

  const timer = setTimeout(() => {
    alerts.value = alerts.value.filter((item) => item.id !== id);
    activeAlertTimers.delete(id);
  }, ALERT_TIMEOUT_MS);

  activeAlertTimers.set(id, timer);
}

function enqueueAlert(data: OverlayEventData): void {
  const donorDisplayName = data.donor_display_name?.trim() || "Anonymous";
  const message = data.message?.trim() ?? "";
  const occurredAt = data.occurred_at || new Date().toISOString();
  const amountDisplay =
    data.amount_display?.trim() ||
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(data.amount ?? 0));

  const id = `${data.order_id || "order"}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const alert: OverlayAlert = {
    id,
    orderID: data.order_id,
    donorDisplayName,
    amountDisplay,
    message,
    occurredAt,
  };

  alerts.value = [alert, ...alerts.value].slice(0, 20);
  scheduleAlertRemoval(id);
}

function clearReconnectTimer(): void {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}

function closeSocket(): void {
  if (socket) {
    socket.close();
    socket = null;
  }
}

function connectSocket(): void {
  if (!username.value) {
    connectionLabel.value = "invalid username";
    return;
  }

  clearReconnectTimer();
  closeSocket();

  const wsURL = buildWebSocketURL();
  socket = new WebSocket(wsURL);

  socket.onopen = () => {
    reconnectAttempt = 0;
    connectionLabel.value = "connected";
  };

  socket.onmessage = (event) => {
    try {
      const envelope = JSON.parse(event.data) as OverlayEnvelope;
      if (envelope.type !== "donation_success" || !envelope.data) {
        return;
      }
      enqueueAlert(envelope.data);
    } catch {
      // Ignore malformed payloads.
    }
  };

  socket.onclose = () => {
    connectionLabel.value = "reconnecting";
    reconnectAttempt += 1;
    const retryDelay = Math.min(1500 * reconnectAttempt, 12000);
    reconnectTimer = setTimeout(connectSocket, retryDelay);
  };

  socket.onerror = () => {
    connectionLabel.value = "error";
  };
}

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

onMounted(() => {
  connectSocket();
});

onBeforeUnmount(() => {
  clearReconnectTimer();
  closeSocket();

  activeAlertTimers.forEach((timer) => clearTimeout(timer));
  activeAlertTimers.clear();
});
</script>

<style scoped>
.overlay-root {
  width: 100vw;
  height: 100vh;
  background: transparent;
  pointer-events: none;
  overflow: hidden;
  position: relative;
}

.alert-stack {
  position: absolute;
  right: 32px;
  top: 28px;
  width: min(460px, calc(100vw - 32px));
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-card {
  border-radius: 18px;
  padding: 14px 16px;
  background: linear-gradient(
    125deg,
    rgba(34, 20, 58, 0.92),
    rgba(22, 88, 78, 0.94)
  );
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.34);
  color: #f8f8ff;
  backdrop-filter: blur(6px);
}

.alert-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.alert-pill {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(235, 255, 242, 0.88);
  background: rgba(151, 255, 217, 0.16);
  border-radius: 999px;
  padding: 2px 8px;
}

.alert-amount {
  font-size: 17px;
  font-weight: 800;
  color: #dbffd5;
}

.alert-title {
  margin-top: 8px;
  font-size: 15px;
  font-weight: 700;
}

.alert-message {
  margin-top: 7px;
  font-size: 13px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.9);
  max-height: 56px;
  overflow: hidden;
}

.alert-time {
  margin-top: 8px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(228, 252, 246, 0.72);
}

.alert-enter-active,
.alert-leave-active {
  transition: all 320ms ease;
}

.alert-enter-from {
  transform: translateX(48px) scale(0.98);
  opacity: 0;
}

.alert-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.debug-indicator {
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(18, 18, 18, 0.75);
  color: #e9f0ff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

@media (max-width: 640px) {
  .alert-stack {
    top: 14px;
    right: 10px;
    width: min(96vw, 420px);
    gap: 10px;
  }

  .alert-card {
    border-radius: 16px;
    padding: 12px 13px;
  }

  .alert-title {
    font-size: 14px;
  }

  .alert-amount {
    font-size: 15px;
  }
}
</style>
