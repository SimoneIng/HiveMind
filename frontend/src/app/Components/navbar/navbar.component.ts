import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { AuthService } from '../../_services/auth/auth.service';
import { UserService } from '../../_services/user/user.service';
import Swal from 'sweetalert2';
import { FeedbacksService } from '../../_services/feedbacks/feedbacks.service';
import { IdeasService } from '../../_services/ideas/ideas.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  navbarIsOpen:boolean = false;
  router = inject(Router);
  ideasService = inject(IdeasService)
  auth = inject(AuthService); 
  user = inject(UserService); 
  feedbacksService = inject(FeedbacksService); 

  toggleNavbarMenu(){
    this.navbarIsOpen = !this.navbarIsOpen; 
  }
  
  closeMenuAfterLinkIsClicked(){
    if(this.navbarIsOpen) this.navbarIsOpen = !this.navbarIsOpen; 
  }

  goToUserPage(){
    const user = this.user.loggedUser(); 
    user.ideas = this.ideasService.ideas().filter(idea => idea.userID === user.userID)
    this.closeMenuAfterLinkIsClicked()

    this.router.navigate(['/UserPage'], {state: user})
  }

  handleLogout(){
    this.auth.updateAuthStateOnLogout(); 
    this.user.updateUserOnLogout(); 
    this.feedbacksService.clearStorageOnLogout(); 

    Swal.fire({
      position: "center",
      icon: "error",
      title: "Hai Effettuato il Logout",
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'swal2-popup',
        title: 'swal2-title',
        actions: 'swal2-actions',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    });
  }


}
