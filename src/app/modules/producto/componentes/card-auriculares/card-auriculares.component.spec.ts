import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAuricularesComponent } from './card-auriculares.component';

describe('CardAuricularesComponent', () => {
  let component: CardAuricularesComponent;
  let fixture: ComponentFixture<CardAuricularesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAuricularesComponent]
    });
    fixture = TestBed.createComponent(CardAuricularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
