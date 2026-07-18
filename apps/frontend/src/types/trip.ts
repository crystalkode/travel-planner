export interface Trip {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  status: string;
};

export interface CreateTripRequest {
  // userId?: string; //TODO: add auth and implement this properly
  name: string;
  startDate?: string;
  endDate?: string;
}
