/**
 * Detects and fixes double-nested MinIO presigned URLs.
 *
 * This happens when the backend saves a full presigned URL as the object key
 * instead of saving just the filename. On re-signing, it generates:
 *   https://minio.../bucket/https%3A%2F%2Fminio.../bucket/actual-file.webp%3FX-Amz-...?newSigningParams
 *
 * The fix extracts the inner (real) presigned URL from the malformed outer URL.
 */
export const sanitizeMinioUrl = (url: string): string => {
  if (!url) return url;

  try {
    const encodedHttpsIndex = url.indexOf("https%3A");
    if (encodedHttpsIndex === -1) return url;

    const outerQueryStart = url.indexOf("?", encodedHttpsIndex);
    const encodedInner =
      outerQueryStart !== -1
        ? url.slice(encodedHttpsIndex, outerQueryStart)
        : url.slice(encodedHttpsIndex);

    return decodeURIComponent(encodedInner);
  } catch {
    return url;
  }
};

export const sanitizeMinioUrls = (urls: string[]): string[] =>
  urls.map(sanitizeMinioUrl);
