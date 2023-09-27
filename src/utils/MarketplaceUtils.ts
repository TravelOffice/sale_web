import { getMarketplacePage } from './EnvUtils';

export default function generateMarketplacePostUrl() {
  const marketplaceUrl = getMarketplacePage();
  return `${marketplaceUrl}/posts`;
}
