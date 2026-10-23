import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageSymptoms } from './manage-symptoms';

describe('ManageSymptoms', () => {
  let component: ManageSymptoms;
  let fixture: ComponentFixture<ManageSymptoms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSymptoms],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSymptoms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
