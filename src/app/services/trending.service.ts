import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {SeriesResponse } from '../interfaces/serie';
import { Serie } from '../interfaces/serie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {
  #http = inject(HttpClient);
  #trendingUrl = `https://api.themoviedb.org/3/trending/tv/day?api_key=${environment.apiKey}&language=en-US&page=`;

  constructor() { }

 getTrending(page: Number): Observable<SeriesResponse> {
    return this.#http.get<SeriesResponse>(`${this.#trendingUrl}${page}`).pipe(
      map(resp => {
        return resp;
      })
    );
  }
}
