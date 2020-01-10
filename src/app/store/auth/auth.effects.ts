import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError, retry, delay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure
 } from '../user/user.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    delay(500),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.username, payload.password).pipe(
        map((user) => {
          console.log('user', user);
          return new LogInSuccess({token: user.access_token, username: payload.username});
        }),
        catchError((error) => {
          console.log(error);
          return of(new LogInFailure({ error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess) => action.payload),
    tap((payload) => {
      console.log('payload', payload);
      localStorage.setItem('token', payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    map((action: LogInFailure) => action.payload),
    tap((payload) => {
      console.log('login failure payload', payload)
    })
  );
}
