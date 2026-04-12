<template>
  <div>
    <DashboardNavbar
      page-title="Profile"
      search-placeholder="Search settings..."
    />

    <div class="mx-auto w-full p-8">
      <div
        class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1
            class="mb-2 text-4xl font-headline font-extrabold tracking-tight text-on-surface"
          >
            Profile Settings
          </h1>
          <p class="max-w-2xl leading-relaxed text-on-surface-variant">
            Manage your public identity, creator branding, social channels, and
            account preferences.
          </p>
        </div>
      </div>

      <!-- Verification Warning -->
      <VerificationWarningBanner class="mb-6" />

      <div
        v-if="isLoading"
        class="rounded-2xl bg-surface-container-low p-8 text-on-surface-variant"
      >
        Loading profile data...
      </div>

      <div
        v-else-if="errorMessage"
        class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600"
      >
        <p class="font-semibold">{{ errorMessage }}</p>
        <button
          type="button"
          class="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white"
          @click="loadProfile"
        >
          Retry
        </button>
      </div>

      <div
        v-else-if="profileResponse"
        class="grid grid-cols-1 gap-8 xl:grid-cols-12"
      >
        <div class="space-y-6 xl:col-span-4">
          <AppCard class="overflow-hidden" shadow="sm">
            <div class="relative h-48 w-full">
              <img
                class="h-full w-full object-cover"
                :src="bannerPhotoUrl"
                alt="Profile banner"
              />
              <div
                class="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20"
              ></div>

              <div class="absolute right-4 top-4 flex items-center gap-2">
                <button
                  type="button"
                  class="rounded-full border border-outline-variant/20 bg-white/90 p-2 text-primary shadow-sm transition-transform hover:scale-110"
                  @click="triggerImagePicker('banner_photo')"
                >
                  <span class="material-symbols-outlined text-sm"
                    >photo_camera</span
                  >
                </button>
                <button
                  v-if="isImageEditing('banner_photo')"
                  type="button"
                  class="rounded-xl bg-green-500 p-2 text-green-600"
                  :disabled="isImageSaving('banner_photo')"
                  @click="saveImageEdit('banner_photo')"
                >
                  <span class="material-symbols-outlined text-sm">
                    {{
                      isImageSaving("banner_photo") ? "hourglass_top" : "check"
                    }}
                  </span>
                </button>
                <button
                  v-if="isImageEditing('banner_photo')"
                  type="button"
                  class="rounded-full bg-red-500 p-2 text-white"
                  :disabled="isImageSaving('banner_photo')"
                  @click="cancelImageEdit('banner_photo')"
                >
                  <span class="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <input
                ref="bannerFileInput"
                class="hidden"
                type="file"
                accept="image/*"
                @change="onImagePicked('banner_photo', $event)"
              />
            </div>

            <div class="flex flex-col items-center px-8 pb-8 pt-0 text-center">
              <div class="relative -mt-20 mb-6">
                <div
                  class="h-40 w-40 overflow-hidden rounded-full border-4 border-primary-fixed-dim bg-white"
                >
                  <img
                    class="h-full w-full object-cover"
                    :src="profilePhotoUrl"
                    alt="Creator profile"
                  />
                </div>

                <div class="absolute bottom-2 right-2 flex items-center gap-2">
                  <button
                    type="button"
                    class="rounded-full border border-outline-variant/20 bg-white p-2 text-primary shadow-sm transition-transform hover:scale-110"
                    @click="triggerImagePicker('profile_photo')"
                  >
                    <span class="material-symbols-outlined text-sm"
                      >photo_camera</span
                    >
                  </button>
                  <button
                    v-if="isImageEditing('profile_photo')"
                    type="button"
                    class="rounded-xl bg-green-500 p-2 text-green-600"
                    :disabled="isImageSaving('profile_photo')"
                    @click="saveImageEdit('profile_photo')"
                  >
                    <span class="material-symbols-outlined text-sm">
                      {{
                        isImageSaving("profile_photo")
                          ? "hourglass_top"
                          : "check"
                      }}
                    </span>
                  </button>
                  <button
                    v-if="isImageEditing('profile_photo')"
                    type="button"
                    class="rounded-full bg-red-500 p-2 text-white"
                    :disabled="isImageSaving('profile_photo')"
                    @click="cancelImageEdit('profile_photo')"
                  >
                    <span class="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>

                <input
                  ref="profileFileInput"
                  class="hidden"
                  type="file"
                  accept="image/*"
                  @change="onImagePicked('profile_photo', $event)"
                />
              </div>

              <h2
                class="mb-1 flex items-center gap-2 text-2xl font-bold text-on-surface"
              >
                {{ displayName }}
                <span
                  v-if="user.is_verified"
                  class="material-symbols-outlined text-xl text-blue-500"
                  style="font-variation-settings: &quot;FILL&quot; 1"
                >
                  verified
                </span>
              </h2>
              <p class="mb-4 font-medium text-on-surface-variant">
                @{{ user.username }}
              </p>
              <p class="mb-2 text-sm leading-relaxed text-on-surface-variant">
                {{ form.bio.trim() !== "" ? form.bio : "No bio yet." }}
              </p>
              <p v-if="imageErrorMessage" class="text-xs text-red-500">
                {{ imageErrorMessage }}
              </p>
            </div>
          </AppCard>
        </div>

        <div class="space-y-8 xl:col-span-8">
          <div
            v-if="actionError"
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {{ actionError }}
          </div>
          <div
            v-if="actionMessage"
            class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            {{ actionMessage }}
          </div>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-8 flex items-center gap-3">
              <div class="h-8 w-1.5 rounded-full bg-primary"></div>
              <h3 class="text-xl font-bold text-on-surface">
                Personal Information
              </h3>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  >Full Name</label
                >
                <div class="relative">
                  <input
                    v-model="form.fullName"
                    class="w-full cursor-not-allowed rounded-xl bg-surface-container-low px-4 py-3 pr-12 text-on-surface-variant/70"
                    disabled
                  />
                  <span
                    class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant"
                    >lock</span
                  >
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  >Username</label
                >
                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                    >@</span
                  >
                  <input
                    :value="user.username"
                    class="w-full cursor-not-allowed rounded-xl bg-surface-container-low py-3 pl-9 pr-4 text-on-surface-variant/70"
                    disabled
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  >Email</label
                >
                <div class="relative">
                  <input
                    :value="user.email"
                    class="w-full cursor-not-allowed rounded-xl bg-surface-container-low px-4 py-3 text-on-surface-variant/70"
                    disabled
                  />
                  <span
                    class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant"
                    >lock</span
                  >
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  >Phone Number</label
                >
                <div class="relative">
                  <input
                    :value="getFieldValue('phone_number')"
                    :disabled="!isFieldEditing('phone_number')"
                    class="w-full rounded-xl px-4 py-3 pr-16 transition-all focus:outline-none"
                    :class="editableClass('phone_number')"
                    placeholder="+628123456789"
                    @input="onFieldInput('phone_number', $event)"
                  />
                  <div class="absolute right-3 top-1/2 -translate-y-1/2">
                    <button
                      v-if="!isFieldEditing('phone_number')"
                      type="button"
                      class="text-on-surface-variant hover:text-primary"
                      @click="startFieldEdit('phone_number')"
                    >
                      <span class="material-symbols-outlined text-base"
                        >edit</span
                      >
                    </button>
                    <div v-else class="flex items-center gap-1">
                      <button
                        type="button"
                        class="rounded-xl bg-green-500 p-1.5 text-green-600"
                        :disabled="isFieldSaving('phone_number')"
                        @click="saveFieldEdit('phone_number')"
                      >
                        <span class="material-symbols-outlined text-sm">{{
                          isFieldSaving("phone_number")
                            ? "hourglass_top"
                            : "check"
                        }}</span>
                      </button>
                      <button
                        type="button"
                        class="rounded-full bg-red-500 p-1.5 text-white"
                        :disabled="isFieldSaving('phone_number')"
                        @click="cancelFieldEdit('phone_number')"
                      >
                        <span class="material-symbols-outlined text-sm"
                          >close</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
                <p
                  v-if="fieldError('phone_number')"
                  class="text-xs text-red-500"
                >
                  {{ fieldError("phone_number") }}
                </p>
              </div>

              <div class="space-y-2 md:col-span-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  >Location</label
                >
                <div class="relative">
                  <span
                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                    >location_on</span
                  >
                  <input
                    :value="getFieldValue('location')"
                    :disabled="!isFieldEditing('location')"
                    class="w-full rounded-xl py-3 pl-12 pr-16 transition-all focus:outline-none"
                    :class="editableClass('location')"
                    @input="onFieldInput('location', $event)"
                  />
                  <div class="absolute right-3 top-1/2 -translate-y-1/2">
                    <button
                      v-if="!isFieldEditing('location')"
                      type="button"
                      class="text-on-surface-variant hover:text-primary"
                      @click="startFieldEdit('location')"
                    >
                      <span class="material-symbols-outlined text-base"
                        >edit</span
                      >
                    </button>
                    <div v-else class="flex items-center gap-1">
                      <button
                        type="button"
                        class="rounded-xl bg-green-500 p-1.5 text-green-600"
                        :disabled="isFieldSaving('location')"
                        @click="saveFieldEdit('location')"
                      >
                        <span class="material-symbols-outlined text-sm">{{
                          isFieldSaving("location") ? "hourglass_top" : "check"
                        }}</span>
                      </button>
                      <button
                        type="button"
                        class="rounded-full bg-red-500 p-1.5 text-white"
                        :disabled="isFieldSaving('location')"
                        @click="cancelFieldEdit('location')"
                      >
                        <span class="material-symbols-outlined text-sm"
                          >close</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
                <p v-if="fieldError('location')" class="text-xs text-red-500">
                  {{ fieldError("location") }}
                </p>
              </div>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-8 flex items-center gap-3">
              <div class="h-8 w-1.5 rounded-full bg-tertiary"></div>
              <h3 class="text-xl font-bold text-on-surface">
                Bio and Branding
              </h3>
            </div>

            <div class="space-y-6">
              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  >Creator Tagline</label
                >
                <div class="relative">
                  <input
                    :value="getFieldValue('tagline')"
                    :disabled="!isFieldEditing('tagline')"
                    class="w-full rounded-xl px-4 py-3 pr-16 transition-all focus:outline-none"
                    :class="editableClass('tagline')"
                    @input="onFieldInput('tagline', $event)"
                  />
                  <div class="absolute right-3 top-1/2 -translate-y-1/2">
                    <button
                      v-if="!isFieldEditing('tagline')"
                      type="button"
                      class="text-on-surface-variant hover:text-primary"
                      @click="startFieldEdit('tagline')"
                    >
                      <span class="material-symbols-outlined text-base"
                        >edit</span
                      >
                    </button>
                    <div v-else class="flex items-center gap-1">
                      <button
                        type="button"
                        class="rounded-xl bg-green-500 p-1.5 text-green-600"
                        :disabled="isFieldSaving('tagline')"
                        @click="saveFieldEdit('tagline')"
                      >
                        <span class="material-symbols-outlined text-sm">{{
                          isFieldSaving("tagline") ? "hourglass_top" : "check"
                        }}</span>
                      </button>
                      <button
                        type="button"
                        class="rounded-full bg-red-500 p-1.5 text-white"
                        :disabled="isFieldSaving('tagline')"
                        @click="cancelFieldEdit('tagline')"
                      >
                        <span class="material-symbols-outlined text-sm"
                          >close</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
                <p v-if="fieldError('tagline')" class="text-xs text-red-500">
                  {{ fieldError("tagline") }}
                </p>
              </div>

              <div class="space-y-2">
                <label
                  class="ml-1 text-sm font-semibold text-on-surface-variant"
                  >Bio</label
                >
                <div class="relative">
                  <textarea
                    :value="getFieldValue('bio')"
                    :disabled="!isFieldEditing('bio')"
                    rows="4"
                    class="w-full resize-none rounded-xl px-4 py-3 pr-16 transition-all focus:outline-none"
                    :class="editableClass('bio')"
                    @input="onFieldInput('bio', $event)"
                  ></textarea>
                  <div class="absolute right-3 top-4">
                    <button
                      v-if="!isFieldEditing('bio')"
                      type="button"
                      class="text-on-surface-variant hover:text-primary"
                      @click="startFieldEdit('bio')"
                    >
                      <span class="material-symbols-outlined text-base"
                        >edit</span
                      >
                    </button>
                    <div v-else class="flex items-center gap-1">
                      <button
                        type="button"
                        class="rounded-xl bg-green-500 p-1.5 text-green-600"
                        :disabled="isFieldSaving('bio')"
                        @click="saveFieldEdit('bio')"
                      >
                        <span class="material-symbols-outlined text-sm">{{
                          isFieldSaving("bio") ? "hourglass_top" : "check"
                        }}</span>
                      </button>
                      <button
                        type="button"
                        class="rounded-full bg-red-500 p-1.5 text-white"
                        :disabled="isFieldSaving('bio')"
                        @click="cancelFieldEdit('bio')"
                      >
                        <span class="material-symbols-outlined text-sm"
                          >close</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
                <p class="text-right text-xs text-on-surface-variant">
                  {{ form.bio.length }} / 300 characters
                </p>
                <p v-if="fieldError('bio')" class="text-xs text-red-500">
                  {{ fieldError("bio") }}
                </p>
              </div>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-8 flex items-center gap-3">
              <div class="h-8 w-1.5 rounded-full bg-secondary"></div>
              <h3 class="text-xl font-bold text-on-surface">
                Social Media Settings
              </h3>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div
                v-for="item in socialItems"
                :key="item.field"
                class="flex items-center gap-3 rounded-xl bg-surface-container-low p-2"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg"
                  :class="`${item.iconBg} ${item.iconColor}`"
                >
                  <span v-if="item.icon" class="material-symbols-outlined">{{
                    item.icon
                  }}</span>
                  <span v-else class="text-sm font-bold">X</span>
                </div>

                <input
                  :value="getFieldValue(item.field)"
                  :disabled="!isFieldEditing(item.field)"
                  class="w-full bg-transparent text-sm focus:outline-none"
                  :class="
                    isFieldEditing(item.field)
                      ? 'text-on-surface'
                      : 'cursor-not-allowed text-on-surface-variant/70'
                  "
                  :placeholder="item.placeholder"
                  @input="onFieldInput(item.field, $event)"
                />

                <button
                  v-if="!isFieldEditing(item.field)"
                  type="button"
                  class="text-on-surface-variant hover:text-primary"
                  @click="startFieldEdit(item.field)"
                >
                  <span class="material-symbols-outlined text-base">edit</span>
                </button>
                <div v-else class="flex items-center gap-1">
                  <button
                    type="button"
                    class="rounded-xl bg-green-500 p-1.5 text-green-600"
                    :disabled="isFieldSaving(item.field)"
                    @click="saveFieldEdit(item.field)"
                  >
                    <span class="material-symbols-outlined text-sm">{{
                      isFieldSaving(item.field) ? "hourglass_top" : "check"
                    }}</span>
                  </button>
                  <button
                    type="button"
                    class="rounded-full bg-red-500 p-1.5 text-white"
                    :disabled="isFieldSaving(item.field)"
                    @click="cancelFieldEdit(item.field)"
                  >
                    <span class="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <p
                v-for="item in socialItems"
                :key="`${item.field}-error`"
                class="text-xs text-red-500"
              >
                {{ fieldError(item.field) }}
              </p>
            </div>
          </AppCard>

          <AppCard class="relative overflow-hidden p-8" shadow="sm">
            <div
              class="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-secondary-container/10 blur-3xl"
            ></div>
            <div
              class="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
            >
              <div class="flex items-center gap-4">
                <div
                  class="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600"
                >
                  <span class="material-symbols-outlined text-4xl"
                    >verified_user</span
                  >
                </div>
                <div>
                  <h3 class="text-xl font-bold text-on-surface">
                    Verification Status
                  </h3>
                  <p
                    class="mt-1 flex items-center gap-1 font-bold"
                    :class="
                      user.is_verified ? 'text-green-600' : 'text-amber-600'
                    "
                  >
                    <span
                      class="material-symbols-outlined text-base"
                      style="font-variation-settings: &quot;FILL&quot; 1"
                      >check_circle</span
                    >
                    {{ user.is_verified ? "Verified" : "Not Verified" }}
                  </p>
                </div>
              </div>

              <button
                v-if="!user.is_verified"
                type="button"
                class="self-start rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:brightness-95 md:self-auto"
                @click="onGetVerified"
              >
                Get Verified
              </button>
            </div>
          </AppCard>

          <AppCard class="p-8" shadow="sm">
            <div class="mb-8 flex items-center gap-3">
              <div class="h-8 w-1.5 rounded-full bg-error"></div>
              <h3 class="text-xl font-bold text-on-surface">
                Security Settings
              </h3>
            </div>

            <div class="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div
                class="flex items-center justify-between rounded-xl bg-surface-container-low p-4"
              >
                <div class="flex items-center gap-4">
                  <span
                    class="material-symbols-outlined text-on-surface-variant"
                    >password</span
                  >
                  <div>
                    <p class="text-sm font-bold text-on-surface">Password</p>
                    <p class="text-xs text-on-surface-variant">
                      Last updated 3 months ago
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  class="text-sm font-bold text-primary hover:underline"
                >
                  Change
                </button>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import VerificationWarningBanner from "@/components/common/VerificationWarningBanner.vue";
