import { DynamicStaticRuntime } from "./dynamicStaticRuntime";

export interface DynamicApiRoute<TRequest = unknown, TResponse = unknown> {
  method: string;
  path: string;
  handler: (request: TRequest) => Promise<TResponse> | TResponse;
}

/**
 * Local REST-like API for a static deployment.
 * The same route vocabulary can later be mapped to Express.
 */
export class DynamicStaticApi {
  private readonly routes = new Map<string, DynamicApiRoute>();
  constructor(private readonly runtime: DynamicStaticRuntime<object>) {}

  register<TRequest, TResponse>(route: DynamicApiRoute<TRequest, TResponse>) {
    this.routes.set(`${route.method.toUpperCase()} ${route.path}`, route as DynamicApiRoute);
  }

  async request<TResponse>(method: string, path: string, body?: unknown): Promise<TResponse> {
    const route = this.routes.get(`${method.toUpperCase()} ${path}`);
    if (!route) throw new Error(`Static API route not found: ${method} ${path}`);
    return route.handler(body) as Promise<TResponse>;
  }

  events() {
    return this.runtime;
  }
}
