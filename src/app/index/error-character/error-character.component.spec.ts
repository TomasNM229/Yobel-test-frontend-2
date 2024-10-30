import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ErrorCharacterComponent } from './error-character.component';
import { of } from 'rxjs';

describe('ErrorCharacterComponent', () => {
  let component: ErrorCharacterComponent;
  let fixture: ComponentFixture<ErrorCharacterComponent>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ErrorCharacterComponent],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on goHome', () => {
    component.goHome();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
