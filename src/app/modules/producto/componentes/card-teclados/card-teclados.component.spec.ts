import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTecladosComponent } from './card-teclados.component';

describe('CardTecladosComponent', () => {
  let component: CardTecladosComponent;
  let fixture: ComponentFixture<CardTecladosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTecladosComponent]
    });
    fixture = TestBed.createComponent(CardTecladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
