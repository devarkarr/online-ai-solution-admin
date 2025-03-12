export interface EventType {
  id: string;
  name: string;
  detail: string;
  startDate: string;
  endDate: string;
  status: "ONGOING" | "UPCOMING" | "PREVIOUS";
  organization: string;
  createdById: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  files: { path: string }[];
}

export interface EventPayload {
  name: string;
  detail: string;
  organization: string;
  startDate: string;
  endDate: string;
  image: File | null;
}
