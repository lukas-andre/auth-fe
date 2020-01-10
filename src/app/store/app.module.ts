import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { extModules } from '../build-specifics';
import { AuthEffects } from './auth/auth.effects';
import { reducers } from './app.states';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // AuthComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(
      reducers,
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
