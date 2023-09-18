import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RateOurAppPage } from './rateourapp.page';

describe('RateOurAppPage', () => {
  let component: RateOurAppPage;
  let fixture: ComponentFixture<RateOurAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RateOurAppPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateOurAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
