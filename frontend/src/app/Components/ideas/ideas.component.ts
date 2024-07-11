import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../_services/backend/backend.service';
import { IdeasService } from '../../_services/ideas/ideas.service';
import { IdeaComponent } from '../idea/idea.component';
import { IdeasPaginationComponent } from '../ideas-pagination/ideas-pagination.component';
import { IdeaExtended } from '../../_models/IdeaExtended.type';
import Swal from 'sweetalert2'; 
import { AuthService } from '../../_services/auth/auth.service';
import { UserService } from '../../_services/user/user.service';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [IdeaComponent, IdeasPaginationComponent],
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.scss'
})
export class IdeasComponent implements OnInit{

  backend = inject(BackendService)
  user = inject(UserService)
  auth = inject(AuthService)
  ideasService = inject(IdeasService)
  router = inject(Router)

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
        Swal.fire({
          icon: "error",
          title: "Errore nel caricare i dati, riprovare più tardi",
          timer: 1500
        })
        this.auth.updateAuthStateOnLogout(); 
        this.user.updateUserOnLogout(); 
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
    console.log(`Sorting: ${this.sortOption}`)
    switch(this.sortOption){
      case 'MostControvert-Ideas': // ordinamento in base a chi ha il saldo upvotes/downvotes più basso, ma con il maggior numero di upvotes e downvotes
        this.ideas.sort((a, b) => {
          const aBalance = a.upVotes - a.downVotes; 
          const bBalance = b.upVotes - b.downVotes;

          const balance = aBalance - bBalance; 

          if(balance !== 0) return balance; 

          const aTotalVotes = a.upVotes + a.downVotes; 
          const bTotalVotes = b.upVotes + a.upVotes; 
          return bTotalVotes - aTotalVotes; 
        })        
      break; 
      case 'Mainstream-Ideas': // ordinamento in base a chi ha il saldo upvotes/downvotes più alto
        this.ideas.sort((a, b) => {
          const aBalance = a.upVotes - a.downVotes; 
          const bBalance = b.upVotes - b.downVotes;

          return bBalance - aBalance; 
        })
      break; 
      case 'Unpopular-Ideas': // ordinamento in base a chi ha il saldo upvotes/downvotes più basso 
        this.ideas.sort((a, b) => {
          const aBalance = a.upVotes - a.downVotes; 
          const bBalance = b.upVotes - b.downVotes;

          return aBalance - bBalance; 
        })
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
