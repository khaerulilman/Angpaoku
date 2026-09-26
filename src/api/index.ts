import axios from "axios";
import type {
  ActivityItem,
  DashboardStats,
  Donation,
  OverlaySettings,
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Backward-compatible unified aliases pointing to the single monolith apiClient
const readApiClient = apiClient;
const productBuyApiClient = apiClient;
const donationsApiClient = apiClient;
const analyticsApiClient = apiClient;

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ReadEnvelope<T> {
  data: T;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (!isObject(error)) {
    return fallbackMessage;
  }

  const response = error.response;
  if (!isObject(response)) {
    return fallbackMessage;
  }

  const payload = response.data;
  if (!isObject(payload)) {
    return fallbackMessage;
  }

  const message = payload.message;
  if (typeof message === "string" && message.trim() !== "") {
    return message;
  }

  const errorMessage = payload.error;
  if (typeof errorMessage === "string" && errorMessage.trim() !== "") {
    return errorMessage;
  }

  return fallbackMessage;
}

function unwrapData<T>(payload: ApiEnvelope<T>): T {
  return payload.data;
}

function formatTimeAgo(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  full_name: string;
  phone_number?: string | null;
  is_verified: boolean;
  verification_requested_at?: string | null;
  verification_due_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access_expires_at: string;
  refresh_expires_at: string;
  user: AuthUser;
}

export interface RegisterPayload {
  username: string;
  full_name?: string;
  email: string;
  password: string;
}

export interface ProfileRecord {
  id: string;
  user_id: string;
  bio?: string | null;
  tagline?: string | null;
  location?: string | null;
  profile_photo?: string | null;
  banner_photo?: string | null;
  website?: string | null;
  youtube_url?: string | null;
  instagram_username?: string | null;
  tiktok_username?: string | null;
  x_username?: string | null;
  discord_link?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileResponse {
  user: AuthUser;
  profile: ProfileRecord;
}

export type ProfileEditableField =
  | "phone_number"
  | "bio"
  | "tagline"
  | "location"
  | "website"
  | "youtube_url"
  | "instagram_username"
  | "tiktok_username"
  | "x_username"
  | "discord_link";

export interface UpdateProfileFieldPayload {
  field: ProfileEditableField;
  value: string;
}

export type ProfileImageField = "profile_photo" | "banner_photo";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface GetVerifiedPayload {
  full_name: string;
  is_verified: boolean;
}

export interface GetVerifiedResponse {
  user: AuthUser;
  status: "idle" | "pending" | "verified";
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryPayload {
  name: string;
  slug?: string;
}

export interface UpdateCategoryPayload {
  name: string;
  slug?: string;
}

export type ProductPricingType = "paid" | "free";
export type ProductVisibility = "draft" | "live";

export interface ProductRecord {
  id: string;
  user_id: string;
  category_id: string | null;
  name: string;
  description: string;
  product_link: string;
  link_verified: boolean;
  discount_percentage: number;
  discount_end_at: string | null;
  cover_image_url: string;
  gallery_images: string[];
  pricing_type: ProductPricingType;
  price: number;
  visibility: ProductVisibility;
  slug: string;
  created_at: string;
  updated_at: string;
  username?: string;
  sold_count?: number;
  product_point?: number;
  category?: Category;
}

export interface StorePreviewProfile {
  username: string;
  full_name: string;
  bio: string;
  tagline: string;
  location: string;
  profile_photo: string;
  banner_photo: string;
  website: string;
  youtube_url: string;
  instagram_username: string;
  tiktok_username: string;
  x_username: string;
  discord_link: string;
}

export interface StorePreviewData {
  username: string;
  profile: StorePreviewProfile;
  products: ProductRecord[];
}

interface ReadPublicProduct {
  id: string;
  user_id: string;
  name: string;
  description: string;
  price: number;
  final_price: number;
  discount: number;
  category: string;
  type: "paid" | "free";
  image_url: string;
  gallery_images: string[];
  visibility: string;
  created_at: string;
  updated_at: string;
}

interface ReadPublicProfile {
  username: string;
  full_name?: string;
  bio?: string;
  tagline?: string;
  location?: string;
  profile_photo?: string;
  banner_photo?: string;
  website?: string;
  youtube_url?: string;
  instagram_username?: string;
  tiktok_username?: string;
  x_username?: string;
  discord_link?: string;
}

interface ReadStorePreviewData {
  profile: ReadPublicProfile;
  products: ReadPublicProduct[];
}

interface ReadTransactionSummary {
  total_revenue: number;
  product_sales: number;
  total_transactions: number;
}

export interface TransactionHistoryItem {
  id: string;
  order_id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  email: string;
  quantity: number;
  gross_amount: number;
  payment_type: string;
  transaction_status: string;
  fraud_status?: string | null;
  created_at: string;
  updated_at?: string | null;
}

interface BuyProductTransactionHistoryData {
  summary: ReadTransactionSummary;
  transactions: TransactionHistoryItem[];
  page?: number;
  limit?: number;
}

export interface TransactionHistorySummary {
  total_revenue: number;
  product_sales: number;
  total_transactions: number;
}

export interface TransactionHistoryResult {
  summary: TransactionHistorySummary;
  transactions: TransactionHistoryItem[];
  total: number;
  page: number;
  limit: number;
}

export interface PublicProductDetailProfile {
  username: string;
}

export interface PublicProductDetailProduct {
  id: string;
  user_id: string;
  name: string;
  description: string;
  price: number;
  final_price: number;
  discount: number;
  category: string;
  type: "paid" | "free";
  image_url: string;
  gallery_images?: string[];
  product_point?: number;
  visibility: string;
  created_at: string;
  updated_at: string;
}

export interface PublicProductDetailData {
  profile: PublicProductDetailProfile;
  product: PublicProductDetailProduct;
}

export interface CreateBuyOrderPayload {
  product_id: string;
  buyer_email: string;
}

export interface CreateTransactionPayload {
  product_id: string;
  email: string;
  use_points?: boolean;
}

export interface CheckoutTransaction {
  id: string;
  order_id: string;
  product_id: string;
  email: string;
  gross_amount: number;
  payment_type: string;
  transaction_status: string;
  fraud_status?: string;
  snap_token: string;
  snap_redirect_url: string;
  expired_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TransactionCheckoutResult {
  transaction: CheckoutTransaction;
  payment_status: string;
  midtrans_client_key: string;
}

export interface TransactionStatusResponse {
  transaction: CheckoutTransaction;
  payment_status: string;
}

export interface PublicDonationCreator {
  user_id: string;
  username: string;
  full_name: string;
  profile_photo: string;
  bio: string;
  is_verified: boolean;
}

export interface PublicDonationSummary {
  total_amount: number;
  total_donations: number;
  unique_donors: number;
}

export interface PublicDonationPageResponse {
  creator: PublicDonationCreator;
  summary: PublicDonationSummary;
}

export interface CreateDonationPayload {
  username: string;
  display_name: string;
  email: string;
  amount: number;
  message?: string;
}

export interface DonationCheckoutTransaction {
  id: string;
  order_id: string;
  recipient_user_id: string;
  recipient_username: string;
  recipient_full_name: string;
  donor_display_name: string;
  donor_email: string;
  amount: number;
  points: number;
  message: string;
  payment_type: string;
  transaction_status: string;
  fraud_status?: string | null;
  snap_token: string;
  snap_redirect_url: string;
  expired_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DonationCheckoutResult {
  donation: DonationCheckoutTransaction;
  payment_status: string;
  midtrans_client_key: string;
}

export interface DonationStatusResponse {
  donation: DonationCheckoutTransaction;
  payment_status: string;
}

export interface DonationHistorySummary {
  total_amount: number;
  total_donations: number;
  unique_donors: number;
}

export interface DonationHistoryItem extends DonationCheckoutTransaction {}

export interface DonationHistoryResult {
  summary: DonationHistorySummary;
  donations: DonationHistoryItem[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateProductPayload {
  name: string;
  category_id: string;
  description: string;
  product_link: string;
  link_verified: boolean;
  discount_percentage: number;
  discount_end_date?: string;
  pricing_type: ProductPricingType;
  price: number;
  visibility: ProductVisibility;
  slug?: string;
  cover_image_url?: string;
  gallery_image_urls?: string[];
  product_cover?: File | null;
  gallery_images?: File[];
}

export interface NotificationRecord {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  product_id?: string | null;
  product_name?: string | null;
  order_id?: string | null;
  status: string;
  purchase_count?: number;
  donation_count?: number;
  notification_date?: string;
  donor_display_name?: string | null;
  donor_email?: string | null;
  amount?: number | null;
  source?: "transaction" | "donation";
  created_at: string;
  updated_at: string;
}

export interface NotificationListResponse {
  notifications: NotificationRecord[];
  unread_count: number;
  limit: number;
  offset: number;
}

export interface DonationNotificationRecord extends NotificationRecord {
  source?: "donation";
}

function normalizeCategory(
  rawCategory: unknown,
  userId = "",
  createdAt = "",
  updatedAt = "",
): Category | undefined {
  if (!rawCategory) return undefined;
  if (typeof rawCategory === "string") {
    const trimmed = rawCategory.trim();
    if (!trimmed) return undefined;
    return {
      id: "",
      user_id: userId,
      name: trimmed,
      slug: "",
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
  if (typeof rawCategory === "object" && rawCategory !== null) {
    const cat = rawCategory as Record<string, unknown>;
    const rawName = cat.name;
    let nameStr = "";
    if (typeof rawName === "string") {
      nameStr = rawName.trim();
    } else if (
      typeof rawName === "object" &&
      rawName !== null &&
      typeof (rawName as Record<string, unknown>).name === "string"
    ) {
      nameStr = ((rawName as Record<string, unknown>).name as string).trim();
    }
    if (!nameStr) return undefined;
    return {
      id: typeof cat.id === "string" ? cat.id : "",
      user_id: typeof cat.user_id === "string" ? cat.user_id : userId,
      name: nameStr,
      slug: typeof cat.slug === "string" ? cat.slug : "",
      created_at: typeof cat.created_at === "string" ? cat.created_at : createdAt,
      updated_at: typeof cat.updated_at === "string" ? cat.updated_at : updatedAt,
    };
  }
  return undefined;
}

function mapReadProductToProductRecord(
  product: any,
): ProductRecord {
  return {
    id: product.id,
    user_id: product.user_id,
    category_id: product.category_id ?? null,
    name: product.name,
    description: product.description ?? "",
    product_link: product.product_link ?? "",
    link_verified: Boolean(product.link_verified),
    discount_percentage: Math.round(product.discount_percentage ?? product.discount ?? 0),
    discount_end_at: product.discount_end_at ?? null,
    cover_image_url: product.cover_image_url ?? product.image_url ?? "",
    gallery_images: Array.isArray(product.gallery_images)
      ? product.gallery_images
      : [],
    pricing_type: product.pricing_type ?? (product.type === "free" ? "free" : "paid"),
    price: Number(product.price ?? 0),
    visibility:
      product.visibility === "live" || product.visibility === "public"
        ? "live"
        : "draft",
    slug: product.slug ?? "",
    created_at: product.created_at ?? "",
    updated_at: product.updated_at ?? "",
    category: normalizeCategory(
      product.category,
      product.user_id,
      product.created_at,
      product.updated_at,
    ),
  };
}

function mapPublicDetailToProductRecord(
  data: PublicProductDetailData,
): ProductRecord {
  const product: any = data.product;
  const imageURL =
    product.cover_image_url && product.cover_image_url.trim() !== ""
      ? product.cover_image_url
      : product.image_url && product.image_url.trim() !== ""
        ? product.image_url
        : Array.isArray(product.gallery_images) &&
            product.gallery_images.length > 0
          ? product.gallery_images[0] || ""
          : "";

  return {
    id: product.id,
    user_id: product.user_id,
    category_id: product.category_id ?? null,
    name: product.name,
    description: product.description ?? "",
    product_link: product.product_link ?? "",
    link_verified: Boolean(product.link_verified),
    discount_percentage: Math.round(product.discount_percentage ?? product.discount ?? 0),
    discount_end_at: product.discount_end_at ?? null,
    cover_image_url: imageURL,
    gallery_images: Array.isArray(product.gallery_images)
      ? product.gallery_images
      : [],
    pricing_type: product.pricing_type ?? (product.type === "free" ? "free" : "paid"),
    price: Number(product.price ?? 0),
    visibility:
      product.visibility === "live" || product.visibility === "public"
        ? "live"
        : "draft",
    slug: product.slug ?? "",
    created_at: product.created_at ?? "",
    updated_at: product.updated_at ?? "",
    username: data.profile?.username ?? "",
    sold_count: 0,
    product_point: Number(product.product_point ?? 0),
    category: normalizeCategory(
      product.category,
      product.user_id,
      product.created_at,
      product.updated_at,
    ),
  };
}

function buildProductFormData(payload: CreateProductPayload): FormData {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("category_id", payload.category_id);
  formData.append("description", payload.description);
  formData.append("product_link", payload.product_link);
  formData.append("link_verified", String(payload.link_verified));
  formData.append("discount_percentage", String(payload.discount_percentage));
  formData.append("pricing_type", payload.pricing_type);
  formData.append("price", String(payload.price));
  formData.append("visibility", payload.visibility);

  if (payload.slug) {
    formData.append("slug", payload.slug);
  }

  if (payload.discount_end_date) {
    formData.append("discount_end_date", payload.discount_end_date);
  }

  if (payload.cover_image_url) {
    formData.append("cover_image_url", payload.cover_image_url);
  }

  if (payload.gallery_image_urls && payload.gallery_image_urls.length > 0) {
    payload.gallery_image_urls.forEach((url) => {
      formData.append("gallery_image_urls", url);
    });
  }

  if (payload.product_cover) {
    formData.append("product_cover", payload.product_cover);
  }

  if (payload.gallery_images && payload.gallery_images.length > 0) {
    payload.gallery_images.forEach((file) => {
      formData.append("gallery_images", file);
    });
  }

  return formData;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthUser> {
    try {
      const response = await apiClient.post<ApiEnvelope<{ user: AuthUser }>>(
        "/auth/register",
        payload,
      );
      return unwrapData(response.data).user;
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "register failed"));
    }
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<ApiEnvelope<LoginResponse>>(
        "/auth/login",
        payload,
      );
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "login failed"));
    }
  },

  async me(): Promise<AuthUser> {
    try {
      const response =
        await apiClient.get<ApiEnvelope<{ user: AuthUser }>>("/auth/me");
      return unwrapData(response.data).user;
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load current user"),
      );
    }
  },

  async refresh(): Promise<LoginResponse> {
    try {
      const response =
        await apiClient.post<ApiEnvelope<LoginResponse>>("/auth/refresh");
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "refresh failed"));
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "logout failed"));
    }
  },
};
export const profileApi = {
  async getMyProfile(): Promise<ProfileResponse> {
    try {
      const response =
        await apiClient.get<
          ApiEnvelope<{ user: AuthUser; profile: ProfileRecord }>
        >("/profiles/me");
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load profile data"),
      );
    }
  },

  async updateField(
    payload: UpdateProfileFieldPayload,
  ): Promise<ProfileResponse> {
    try {
      const response = await apiClient.patch<
        ApiEnvelope<{ user: AuthUser; profile: ProfileRecord }>
      >("/profiles/me/field", payload);
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to update profile field"),
      );
    }
  },

  async updateImage(
    field: ProfileImageField,
    file: File,
  ): Promise<ProfileResponse> {
    try {
      const formData = new FormData();
      formData.append("field", field);
      formData.append("image", file);

      const response = await apiClient.patch<
        ApiEnvelope<{ user: AuthUser; profile: ProfileRecord }>
      >("/profiles/me/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to update profile image"),
      );
    }
  },
};

