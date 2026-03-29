// ============================================
// Angpaoku — Shared TypeScript Interfaces
// ============================================

/** User / Creator profile */
export interface User {
  id: string
  name: string
  username: string
  avatar?: string
  role: 'creator' | 'admin' | 'viewer'
  plan: 'free' | 'pro'
}

/** Dashboard quick stats */
export interface DashboardStats {
  totalEarnings: number
  pointsBalance: number
  totalSales: number
  activeViewers: number
  earningsChangePercent: number
}

/** Activity feed item */
export interface ActivityItem {
  id: string
  type: 'donation' | 'sale' | 'points_redemption'
  title: string
  subtitle: string
  amount: string
  amountType: 'positive' | 'negative' | 'neutral'
  timeAgo: string
  icon: string
}

/** Milestone / promotion card */
export interface MilestoneData {
  title: string
  description: string
  progressPercent: number
  label: string
}

/** Transaction row */
export interface Transaction {
  id: string
  customer: {
    name: string
    username: string
    avatar?: string
    initials?: string
  }
  product: string
  productType: string
  date: string
  time: string
  amount: string
  status: 'completed' | 'processing' | 'failed'
}

/** Digital product */
export interface Product {
  id: string
  name: string
  type: string
  fileSize: string
  price: string
  sales: number
  status: 'active' | 'draft'
  image?: string
  isTopSeller?: boolean
}

/** Points / Donation row */
export interface Donation {
  id: string
  user: {
    name: string
    username: string
    avatar?: string
    isAnonymous?: boolean
  }
  date: string
  time: string
  message: string
  points: string
  idrEquivalent: string
  status: 'completed' | 'pending'
}

/** OBS Overlay settings */
export interface OverlaySettings {
  widgetUrl: string
  themeAccent: string
  animation: 'slide_up' | 'bounce' | 'fade_in'
  alertSound: string
}

/** Navigation item for sidebar */
export interface NavItem {
  label: string
  icon: string
  route: string
}

/** Stat card props */
export interface StatCardData {
  label: string
  value: string
  icon: string
  iconBgClass: string
  iconTextClass: string
  badge?: string
  badgeClass?: string
  isLive?: boolean
  hasGlow?: boolean
}

/** Landing page stat */
export interface LandingStat {
  value: string
  label: string
}

/** Landing page feature */
export interface FeatureItem {
  icon: string
  title: string
  description: string
  iconBgClass: string
  iconTextClass: string
}

/** Pricing plan */
export interface PricingPlan {
  name: string
  subtitle: string
  price: string
  priceUnit: string
  features: string[]
  isPopular?: boolean
  buttonLabel: string
}
