import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi, type AuthUser, type LoginPayload, type RegisterPayload } from '@/api'

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim() !== '') {
    return error.message
  }

  return fallback
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const isLoading = ref(false)
  const isBootstrapping = ref(false)
  const isInitialized = ref(false)

  const isAuthenticated = computed(() => user.value !== null)

  async function bootstrap(): Promise<boolean> {
    if (isInitialized.value) {
      return isAuthenticated.value
    }

    if (isBootstrapping.value) {
      return isAuthenticated.value
    }

    isBootstrapping.value = true
    try {
      user.value = await authApi.me()
      return true
    } catch {
      try {
        const result = await authApi.refresh()
        user.value = result.user
        return true
      } catch {
        user.value = null
        return false
      }
    } finally {
      isBootstrapping.value = false
      isInitialized.value = true
    }
  }

  async function login(payload: LoginPayload): Promise<AuthUser> {
    isLoading.value = true
    try {
      const result = await authApi.login(payload)
      user.value = result.user
      isInitialized.value = true
      return result.user
    } catch (error) {
      throw new Error(getErrorMessage(error, 'login failed'))
    } finally {
      isLoading.value = false
    }
  }

  async function register(payload: RegisterPayload): Promise<AuthUser> {
    isLoading.value = true
    try {
      return await authApi.register(payload)
    } catch (error) {
      throw new Error(getErrorMessage(error, 'register failed'))
    } finally {
      isLoading.value = false
    }
  }

  async function logout(): Promise<void> {
    isLoading.value = true
    try {
      await authApi.logout()
    } catch {
      // Keep UX smooth even if backend is unreachable.
    } finally {
      user.value = null
      isInitialized.value = true
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    isInitialized,
    isAuthenticated,
    bootstrap,
    login,
    register,
    logout,
  }
})

