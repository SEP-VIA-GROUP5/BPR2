import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserTestingModule } from "@angular/platform-browser/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbOverlayModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule
} from "@nebular/theme";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { NgxsModule } from "@ngxs/store";
import { AuthenticationComponent } from "src/app/authentication/authentication.component";
import { AuthenticationState } from "./authentication.state";

describe('src > app > authentication > authentication.component.spec.ts', () => {
  let spectator: Spectator<AuthenticationComponent>;

  const createComponent = createComponentFactory({
    component: AuthenticationComponent,
    imports: [
      RouterTestingModule,
      BrowserTestingModule,
      HttpClientTestingModule,
      NbFormFieldModule,
      NbCardModule,
      NbIconModule,
      NbButtonModule,
      NbInputModule,
      NbEvaIconsModule,
      NbWindowModule.forRoot(),
      NbToastrModule.forRoot(),
      NbOverlayModule.forRoot(),
      NgxsModule.forRoot([AuthenticationState]),
      NbThemeModule.forRoot(), NbSidebarModule.forRoot(), NbMenuModule.forRoot()
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should match snapshot', async () => {
    spectator.detectChanges();
    await spectator.fixture.whenStable();
    spectator.detectChanges();
    await spectator.fixture.whenRenderingDone();

    // assert
    expect(spectator.fixture).toMatchSnapshot();
  });
});
