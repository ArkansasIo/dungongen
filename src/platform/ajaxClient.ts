export interface ApiRequest<T = unknown> {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: T;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export interface AjaxClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
}

export class AjaxClient {
  constructor(private readonly options: AjaxClientOptions = {}) {}

  async request<TResponse, TBody = unknown>(
    request: ApiRequest<TBody>
  ): Promise<ApiResponse<TResponse>> {
    const baseUrl = this.options.baseUrl ?? "";
    const response = await fetch(baseUrl + request.path, {
      method: request.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...this.options.headers
      },
      credentials: "include",
      body: request.body === undefined ? undefined : JSON.stringify(request.body)
    });

    const text = await response.text();
    let data: TResponse | undefined;

    if (text) {
      try {
        data = JSON.parse(text) as TResponse;
      } catch {
        throw new Error("Backend returned invalid JSON.");
      }
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        data,
        error: (data as { error?: string } | undefined)?.error ?? response.statusText
      };
    }

    return { ok: true, status: response.status, data };
  }

  get<TResponse>(path: string) {
    return this.request<TResponse>({ method: "GET", path });
  }

  post<TResponse, TBody>(path: string, body: TBody) {
    return this.request<TResponse, TBody>({ method: "POST", path, body });
  }
}
