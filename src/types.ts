export interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export interface CardData {
  photo: string | null; // Keep for backward compatibility or as the main cover photo
  photos?: string[]; // Array of photos for the carousel
  logo: string | null;
  message: string;
  youtubeId: string | null;
  viewCount?: number;
}

export interface CarouselPhoto {
  id: string;
  photoUrl: string;
  timestamp: number;
}
