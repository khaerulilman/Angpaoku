import axios from 'axios'
import type {
  ActivityItem,
  DashboardStats,
  Donation,
  OverlaySettings,
  Product,
  Transaction,
} from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function extractApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (!isObject(error)) {
    return fallbackMessage
  }

  const response = error.response
  if (!isObject(response)) {
    return fallbackMessage
  }

  const payload = response.data
  if (!isObject(payload)) {
    return fallbackMessage
  }

  const message = payload.message
  if (typeof message === 'string' && message.trim() !== '') {
    return message
  }

  return fallbackMessage
}

function unwrapData<T>(payload: ApiEnvelope<T>): T {
  return payload.data
}

export interface AuthUser {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  access_expires_at: string
  refresh_expires_at: string
  user: AuthUser
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthUser> {
    try {
      const response = await apiClient.post<ApiEnvelope<{ user: AuthUser }>>('/auth/register', payload)
      return unwrapData(response.data).user
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'register failed'))
    }
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<ApiEnvelope<LoginResponse>>('/auth/login', payload)
      return unwrapData(response.data)
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'login failed'))
    }
  },

  async me(): Promise<AuthUser> {
    try {
      const response = await apiClient.get<ApiEnvelope<{ user: AuthUser }>>('/auth/me')
      return unwrapData(response.data).user
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'failed to load current user'))
    }
  },

  async refresh(): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<ApiEnvelope<LoginResponse>>('/auth/refresh')
      return unwrapData(response.data)
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'refresh failed'))
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'logout failed'))
    }
  },
}

function notImplemented(methodName: string): never {
  throw new Error(`${methodName} is not implemented yet`)
}

// ---- Dashboard ----
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => notImplemented('dashboardApi.getStats'),
  getRecentActivity: async (): Promise<ActivityItem[]> => notImplemented('dashboardApi.getRecentActivity'),
}

// ---- Transactions ----
export const transactionsApi = {
  getAll: async (_params?: { page?: number; limit?: number; status?: string }): Promise<{
    data: Transaction[]
    total: number
  }> => notImplemented('transactionsApi.getAll'),
  getById: async (_id: string): Promise<Transaction> => notImplemented('transactionsApi.getById'),
  exportCsv: async (): Promise<Blob> => notImplemented('transactionsApi.exportCsv'),
}

// ---- Products ----
export const productsApi = {
  getAll: async (_params?: { page?: number; limit?: number }): Promise<{
    data: Product[]
    total: number
  }> => notImplemented('productsApi.getAll'),
  getById: async (_id: string): Promise<Product> => notImplemented('productsApi.getById'),
  create: async (_payload: Partial<Product>): Promise<Product> => notImplemented('productsApi.create'),
  update: async (_id: string, _payload: Partial<Product>): Promise<Product> =>
    notImplemented('productsApi.update'),
  delete: async (_id: string): Promise<void> => notImplemented('productsApi.delete'),
}

// ---- Points / Donations ----
export const pointsApi = {
  getDonations: async (_params?: {
    page?: number
    limit?: number
    period?: string
  }): Promise<{ data: Donation[]; total: number }> => notImplemented('pointsApi.getDonations'),
  getBalance: async (): Promise<{ points: number; idrEquivalent: number }> =>
    notImplemented('pointsApi.getBalance'),
  withdraw: async (_amount: number): Promise<void> => notImplemented('pointsApi.withdraw'),
}

// ---- OBS Overlay ----
export const overlayApi = {
  getSettings: async (): Promise<OverlaySettings> => notImplemented('overlayApi.getSettings'),
  updateSettings: async (_payload: Partial<OverlaySettings>): Promise<OverlaySettings> =>
    notImplemented('overlayApi.updateSettings'),
  resetSettings: async (): Promise<OverlaySettings> => notImplemented('overlayApi.resetSettings'),
}

// ---- Analytics ----
export const analyticsApi = {
  getEarningsChart: async (_period?: string): Promise<{ labels: string[]; data: number[] }> =>
    notImplemented('analyticsApi.getEarningsChart'),
  getSummary: async (): Promise<Record<string, unknown>> => notImplemented('analyticsApi.getSummary'),
}

// ---- Withdraw ----
export const withdrawApi = {
  getHistory: async (): Promise<Record<string, unknown>[]> => notImplemented('withdrawApi.getHistory'),
  request: async (_amount: number, _method: string): Promise<void> => notImplemented('withdrawApi.request'),
}

