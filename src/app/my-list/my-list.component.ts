import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Serie } from '../interfaces/serie';
import { MyListService } from '../services/my-list.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.css'
})
export class MyListComponent implements OnInit , OnDestroy {
  #myListService = inject(MyListService);
  title = 'My TV Show list';
  myList:Serie[] = [];
  private listSubscription: Subscription | null = null;
  statuses = ["Watching","Completed","On-Hold","Dropped"];
  scores = [10,9,8,7,6,5,4,3,2,1,0];

  ngOnInit() {
    this.listSubscription = this.#myListService.getSeriesList().subscribe((list) => {
      this.myList=list;
    });
  }

  ngOnDestroy(){
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
  }

  onStatusChange(id: number, selectedProgress:string) {
   this.#myListService.updateStatus(id,selectedProgress);
  }

  onScoreChange(id: number, selectedScore:number) {
    this.#myListService.updateScore(id,selectedScore);
   }

   borrarLista(serie: Serie){
    if(confirm("Are you sure you want to delete "+serie.name+" from the list?")){
    this.#myListService.deleteFromList(serie);
    }
  }
}
