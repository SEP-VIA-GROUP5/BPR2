import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {defaultUserContent, UserContent} from "src/app/authentication/constants/constants";
import {ICONS, isEmail, isPassword, isPhoneNumber, PRODUCTS_MENU_ITEM_URLS} from '../constants';
import {Select, Store} from "@ngxs/store";
import {Login, Register} from "src/app/authentication/authentication.actions";
import {Observable} from "rxjs";
import {AuthenticationSelector} from "src/app/authentication/authentication.selector";
import {Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {NbToastrService, NbTooltipDirective, NbWindowRef, NbWindowService} from "@nebular/theme";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  @Select(AuthenticationSelector.isFetching)
  isFetching$: Observable<boolean>
  @Select(AuthenticationSelector.statusCode)
  statusCode$: Observable<number>

  userContent: UserContent = defaultUserContent();
  protected readonly ICONS = ICONS;
  isLoggedInTemplate: boolean = true; // false = register template is loaded
  showPassword = false;

  // validation
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  isPhoneNumberValid: boolean = true;
  @ViewChild('tooltipEmail') tooltipEmail: NbTooltipDirective;
  @ViewChild('tooltipPassword') tooltipPassword: NbTooltipDirective;
  @ViewChild('tooltipPhoneNumber') tooltipPhoneNumber: NbTooltipDirective;

  //location map picker
  @ViewChild('locationChooser') locationChooser: TemplateRef<any>;
  windowRef: NbWindowRef;

  alive = true;

  constructor(private store: Store,
              private router: Router,
              private userService: UserService,
              private toastrService: NbToastrService,
              private windowService: NbWindowService) {
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.toastrService.info(
        'You have been redirected to products page',
        'You are already logged in',
        {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE}
      );
      this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
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
      return !this.userContent.password || !this.userContent.email;
    } else {
      let allFieldsFilled = !Object.values(this.userContent).some(value => !value);
      return !(allFieldsFilled && this.isEmailValid && this.isPasswordValid && this.isPhoneNumberValid);
    }
  }

  onInputType(event) {
    switch (event.target.name) {
      case "email": {
        this.isEmailValid = this.userContent.email !== '' ? isEmail(this.userContent.email) : true;
        break;
      }
      case "repeatPassword":
      case "password": {
        this.isPasswordValid = (this.userContent.password === this.userContent.repeatPassword) && isPassword(this.userContent.password);
        break;
      }
      case "phoneNumber": {
        this.isPhoneNumberValid = this.userContent.phoneNumber !== '' && isPhoneNumber(this.userContent.phoneNumber);
        break;
      }
      case "location": {
        if (this.userContent.location !== '') {
          this.windowRef = this.windowService.open(
            this.locationChooser,
            {
              windowClass: 'window-location',
              title: 'Choose your location',
              context: {location: this.userContent.location}
            },
          );
        }
      }
    }
  }

  onSaveLocation(location: string) {
    this.userContent.location = location;
    this.windowRef.close();
    this.toastrService.info('Location saved successfully!', 'Success', {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE});
  }

  showTooltip() {
    if (!this.isEmailValid) {
      this.tooltipEmail.show();
    } else if (!this.isPasswordValid) {
      this.tooltipPassword.show();
    } else if (!this.isPhoneNumberValid) {
      this.tooltipPhoneNumber.show();
    }
  }

  hideTooltip() {
    if (this.isEmailValid) {
      this.tooltipEmail.hide();
    } else if (this.isPasswordValid) {
      this.tooltipPassword.hide();
    } else if (this.isPhoneNumberValid) {
      this.tooltipPhoneNumber.hide();
    }
  }

  onFormSubmit() {
    if (this.isLoggedInTemplate) {
      this.store.dispatch(new Login(this.userContent));
    } else {
      this.store.dispatch(new Register(this.userContent)).toPromise().then(() => this.isLoggedInTemplate = true);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
