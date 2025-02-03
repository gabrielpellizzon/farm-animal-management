import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAnimalFormComponent } from './multiple-animal-form.component';

describe('MultipleAnimalFormComponent', () => {
  let component: MultipleAnimalFormComponent;
  let fixture: ComponentFixture<MultipleAnimalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleAnimalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleAnimalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
