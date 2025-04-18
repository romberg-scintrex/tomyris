import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  RemoteError,
  UnauthorizedError,
} from './error';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type HeadersMap = Record<string, string>;
type Token = string | undefined;
type Body = any; // atau bisa didefinisikan lebih spesifik
type JsonResponse = any; // ubah ke `unknown` jika ingin lebih strict

async function call(url: string, init: RequestInit): Promise<JsonResponse> {
  let response: Response;

  try {
    response = await fetch(url, init);
  } catch (error) {
    throw new RemoteError();
  }

  const json = await response.json().catch(() => undefined);

  switch (response.status) {
    case 400:
      throw new BadRequestError(json);
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError(json);
    case 404:
      throw new NotFoundError(json);
  }

  if (response.status < 200 || response.status >= 300) {
    throw new RemoteError(json);
  }

  return json;
}

async function request(
  method: HTTPMethod,
  url: string,
  token?: Token,
  customHeaders: HeadersMap = {},
  body?: Body
): Promise<JsonResponse> {
  const headers: HeadersMap = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  const init: RequestInit = {
    method,
    mode: 'cors',
    headers,
    ...(body && { body }), // hanya set body jika ada
  };

  return call(url, init);
}

export async function get(url: string, token?: Token): Promise<JsonResponse> {
  return request('GET', url, token);
}

export async function delete_(url: string, token?: Token): Promise<JsonResponse> {
  return request('DELETE', url, token);
}

export async function post(
  url: string,
  token: Token,
  body: Record<string, unknown>
): Promise<JsonResponse> {
  return request(
    'POST',
    url,
    token,
    { 'Content-Type': 'application/json' },
    JSON.stringify(body)
  );
}

export async function put(
  url: string,
  token: Token,
  body: Record<string, unknown>
): Promise<JsonResponse> {
  return request(
    'PUT',
    url,
    token,
    { 'Content-Type': 'application/json' },
    JSON.stringify(body)
  );
}

export async function postMultipart(
  url: string,
  token: Token,
  parts: Record<string, string | Blob>
): Promise<JsonResponse> {
  const formData = new FormData();
  Object.entries(parts).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return request('POST', url, token, {}, formData);
}

export async function download(url: string, token?: Token): Promise<void> {
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const init: RequestInit = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, init);

  const disposition = res.headers.get('Content-Disposition');
  const match = disposition?.match(/filename=(["']?)(.+?)\1/i);
  const filename = match?.[2] ?? 'downloaded-file';

  const blob = await res.blob();
  const objUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(objUrl);
  }, 250);
}
