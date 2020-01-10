import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AUTH_ROUTES } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule, MatInputModule } from '@angular/material'; 
@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    // SharedModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    CommonModule,
    AUTH_ROUTES,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
