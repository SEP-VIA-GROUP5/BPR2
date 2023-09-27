import {Component, OnDestroy, OnInit} from '@angular/core';
import {defaultUserContent, UserContent} from "src/app/authentication/constants/constants";
import {ICONS} from '../constants';
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  userContent: UserContent = defaultUserContent();
  protected readonly ICONS = ICONS;
  isLoggedInTemplate: boolean = true; // false = register template is loaded
  showPassword = false;

  alive = true;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  switchTemplates() {
    this.isLoggedInTemplate = !this.isLoggedInTemplate;
  }

  isButtonDisabled() {
    if (this.isLoggedInTemplate) {
      return this.userContent.password.length <= 0 || this.userContent.email.length <= 0;
    } else {
      return Object.values(this.userContent).find(value => value.length <= 0) !== undefined;
    }
  }

  onInput(event) {
    console.log(event);
  }

  onFormSubmit() {
    if (this.isLoggedInTemplate) {
      console.log(this.userContent);
      // TODO add email validator in ngxs states
      // TODO add password validator in ngxs states
    } else {
      // TODO add email validator in ngxs states
      // TODO add password validator in ngxs states
      // TODO add username and fullName validator in ngxs states
      console.log(this.userContent);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
