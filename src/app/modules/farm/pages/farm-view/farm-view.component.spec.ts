import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmViewComponent } from './farm-view.component';

describe('FarmViewComponent', () => {
  let component: FarmViewComponent;
  let fixture: ComponentFixture<FarmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
