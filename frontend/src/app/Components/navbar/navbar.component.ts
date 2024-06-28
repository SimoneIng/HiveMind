import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { AuthService } from '../../_services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  navbarIsOpen:boolean = false;
  auth = inject(AuthService) 

  toggleNavbarMenu(){
    this.navbarIsOpen = !this.navbarIsOpen; 
  }


}
