import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {

  isDarkTheme: boolean = false; 

  ngOnInit(){
    if(localStorage.getItem('themePreferences') === 'dark' || (!('themePreferences' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
      this.isDarkTheme = true; 
      document.documentElement.classList.add('dark');
    } else {
      this.isDarkTheme = false; 
      document.documentElement.classList.remove('dark');
    }
  }

  switchTheme(){

    // se esiste già una preferenza salvata in localstorage 
    if(localStorage.getItem('themePreferences')){
      if(this.isDarkTheme == true){
        localStorage.setItem('themePreferences', 'light')
        document.documentElement.classList.remove('dark');
        this.isDarkTheme = false
      } else {
        localStorage.setItem('themePreferences', 'dark')
        document.documentElement.classList.add('dark');
        this.isDarkTheme = true 
      }
    } else {
      localStorage.setItem('themePreferences', this.isDarkTheme ? 'dark' : 'light')
      this.switchTheme()
    }
    
  }
}
