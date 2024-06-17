import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {


  switchTheme(isDarkTheme: boolean){
    if(isDarkTheme == false){
      // applica tema chiaro 
    } else {
      //applica tema scuro 
    }
  }
}
