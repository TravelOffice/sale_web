export function getEnv(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

export function getSSOPage(): string {
  if (!process.env.REACT_APP_SSO_PAGE) {
    return '';
  }
  const url = process.env.REACT_APP_SSO_PAGE;
  if (url.endsWith('/')) {
    return url.substring(0, url.length - 1);
  }
  return url;
}

export function getMarketplacePage(): string {
  if (!process.env.REACT_APP_MARKETPLACE_PAGE) {
    return '';
  }
  const url = process.env.REACT_APP_MARKETPLACE_PAGE;
  if (url.endsWith('/')) {
    return url.substring(0, url.length - 1);
  }
  return url;
}
