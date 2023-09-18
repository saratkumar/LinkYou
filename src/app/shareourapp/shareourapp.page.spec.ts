import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareourappPage } from './shareourapp.page';

describe('ShareourappPage', () => {
  let component: ShareourappPage;
  let fixture: ComponentFixture<ShareourappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareourappPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareourappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