export const verificationApi = {
  async submitGetVerified(
    userID: string,
    payload: GetVerifiedPayload,
  ): Promise<GetVerifiedResponse> {
    const normalizedUserID = userID.trim();
    if (normalizedUserID === "") {
      throw new Error("invalid user id");
    }

    try {
      const response = await apiClient.patch<ApiEnvelope<GetVerifiedResponse>>(
        `/users/${encodeURIComponent(normalizedUserID)}/get-verified`,
        payload,
      );
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to submit get verified request"),
      );
    }
  },
};

function notImplemented(methodName: string): never {
  throw new Error(`${methodName} is not implemented yet`);
}

// ---- Dashboard Analytics (BFF) ----
export interface DashboardSnapshotData {
  user_id: string;
  total_revenue: number;
  product_sales: number;
  total_transactions: number;
  total_donations_amount: number;
  total_donations_count: number;
  unique_donors: number;
  updated_at: string;
}

export interface DashboardActivityItem {
  id: string;
  user_id: string;
  source: "transaction" | "donation";
  activity_type: string;
  title: string;
  subtitle: string;
  amount: number;
  amount_display: string;
  order_id: string;
  product_name: string;
  donor_name: string;
  status: string;
  occurred_at: string;
  created_at: string;
}

export interface DashboardOverviewResponse {
  snapshot: DashboardSnapshotData;
  recent_activities: DashboardActivityItem[];
}

