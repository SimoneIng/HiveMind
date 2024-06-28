import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../_services/user/user.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  
  authService = inject(AuthService)
  userService = inject(UserService)

  userIdeas = this.userService.ideas() 


}
