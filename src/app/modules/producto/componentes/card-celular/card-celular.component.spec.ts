import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCelularComponent } from './card-celular.component';

describe('CardCelularComponent', () => {
  let component: CardCelularComponent;
  let fixture: ComponentFixture<CardCelularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCelularComponent]
    });
    fixture = TestBed.createComponent(CardCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