export interface EarningsChartResponse {
  labels: string[];
  data: number[];
  sales?: number[];
  donations?: number[];
  total?: number[];
  period: string;
}

export const dashboardApi = {
  async getOverview(activityLimit = 10): Promise<DashboardOverviewResponse> {
    try {
      const response = await analyticsApiClient.get<
        ApiEnvelope<DashboardOverviewResponse>
      >("/dashboard/overview", {
        params: { activity_limit: activityLimit },
      });
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load dashboard overview"),
      );
    }
  },

  async getEarningsChart(
    period: "week" | "month" = "month",
  ): Promise<EarningsChartResponse> {
    try {
      const response = await analyticsApiClient.get<
        ApiEnvelope<EarningsChartResponse>
      >("/dashboard/earnings-chart", {
        params: { period },
      });
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load earnings chart"),
      );
    }
  },

  getStats: async (): Promise<DashboardStats> => {
    const overview = await dashboardApi.getOverview();
    const s = overview.snapshot;
    return {
      totalEarnings: s.total_revenue + s.total_donations_amount,
      pointsBalance: 0,
      totalSales: s.product_sales,
      activeViewers: 0,
      earningsChangePercent: 0,
    };
  },

  getRecentActivity: async (): Promise<ActivityItem[]> => {
    const overview = await dashboardApi.getOverview();
    return (overview.recent_activities ?? []).map((a) => ({
      id: a.id,
      type: a.activity_type as ActivityItem["type"],
      title: a.title,
      subtitle: a.subtitle,
      amount: a.amount_display,
      amountType:
        a.source === "donation" ? ("positive" as const) : ("neutral" as const),
      timeAgo: formatTimeAgo(a.occurred_at),
      icon: a.activity_type === "donation" ? "favorite" : "shopping_bag",
    }));
  },
};

