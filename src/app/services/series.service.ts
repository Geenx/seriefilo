import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {SeriesResponse } from '../interfaces/serie';
import { Serie } from '../interfaces/serie';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  #http = inject(HttpClient);
  #seriesUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${environment.apiKey}&language=en&page=1`;

  constructor() { }

 getSeries(): Observable<Serie[]> {
    return this.#http.get<SeriesResponse>(`${this.#seriesUrl}`).pipe(
      map(resp => {
        return resp.results.map(series => ({
          ...series,
          selectedProgress: "Watching" 
        }));
      })
    );
  }
}