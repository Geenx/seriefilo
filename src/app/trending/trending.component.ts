import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Serie } from '../interfaces/serie';
import { TrendingService } from '../services/trending.service';
import { MyListService } from '../services/my-list.service';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-trending',
  imports: [MatPaginatorModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  #myListService = inject(MyListService);
  #trendingService = inject(TrendingService);
  series = signal<Serie[]>([]);
  totalResults = signal<Number>(0);
  constructor() {
    this.obtainTrending(1);
    
  }
  obtainTrending(pageNumber: number) {
    this.#trendingService
    .getTrending(pageNumber)
    .subscribe({
      next: (series) => {
        this.series.set(series.results)
        this.totalResults.set(series.total_results)
    },
      error: (error: HttpErrorResponse) => console.error(`Error obtaining tv shows: `, error),
    });
  }

  enviarLista(serie: Serie){
    if(confirm("Are you sure you want to add "+serie.name+" to the list?")){
    this.#myListService.addtoList(serie);
  }
  }

  onPageChange(pageEvent: PageEvent) {
    this.obtainTrending(pageEvent.pageIndex);

  }
}
