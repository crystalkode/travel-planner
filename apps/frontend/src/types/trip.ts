export interface Trip {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  status: string;
};

export interface CreateTripRequest {
  userId: string;
  name: string;
  startDate?: string;
  endDate?: string;
}
