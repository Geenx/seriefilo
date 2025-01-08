export interface Serie {

    genre_ids: [number];
    poster_path: string;
    backdrop_path: string;
    id: number;
    first_air_date: string;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    selectedProgress: string;
    selectedScore: number;
  }

  export interface SeriesResponse {
    page: number;          // Número de la página actual
    results: Serie[];   // Array de series
    total_pages: number;   // Total de páginas disponibles
    total_results: number; // Total de resultados
}