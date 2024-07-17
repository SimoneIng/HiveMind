import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UploadIdeaComponent } from './Components/upload-idea/upload-idea.component';
import { UserPageComponent } from './Components/user-page/user-page.component';
import { authGuard } from './_guards/AuthGuard/auth.guard';

export const routes: Routes = [
    {
        path: 'Home',
        component: HomepageComponent, 
        title: 'HiveMind Homepage'
    },
    {
        path: 'Login', 
        component: LoginComponent, 
        title: 'HiveMind Login',
    },
    {
        path: "", 
        redirectTo: "/Home", 
        pathMatch: "full"
    },
    {
        path:'SignUp', 
        component: SignupComponent, 
        title: 'HiveMind Signup'
    },
    {
        path:'UploadIdea',
        component: UploadIdeaComponent, 
        title: 'Upload new Idea',
        canActivate: [authGuard]
    },
    {
        path:'UserProfile',
        component: UserPageComponent,
        title: 'User Page',
        canActivate: [authGuard]
    }
];
