const getBlobBySource = async (source: string): Promise<Blob | undefined> => {
  try {
    const response = await fetch(source);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file from ${source}: ${response.status} ${response.statusText}`
      );
    }

    return response.blob();
  } catch {
    return undefined;
  }
};

export const getFileBySource = async (
  source: string,
  fileName: string
): Promise<File | undefined> => {
  const blob = await getBlobBySource(source);

  if (!blob) return;

  return new File([blob], fileName, {
    type: blob.type || 'application/octet-stream',
    lastModified: Date.now()
  });
};
