import { Component, inject, signal } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serie } from '../interfaces/serie';
import { CommonModule } from '@angular/common';
import { MyListService } from '../services/my-list.service';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css',
})
export class SeriesComponent {
  #myListService = inject(MyListService);
  #seriesService = inject(SeriesService);
  series = signal<Serie[]>([]);

  constructor() {
    this.obtenerSeries();
    
  }
  obtenerSeries() {
    this.#seriesService
    .getSeries()
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
