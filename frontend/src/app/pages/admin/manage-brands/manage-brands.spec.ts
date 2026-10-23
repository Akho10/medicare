import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageBrands } from './manage-brands';

describe('ManageBrands', () => {
  let component: ManageBrands;
  let fixture: ComponentFixture<ManageBrands>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBrands],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageBrands);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
