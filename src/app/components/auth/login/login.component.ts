import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/store/user/user.model';
import { Store, select } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { LogIn } from 'src/app/store/user/user.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public form: FormGroup;
  public isLoading: Observable<boolean>;
  private state$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
    ) {
      this.state$ = this.store.select(selectAuthState);
    }

  ngOnInit() {
    this.initForm();
    this.isLoading = this.state$.pipe(
      map(auth => auth.loadingLogin),
      tap(v => console.log(v) )
    );
    console.log('isLoading', this.isLoading);
  }

  initForm() {
    this.form =  this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    // we know that the form is valid, so we do not verify its validity
    const payload = {
      username: this.form.value.username,
      password: this.form.value.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}
