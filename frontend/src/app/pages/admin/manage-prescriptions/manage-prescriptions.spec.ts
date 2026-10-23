import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagePrescriptions } from './manage-prescriptions';

describe('ManagePrescriptions', () => {
  let component: ManagePrescriptions;
  let fixture: ComponentFixture<ManagePrescriptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePrescriptions],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePrescriptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
