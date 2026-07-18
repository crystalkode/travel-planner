import { api } from "./client";

export interface HealthResponse {
  status: string;
}

export function getHealth() {
  return api<HealthResponse>("/health");
}