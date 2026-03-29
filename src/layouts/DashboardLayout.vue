<template>
  <!-- Root dashboard shell with zoom protection -->
  <div ref="dashboardShell" class="dashboard-shell">
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <DashboardSidebar />

      <!-- Main Content -->
      <main class="dashboard-main">
        <router-view />

        <!-- Dashboard Footer -->
        <footer
          class="pt-12 mt-20 border-t border-outline-variant/10 px-8 pb-8"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p class="font-body text-xs tracking-wide text-on-surface/50">
              © 2024 Angpaoku. Designed for the high-end creator economy.
            </p>
            <div class="flex gap-8">
              <a
                href="#"
                class="text-on-surface/50 hover:text-primary transition-colors text-xs"
                >Terms of Service</a
              >
              <a
                href="#"
                class="text-on-surface/50 hover:text-primary transition-colors text-xs"
                >Privacy Policy</a
              >
              <a
                href="#"
                class="text-on-surface/50 hover:text-primary transition-colors text-xs"
                >Contact Us</a
              >
            </div>
          </div>
        </footer>
      </main>
    </div>

    <!-- Mobile FAB -->
    <button
      class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-angpao-lg hover:scale-110 active:scale-95 transition-all lg:hidden z-50"
    >
      <span class="material-symbols-outlined">add</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar.vue";

const dashboardShell = ref<HTMLDivElement | null>(null);

/**
 * Zoom-lock logic:
 * - At 100% zoom → normal (scale = 1)
 * - At 75%–100% zoom → responsive, no intervention
 * - Below 75% zoom → counter-scale so it looks like 75%
 *
 * We detect zoom via window.outerWidth / window.innerWidth
 * and apply CSS transform + width compensation.
 */
const MIN_ZOOM = 0.75; // 75% is the minimum visual zoom

function handleZoom() {
  const shell = dashboardShell.value;
  if (!shell) return;

  // Detect browser zoom level
  const zoomLevel = window.outerWidth / window.innerWidth;

  if (zoomLevel < MIN_ZOOM) {
    // Counter-scale: if user zoomed to 50%, we scale up by 75/50 = 1.5
    const counterScale = MIN_ZOOM / zoomLevel;
    shell.style.transform = `scale(${counterScale})`;
    shell.style.transformOrigin = "top left";
    // Compensate width so the scaled element fills the viewport
    shell.style.width = `${100 / counterScale}%`;
    shell.style.height = `auto`;
    // Ensure the body can scroll for the scaled content
    document.body.style.overflowX = "auto";
  } else {
    // Normal: zoom is 75%+, no counter-scaling needed
    shell.style.transform = "";
    shell.style.transformOrigin = "";
    shell.style.width = "100%";
    shell.style.height = "";
    document.body.style.overflowX = "";
  }
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  handleZoom();
  window.addEventListener("resize", handleZoom);

  // Also watch for visual viewport changes (pinch zoom on some devices)
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", handleZoom);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleZoom);
  if (window.visualViewport) {
    window.visualViewport.removeEventListener("resize", handleZoom);
  }
  // Clean up body styles
  document.body.style.overflowX = "";
});
</script>

<style scoped>
/* ── Root shell: enforces minimum dimensions ── */
.dashboard-shell {
  width: 100%;
  min-width: 1280px;
  min-height: 100vh;
}

/* ── Flex row: sidebar + main ── */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* ── Main content area ── */
.dashboard-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--md-sys-color-surface, #f8f8f8);
  overflow-y: auto;
  margin-left: 0;
}

@media (min-width: 768px) {
  .dashboard-main {
    margin-left: 288px; /* matches sidebar fixed width */
  }
}
</style>
