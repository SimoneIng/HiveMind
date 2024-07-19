import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './_interceptors/authInterceptor/auth-interceptor.interceptor';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown'


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(
        withFetch(), 
        withInterceptors([authInterceptor])
    ),
    provideAnimationsAsync(), 
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS, 
        useValue: {
          gfm: true, // Abilita GitHub Flavored Markdown per le estensioni (come i checkbox delle liste)
          breaks: true, // Abilita il comportamento di newline automatico
          smartLists: true, // Riconoscimento automatico delle liste ordinate e non ordinate
          smartypants: true, // Abilita l'elaborazione di entità HTML e caratteri speciali
        }
      }
    })
  ] 
};
