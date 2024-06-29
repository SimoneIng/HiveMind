import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, 
    HomepageComponent, FooterComponent, 
    LoginComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'HiveMind';
}
