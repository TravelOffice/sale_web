import { getMarketplacePage } from './EnvUtils';

export default function generateMarketplacePostUrl(postId: string) {
  const marketplaceUrl = getMarketplacePage();
  return `${marketplaceUrl}/posts/${postId}`;
}
