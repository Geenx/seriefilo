import { Component, inject, signal } from '@angular/core';
import { Serie } from '../interfaces/serie';
import { HttpErrorResponse } from '@angular/common/http';
import { PopularService } from '../services/popular.service';
import { MyListService } from '../services/my-list.service';

@Component({
  selector: 'app-popular',
  imports: [],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css' 
})
export class PopularComponent {
  #myListService = inject(MyListService);
  #popularService = inject(PopularService);
  series = signal<Serie[]>([]);
  constructor() {
    this.obtainPopular();
    
  }
  obtainPopular() {
    this.#popularService
    .getPopular()
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
