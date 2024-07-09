import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { AuthService } from '../../_services/auth/auth.service';
import { UserService } from '../../_services/user/user.service';
import Swal from 'sweetalert2';
import { FeedbacksService } from '../../_services/feedbacks/feedbacks.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  navbarIsOpen:boolean = false;
  auth = inject(AuthService); 
  user = inject(UserService); 
  feedbacksService = inject(FeedbacksService); 

  toggleNavbarMenu(){
    this.navbarIsOpen = !this.navbarIsOpen; 
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
      timer: 2000
    });
  }


}
