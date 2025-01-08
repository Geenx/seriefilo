import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Serie } from '../interfaces/serie';
import { TrendingService } from '../services/trending.service';
import { MyListService } from '../services/my-list.service';

@Component({
  selector: 'app-trending',
  imports: [],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  #myListService = inject(MyListService);
  #trendingService = inject(TrendingService);
  series = signal<Serie[]>([]);
  constructor() {
    this.obtainTrending();
    
  }
  obtainTrending() {
    this.#trendingService
    .getTrending()
    .subscribe({
      next: (series) => {
        this.series.set(series)
    },
      error: (error: HttpErrorResponse) => console.error(`Error obtaining tv shows: `, error),
    });
  }

  enviarLista(serie: Serie){
    if(confirm("Are you sure you want to add "+serie.name+" to the list?")){
    this.#myListService.addtoList(serie);
  }
  }
}
