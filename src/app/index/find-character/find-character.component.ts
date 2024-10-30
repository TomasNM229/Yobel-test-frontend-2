import { jsPDF } from 'jspdf';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router
import { IndexService } from './../service/index.service';
import { Character } from '../interface/character';


@Component({
  selector: 'app-find-character',
  templateUrl: './find-character.component.html',
  styleUrls: ['./find-character.component.css']
})
export class FindCharacterComponent implements OnInit {
  characters: Character[] = [];
  searchTerm: string = '';
  selectedCharacter: any = null;  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private indexService: IndexService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['name'];
      if (this.searchTerm) {
        this.searchCharacters();
      }
    });
  }

  searchCharacters() {
    if (this.searchTerm) {
      const id = Number(this.searchTerm);
      if (!isNaN(id)) {

        this.indexService.getCharacterById(id).subscribe(
          (data: Character) => {
            this.characters = [data]; 
            this.updateUrlId(); 
          },
          error => {
            console.error('Error al buscar personaje por ID:', error);
            this.router.navigate(['/error-404']); 
            this.characters = []; 
          }
        );
      } else {
        this.indexService.searchCharacterByName(this.searchTerm).subscribe(
          (data: Character[]) => {
            this.characters = data;
            this.updateUrlName();
          },
          error => {
            console.error('Error al buscar personajes por nombre:', error);
            this.router.navigate(['/error-404']);
            this.characters = [];
          }
        );
      }
    } else {
      this.characters = [];
    }
  }

  updateUrlId() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: this.searchTerm },
      queryParamsHandling: 'merge',
    });
  }
  updateUrlName() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { name: this.searchTerm },
      queryParamsHandling: 'merge',
    });
  }

  selectCharacter(character: any) {
    this.selectedCharacter = character;
  }
  closeCharacterDetails() {
    this.selectedCharacter = null;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchCharacters();
    }
  }
  
  downloadPDF() {
    if (!this.selectedCharacter) return;

    const doc = new jsPDF();
    const character = this.selectedCharacter;

    doc.text(`Name: ${character.name}`, 10, 10);
    doc.text(`Status: ${character.status}`, 10, 20);
    doc.text(`Species: ${character.species}`, 10, 30);
    doc.text(`Type: ${character.type || 'Unknown'}`, 10, 40);
    doc.text(`Gender: ${character.gender}`, 10, 50);
    doc.text(`Number of Episodes: ${character.episode.length}`, 10, 60);
    doc.text(`Origin: ${character.origin.name}`, 10, 70);
    doc.text(`Location: ${character.location.name}`, 10, 80);
    doc.text(`URL: ${character.url}`, 10, 90);
    doc.text(`Created: ${new Date(character.created).toLocaleString()}`, 10, 100);

    doc.save(`${character.name}_details.pdf`);
  }
}
