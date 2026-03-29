<template>
  <main class="pt-32">
    <!-- Hero Section -->
    <LandingHero />

    <!-- Social Proof -->
    <LandingStats />

    <!-- Features Bento Grid -->
    <section id="features" class="max-w-[1440px] mx-auto px-8 mb-32">
      <div class="text-center mb-20 space-y-4">
        <h2 class="text-4xl font-extrabold font-headline tracking-tight">Everything You Need to Scale</h2>
        <p class="text-on-surface-variant max-w-2xl mx-auto">
          Focus on creating. We handle the technical infrastructure, payment processing, and real-time engagement tools.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-8 bg-surface-container-lowest rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 group"
        >
          <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform', feature.iconBgClass]">
            <span class="material-symbols-outlined text-3xl" :class="feature.iconTextClass">{{ feature.icon }}</span>
          </div>
          <h3 class="text-xl font-bold mb-4">{{ feature.title }}</h3>
          <p class="text-on-surface-variant leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="max-w-[1440px] mx-auto px-8 mb-32 overflow-hidden">
      <div class="bg-surface-container-low rounded-[3rem] p-16 relative">
        <div class="max-w-xl mb-16">
          <h2 class="text-4xl font-extrabold font-headline mb-4">From Setup to Payout in Minutes</h2>
          <p class="text-on-surface-variant">We've simplified the path to monetization so you can focus on what you do best.</p>
        </div>

        <div class="grid md:grid-cols-4 gap-12 relative z-10">
          <div v-for="step in steps" :key="step.number" class="space-y-4">
            <div class="text-6xl font-black text-primary/10 font-headline">{{ step.number }}</div>
            <h4 class="text-lg font-bold">{{ step.title }}</h4>
            <p class="text-sm text-on-surface-variant">{{ step.desc }}</p>
          </div>
        </div>

        <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
          <span class="material-symbols-outlined text-[30rem]">auto_awesome</span>
        </div>
      </div>
    </section>

    <!-- Live Demo Overlay -->
    <section class="max-w-[1440px] mx-auto px-8 mb-32">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <!-- Preview -->
        <div class="relative order-2 lg:order-1">
          <div class="aspect-video bg-inverse-surface rounded-[2rem] overflow-hidden shadow-2xl relative border-8 border-surface-container-highest">
            <img
              class="w-full h-full object-cover opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5rS3_ghsnqbcOxYF0U-FZlUObyQDuaW7Uq73x3EuRigjse6t0J5-a3Tch41UVFDU7AMdGH9RKuvxZKswliMbahFnwikNKu6wpufPb21Y0sdDg5q81mOxSYTeZl9s_neI48OPsLSfzteNJn4u9xm1yQc_95yMqIPaK7SStwrnZc6tv1F0JUK8xPf69BKSerJQL4M3ZMTg5fSCovCTdq42vbsC4g5_qyYyrVAEu7KAgax2XRRDxOxBFNIrjcjeYdylUbD3jWAKO7xs"
              alt="Game stream backdrop"
            />
            <!-- Alert Mockup -->
            <div class="absolute inset-0 flex items-center justify-center p-12">
              <div class="bg-gradient-to-br from-primary to-primary-container p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border-4 border-white">
                <span class="material-symbols-outlined text-white text-6xl" style="font-variation-settings: 'FILL' 1;">celebration</span>
                <div class="text-center">
                  <p class="text-white/80 font-bold uppercase tracking-[0.2em] text-xs mb-1">NEW DONATION</p>
                  <p class="text-2xl font-black text-white font-headline">Naufal sent $100</p>
                  <p class="text-white/90 italic mt-2">"Love the stream! Keep it up!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="space-y-8 order-1 lg:order-2">
          <h2 class="text-4xl font-extrabold font-headline leading-tight">Visual Magic for Every Contribution</h2>
          <p class="text-on-surface-variant text-lg leading-relaxed">
            Don't just receive payments—create moments. Our OBS overlays are fully customizable, allowing you to match your brand's unique aesthetic while providing high-end production value to your audience.
          </p>
          <ul class="space-y-4">
            <li v-for="item in overlayFeatures" :key="item" class="flex items-center gap-3 font-medium">
              <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="max-w-[1440px] mx-auto px-8 mb-32">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold font-headline mb-4">Simple, Creator-First Pricing</h2>
        <p class="text-on-surface-variant">No hidden fees. We only win when you do.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Free Plan -->
        <div class="p-10 bg-surface-container-lowest rounded-[2.5rem] shadow-sm flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-bold mb-2">Free</h3>
            <p class="text-on-surface-variant mb-8 text-sm">Perfect for starting out</p>
            <div class="text-4xl font-black mb-8">5% <span class="text-lg font-normal text-on-surface-variant">flat fee</span></div>
            <ul class="space-y-4 mb-8">
              <li v-for="f in freePlanFeatures" :key="f" class="flex items-center gap-3 text-sm">
                <span class="material-symbols-outlined text-primary">done</span>
                {{ f }}
              </li>
            </ul>
          </div>
          <AppButton variant="outline" class="w-full" size="lg">Get Started</AppButton>
        </div>

        <!-- Pro Plan -->
        <div class="p-10 bg-surface-container-lowest rounded-[2.5rem] shadow-xl border-4 border-primary relative overflow-hidden flex flex-col justify-between">
          <div class="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-2xl font-bold text-xs">MOST POPULAR</div>
          <div>
            <h3 class="text-2xl font-bold mb-2">Pro</h3>
            <p class="text-on-surface-variant mb-8 text-sm">For the serious creators</p>
            <div class="text-4xl font-black mb-8">3% <span class="text-lg font-normal text-on-surface-variant">flat fee</span></div>
            <ul class="space-y-4 mb-8">
              <li v-for="f in proPlanFeatures" :key="f" class="flex items-center gap-3 text-sm font-bold">
                <span class="material-symbols-outlined text-primary">done</span>
                {{ f }}
              </li>
            </ul>
          </div>
          <AppButton variant="brand" class="w-full" size="lg">Go Pro Now</AppButton>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="max-w-[1440px] mx-auto px-8 mb-32">
      <div class="bg-gradient-to-br from-primary to-primary-container rounded-[3rem] p-20 text-center text-white relative overflow-hidden">
        <div class="relative z-10 space-y-8">
          <h2 class="text-5xl font-extrabold font-headline tracking-tight">Ready to start your creator journey?</h2>
          <p class="text-white/80 max-w-2xl mx-auto text-lg font-medium">
            Join the elite creators using Angpaoku to power their digital economies. Sign up today and receive your first donation in minutes.
          </p>
          <div class="flex flex-wrap justify-center gap-6">
            <button class="bg-white text-primary px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-opacity-95 transition-all active:scale-95 text-lg">
              Create Free Account
            </button>
            <button class="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-12 py-5 rounded-full font-bold hover:bg-white/20 transition-all active:scale-95 text-lg">
              Contact Sales
            </button>
          </div>
        </div>
        <div class="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import LandingHero from '@/components/landing/LandingHero.vue'
