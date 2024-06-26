import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomepageComponent } from './Components/homepage/homepage.component';

export const routes: Routes = [
    {
        path: 'Home',
        component: HomepageComponent, 
        title: 'HiveMind Homepage'
    },
    {
        path: 'Login', 
        component: LoginComponent, 
        title: 'HiveMind Login'
    },
    {
        path: "", 
        redirectTo: "/Home", 
        pathMatch: "full"
    }
];
