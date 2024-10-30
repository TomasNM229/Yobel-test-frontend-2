import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character.component';
import { IndexService } from './../service/index.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Character } from '../interface/character';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let indexServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    indexServiceMock = jasmine.createSpyObj('IndexService', ['getCharacters']);
    indexServiceMock.getCharacters.and.returnValue(of([
      { id: 1, name: 'Character A' },
      { id: 2, name: 'Character B' }
    ] as Character[]));
    
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CharacterComponent],
      imports: [FormsModule],
      providers: [
        { provide: IndexService, useValue: indexServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', () => {
    component.ngOnInit();
    expect(component.characters.length).toBe(2);
    expect(component.filteredCharacters.length).toBe(2);
    expect(indexServiceMock.getCharacters).toHaveBeenCalled();
  });

  it('should set selectedCharacter on selectCharacter', () => {
    const character = { id: 1, name: 'Character A' };
    component.selectCharacter(character);
    expect(component.selectedCharacter).toEqual(character);
  });

  it('should clear selectedCharacter on closeCharacterDetails', () => {
    component.selectedCharacter = { id: 1, name: 'Character A' };
    component.closeCharacterDetails();
    expect(component.selectedCharacter).toBeNull();
  });

  it('should navigate to search page with searchTerm on searchCharacter', () => {
    component.searchTerm = 'test';
    component.searchCharacter();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/search'], { queryParams: { name: 'test' } });
  });
});
