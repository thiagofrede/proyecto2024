import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMousesComponent } from './card-mouses.component';

describe('CardMousesComponent', () => {
  let component: CardMousesComponent;
  let fixture: ComponentFixture<CardMousesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMousesComponent]
    });
    fixture = TestBed.createComponent(CardMousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
