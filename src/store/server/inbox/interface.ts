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
}
