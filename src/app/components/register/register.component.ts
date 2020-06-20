import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { User } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public router: Router,
    public auth: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      checkPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    }, { validators: this.passwordMatchValidator });
  }

  get email() { return this.registerForm.get('email'); }

  get displayName() { return this.registerForm.get('displayName'); }

  get password() { return this.registerForm.get('password'); }

  get checkPassword() { return this.registerForm.get('checkPassword'); }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['checkPassword'].value ? null : {'mismatch': true};
  }

  register(user: User) {
    this.auth.register(user);
  }
}
