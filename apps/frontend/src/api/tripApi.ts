import { api } from "./client";
import type { Trip, CreateTripRequest } from "@/types/trip";

export const tripApi = {
  getTrips: () => api<Trip[]>("/trips"),

  getTrip: (id: string) =>
    api<Trip>(`/trips/${id}`),

  createTrip: (data: CreateTripRequest) =>
    api<Trip>("/trips", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};