// ---- Transactions ----
export const transactionsApi = {
  async getAll(params: {
    user_id: string;
    page?: number;
    limit?: number;
  }): Promise<TransactionHistoryResult> {
    const normalizedUserID = params.user_id.trim();
    if (normalizedUserID === "") {
      throw new Error("invalid user id");
    }

    const page = params.page ?? 1;
    const limit = params.limit ?? 20;

    try {
      const response = await apiClient.get<
        ApiEnvelope<BuyProductTransactionHistoryData>
      >("/transactions/creator/history", {
        params: {
          page,
          limit,
        },
      });

      const payload = unwrapData(response.data);
      return toTransactionHistoryResult(
        payload,
        payload?.page ?? page,
        payload?.limit ?? limit,
      );
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load transaction history"),
      );
    }
  },
  getById: async (_id: string): Promise<TransactionHistoryItem> =>
    notImplemented("transactionsApi.getById"),
  exportCsv: async (): Promise<Blob> =>
    notImplemented("transactionsApi.exportCsv"),
};

function toTransactionHistoryResult(
  payload:
    | {
        summary?: ReadTransactionSummary;
        transactions?: TransactionHistoryItem[];
      }
    | null
    | undefined,
  page: number,
  limit: number,
): TransactionHistoryResult {
  const summary = payload?.summary ?? {
    total_revenue: 0,
    product_sales: 0,
    total_transactions: 0,
  };

  return {
    summary: {
      total_revenue: Number(summary.total_revenue ?? 0),
      product_sales: Number(summary.product_sales ?? 0),
      total_transactions: Number(summary.total_transactions ?? 0),
    },
    transactions: (payload?.transactions ?? []).map((item) => ({
      ...item,
      quantity: Number(item.quantity ?? 0),
      gross_amount: Number(item.gross_amount ?? 0),
    })),
    total: Number(summary.total_transactions ?? 0),
    page: Number(page ?? 1),
    limit: Number(limit ?? 20),
  };
}

