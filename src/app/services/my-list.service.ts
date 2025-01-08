import { Injectable } from '@angular/core';
import { Serie } from '../interfaces/serie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyListService {
  constructor() { 
    const initialList = this.loadFromLocalStorage();
    this.serieList.next(initialList);
  }
  serieList = new BehaviorSubject<Serie[]>(this.loadFromLocalStorage());
  private localStorageKey = 'mySeriesList';

  loadFromLocalStorage():Serie[]{
    const storageList = localStorage.getItem(this.localStorageKey);
    const parsedList = storageList ? JSON.parse(storageList) : [];
    return parsedList;  
  }

  saveToLocalStorage(list:Serie[]){
    localStorage.setItem(this.localStorageKey,JSON.stringify(list));
  }

  addtoList(serie: Serie){
    const currentList = this.serieList.getValue();
    const hasSerie = currentList.some((s) => s.id === serie.id);
    if(!hasSerie){
      const updatedList = [...currentList, serie];
      this.serieList.next(updatedList);
      this.saveToLocalStorage(updatedList);
    }
    else{
      alert(`The TV Show ${serie.name} is already on the list`);
      console.log("La serie ya existe en la lista", serie);
    }
  }
  getSeriesList(){
    return this.serieList.asObservable();
  }

  updateStatus(id: number,selectedProgress:string){
    const currentList = this.loadFromLocalStorage();
    currentList.forEach(serie => {
      if(serie.id == id){
        serie.selectedProgress = selectedProgress;
      }
    });
    this.saveToLocalStorage(currentList);
  }

  updateScore(id: number,selectedScore:number){
    const currentList = this.loadFromLocalStorage();
    currentList.forEach(serie => {
      if(serie.id == id){
        serie.selectedScore = selectedScore;
      }
    });
    this.saveToLocalStorage(currentList);
  }

  deleteFromList(serie: Serie){
    const currentList = this.serieList.getValue();
    const hasSerie = currentList.some((s) => s.id === serie.id);
    if(hasSerie){
      const updatedList = currentList.filter(series => series !== serie);
      this.serieList.next(updatedList);
      this.saveToLocalStorage(updatedList);
    }
  }
}
