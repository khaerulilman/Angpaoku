<template>
  <div
    class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full flex flex-col"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-bold">Recent Activity</h2>
      <router-link
        to="/dashboard/transactions"
        class="text-xs font-bold text-primary hover:underline"
      >
        View All
      </router-link>
    </div>

    <!-- Scrollable Activity List -->
    <div class="space-y-6 flex-1 overflow-y-auto pr-2">
      <div
        v-for="item in activities"
        :key="item.id"
        class="flex items-center gap-4 group"
      >
        <!-- Icon -->
        <div
          :class="[
            'w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center',
            iconBg(item.type),
          ]"
        >
          <span
            class="material-symbols-outlined text-xl"
            :class="[
              iconColor(item.type),
              item.type === 'donation' ? 'filled' : '',
            ]"
            :style="
              item.type === 'donation'
                ? `font-variation-settings: 'FILL' 1`
                : ''
            "
          >
            {{ item.icon }}
          </span>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">{{ item.title }}</p>
          <p class="text-[10px] text-on-surface-variant">{{ item.subtitle }}</p>
        </div>

        <!-- Amount -->
        <div class="text-right">
          <p :class="['text-sm font-bold', amountColor(item.amountType)]">
            {{ item.amount }}
          </p>
          <p class="text-[10px] text-on-surface-variant/60">
            {{ item.timeAgo }}
          </p>
        </div>
      </div>
    </div>

    <!-- Weekly Tip -->
    <div class="mt-8">
      <img
        alt="Abstract vibrant gradient"
        class="w-full h-32 object-cover rounded-xl"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6vtbZfMJWS7NMcCqAjo3Iy_8CIq0q62-QmTQ3t8CvSzmeJELgRAi3p1yZyQ2B0w0jpzOBG8pxmFqokleB1S54ZeGKqU20bzvPkvAOJKNKyxxhfUmuMYlEtJLYKLL6XtT3TwGgEhPt6T9UfKTCd1LWOMMiwCyP6z2gbw06gRaxhIsxJjGcyI4mRHK1Np-Hy-RcgmPki-oYLKHPJYyRtzsGZjpxe4DgJpT5PiUzkFhcoSGFFYRNGEfGZUWXImwCwC2VfipJRhYuycE"
      />
      <div class="mt-4 p-4 bg-surface-container-low rounded-xl">
        <p class="text-xs font-bold mb-1">Weekly Tip</p>
        <p class="text-[10px] text-on-surface-variant leading-relaxed">
          Boost your engagement by updating your Angpao overlay graphics today!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityItem } from "@/types";

defineProps<{
  activities: ActivityItem[];
}>();

function iconBg(type: string): string {
  const map: Record<string, string> = {
    donation: "bg-primary-fixed",
    sale: "bg-secondary/10",
    points_redemption: "bg-tertiary/10",
  };
  return map[type] || "bg-surface-container-low";
}

function iconColor(type: string): string {
  const map: Record<string, string> = {
    donation: "text-primary",
    sale: "text-secondary",
    points_redemption: "text-tertiary",
  };
  return map[type] || "text-on-surface-variant";
}

function amountColor(amountType: string): string {
  const map: Record<string, string> = {
    positive: "text-green-600",
    negative: "text-on-tertiary-container",
    neutral: "",
  };
  return map[amountType] || "";
}
</script>
