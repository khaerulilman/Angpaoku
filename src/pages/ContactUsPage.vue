<template>
  <main class="min-h-screen bg-surface pt-12 md:pt-24 pb-20 px-6">
    <!-- Main Contact Section -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <!-- Left Section -->
        <section class="lg:col-span-5 space-y-12">
          <div class="space-y-6">
            <RouterLink
              to="/"
              class="inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity"
            >
              <span class="material-symbols-outlined">arrow_back</span>
              Back to Marketplace
            </RouterLink>
            <h1
              class="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface font-headline"
            >
              Let's start a <br /><span class="text-primary">conversation</span>
            </h1>
            <p class="text-lg text-on-surface-variant leading-relaxed max-w-md">
              Have questions about gifting digital Angpao or joining as a
              creator? Our concierge team is here to help you navigate the
              marketplace.
            </p>
          </div>

          <!-- Contact Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div
              class="p-8 rounded-xl bg-surface-container-low transition-all duration-300 hover:bg-surface-container-high group"
            >
              <div
                class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container mb-4 group-hover:scale-110 transition-transform"
              >
                <span class="material-symbols-outlined">mail</span>
              </div>
              <h3
                class="text-sm font-bold text-tertiary uppercase tracking-widest mb-1"
              >
                Email Us
              </h3>
              <a
                href="mailto:concierge@angpaoku.com"
                class="text-lg font-semibold text-on-surface hover:text-primary transition-colors"
              >
                concierge@angpaoku.com
              </a>
            </div>
            <div
              class="p-8 rounded-xl bg-surface-container-low transition-all duration-300 hover:bg-surface-container-high group"
            >
              <div
                class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-4 group-hover:scale-110 transition-transform"
              >
                <span class="material-symbols-outlined">forum</span>
              </div>
              <h3
                class="text-sm font-bold text-tertiary uppercase tracking-widest mb-1"
              >
                Support
              </h3>
              <RouterLink
                to="/"
                class="text-lg font-semibold text-on-surface hover:text-primary transition-colors"
              >
                Help Center & Docs
              </RouterLink>
            </div>
          </div>

          <!-- Social Links -->
          <div class="pt-8 space-y-4">
            <h3
              class="text-xs font-black text-outline uppercase tracking-[0.2em]"
            >
              Connect with us
            </h3>
            <div class="flex gap-4">
              <a
                href="#"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary transition-all"
              >
                <span class="material-symbols-outlined">share</span>
              </a>
              <a
                href="#"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary transition-all"
              >
                <span class="material-symbols-outlined">public</span>
              </a>
              <a
                href="#"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary transition-all"
              >
                <span class="material-symbols-outlined">podcasts</span>
              </a>
            </div>
          </div>
        </section>

        <!-- Right Section - Contact Form -->
        <section class="lg:col-span-7 relative">
          <div
            class="absolute -top-12 -right-12 w-64 h-64 bg-primary-fixed-dim/20 blur-3xl rounded-full z-0"
          ></div>
          <div
            class="absolute -bottom-12 -left-12 w-64 h-64 bg-tertiary-fixed/20 blur-3xl rounded-full z-0"
          ></div>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0px_20px_40px_rgba(187,21,44,0.06)]"
          >
            <form @submit.prevent="handleSubmit" class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label
                    for="name"
                    class="text-sm font-bold text-on-surface-variant ml-1"
                    >Full Name</label
                  >
                  <input
                    v-model="form.name"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    class="w-full px-6 py-4 rounded-lg bg-surface-container-highest border-none focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    for="email"
                    class="text-sm font-bold text-on-surface-variant ml-1"
                    >Email Address</label
                  >
                  <input
                    v-model="form.email"
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    class="w-full px-6 py-4 rounded-lg bg-surface-container-highest border-none focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label
                  for="subject"
                  class="text-sm font-bold text-on-surface-variant ml-1"
                  >Subject</label
                >
                <select
                  v-model="form.subject"
                  id="subject"
                  class="w-full px-6 py-4 rounded-lg bg-surface-container-highest border-none focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all text-on-surface-variant"
                >
                  <option value="general">General Inquiry</option>
                  <option value="creator">Creator Partnership</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Refunds</option>
                </select>
              </div>
              <div class="space-y-2">
                <label
                  for="message"
                  class="text-sm font-bold text-on-surface-variant ml-1"
                  >Message</label
                >
                <textarea
                  v-model="form.message"
                  id="message"
                  placeholder="How can we help you today?"
                  rows="5"
                  class="w-full px-6 py-4 rounded-lg bg-surface-container-highest border-none focus:ring-2 focus:ring-secondary/10 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                class="group relative w-full overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-container px-8 py-5 text-lg font-bold text-on-primary shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                <span
                  class="relative z-10 flex items-center justify-center gap-3"
                >
                  Send Message
                  <span
                    class="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                    >send</span
                  >
                </span>
                <div
                  class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
              </button>
              <p class="text-center text-xs text-outline leading-relaxed">
                By clicking send, you agree to our
                <RouterLink
                  to="/privacy-policy"
                  class="text-secondary font-semibold hover:underline"
                  >Privacy Policy</RouterLink
                >
                and
                <RouterLink
                  to="/terms-of-service"
                  class="text-secondary font-semibold hover:underline"
                  >Terms of Service</RouterLink
                >.
              </p>
            </form>
          </div>
        </section>
      </div>

      <!-- Info Cards Section -->
      <section class="mt-32">
        <div class="bg-surface-container-low rounded-xl overflow-hidden p-1">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div class="bg-surface-container-lowest p-10 text-center space-y-4">
              <div class="text-tertiary flex justify-center">
                <span class="material-symbols-outlined text-4xl"
                  >location_on</span
                >
              </div>
              <h4 class="text-xl font-bold font-headline">Visit Us</h4>
              <p class="text-on-surface-variant text-sm">
                Angpaoku Headquarters<br />Indonesia
              </p>
            </div>
            <div class="bg-surface-container-lowest p-10 text-center space-y-4">
              <div class="text-tertiary flex justify-center">
                <span class="material-symbols-outlined text-4xl">schedule</span>
              </div>
              <h4 class="text-xl font-bold font-headline">Support Hours</h4>
              <p class="text-on-surface-variant text-sm">
                Mon-Fri from 9am to 6pm WIB<br />24/7 Chat Support Available
              </p>
            </div>
            <div class="bg-surface-container-lowest p-10 text-center space-y-4">
              <div class="text-tertiary flex justify-center">
                <span class="material-symbols-outlined text-4xl"
                  >rocket_launch</span
                >
              </div>
              <h4 class="text-xl font-bold font-headline">Creator Program</h4>
              <p class="text-on-surface-variant text-sm">
                Join 1000+ creators<br />building their digital empire
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const form = ref<ContactForm>({
  name: "",
  email: "",
  subject: "general",
  message: "",
});

const handleSubmit = async () => {
  // TODO: Implement contact form submission
  console.log("Form submitted:", form.value);
  // You can send this data to your backend API here
};
</script>
