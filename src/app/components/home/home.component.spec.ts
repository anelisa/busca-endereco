import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isLoading set to false', () => {
    expect(component.isLoading).toBe(false);
  });

  it('should change the value of isLoading when calling onLoadingChange', () => {
    component.onLoadingChange(true);
    expect(component.isLoading).toBe(true);

    component.onLoadingChange(false);
    expect(component.isLoading).toBe(false);
  });
});
