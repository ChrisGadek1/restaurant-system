import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketSiteComponent } from './basket-site.component';

describe('BasketSiteComponent', () => {
  let component: BasketSiteComponent;
  let fixture: ComponentFixture<BasketSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
