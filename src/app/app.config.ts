import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(),
  provideAnimationsAsync(),
  provideAnimationsAsync(),
  provideAnimationsAsync(),
  provideFirebaseApp(() => initializeApp({
    "projectId": "kingscup-fe394",
    "appId": "1:1028935825015:web:742a21acd42c96d5003872",
    "storageBucket": "kingscup-fe394.firebasestorage.app",
    "apiKey": "AIzaSyCat_HPxvRaPUQ8p74a3BYTAHrsWv-CkKA",
    "authDomain": "kingscup-fe394.firebaseapp.com",
    "messagingSenderId": "1028935825015",
  })),
  provideFirestore(() => getFirestore())]
};
