import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { NgxsModule, Store } from "@ngxs/store";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import {NEBULAR_MODULES, PROVIDERS, STATES} from "./app.module";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";

describe('app > app.component.spec.ts', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      RouterTestingModule,
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      NgxsModule.forRoot(STATES),
      ...NEBULAR_MODULES,
    ],
    providers: [
      ...PROVIDERS,
      Store,
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

  // it('should render title', () => {
  //   spectator.detectChanges();
  //   const compiled = spectator.fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('RentIT-Frontend app is running!');
  // });
});
