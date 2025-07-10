export interface ILandingPage {
  id: number;
  title: string;
  summary: string;
  type: "Movie" | "TV_Show";
  director: string;
  budget: number;
  location: string;
  duration: string;
  year: number;
  genre: string;
}
