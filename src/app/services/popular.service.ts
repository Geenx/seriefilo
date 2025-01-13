import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {SeriesResponse } from '../interfaces/serie';
import { Serie } from '../interfaces/serie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopularService {
  #http = inject(HttpClient);
  #popularUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${environment.apiKey}&language=en&page=`;

  constructor() { }

 getPopular(page: number): Observable<SeriesResponse> {
    return this.#http.get<SeriesResponse>(`${this.#popularUrl}${page}`).pipe(
      map(resp => { console.log(resp);
        return resp;
      })
    );
  }
}