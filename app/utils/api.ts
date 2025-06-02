interface ApiResponse<T> {
  data: T | undefined;
  error: string | undefined;
}

interface RequestOptions {
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

type RequestBody = Record<string, unknown>;

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_RUNSYNC_API_URL || 'http://localhost:3000/api';
  }

  private getHeaders(endpoint: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Skip authorization header for login endpoint
    if (!endpoint.includes('/users/login')) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  async get<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {

    try {
      const response = await fetch(this.buildUrl(path, options?.params), {
        method: 'GET',
        headers: this.getHeaders(path),
      });

      const data = await response.json();
      return { data, error: undefined };
    } catch {
      return { data: undefined, error: 'Failed to fetch data' };
    }
  }

  async post<T>(path: string, body: RequestBody, options?: RequestOptions): Promise<ApiResponse<T>> {

    try {
      const response = await fetch(this.buildUrl(path, options?.params), {
        method: 'POST',
        headers: this.getHeaders(path),
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return { data, error: undefined };
    } catch {
      return { data: undefined, error: 'Failed to post data' };
    }
  }

  async put<T>(path: string, body: RequestBody, options?: RequestOptions): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.buildUrl(path, options?.params), {
        method: 'PUT',
        headers: this.getHeaders(path),
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return { data, error: undefined };
    } catch {
      return { data: undefined, error: 'Failed to update data' };
    }
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {

    try {
      const response = await fetch(this.buildUrl(path, options?.params), {
        method: 'DELETE',
        headers: this.getHeaders(path),
      });

      const data = await response.json();
      return { data, error: undefined };
    } catch {
      return { data: undefined, error: 'Failed to delete data' };
    }
  }
}

export const api = new ApiClient(); 