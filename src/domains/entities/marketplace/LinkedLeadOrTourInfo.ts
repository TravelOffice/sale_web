export interface PostShortedInfo {
  postId: string,
  totalOffers: number,
}

export interface LinkedLeadOrTourInfo {
  isAvailable: boolean,
  totalOffers?: number,
  posts?: PostShortedInfo[],
}
