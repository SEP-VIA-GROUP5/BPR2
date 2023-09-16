import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { NgxsModule, Store } from "@ngxs/store";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { of } from "rxjs";
import {ProductsComponent} from "./products.component";
import {AppRoutingModule} from "../app-routing.module";
import {NEBULAR_MODULES, PROVIDERS, STATES} from "../app.module";

// const productsServiceMock = {
//   getProducts: jest.fn().mockReturnValue(of([])),
// };

describe('app > products > products.component.spec.ts', () => {
  let spectator: Spectator<ProductsComponent>;

  const createComponent = createComponentFactory({
    component: ProductsComponent,
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
      // {
      //   provide: ProductsService,
      //   useValue: productsServiceMock
      // },
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

  // TODO add test later when data is available
});