import LandingStats from '@/components/landing/LandingStats.vue'
import AppButton from '@/components/common/AppButton.vue'
import type { FeatureItem } from '@/types'

const features: FeatureItem[] = [
  { icon: 'shopping_bag', title: 'Sell Digital Products', description: 'Host e-books, presets, or exclusive content with our secure digital storefront.', iconBgClass: 'bg-primary-fixed', iconTextClass: 'text-primary' },
  { icon: 'toll', title: 'Receive Points', description: 'A gamified donation system where fans can earn and spend points on your platform.', iconBgClass: 'bg-secondary-fixed', iconTextClass: 'text-secondary' },
  { icon: 'settings_input_component', title: 'OBS Overlay', description: 'Real-time alerts that pop up on your stream with custom animations and sounds.', iconBgClass: 'bg-tertiary-fixed', iconTextClass: 'text-tertiary' },
  { icon: 'analytics', title: 'Advanced Analytics', description: 'Track your growth with detailed insights into sales, top supporters, and revenue trends.', iconBgClass: 'bg-primary-fixed-dim', iconTextClass: 'text-on-primary-fixed-variant' },
  { icon: 'payments', title: 'Instant Withdraw', description: "No more waiting weeks for payouts. Access your hard-earned funds when you need them.", iconBgClass: 'bg-surface-container-highest', iconTextClass: 'text-on-surface' },
  { icon: 'verified_user', title: 'Trusted Security', description: 'Enterprise-grade encryption for all transactions and digital content delivery.', iconBgClass: 'bg-on-tertiary-container text-white', iconTextClass: 'text-white' },
]

const steps = [
  { number: '01', title: 'Create Account', desc: 'Sign up in 30 seconds with your social media or email.' },
  { number: '02', title: 'Upload Product', desc: 'Add your digital files or set up your donation tiers.' },
  { number: '03', title: 'Connect OBS', desc: 'Paste your unique URL into a browser source in OBS.' },
  { number: '04', title: 'Start Earning', desc: 'Go live and watch the Angpaos flow in real-time.' },
]

const overlayFeatures = ['Custom CSS/HTML Styling', 'Multiple Sound Profiles', 'Twitch/YouTube/TikTok Support']

const freePlanFeatures = ['Standard OBS Overlays', 'Sell up to 5 Products', 'Basic Analytics']
const proPlanFeatures = ['Premium Animated Overlays', 'Unlimited Digital Products', 'Real-time Goal Bars (Gold)', 'Dedicated Concierge Support']
</script>
