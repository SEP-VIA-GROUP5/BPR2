import {AuthenticationComponent} from "src/app/authentication/authentication.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {
  NbButtonModule,
  NbCardModule, NbFocusMonitor,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutDirectionService, NbMenuModule,
  NbOverlay,
  NbOverlayModule,
  NbOverlayService, NbSidebarModule,
  NbStatusService, NbThemeModule,
  NbToastrModule,
  NbToastrService,
  NbWindowModule,
  NbWindowService
} from "@nebular/theme";
import {PluginManager} from "@ngxs/store/src/plugin-manager";
import {NgxsModule} from "@ngxs/store";
import {AuthenticationState} from "./authentication.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MockToastrService} from "../../mocks/modules/toastr.service.mock";
import {MockNbWindowService} from "../../mocks/modules/nbWindow.service.mock";
import {NbEvaIconsModule} from "@nebular/eva-icons";

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
