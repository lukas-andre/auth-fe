import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/store/user/user.model';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { LogIn } from 'src/app/store/user/user.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  form: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('form', this.form);
    const payload = {
      username: this.form.value.username,
      password: this.form.value.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}
