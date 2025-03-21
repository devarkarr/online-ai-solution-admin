export interface InQueryType {
  id: string;
  name: string;
  phone: string;
  email: string;
  companyName: string;
  country: string;
  jobTitle: string;
  jobDetail: string;
  rating: number;
  ratingDesc?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
  seen: boolean;
}

export interface InQueryPayload {
  page: number;
  PAGE_SIZE: number;
  promoId?: string;
  search?: string;
  type?: string | null;
  dateFilter?: string | null;
}
