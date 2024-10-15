export interface AudioClip {
  id: string;
  name: string;
  description: string;
  source: 'original' | 'derivative';
  sourceLink?: string;
  author: string;
  url: string;
  createdAt: string;
}