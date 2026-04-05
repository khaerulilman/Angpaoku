import axios from 'axios'
import type {
  ActivityItem,
  DashboardStats,
  Donation,
  OverlaySettings,
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

export interface Category {
  id: string
  user_id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface CreateCategoryPayload {
  name: string
  slug?: string
}

export type ProductPricingType = 'paid' | 'free'
export type ProductVisibility = 'draft' | 'live'

export interface ProductRecord {
  id: string
  user_id: string
  category_id: string | null
  name: string
  description: string
  product_link: string
  link_verified: boolean
  discount_percentage: number
  discount_end_at: string | null
  cover_image_url: string
  gallery_images: string[]
  pricing_type: ProductPricingType
  price: number
  visibility: ProductVisibility
  slug: string
  created_at: string
  updated_at: string
  category?: Category
}

export interface CreateProductPayload {
  name: string
  category_id: string
  description: string
  product_link: string
  link_verified: boolean
  discount_percentage: number
  discount_end_date?: string
  pricing_type: ProductPricingType
  price: number
  visibility: ProductVisibility
  slug?: string
  cover_image_url?: string
  gallery_image_urls?: string[]
  product_cover?: File | null
  gallery_images?: File[]
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

// ---- Categories ----
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    try {
      const response = await apiClient.get<ApiEnvelope<{ categories: Category[] }>>('/categories')
      return unwrapData(response.data).categories ?? []
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'failed to load categories'))
    }
  },

  async create(payload: CreateCategoryPayload): Promise<Category> {
    try {
      const response = await apiClient.post<ApiEnvelope<{ category: Category }>>('/categories', payload)
      return unwrapData(response.data).category
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'failed to create category'))
    }
  },
}

// ---- Products ----
export const productsApi = {
  async getAll(): Promise<ProductRecord[]> {
    try {
      const response = await apiClient.get<ApiEnvelope<{ products: ProductRecord[] }>>('/products')
      return unwrapData(response.data).products ?? []
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'failed to load products'))
    }
  },

  async getById(id: string): Promise<ProductRecord> {
    try {
      const response = await apiClient.get<ApiEnvelope<{ product: ProductRecord }>>(`/products/${id}`)
      return unwrapData(response.data).product
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'failed to load product'))
    }
  },

  async create(payload: CreateProductPayload): Promise<ProductRecord> {
    try {
      const formData = new FormData()
      formData.append('name', payload.name)
      formData.append('category_id', payload.category_id)
      formData.append('description', payload.description)
      formData.append('product_link', payload.product_link)
      formData.append('link_verified', String(payload.link_verified))
      formData.append('discount_percentage', String(payload.discount_percentage))
      formData.append('pricing_type', payload.pricing_type)
      formData.append('price', String(payload.price))
      formData.append('visibility', payload.visibility)

      if (payload.slug) {
        formData.append('slug', payload.slug)
      }

      if (payload.discount_end_date) {
        formData.append('discount_end_date', payload.discount_end_date)
      }

      if (payload.cover_image_url) {
        formData.append('cover_image_url', payload.cover_image_url)
      }

      if (payload.gallery_image_urls && payload.gallery_image_urls.length > 0) {
        payload.gallery_image_urls.forEach((url) => {
          formData.append('gallery_image_urls', url)
        })
      }

      if (payload.product_cover) {
        formData.append('product_cover', payload.product_cover)
      }

      if (payload.gallery_images && payload.gallery_images.length > 0) {
        payload.gallery_images.forEach((file) => {
          formData.append('gallery_images', file)
        })
      }

      const response = await apiClient.post<ApiEnvelope<{ product: ProductRecord }>>('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return unwrapData(response.data).product
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'failed to create product'))
    }
  },

  update: async (_id: string, _payload: Partial<ProductRecord>): Promise<ProductRecord> =>
    notImplemented('productsApi.update'),

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/products/${id}`)
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, 'failed to delete product'))
    }
  },
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



