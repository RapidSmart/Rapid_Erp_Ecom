export const httpService = {
  get: <TResponse>(input: RequestInfo | URL, init?: RequestInit) =>
    request<TResponse>(input, { ...init, method: 'GET' }),

  post: <TResponse>(
    input: RequestInfo | URL,
    body?: unknown,
    init?: RequestInit,
  ) => request<TResponse>(input, withJsonBody(init, 'POST', body)),

  put: <TResponse>(
    input: RequestInfo | URL,
    body?: unknown,
    init?: RequestInit,
  ) => request<TResponse>(input, withJsonBody(init, 'PUT', body)),

  delete: <TResponse>(input: RequestInfo | URL, init?: RequestInit) =>
    request<TResponse>(input, { ...init, method: 'DELETE' }),
}

async function request<TResponse>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}

function withJsonBody(
  init: RequestInit | undefined,
  method: string,
  body: unknown,
): RequestInit {
  return {
    ...init,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  }
}
