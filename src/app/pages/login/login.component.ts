import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppStateFacade} from "../../services/app-state.facade";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

  constructor(
    private readonly appState: AppStateFacade,
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.appState.logUserIn();
  }

  hasError(fieldName: string) {
    const field = this.loginForm.get(fieldName);
    return field.touched && field.invalid;
  }

}