import {
  profileApi,
  type AuthUser,
  type ProfileEditableField,
  type ProfileImageField,
  type ProfileResponse,
} from "@/api";

const fallbackBanner =
  "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=300&fit=crop";
const fallbackPhoto =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABIm_EBNcnD3VD4Kzx94u-Xygh_j5rz1oLVliUnVMW9_jMksaj0PUuRYMnoNAG54zaZYbpY1gKlsDuQHnAoUG3DRzRf12Ophl-TyouOr6FhaHNnX_qMnJFs9k4ng-jfiBoIYj2hIgCWVGeQvQqAPsJB3D6kMDETjzVyWy21d76L_caeLpNeAdC8jT_NpFhcKXfOZdpmRlqR2Q2zQjcIwAzw3R_uBTfjLsJPwZaqSTvh5MK_naIq2lGHmiGJsi-gRAjxQBFenzJPBc";

const router = useRouter();

interface ProfileForm {
  fullName: string;
  phoneNumber: string;
  location: string;
  tagline: string;
  bio: string;
  youtubeUrl: string;
  instagramUsername: string;
  tiktokUsername: string;
  xUsername: string;
  website: string;
  discordLink: string;
}

interface ImageEditState {
  isEditing: boolean;
  isSaving: boolean;
  file: File | null;
  previewUrl: string;
  error: string;
}

