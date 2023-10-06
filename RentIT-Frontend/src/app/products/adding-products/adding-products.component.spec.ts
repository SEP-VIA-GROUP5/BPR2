import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingProductsComponent } from './adding-products.component';

describe('AddingProductsComponent', () => {
  let component: AddingProductsComponent;
  let fixture: ComponentFixture<AddingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
