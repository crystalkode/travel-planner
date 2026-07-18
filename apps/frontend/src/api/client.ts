const API_URL = import.meta.env.VITE_API_URL;

export async function api<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      ...options?.headers,
    },
    ...options,
  });

  console.log(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}