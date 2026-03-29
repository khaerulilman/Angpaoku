// ============================================
// Angpaoku — API Service Layer (Stub)
// ============================================
// This file serves as the central API module.
// All API calls will be defined here when the backend is ready.
// For now, each function is a placeholder returning empty promises.

import type {
  User,
  DashboardStats,
  ActivityItem,
  Transaction,
  Product,
  Donation,
  OverlaySettings,
} from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// ---- Auth ----
export const authApi = {
  login: async (_email: string, _password: string): Promise<{ token: string; user: User }> => {
    // TODO: POST ${BASE_URL}/auth/login
    throw new Error('Not implemented')
  },
  register: async (_payload: Partial<User>): Promise<User> => {
    // TODO: POST ${BASE_URL}/auth/register
    throw new Error('Not implemented')
  },
  logout: async (): Promise<void> => {
    // TODO: POST ${BASE_URL}/auth/logout
    throw new Error('Not implemented')
  },
  me: async (): Promise<User> => {
    // TODO: GET ${BASE_URL}/auth/me
    throw new Error('Not implemented')
  },
}

// ---- Dashboard ----
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    // TODO: GET ${BASE_URL}/dashboard/stats
    throw new Error('Not implemented')
  },
  getRecentActivity: async (): Promise<ActivityItem[]> => {
    // TODO: GET ${BASE_URL}/dashboard/activity
    throw new Error('Not implemented')
  },
}

// ---- Transactions ----
export const transactionsApi = {
  getAll: async (_params?: { page?: number; limit?: number; status?: string }): Promise<{
    data: Transaction[]
    total: number
  }> => {
    // TODO: GET ${BASE_URL}/transactions
    throw new Error('Not implemented')
  },
  getById: async (_id: string): Promise<Transaction> => {
    // TODO: GET ${BASE_URL}/transactions/:id
    throw new Error('Not implemented')
  },
  exportCsv: async (): Promise<Blob> => {
    // TODO: GET ${BASE_URL}/transactions/export
    throw new Error('Not implemented')
  },
}

// ---- Products ----
export const productsApi = {
  getAll: async (_params?: { page?: number; limit?: number }): Promise<{
    data: Product[]
    total: number
  }> => {
    // TODO: GET ${BASE_URL}/products
    throw new Error('Not implemented')
  },
  getById: async (_id: string): Promise<Product> => {
    // TODO: GET ${BASE_URL}/products/:id
    throw new Error('Not implemented')
  },
  create: async (_payload: Partial<Product>): Promise<Product> => {
    // TODO: POST ${BASE_URL}/products
    throw new Error('Not implemented')
  },
  update: async (_id: string, _payload: Partial<Product>): Promise<Product> => {
    // TODO: PUT ${BASE_URL}/products/:id
    throw new Error('Not implemented')
  },
  delete: async (_id: string): Promise<void> => {
    // TODO: DELETE ${BASE_URL}/products/:id
    throw new Error('Not implemented')
  },
}

// ---- Points / Donations ----
export const pointsApi = {
  getDonations: async (_params?: { page?: number; limit?: number; period?: string }): Promise<{
    data: Donation[]
    total: number
  }> => {
    // TODO: GET ${BASE_URL}/points/donations
    throw new Error('Not implemented')
  },
  getBalance: async (): Promise<{ points: number; idrEquivalent: number }> => {
    // TODO: GET ${BASE_URL}/points/balance
    throw new Error('Not implemented')
  },
  withdraw: async (_amount: number): Promise<void> => {
    // TODO: POST ${BASE_URL}/points/withdraw
    throw new Error('Not implemented')
  },
}

// ---- OBS Overlay ----
export const overlayApi = {
  getSettings: async (): Promise<OverlaySettings> => {
    // TODO: GET ${BASE_URL}/overlay/settings
    throw new Error('Not implemented')
  },
  updateSettings: async (_payload: Partial<OverlaySettings>): Promise<OverlaySettings> => {
    // TODO: PUT ${BASE_URL}/overlay/settings
    throw new Error('Not implemented')
  },
  resetSettings: async (): Promise<OverlaySettings> => {
    // TODO: POST ${BASE_URL}/overlay/reset
    throw new Error('Not implemented')
  },
}

// ---- Analytics ----
export const analyticsApi = {
  getEarningsChart: async (_period?: string): Promise<{ labels: string[]; data: number[] }> => {
    // TODO: GET ${BASE_URL}/analytics/earnings
    throw new Error('Not implemented')
  },
  getSummary: async (): Promise<Record<string, unknown>> => {
    // TODO: GET ${BASE_URL}/analytics/summary
    throw new Error('Not implemented')
  },
}

// ---- Withdraw ----
export const withdrawApi = {
  getHistory: async (): Promise<Record<string, unknown>[]> => {
    // TODO: GET ${BASE_URL}/withdraw/history
    throw new Error('Not implemented')
  },
  request: async (_amount: number, _method: string): Promise<void> => {
    // TODO: POST ${BASE_URL}/withdraw/request
    throw new Error('Not implemented')
  },
}

// Suppress unused variable warning
void BASE_URL
