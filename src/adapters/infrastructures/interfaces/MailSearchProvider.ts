export interface SearchOptions {
  offset: number,
  limit: number,
  attributesToRetrieve: string,
  attributesToCrop: string[],
  attributesToHighlight: string[],
  cropLength: number,
  cropMarker: string,
  filter: string,
  showMatchesPosition: boolean,
  facets: string,
  sort: string[],
  highlightPreTag: string,
  highlightPostTag: string,
  matchingStrategy: string,
}

export interface SearchResults<T> {
  hits: T,
  estimatedTotalHits: number,
  query: string,
  limit: number,
  offset: number,
  processingTimeMs: number,
}

export interface MailSearchProvider {
  query: <T = any>(
    indexUid: string,
    q: string,
    options?: Partial<SearchOptions>,
  ) => Promise<SearchResults<T>>;
}
