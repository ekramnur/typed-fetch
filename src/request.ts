import type { Result } from "./types.js";

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: QueryParams;
  body?: unknown;
  headers?: Record<string, string>;
};
export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<Result<T>> {
  try {
    const requestUrl = new URL(url);

    if (options.query) {
      for (const [key, value] of Object.entries(options.query)) {
        if (value !== undefined && value !== null) {
          requestUrl.searchParams.set(key, String(value));
        }
      }
    }

    const headers = new Headers(options.headers);

    const hasBody = options.body !== undefined;

    if (hasBody && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(requestUrl, {
      method: options.method ?? "GET",
      headers,
      body: hasBody ? JSON.stringify(options.body) : undefined
    });

    const contentType = response.headers.get("content-type");

    let data: unknown;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      return {
        ok: false,
        error: new Error(
          `Request failed with status ${response.status}`
        ),
        status: response.status
      };
    }

    return {
      ok: true,
      data: data as T
    };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error
        ? error
        : new Error("Unknown request error")
    };
  }
}