import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {User} from "src/model/user";
import {ICONS, isEmail, isPassword, isPhoneNumber} from "src/app/constants";
import {NbToastrService, NbTooltipDirective, NbWindowRef, NbWindowService} from "@nebular/theme";
import {defaultUserContent, UserContent} from "src/app/authentication/constants/constants";
import {Select, Store} from "@ngxs/store";
import {ProfileSelector} from "src/app/profile/profile.selector";
import {Observable} from "rxjs";
import {FetchCurrentUserLoggedIn, FetchUser, FetchUserProducts, ProfileReset} from "src/app/profile/profile.actions";
import {Product} from "src/model/product";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Select(ProfileSelector.isFetching)
  isFetching$: Observable<boolean>;
  @Select(ProfileSelector.userContent)
  userContent$: Observable<UserContent>;
  @Select(ProfileSelector.user)
  user$: Observable<User>;
  @Select(ProfileSelector.userProducts)
  userProducts$: Observable<Product[]>;

  profileId: string;
  userContent: UserContent = defaultUserContent();
  initialUserContent: UserContent = defaultUserContent();
  showPassword = false;
  showRepeatPasswordForm = false;

  // validation
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  isPhoneNumberValid: boolean = true;
  @ViewChild('tooltipEmail') tooltipEmail: NbTooltipDirective;
  @ViewChild('tooltipPassword') tooltipPassword: NbTooltipDirective;
  @ViewChild('tooltipPhoneNumber') tooltipPhoneNumber: NbTooltipDirective;

  // location map picker
  @ViewChild('locationChooser') locationChooser: TemplateRef<any>;
  windowRef: NbWindowRef;

  protected readonly ICONS = ICONS;
  alive: boolean = true;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store,
              private userService: UserService,
              private toastrService: NbToastrService,
              private windowService: NbWindowService) {
  }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.params['id'];
    if (!this.userService.redirectUserIfNotLoggedIn()) {
      if(this.profileId === 'my-profile') {
        this.store.dispatch(new FetchCurrentUserLoggedIn());
      }
      else {
        this.store.dispatch(new FetchUser(this.profileId));
        this.store.dispatch(new FetchUserProducts(this.profileId));
      }

      this.userContent$.subscribe(userContent => {
        this.userContent = userContent;
        this.initialUserContent = {...userContent};
      });
    }
  }

  isButtonDisabled() {
    return this.userContent.email === this.initialUserContent.email &&
      this.userContent.firstName === this.initialUserContent.firstName &&
      this.userContent.lastName === this.initialUserContent.lastName &&
      this.userContent.location === this.initialUserContent.location &&
      this.userContent.password === this.initialUserContent.password &&
      this.userContent.phoneNumber === this.initialUserContent.phoneNumber;
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

  onInputType(event) {
    switch (event.target.name) {
      case "email": {
        this.isEmailValid = this.userContent.email !== '' ? isEmail(this.userContent.email) : true;
        break;
      }
      case "repeatPassword":
      case "password": {
        this.isPasswordValid = this.userContent.password === '' || ((this.userContent.password === this.userContent.repeatPassword) && isPassword(this.userContent.password));
        this.showRepeatPasswordForm = this.userContent.password !== this.initialUserContent.password;
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
    alert('form submitted');
  }

  getProductGridClass(products: Product[]): string {
    if (products.length >= 1 && products.length <= 3) {
      return 'limited-products';
    }
    return '';
  }

  ngOnDestroy() {
    this.store.dispatch(new ProfileReset());
    this.alive = false;
  }
}