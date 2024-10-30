import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindCharacterComponent } from './find-character.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IndexService } from './../service/index.service';
import { of, throwError } from 'rxjs';
import { jsPDF } from 'jspdf';
import { FormsModule } from '@angular/forms';

describe('FindCharacterComponent', () => {
  let component: FindCharacterComponent;
  let fixture: ComponentFixture<FindCharacterComponent>;
  let indexServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    indexServiceMock = jasmine.createSpyObj('IndexService', [
      'getCharacterById',
      'searchCharacterByName',
    ]);
    indexServiceMock.getCharacterById.and.returnValue(
      of({
        id: 1,
        name: 'Character A',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        episode: [],
        url: '',
        created: new Date(),
      })
    );
    indexServiceMock.searchCharacterByName.and.returnValue(
      of([
        { id: 1, name: 'Character A' },
        { id: 2, name: 'Character B' },
      ])
    );

    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteMock = { queryParams: of({ name: 'Character A' }) };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FindCharacterComponent],
      providers: [
        { provide: IndexService, useValue: indexServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FindCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with search term from query params', () => {
    component.ngOnInit();
    expect(component.searchTerm).toBe('Character A');
  });

  it('should search characters by name', () => {
    component.searchCharacters();
    expect(indexServiceMock.searchCharacterByName).toHaveBeenCalledWith(
      'Character A'
    );
    expect(component.characters.length).toBe(2);
  });

  it('should navigate to error page on search error', () => {
    indexServiceMock.searchCharacterByName.and.returnValue(
      throwError(new Error('Error'))
    );
    component.searchCharacters();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/error-404']);
  });

  it('should download PDF when selectedCharacter is set', () => {
    const character = {
      name: 'Character A',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      episode: [],
      url: '',
      created: new Date(),
    };

    component.selectCharacter(character);

    const jsPDFInstance = new jsPDF()
    spyOn(jsPDFInstance, 'text').and.callThrough();
    spyOn(jsPDFInstance, 'save').and.callThrough();

    component.downloadPDF();

    expect(jsPDFInstance.text).toHaveBeenCalledWith(`Name: ${character.name}`, 10, 10);
    expect(jsPDFInstance.save).toHaveBeenCalledWith(`${character.name}_details.pdf`);
  });
});
