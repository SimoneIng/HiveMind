import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ideas-pagination',
  standalone: true,
  imports: [],
  templateUrl: './ideas-pagination.component.html',
  styleUrl: './ideas-pagination.component.scss'
})
export class IdeasPaginationComponent implements OnChanges {

  @Input() totalItems: number = 0; 
  @Input() pageItemsNumber: number = 10; 
  @Output() pageChanged = new EventEmitter<number>(); 

  currentPage: number = 1; 
  totalPages: number = 1; 
  pages: number[] = []; 


  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['pageItemsNumber']) {
      this.totalPages = Math.ceil(this.totalItems / this.pageItemsNumber);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.changePage(1); // Reset to first page on input change
    }
  }

  changePage(page: number){
    if(page >= 1 && page <= this.totalPages){
      this.currentPage = page; 
      this.pageChanged.emit(this.currentPage); 
    }
  }

}
