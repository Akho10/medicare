import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPrescriptions } from './my-prescriptions';

describe('MyPrescriptions', () => {
  let component: MyPrescriptions;
  let fixture: ComponentFixture<MyPrescriptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPrescriptions],
    }).compileComponents();

    fixture = TestBed.createComponent(MyPrescriptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