// ---- Categories ----
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    try {
      const response = await apiClient.get<ApiEnvelope<any>>("/categories");
      const data = unwrapData(response.data);
      if (Array.isArray(data)) {
        return data;
      }
      if (data && Array.isArray(data.categories)) {
        return data.categories;
      }
      return [];
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load categories"),
      );
    }
  },

  async create(payload: CreateCategoryPayload): Promise<Category> {
    try {
      const response = await apiClient.post<ApiEnvelope<any>>(
        "/categories",
        payload,
      );
      const data = unwrapData(response.data);
      if (data && data.category) {
        return data.category;
      }
      return data as Category;
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to create category"),
      );
    }
  },

  async update(id: string, payload: UpdateCategoryPayload): Promise<Category> {
    try {
      const response = await apiClient.put<ApiEnvelope<any>>(
        `/categories/${encodeURIComponent(id)}`,
        payload,
      );
      const data = unwrapData(response.data);
      if (data && data.category) {
        return data.category;
      }
      return data as Category;
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to update category"),
      );
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/categories/${encodeURIComponent(id)}`);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to delete category"),
      );
    }
  },
};

// ---- Products ----
export const productsApi = {
  async getAll(): Promise<ProductRecord[]> {
    try {
      const response =
        await apiClient.get<ApiEnvelope<{ products: ProductRecord[] }>>(
          "/products",
        );
      return unwrapData(response.data).products ?? [];
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "failed to load products"));
    }
  },

  async getById(id: string): Promise<ProductRecord> {
    try {
      const response = await apiClient.get<
        ApiEnvelope<{ product: ProductRecord }>
      >(`/products/${id}`);
      return unwrapData(response.data).product;
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "failed to load product"));
    }
  },

  async create(payload: CreateProductPayload): Promise<ProductRecord> {
    try {
      const formData = buildProductFormData(payload);

      const response = await apiClient.post<
        ApiEnvelope<{ product: ProductRecord }>
      >("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return unwrapData(response.data).product;
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to create product"),
      );
    }
  },

  async update(
    id: string,
    payload: CreateProductPayload,
  ): Promise<ProductRecord> {
    try {
      const formData = buildProductFormData(payload);
      const response = await apiClient.put<
        ApiEnvelope<{ product: ProductRecord }>
      >(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return unwrapData(response.data).product;
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to update product"),
      );
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to delete product"),
      );
    }
  },
};

export const storePreviewApi = {
  async getByUsername(username: string): Promise<StorePreviewData> {
    const normalizedUsername = username.trim();
    if (normalizedUsername === "") {
      throw new Error("invalid username");
    }

    try {
      const response = await apiClient.get<ApiEnvelope<any>>(
        `/public/store/${encodeURIComponent(normalizedUsername)}`,
      );
      const payload = unwrapData(response.data);

      return {
        username: normalizedUsername,
        profile: {
          username: payload?.profile?.username ?? normalizedUsername,
          full_name: payload?.profile?.full_name ?? "",
          bio: payload?.profile?.bio ?? "",
          tagline: payload?.profile?.tagline ?? "",
          location: payload?.profile?.location ?? "",
          profile_photo: payload?.profile?.profile_photo ?? "",
          banner_photo: payload?.profile?.banner_photo ?? "",
          website: payload?.profile?.website ?? "",
          youtube_url: payload?.profile?.youtube_url ?? "",
          instagram_username: payload?.profile?.instagram_username ?? "",
          tiktok_username: payload?.profile?.tiktok_username ?? "",
          x_username: payload?.profile?.x_username ?? "",
          discord_link: payload?.profile?.discord_link ?? "",
        },
        products: (payload?.products ?? []).map(mapReadProductToProductRecord),
      };
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load store preview"),
      );
    }
  },
};

export const publicProductsApi = {
  async getById(productId: string): Promise<ProductRecord> {
    const normalizedProductID = productId.trim();
    if (normalizedProductID === "") {
      throw new Error("invalid product id");
    }

    try {
      const response = await apiClient.get<ApiEnvelope<any>>(
        `/public/product/${encodeURIComponent(normalizedProductID)}`,
      );
      let payload = unwrapData(response.data);

      if (!payload?.product && !payload?.id) {
        throw new Error("product not found");
      }

      if (payload.id && !payload.product) {
        payload = {
          product: payload,
          profile: { username: payload.username || "" },
        };
      }

      return mapPublicDetailToProductRecord(payload);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load public product"),
      );
    }
  },
};

export const buyOrderApi = {
  async createTransaction(
    payload: CreateTransactionPayload,
  ): Promise<TransactionCheckoutResult> {
    try {
      const response = await apiClient.post<
        ApiEnvelope<{
          transaction: CheckoutTransaction;
          payment_status: string;
          midtrans_client_key: string;
        }>
      >("/transactions", payload);
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to create transaction"),
      );
    }
  },

  async createOrder(
    payload: CreateBuyOrderPayload,
  ): Promise<TransactionCheckoutResult> {
    return buyOrderApi.createTransaction({
      product_id: payload.product_id,
      email: payload.buyer_email,
    });
  },

  async getTransactionStatus(
    orderID: string,
  ): Promise<TransactionStatusResponse> {
    const normalizedOrderID = orderID.trim();
    if (normalizedOrderID === "") {
      throw new Error("invalid order id");
    }

    try {
      const response = await apiClient.get<
        ApiEnvelope<{
          transaction: CheckoutTransaction;
          payment_status: string;
        }>
      >(`/transactions/${encodeURIComponent(normalizedOrderID)}`);
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load transaction status"),
      );
    }
  },
};

export const donationsApi = {
  async getPublicByUsername(
    username: string,
  ): Promise<PublicDonationPageResponse> {
    const normalizedUsername = username.trim().toLowerCase();
    if (normalizedUsername === "") {
      throw new Error("invalid username");
    }

    try {
      const response = await apiClient.get<
        ApiEnvelope<{
          creator: PublicDonationCreator;
          summary: PublicDonationSummary;
        }>
      >(`/public/donations/${encodeURIComponent(normalizedUsername)}`);

      const payload = unwrapData(response.data);
      if (!payload?.creator) {
        throw new Error("creator not found");
      }

      return {
        creator: payload.creator,
        summary: {
          total_amount: Number(payload.summary?.total_amount ?? 0),
          total_donations: Number(payload.summary?.total_donations ?? 0),
          unique_donors: Number(payload.summary?.unique_donors ?? 0),
        },
      };
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load donation page"),
      );
    }
  },

  async createTransaction(
    payload: CreateDonationPayload,
  ): Promise<DonationCheckoutResult> {
    try {
      const response = await apiClient.post<
        ApiEnvelope<{
          donation: DonationCheckoutTransaction;
          payment_status: string;
          midtrans_client_key: string;
        }>
      >("/donations", payload);
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to create donation transaction"),
      );
    }
  },

  async getDonationStatus(orderID: string): Promise<DonationStatusResponse> {
    const normalizedOrderID = orderID.trim();
    if (normalizedOrderID === "") {
      throw new Error("invalid order id");
    }

    try {
      const response = await apiClient.get<
        ApiEnvelope<{
          donation: DonationCheckoutTransaction;
          payment_status: string;
        }>
      >(`/donations/${encodeURIComponent(normalizedOrderID)}`);
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load donation status"),
      );
    }
  },

  async getHistory(params: {
    user_id: string;
    page?: number;
    limit?: number;
  }): Promise<DonationHistoryResult> {
    const normalizedUserID = params.user_id.trim();
    if (normalizedUserID === "") {
      throw new Error("invalid user id");
    }

    const page = params.page ?? 1;
    const limit = params.limit ?? 20;

    try {
      const response = await apiClient.get<
        ApiEnvelope<{
          summary: DonationHistorySummary;
          donations: DonationHistoryItem[];
          page?: number;
          limit?: number;
        }>
      >("/donations/history", {
        params: {
          page,
          limit,
        },
      });

      const payload = unwrapData(response.data);
      const summary = payload?.summary ?? {
        total_amount: 0,
        total_donations: 0,
        unique_donors: 0,
      };

      const donations = (payload?.donations ?? []).map((item) => ({
        ...item,
        amount: Number(item.amount ?? 0),
        points: Number(item.points ?? 0),
      }));

      return {
        summary: {
          total_amount: Number(summary.total_amount ?? 0),
          total_donations: Number(summary.total_donations ?? 0),
          unique_donors: Number(summary.unique_donors ?? 0),
        },
        donations,
        total: Number(summary.total_donations ?? donations.length),
        page: Number(payload?.page ?? page),
        limit: Number(payload?.limit ?? limit),
      };
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load donation history"),
      );
    }
  },

  async checkPoints(
    email: string,
    signal?: AbortSignal,
  ): Promise<{ email: string; total_points: number; points: number }> {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail === "") {
      throw new Error("email is required");
    }

    const response = await apiClient.get<
      ApiEnvelope<{ email?: string; total_points?: number; points?: number }>
    >("/points/check", {
      params: { email: normalizedEmail },
      signal,
    });
    const payload = unwrapData(response.data);
    const pointsValue = Number(payload?.total_points ?? payload?.points ?? 0);
    return {
      email: payload?.email ?? normalizedEmail,
      total_points: pointsValue,
      points: pointsValue,
    };
  },

  async checkEmailMatch(
    inputEmail: string,
    googleEmail: string,
    signal?: AbortSignal,
  ): Promise<{ is_match: boolean }> {
    const response = await apiClient.post<
      ApiEnvelope<{ is_match: boolean }>
    >(
      "/auth/check-email-match",
      {
        input_email: inputEmail.trim().toLowerCase(),
        google_email: googleEmail.trim().toLowerCase(),
      },
      { signal },
    );
    return unwrapData(response.data);
  },
};
// ---- Points / Donations ----
export const pointsApi = {
  getDonations: async (_params?: {
    page?: number;
    limit?: number;
    period?: string;
  }): Promise<{ data: Donation[]; total: number }> =>
    notImplemented("pointsApi.getDonations"),
  getBalance: async (): Promise<{ points: number; idrEquivalent: number }> =>
    notImplemented("pointsApi.getBalance"),
  withdraw: async (_amount: number): Promise<void> =>
    notImplemented("pointsApi.withdraw"),
};

// ---- OBS Overlay ----
export const overlayApi = {
  getSettings: async (): Promise<OverlaySettings> =>
    notImplemented("overlayApi.getSettings"),
  updateSettings: async (
    _payload: Partial<OverlaySettings>,
  ): Promise<OverlaySettings> => notImplemented("overlayApi.updateSettings"),
  resetSettings: async (): Promise<OverlaySettings> =>
    notImplemented("overlayApi.resetSettings"),
};

// ---- Analytics ----
export const analyticsApi = {
  async getEarningsChart(period: "week" | "month" = "month"): Promise<{
    labels: string[];
    data: number[];
    sales?: number[];
    donations?: number[];
    total?: number[];
  }> {
    const result = await dashboardApi.getEarningsChart(period);
    return {
      labels: result.labels,
      data: result.data.map(Number),
      sales: Array.isArray(result.sales)
        ? result.sales.map((value) => Number(value))
        : undefined,
      donations: Array.isArray(result.donations)
        ? result.donations.map((value) => Number(value))
        : undefined,
      total: Array.isArray(result.total)
        ? result.total.map((value) => Number(value))
        : undefined,
    };
  },
  async getSummary(): Promise<Record<string, unknown>> {
    const overview = await dashboardApi.getOverview();
    return overview.snapshot as unknown as Record<string, unknown>;
  },
};

// ---- Withdraw ----
export const withdrawApi = {
  getHistory: async (): Promise<Record<string, unknown>[]> =>
    notImplemented("withdrawApi.getHistory"),
  request: async (_amount: number, _method: string): Promise<void> =>
    notImplemented("withdrawApi.request"),
};

// ---- Notifications ----

export interface EmailPermissionResponse {
  user_id: string;
  is_allowed_email: boolean;
}

export const emailPermissionApi = {
  async get(): Promise<EmailPermissionResponse> {
    try {
      const response = await apiClient.get<
        ApiEnvelope<EmailPermissionResponse>
      >("/notifications/permissions");
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load email permission"),
      );
    }
  },

  async update(isAllowedEmail: boolean): Promise<EmailPermissionResponse> {
    try {
      const response = await apiClient.put<
        ApiEnvelope<EmailPermissionResponse>
      >("/notifications/permissions", {
        is_allowed_email: isAllowedEmail,
      });
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to update email permission"),
      );
    }
  },
};

export const notificationsApi = {
  async getByUser(
    userID: string,
    params?: { limit?: number; offset?: number },
  ): Promise<NotificationListResponse> {
    const normalizedUserID = userID.trim();
    if (normalizedUserID === "") {
      throw new Error("invalid user id");
    }

    const limit = params?.limit ?? 20;
    const offset = params?.offset ?? 0;
    const page = Math.floor(offset / limit) + 1;

    try {
      const response = await apiClient.get<
        ApiEnvelope<{
          notifications: NotificationRecord[];
          unread_count: number;
          page: number;
          limit: number;
        }>
      >("/notifications", {
        params: {
          page,
          limit,
        },
      });
      const data = unwrapData(response.data);
      return {
        notifications: data.notifications ?? [],
        unread_count: Number(data.unread_count ?? 0),
        limit: Number(data.limit ?? limit),
        offset,
      };
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load notifications"),
      );
    }
  },

  async markAsRead(userID: string, notificationID: string): Promise<void> {
    const normalizedNotificationID = notificationID.trim();
    if (normalizedNotificationID === "") {
      throw new Error("invalid notification input");
    }

    try {
      await apiClient.put(
        `/notifications/${encodeURIComponent(normalizedNotificationID)}/read`,
      );
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to mark notification as read"),
      );
    }
  },

  async markAllAsRead(_userID?: string): Promise<void> {
    try {
      await apiClient.put("/notifications/read-all");
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(
          error,
          "failed to mark all notifications as read",
        ),
      );
    }
  },
};

export const donationNotificationsApi = {
  async getByUser(
    userID: string,
    params?: { limit?: number; offset?: number },
  ): Promise<NotificationListResponse> {
    const normalizedUserID = userID.trim();
    if (normalizedUserID === "") {
      throw new Error("invalid user id");
    }

    const limit = params?.limit ?? 20;
    const offset = params?.offset ?? 0;
    const page = Math.floor(offset / limit) + 1;

    try {
      const response = await apiClient.get<
        ApiEnvelope<{
          notifications: NotificationRecord[];
          unread_count: number;
          page: number;
          limit: number;
        }>
      >("/notifications", {
        params: {
          page,
          limit,
        },
      });

      const payload = unwrapData(response.data);
      return {
        notifications: (payload.notifications ?? []).map((item) => ({
          ...item,
          source: "donation" as const,
          status: String(item.status ?? "").toLowerCase(),
          donation_count:
            item.donation_count === null || item.donation_count === undefined
              ? undefined
              : Number(item.donation_count),
          amount:
            item.amount === null || item.amount === undefined
              ? null
              : Number(item.amount),
        })),
        unread_count: Number(payload.unread_count ?? 0),
        limit: Number(payload.limit ?? limit),
        offset,
      };
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load donation notifications"),
      );
    }
  },

  async markAsRead(userID: string, notificationID: string): Promise<void> {
    return notificationsApi.markAsRead(userID, notificationID);
  },

  async markAllAsRead(userID?: string): Promise<void> {
    return notificationsApi.markAllAsRead(userID);
  },
};
