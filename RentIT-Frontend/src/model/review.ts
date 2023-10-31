export interface Review {
  // this is gathered when receiving data, not adding
  targetId?: string;
  rating: number;
  message: string;
}
