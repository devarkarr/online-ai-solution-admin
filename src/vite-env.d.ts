/// <reference types="vite/client" />

interface ApiPayload {
  page: number;
  PAGE_SIZE: number;
  promoId?: string;
  search?: string;
  type?: string | null;
  dateFilter?: string | null;
}
