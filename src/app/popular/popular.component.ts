import { Component, inject, signal } from '@angular/core';
import { Serie } from '../interfaces/serie';
import { HttpErrorResponse } from '@angular/common/http';
import { PopularService } from '../services/popular.service';
import { MyListService } from '../services/my-list.service';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-popular',
  imports: [MatPaginatorModule],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css' 
})
export class PopularComponent {
  #myListService = inject(MyListService);
  #popularService = inject(PopularService);
  series = signal<Serie[]>([]);
  totalResults = signal<Number>(0);
  constructor() {
    this.obtainPopular(1);
    
  }
  obtainPopular(pageNumber: number) {
    this.#popularService
    .getPopular(pageNumber)
    .subscribe({
      next: (series) => {
        this.series.set(series.results),
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
    this.obtainPopular(pageEvent.pageIndex);

  }
}
