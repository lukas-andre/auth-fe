import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError, retry } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthActionTypes, LogIn } from '../user/user.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) { }


  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
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
}
