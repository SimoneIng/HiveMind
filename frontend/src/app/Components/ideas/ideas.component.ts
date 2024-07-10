import { Component, computed, inject, OnInit } from '@angular/core';
import { BackendService } from '../../_services/backend/backend.service';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { IdeaComponent } from '../idea/idea.component';
import { IdeasPaginationComponent } from '../ideas-pagination/ideas-pagination.component';
import { IdeaExtended } from '../../_models/IdeaExtended.type';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [IdeaComponent, IdeasPaginationComponent],
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.scss'
})
export class IdeasComponent implements OnInit{

  backend = inject(BackendService)
  ideasService = inject(IdeasService)

  ideasPerPage: number = 10; 
  ideasLength: number = 0; 
  ideas: IdeaExtended[] = []; 
  pagedIdeas: IdeaExtended[] = []; 
  currentPage: number = 1; // Pagina di Default all'inizializzazzione del component  
  sortOption: string = "MostControvert-Ideas" // Sorting di default 

  ngOnInit(){
    this.backend.getIdeas().subscribe({
      next: (response) => {
        this.ideasService.setIdeas(response)
      }, 
      error: err => {
        console.log(err)
      }, 
      complete: () => {
        this.ideas = this.ideasService.ideas(); 
        this.sortItems(); 
        this.onPageChanged(1); // inizializzare la prima pagina
      }
    })
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePagedIdeas();
  }

  updatePagedIdeas() {
    const startIndex = (this.currentPage - 1) * this.ideasPerPage;
    const endIndex = startIndex + this.ideasPerPage;
    this.pagedIdeas = this.ideas.slice(startIndex, endIndex);
  }
  

  sortItems(){
    switch(this.sortOption){
      case 'MostControvert-Ideas': 
        
      break; 
      case 'Mainstream-Ideas': 

      break; 
      case 'Unpopular-Ideas': 

      break; 
      default: 
    }
    this.updatePagedIdeas(); 
  }

  changeSortOption(option: string){
    this.sortOption = option; 
    this.sortItems(); 
  }

}
