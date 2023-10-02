import {Component, OnDestroy, OnInit} from '@angular/core';
import {defaultUserContent, UserContent} from "src/app/authentication/constants/constants";
import {ICONS} from '../constants';
import {Select, Store} from "@ngxs/store";
import {Login, Register} from "src/app/authentication/authentication.actions";
import {Observable} from "rxjs";
import {AuthenticationSelector} from "src/app/authentication/authentication.selector";
import {Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  @Select(AuthenticationSelector.statusCode)
  statusCode$: Observable<number>

  userContent: UserContent = defaultUserContent();
  protected readonly ICONS = ICONS;
  isLoggedInTemplate: boolean = true; // false = register template is loaded
  showPassword = false;

  alive = true;
  constructor(private store: Store,
              private router: Router,
              private userService: UserService,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.toastrService.info(
        'You have been redirected to products page',
        'You are already logged in',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      this.router.navigate(['/products']);
    }
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

  onFormSubmit() {
    if (this.isLoggedInTemplate) {
      this.store.dispatch(new Login(this.userContent));
      // TODO add email validator in ngxs states
      // TODO add password validator in ngxs states
    } else {
      this.store.dispatch(new Register(this.userContent)).toPromise().then(() => this.isLoggedInTemplate = true);
      // TODO add email validator in ngxs states
      // TODO add password validator in ngxs states
      // TODO add username and fullName validator in ngxs states
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
