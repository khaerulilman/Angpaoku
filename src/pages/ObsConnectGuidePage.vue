<template>
  <main class="min-h-screen bg-surface pt-20 pb-32">
    <!-- Header -->
    <section class="max-w-4xl mx-auto px-8 mb-16">
      <div class="inline-block px-4 py-2 bg-secondary-fixed rounded-full mb-6">
        <span
          class="text-xs font-bold uppercase tracking-widest text-on-secondary-fixed"
          >Guide</span
        >
      </div>
      <div class="space-y-4">
        <h1
          class="text-5xl md:text-6xl font-extrabold tracking-tight font-headline"
        >
          Connect OBS to Angpaoku
        </h1>
        <p class="text-lg text-on-surface-variant leading-relaxed">
          Get real-time donation alerts and donation overlays on your live
          stream in minutes.
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-4xl mx-auto px-8 space-y-16">
      <!-- Quick Start -->
      <div class="bg-surface-container-low rounded-2xl p-8 md:p-12">
        <h2 class="text-2xl font-bold text-on-surface mb-6 font-headline">
          Quick Start (5 minutes)
        </h2>
        <ol class="space-y-4">
          <li v-for="(step, idx) in quickSteps" :key="idx" class="flex gap-4">
            <div
              class="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold"
            >
              {{ idx + 1 }}
            </div>
            <div>
              <p class="font-semibold text-on-surface">{{ step.title }}</p>
              <p class="text-on-surface-variant text-sm">
                {{ step.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>

      <!-- Step 1: Install OBS -->
      <div class="space-y-6">
        <h2
          class="text-3xl font-bold text-on-surface font-headline flex items-center gap-3"
        >
          <span class="text-2xl">📥</span> Step 1: Install & Open OBS Studio
        </h2>
        <div class="p-6 bg-surface-container-low rounded-lg">
          <p class="text-on-surface-variant mb-4">
            If you don't have OBS Studio installed, download it for free:
          </p>
          <a
            href="https://obsproject.com/download"
            target="_blank"
            class="inline-block px-6 py-3 bg-primary text-on-primary rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Download OBS Studio →
          </a>
          <p class="text-on-surface-variant text-sm mt-4">
            Available for Windows, macOS, and Linux
          </p>
        </div>
      </div>

      <!-- Step 2: Get Your Unique URL -->
      <div class="space-y-6">
        <h2
          class="text-3xl font-bold text-on-surface font-headline flex items-center gap-3"
        >
          <span class="text-2xl">🔗</span> Step 2: Get Your Unique Donation URL
        </h2>
        <div class="space-y-4">
          <div class="p-6 bg-surface-container-low rounded-lg">
            <ol class="space-y-3 text-on-surface-variant">
              <li class="flex gap-3">
                <span class="font-bold text-primary">1.</span>
                <span>Log in to your Angpaoku Dashboard</span>
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">2.</span>
                <span
                  >Go to <strong>Donations</strong> or
                  <strong>Overlay Settings</strong></span
                >
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">3.</span>
                <span
                  >Copy your unique donation overlay URL (it looks like:
                  <code
                    class="bg-surface-container-highest px-2 py-1 rounded text-sm"
                    >angpaoku.com/overlay/donations/@yourname</code
                  >)</span
                >
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">4.</span>
                <span
                  >Keep this URL somewhere safe - you'll need it in OBS</span
                >
              </li>
            </ol>
          </div>
          <div
            class="p-4 bg-secondary-fixed/10 border-l-4 border-secondary rounded"
          >
            <p class="text-on-surface-variant text-sm">
              <strong>💡 Tip:</strong> You can customize your donation alerts
              and overlay design directly in the Angpaoku dashboard!
            </p>
          </div>
        </div>
      </div>

      <!-- Step 3: Add Browser Source -->
      <div class="space-y-6">
        <h2
          class="text-3xl font-bold text-on-surface font-headline flex items-center gap-3"
        >
          <span class="text-2xl">🎬</span> Step 3: Add a Browser Source in OBS
        </h2>
        <div class="space-y-4">
          <div class="p-6 bg-surface-container-low rounded-lg">
            <h3 class="font-bold text-on-surface mb-4">Follow these steps:</h3>
            <ol class="space-y-4 text-on-surface-variant">
              <li class="flex gap-3">
                <span class="font-bold text-primary">1.</span>
                <span> Open OBS and go to your <strong>Scene</strong> </span>
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">2.</span>
                <span>
                  In the <strong>Sources</strong> panel at the bottom, click the
                  <strong>+</strong> icon
                </span>
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">3.</span>
                <span> Select <strong>Browser</strong> from the list </span>
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">4.</span>
                <span> Give it a name like "Angpaoku Donations" </span>
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">5.</span>
                <span> Click <strong>Create New</strong> </span>
              </li>
            </ol>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div
              class="p-6 bg-surface-container-lowest rounded-lg border-2 border-surface-container-high"
            >
              <p class="text-on-surface-variant text-sm font-semibold mb-2">
                URL Field:
              </p>
              <p
                class="text-on-surface text-sm break-all font-mono bg-surface-container-high p-3 rounded"
              >
                angpaoku.com/overlay/donations/@yourname
              </p>
            </div>
            <div
              class="p-6 bg-surface-container-lowest rounded-lg border-2 border-surface-container-high"
            >
              <p class="text-on-surface-variant text-sm font-semibold mb-2">
                Recommended Settings:
              </p>
              <ul class="text-on-surface text-sm space-y-1">
                <li>• Width: 1920</li>
                <li>• Height: 1080</li>
                <li>• ☑️ Shutdown Source when not shown</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Configure & Test -->
      <div class="space-y-6">
        <h2
          class="text-3xl font-bold text-on-surface font-headline flex items-center gap-3"
        >
          <span class="text-2xl">⚙️</span> Step 4: Configure & Test Your Overlay
        </h2>
        <div class="space-y-4">
          <div class="p-6 bg-surface-container-low rounded-lg">
            <h3 class="font-bold text-on-surface mb-4">
              Back in Angpaoku Dashboard:
            </h3>
            <ul class="space-y-3 text-on-surface-variant">
              <li class="flex gap-3 items-start">
                <span class="text-primary font-bold mt-1">•</span>
                <span
                  >Go to <strong>Overlay Settings</strong> to customize colors
                  and animations</span
                >
              </li>
              <li class="flex gap-3 items-start">
                <span class="text-primary font-bold mt-1">•</span>
                <span>Add custom sound effects for when donations come in</span>
              </li>
              <li class="flex gap-3 items-start">
                <span class="text-primary font-bold mt-1">•</span>
                <span
                  >Upload a custom background image (recommended: 1920x1080
                  pixels)</span
                >
              </li>
              <li class="flex gap-3 items-start">
                <span class="text-primary font-bold mt-1">•</span>
                <span
                  >Click <strong>Send Test Notification</strong> to see how it
                  looks on stream</span
                >
              </li>
            </ul>
          </div>
          <div
            class="p-4 bg-tertiary-fixed/10 border-l-4 border-tertiary rounded"
          >
            <p class="text-on-surface-variant text-sm">
              <strong>✨ Pro Tip:</strong> Use a portable format like PNG with
              transparency for your background image to blend seamlessly with
              your stream content!
            </p>
          </div>
        </div>
      </div>

      <!-- Step 5: Position & Size -->
      <div class="space-y-6">
        <h2
          class="text-3xl font-bold text-on-surface font-headline flex items-center gap-3"
        >
          <span class="text-2xl">📐</span> Step 5: Position & Size Your Overlay
          in OBS
        </h2>
        <div class="space-y-4">
          <div class="p-6 bg-surface-container-low rounded-lg">
            <ol class="space-y-3 text-on-surface-variant">
              <li class="flex gap-3">
                <span class="font-bold text-primary">1.</span>
                <span
                  >Click on your Angpaoku Browser source in the Sources
                  list</span
                >
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">2.</span>
                <span
                  >Drag the red bounding box in the preview to resize and
                  reposition</span
                >
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">3.</span>
                <span
                  >Right-click on the source and select
                  <strong>Transform → Fit to Screen</strong> for full-screen
                  mode</span
                >
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">4.</span>
                <span
                  >Adjust layer order by dragging sources up/down in the Sources
                  panel</span
                >
              </li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Troubleshooting -->
      <div class="space-y-6">
        <h2
          class="text-3xl font-bold text-on-surface font-headline flex items-center gap-3"
        >
          <span class="text-2xl">🔧</span> Troubleshooting
        </h2>
        <div class="space-y-4">
          <div
            v-for="(issue, idx) in troubleshooting"
            :key="idx"
            class="p-6 bg-surface-container-low rounded-lg"
          >
            <h3 class="font-bold text-on-surface mb-2">{{ issue.problem }}</h3>
            <p class="text-on-surface-variant text-sm">{{ issue.solution }}</p>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-on-surface font-headline">
          Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          <details
            class="p-6 bg-surface-container-low rounded-lg group cursor-pointer"
          >
            <summary
              class="flex items-center justify-between font-bold text-on-surface"
            >
              <span>Can I use the overlay on multiple platforms?</span>
              <span
                class="material-symbols-outlined group-open:rotate-180 transition-transform"
                >expand_more</span
              >
            </summary>
            <p class="text-on-surface-variant text-sm mt-4">
              Yes! Your Angpaoku overlay works on any platform that supports OBS
              browser sources: Twitch, YouTube, TikTok Live, Kick, and more.
              Just add the same browser source to each scene.
            </p>
          </details>
          <details
            class="p-6 bg-surface-container-low rounded-lg group cursor-pointer"
          >
            <summary
              class="flex items-center justify-between font-bold text-on-surface"
            >
              <span>What if I want multiple overlay styles?</span>
              <span
                class="material-symbols-outlined group-open:rotate-180 transition-transform"
                >expand_more</span
              >
            </summary>
            <p class="text-on-surface-variant text-sm mt-4">
              Create different overlay profiles in the Angpaoku dashboard, then
              add multiple browser sources in OBS pointing to different profile
              URLs. You can toggle them on/off as needed!
            </p>
          </details>
          <details
            class="p-6 bg-surface-container-low rounded-lg group cursor-pointer"
          >
            <summary
              class="flex items-center justify-between font-bold text-on-surface"
            >
              <span>Does the overlay require my stream to be live?</span>
              <span
                class="material-symbols-outlined group-open:rotate-180 transition-transform"
                >expand_more</span
              >
            </summary>
            <p class="text-on-surface-variant text-sm mt-4">
              No! The overlay works whether you're streaming live or not. Set up
              the browser source in OBS and it's always ready to display
              donations when they come in.
            </p>
          </details>
          <details
            class="p-6 bg-surface-container-low rounded-lg group cursor-pointer"
          >
            <summary
              class="flex items-center justify-between font-bold text-on-surface"
            >
              <span>What's the recommended refresh rate?</span>
              <span
                class="material-symbols-outlined group-open:rotate-180 transition-transform"
                >expand_more</span
              >
            </summary>
            <p class="text-on-surface-variant text-sm mt-4">
              We recommend keeping the default refresh rate (usually 30 Hz or
              higher) for smooth animations. The overlay will automatically
              optimize for your OBS settings.
            </p>
          </details>
        </div>
      </div>

      <!-- Contact Support -->
      <div
        class="mt-20 pt-16 border-t border-surface-container-high space-y-6 bg-surface-container-low rounded-2xl p-8 md:p-12"
      >
        <h2 class="text-2xl font-bold text-on-surface font-headline">
          Need Help?
        </h2>
        <p class="text-on-surface-variant">
          If you get stuck during setup or have technical questions, our support
          team is here to help!
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <RouterLink
            to="/contact"
            class="inline-block px-6 py-3 bg-primary text-on-primary rounded-full font-semibold hover:opacity-90 transition-opacity text-center"
          >
            Contact Support
          </RouterLink>
          <a
            href="mailto:concierge@angpaoku.com"
            class="inline-block px-6 py-3 bg-surface-container-highest text-on-surface rounded-full font-semibold hover:bg-surface-container-high transition-colors text-center"
          >
            📧 Email Us
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const quickSteps = [
  {
    title: "Create an Angpaoku Account",
    description: "Sign up and verify your creator profile",
  },
  {
    title: "Copy Your Overlay URL",
    description: "Find your unique donation URL in dashboard settings",
  },
  {
    title: "Add Browser Source in OBS",
    description: "Create a new browser source with your URL",
  },
  {
    title: "Customize Your Overlay",
    description: "Adjust colors, sounds, and animations to match your brand",
  },
  {
    title: "Go Live & Start Earning",
    description: "Stream and watch donations appear in real-time",
  },
];

const troubleshooting = [
  {
    problem: "Browser source is blank or showing 404 error",
    solution:
      'Double-check your overlay URL is correct and your creator account is verified. Make sure you\'re using the full URL including "https://" at the start.',
  },
  {
    problem: "Overlay appears but donations aren't showing",
    solution:
      "Verify notifications are enabled in your Angpaoku dashboard settings. Try sending a test notification from the dashboard to confirm the setup is working.",
  },
  {
    problem: "Audio/sound effects not playing",
    solution:
      "Ensure OBS has permission to access audio output. Check your system volume is on and the OBS desktop audio device is properly configured.",
  },
  {
    problem: "Overlay looks pixelated or blurry",
    solution:
      "Match your browser source resolution to your scene resolution in OBS. Usually, this should be 1920x1080 for full HD streams.",
  },
  {
    problem: "Stream performance is slow with the overlay",
    solution:
      'Try disabling "Shutdown source when not shown" in the browser source settings, or reduce the overlay animation complexity in Angpaoku settings.',
  },
];
</script>
