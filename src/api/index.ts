import axios from "axios";
import type {
  ActivityItem,
  DashboardStats,
  Donation,
  OverlaySettings,
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const READ_BASE_URL = import.meta.env.VITE_STORE_PRODUCT_BASE_URL;
const PRODUCT_BUY_URL = import.meta.env.VITE_PRODUCT_BUY_URL;

function buildProductBuyBaseURL(rawBaseURL?: string): string {
  const normalizedBaseURL = (rawBaseURL ?? "").trim().replace(/\/+$/, "");
  if (normalizedBaseURL === "") {
    return "/api/v1";
  }

  if (normalizedBaseURL.endsWith("/api/v1")) {
    return normalizedBaseURL;
  }

  return `${normalizedBaseURL}/api/v1`;
}

const PRODUCT_BUY_BASE_URL = buildProductBuyBaseURL(PRODUCT_BUY_URL);
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const readApiClient = axios.create({
  baseURL: READ_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

const productBuyApiClient = axios.create({
  baseURL: PRODUCT_BUY_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

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
  category?: Category;
}

export interface StorePreviewProfile {
  username: string;
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
  visibility: string;
  created_at: string;
  updated_at: string;
}

interface ReadPublicProfile {
  username: string;
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

interface ReadTransactionHistoryData {
  summary: ReadTransactionSummary;
  transactions: TransactionHistoryItem[];
}

interface ReadTransactionsResponse {
  data: ReadTransactionHistoryData;
  page?: number;
  limit?: number;
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
  user_id?: string;
  buyer_user_id?: string;
  product_name?: string;
  gross_amount?: number;
  quantity?: number;
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
  created_at: string;
  updated_at: string;
}

export interface NotificationListResponse {
  notifications: NotificationRecord[];
  unread_count: number;
  limit: number;
  offset: number;
}

function mapReadProductToProductRecord(
  product: ReadPublicProduct,
): ProductRecord {
  return {
    id: product.id,
    user_id: product.user_id,
    category_id: null,
    name: product.name,
    description: product.description,
    product_link: "",
    link_verified: false,
    discount_percentage: Math.round(product.discount ?? 0),
    discount_end_at: null,
    cover_image_url: product.image_url ?? "",
    gallery_images: [],
    pricing_type: product.type === "free" ? "free" : "paid",
    price: Number(product.price ?? 0),
    visibility: product.visibility === "public" ? "live" : "draft",
    slug: "",
    created_at: product.created_at,
    updated_at: product.updated_at,
    category: product.category
      ? {
          id: "",
          user_id: product.user_id,
          name: product.category,
          slug: "",
          created_at: product.created_at,
          updated_at: product.updated_at,
        }
      : undefined,
  };
}

function mapPublicDetailToProductRecord(
  data: PublicProductDetailData,
): ProductRecord {
  const product = data.product;
  return {
    id: product.id,
    user_id: product.user_id,
    category_id: null,
    name: product.name,
    description: product.description,
    product_link: "",
    link_verified: false,
    discount_percentage: Math.round(product.discount ?? 0),
    discount_end_at: null,
    cover_image_url: product.image_url ?? "",
    gallery_images: [],
    pricing_type: product.type === "free" ? "free" : "paid",
    price: Number(product.price ?? 0),
    visibility: product.visibility === "public" ? "live" : "draft",
    slug: "",
    created_at: product.created_at,
    updated_at: product.updated_at,
    username: data.profile?.username ?? "",
    sold_count: 0,
    category: product.category
      ? {
          id: "",
          user_id: product.user_id,
          name: product.category,
          slug: "",
          created_at: product.created_at,
          updated_at: product.updated_at,
        }
      : undefined,
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

// ---- Dashboard ----
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> =>
    notImplemented("dashboardApi.getStats"),
  getRecentActivity: async (): Promise<ActivityItem[]> =>
    notImplemented("dashboardApi.getRecentActivity"),
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

    let firstError: unknown;

    try {
      const response = await readApiClient.get<ReadTransactionsResponse>(
        "/public/transactions",
        {
          params: {
            user_id: normalizedUserID,
            page,
            limit,
          },
        },
      );

      const result = toTransactionHistoryResult(
        response.data?.data,
        response.data?.page ?? page,
        response.data?.limit ?? limit,
      );

      if (result.total > 0 || result.transactions.length > 0) {
        return result;
      }
    } catch (error) {
      firstError = error;
    }

    try {
      const response = await productBuyApiClient.get<
        ApiEnvelope<BuyProductTransactionHistoryData>
      >("/transactions/history", {
        params: {
          user_id: normalizedUserID,
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
      if (firstError) {
        throw new Error(
          extractApiErrorMessage(
            firstError,
            "failed to load transaction history from read service",
          ),
        );
      }
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
  payload: {
    summary?: ReadTransactionSummary;
    transactions?: TransactionHistoryItem[];
  } | null | undefined,
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
      const response =
        await apiClient.get<ApiEnvelope<{ categories: Category[] }>>(
          "/categories",
        );
      return unwrapData(response.data).categories ?? [];
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load categories"),
      );
    }
  },

  async create(payload: CreateCategoryPayload): Promise<Category> {
    try {
      const response = await apiClient.post<
        ApiEnvelope<{ category: Category }>
      >("/categories", payload);
      return unwrapData(response.data).category;
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to create category"),
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
      const response = await readApiClient.get<
        ReadEnvelope<ReadStorePreviewData>
      >(`/public/store/${encodeURIComponent(normalizedUsername)}`);

      const payload = response.data?.data;
      return {
        username: normalizedUsername,
        profile: {
          username: payload?.profile?.username ?? normalizedUsername,
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
      const response = await readApiClient.get<
        ReadEnvelope<PublicProductDetailData>
      >(`/public/product/${encodeURIComponent(normalizedProductID)}`);

      const payload = response.data?.data;
      if (!payload?.product) {
        throw new Error("product not found");
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
      const response = await productBuyApiClient.post<
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
      const response = await productBuyApiClient.get<
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
  getEarningsChart: async (
    _period?: string,
  ): Promise<{ labels: string[]; data: number[] }> =>
    notImplemented("analyticsApi.getEarningsChart"),
  getSummary: async (): Promise<Record<string, unknown>> =>
    notImplemented("analyticsApi.getSummary"),
};

// ---- Withdraw ----
export const withdrawApi = {
  getHistory: async (): Promise<Record<string, unknown>[]> =>
    notImplemented("withdrawApi.getHistory"),
  request: async (_amount: number, _method: string): Promise<void> =>
    notImplemented("withdrawApi.request"),
};

// ---- Notifications ----
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

    try {
      const response =
        await productBuyApiClient.get<ApiEnvelope<NotificationListResponse>>(
          "/notifications",
          {
            headers: {
              "X-User-ID": normalizedUserID,
            },
            params: {
              user_id: normalizedUserID,
              limit,
              offset,
            },
          },
        );
      return unwrapData(response.data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to load notifications"),
      );
    }
  },

  async markAsRead(userID: string, notificationID: string): Promise<void> {
    const normalizedUserID = userID.trim();
    const normalizedNotificationID = notificationID.trim();
    if (normalizedUserID === "" || normalizedNotificationID === "") {
      throw new Error("invalid notification input");
    }

    try {
      await productBuyApiClient.patch(
        `/notifications/${encodeURIComponent(normalizedNotificationID)}/read`,
        {},
        {
          headers: {
            "X-User-ID": normalizedUserID,
          },
          params: {
            user_id: normalizedUserID,
          },
        },
      );
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to mark notification as read"),
      );
    }
  },

  async markAllAsRead(userID: string): Promise<void> {
    const normalizedUserID = userID.trim();
    if (normalizedUserID === "") {
      throw new Error("invalid user id");
    }

    try {
      await productBuyApiClient.patch(
        "/notifications/read",
        {},
        {
          headers: {
            "X-User-ID": normalizedUserID,
          },
          params: {
            user_id: normalizedUserID,
          },
        },
      );
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "failed to mark all notifications as read"),
      );
    }
  },
};
