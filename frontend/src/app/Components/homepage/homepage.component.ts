import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  
  authService = inject(AuthService)

}
