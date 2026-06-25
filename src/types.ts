export interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export interface CardData {
  photo: string | null;
  logo: string | null;
  message: string;
  youtubeId: string | null;
}