interface SocialFieldItem {
  field: ProfileEditableField;
  placeholder: string;
  icon?: string;
  iconBg: string;
  iconColor: string;
}

const editableFields: ProfileEditableField[] = [
  "phone_number",
  "bio",
  "tagline",
  "location",
  "website",
  "youtube_url",
  "instagram_username",
  "tiktok_username",
  "x_username",
  "discord_link",
];

const socialItems: SocialFieldItem[] = [
  {
    field: "youtube_url",
    placeholder: "YouTube URL",
    icon: "smart_display",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    field: "instagram_username",
    placeholder: "Instagram Username",
    icon: "photo_camera",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    field: "tiktok_username",
    placeholder: "TikTok Username",
    icon: "music_note",
    iconBg: "bg-black",
    iconColor: "text-white",
  },
  {
    field: "x_username",
    placeholder: "X Username",
    iconBg: "bg-zinc-900",
    iconColor: "text-white",
  },
  {
    field: "website",
    placeholder: "Personal Website",
    icon: "language",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    field: "discord_link",
    placeholder: "Discord Link",
    icon: "forum",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

const fieldLabels: Record<ProfileEditableField, string> = {
  phone_number: "Phone number",
  bio: "Bio",
  tagline: "Tagline",
  location: "Location",
  website: "Website",
  youtube_url: "YouTube URL",
  instagram_username: "Instagram username",
  tiktok_username: "TikTok username",
  x_username: "X username",
  discord_link: "Discord link",
};

const profileResponse = ref<ProfileResponse | null>(null);
const isLoading = ref(false);
const errorMessage = ref("");
const actionMessage = ref("");
const actionError = ref("");

const bannerFileInput = ref<HTMLInputElement | null>(null);
const profileFileInput = ref<HTMLInputElement | null>(null);

const emptyUser: AuthUser = {
  id: "",
  email: "",
  username: "",
  full_name: "",
  phone_number: null,
  is_verified: false,
  created_at: "",
  updated_at: "",
};

const form = reactive<ProfileForm>({
  fullName: "",
  phoneNumber: "",
  location: "",
  tagline: "",
  bio: "",
  youtubeUrl: "",
  instagramUsername: "",
  tiktokUsername: "",
  xUsername: "",
  website: "",
  discordLink: "",
});

function createBoolState(
  initial: boolean,
): Record<ProfileEditableField, boolean> {
  return {
    phone_number: initial,
    bio: initial,
    tagline: initial,
    location: initial,
    website: initial,
    youtube_url: initial,
    instagram_username: initial,
    tiktok_username: initial,
    x_username: initial,
    discord_link: initial,
  };
}

function createTextState(
  initial: string,
): Record<ProfileEditableField, string> {
  return {
    phone_number: initial,
    bio: initial,
    tagline: initial,
    location: initial,
    website: initial,
    youtube_url: initial,
    instagram_username: initial,
    tiktok_username: initial,
    x_username: initial,
    discord_link: initial,
  };
}

const editingFieldState = reactive(createBoolState(false));
const savingFieldState = reactive(createBoolState(false));
const fieldErrors = reactive(createTextState(""));
const originalFieldValues = reactive(createTextState(""));

const imageStates = reactive<Record<ProfileImageField, ImageEditState>>({
  profile_photo: {
    isEditing: false,
    isSaving: false,
    file: null,
    previewUrl: "",
    error: "",
  },
  banner_photo: {
    isEditing: false,
    isSaving: false,
    file: null,
    previewUrl: "",
    error: "",
  },
});

const user = computed(() => profileResponse.value?.user ?? emptyUser);

const displayName = computed(() => {
  if (form.fullName.trim() !== "") {
    return form.fullName.trim();
  }

  if ((user.value.full_name ?? "").trim() !== "") {
    return user.value.full_name.trim();
  }

  return user.value.username;
});

const bannerPhotoUrl = computed(() => {
  if (
    imageStates.banner_photo.isEditing &&
    imageStates.banner_photo.previewUrl !== ""
  ) {
    return imageStates.banner_photo.previewUrl;
  }

  const value = profileResponse.value?.profile?.banner_photo?.trim() ?? "";
  return value === "" ? fallbackBanner : value;
});

const profilePhotoUrl = computed(() => {
  if (
    imageStates.profile_photo.isEditing &&
    imageStates.profile_photo.previewUrl !== ""
  ) {
    return imageStates.profile_photo.previewUrl;
  }

  const value = profileResponse.value?.profile?.profile_photo?.trim() ?? "";
  return value === "" ? fallbackPhoto : value;
});

const imageErrorMessage = computed(() => {
  if (imageStates.profile_photo.error !== "") {
    return imageStates.profile_photo.error;
  }
  return imageStates.banner_photo.error;
});

function applyProfileToForm(payload: ProfileResponse): void {
  form.fullName = payload.user.full_name ?? "";
  form.phoneNumber = payload.user.phone_number ?? "";
  form.location = payload.profile.location ?? "";
  form.tagline = payload.profile.tagline ?? "";
  form.bio = payload.profile.bio ?? "";
  form.youtubeUrl = payload.profile.youtube_url ?? "";
  form.instagramUsername = payload.profile.instagram_username ?? "";
  form.tiktokUsername = payload.profile.tiktok_username ?? "";
  form.xUsername = payload.profile.x_username ?? "";
  form.website = payload.profile.website ?? "";
  form.discordLink = payload.profile.discord_link ?? "";
}

function getFieldValue(field: ProfileEditableField): string {
  switch (field) {
    case "phone_number":
      return form.phoneNumber;
    case "bio":
      return form.bio;
    case "tagline":
      return form.tagline;
    case "location":
      return form.location;
    case "website":
      return form.website;
    case "youtube_url":
      return form.youtubeUrl;
    case "instagram_username":
      return form.instagramUsername;
    case "tiktok_username":
      return form.tiktokUsername;
    case "x_username":
      return form.xUsername;
    case "discord_link":
      return form.discordLink;
    default:
      return "";
  }
}

function setFieldValue(field: ProfileEditableField, value: string): void {
  switch (field) {
    case "phone_number":
      form.phoneNumber = value;
      break;
    case "bio":
      form.bio = value;
      break;
    case "tagline":
      form.tagline = value;
      break;
    case "location":
      form.location = value;
      break;
    case "website":
      form.website = value;
      break;
    case "youtube_url":
      form.youtubeUrl = value;
      break;
    case "instagram_username":
      form.instagramUsername = value;
      break;
    case "tiktok_username":
      form.tiktokUsername = value;
      break;
    case "x_username":
      form.xUsername = value;
      break;
    case "discord_link":
      form.discordLink = value;
      break;
    default:
      break;
  }
}

function onFieldInput(field: ProfileEditableField, event: Event): void {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
  setFieldValue(field, target?.value ?? "");
}

function resetFieldStates(): void {
  for (const field of editableFields) {
    editingFieldState[field] = false;
    savingFieldState[field] = false;
    fieldErrors[field] = "";
    originalFieldValues[field] = getFieldValue(field);
  }
}

function clearFeedback(): void {
  actionMessage.value = "";
  actionError.value = "";
}

function editableClass(field: ProfileEditableField): string {
  return isFieldEditing(field)
    ? "bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/10"
    : "cursor-not-allowed bg-surface-container-low text-on-surface-variant/70";
}

function isFieldEditing(field: ProfileEditableField): boolean {
  return editingFieldState[field];
}

function isFieldSaving(field: ProfileEditableField): boolean {
  return savingFieldState[field];
}

function fieldError(field: ProfileEditableField): string {
  return fieldErrors[field];
}

function startFieldEdit(field: ProfileEditableField): void {
  if (savingFieldState[field]) {
    return;
  }

  clearFeedback();
  fieldErrors[field] = "";
  originalFieldValues[field] = getFieldValue(field);
  editingFieldState[field] = true;
}

function cancelFieldEdit(field: ProfileEditableField): void {
  if (savingFieldState[field]) {
    return;
  }

  setFieldValue(field, originalFieldValues[field]);
  fieldErrors[field] = "";
  editingFieldState[field] = false;
}

async function saveFieldEdit(field: ProfileEditableField): Promise<void> {
  if (savingFieldState[field]) {
    return;
  }

  clearFeedback();
  fieldErrors[field] = "";
  savingFieldState[field] = true;

  try {
    const payload = await profileApi.updateField({
      field,
      value: getFieldValue(field),
    });
    profileResponse.value = payload;
    applyProfileToForm(payload);
    resetFieldStates();
    actionMessage.value = `${fieldLabels[field]} updated successfully.`;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update profile field";
    fieldErrors[field] = message;
    actionError.value = message;
  } finally {
    savingFieldState[field] = false;
  }
}

function isImageEditing(field: ProfileImageField): boolean {
  return imageStates[field].isEditing;
}

function isImageSaving(field: ProfileImageField): boolean {
  return imageStates[field].isSaving;
}

function cleanupImagePreview(field: ProfileImageField): void {
  const state = imageStates[field];
  if (state.previewUrl !== "") {
    URL.revokeObjectURL(state.previewUrl);
    state.previewUrl = "";
  }
}

function resetImageInput(field: ProfileImageField): void {
  if (field === "banner_photo") {
    if (bannerFileInput.value) {
      bannerFileInput.value.value = "";
    }
    return;
  }

  if (profileFileInput.value) {
    profileFileInput.value.value = "";
  }
}

function clearImageState(field: ProfileImageField): void {
  const state = imageStates[field];
  cleanupImagePreview(field);
  state.file = null;
  state.isEditing = false;
  state.isSaving = false;
  state.error = "";
  resetImageInput(field);
}

function triggerImagePicker(field: ProfileImageField): void {
  clearFeedback();
  imageStates[field].error = "";
  if (field === "banner_photo") {
    bannerFileInput.value?.click();
  } else {
    profileFileInput.value?.click();
  }
}

function onImagePicked(field: ProfileImageField, event: Event): void {
  const target = event.target as HTMLInputElement | null;
  const file = target?.files?.[0] ?? null;
  if (!file) {
    return;
  }

  const state = imageStates[field];
  cleanupImagePreview(field);
  state.file = file;
  state.previewUrl = URL.createObjectURL(file);
  state.isEditing = true;
  state.error = "";
}

function cancelImageEdit(field: ProfileImageField): void {
  if (imageStates[field].isSaving) {
    return;
  }
  clearImageState(field);
}

async function saveImageEdit(field: ProfileImageField): Promise<void> {
  const state = imageStates[field];
  if (state.isSaving) {
    return;
  }

  if (!state.file) {
    state.error = "Please choose an image first.";
    return;
  }

  clearFeedback();
  state.error = "";
  state.isSaving = true;

  try {
    const payload = await profileApi.updateImage(field, state.file);
    profileResponse.value = payload;
    applyProfileToForm(payload);
    resetFieldStates();
    clearImageState(field);
    actionMessage.value =
      field === "profile_photo"
        ? "Profile picture updated successfully."
        : "Profile banner updated successfully.";
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update profile image";
    state.error = message;
    actionError.value = message;
  } finally {
    state.isSaving = false;
  }
}

function onGetVerified(): void {
  clearFeedback();
  const normalizedUserID = user.value.id.trim();
  if (normalizedUserID === "") {
    actionError.value = "Failed to start verification flow: user ID not found.";
    return;
  }

  router.push(`/get-verified/${encodeURIComponent(normalizedUserID)}`);
}

async function loadProfile(): Promise<void> {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const payload = await profileApi.getMyProfile();
    profileResponse.value = payload;
    applyProfileToForm(payload);
    clearFeedback();
    clearImageState("banner_photo");
    clearImageState("profile_photo");
    resetFieldStates();
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "Failed to load profile";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadProfile();
});

onBeforeUnmount(() => {
  cleanupImagePreview("banner_photo");
  cleanupImagePreview("profile_photo");
});
</script>
