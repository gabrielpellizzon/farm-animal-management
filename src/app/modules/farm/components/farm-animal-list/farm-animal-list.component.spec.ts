import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmAnimalListComponent } from './farm-animal-list.component';

describe('FarmAnimalListComponent', () => {
  let component: FarmAnimalListComponent;
  let fixture: ComponentFixture<FarmAnimalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmAnimalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmAnimalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
