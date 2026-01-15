const getDownloadUrl = (blob: Blob): string => window.URL.createObjectURL(blob);

const getAnchorElement = (url: string): HTMLAnchorElement => {
  const a = document.createElement('a');
  a.href = url;
  a.download = 'posts.json';
  document.body.appendChild(a);

  return a;
};

const downloadAndClear = (element: HTMLAnchorElement): void => {
  element.click();
  element.remove();
};

const clearMemory = (url: string): void => {
  window.URL.revokeObjectURL(url);
};

const downLoadExportFile = (blob: Blob) => {
  const url = getDownloadUrl(blob);
  const anchorElement = getAnchorElement(url);
  downloadAndClear(anchorElement);
  clearMemory(url);
};

export const exportUtils = { downLoadExportFile };
