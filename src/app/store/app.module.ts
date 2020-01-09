import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { extModules } from '../build-specifics';
import { AuthEffects } from './auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    // AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        }
      },
    ),
    extModules,
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
