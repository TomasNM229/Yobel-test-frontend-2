import { IndexService } from './../service/index.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Character } from '../interface/character';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']  // Corregido a styleUrls
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  searchTerm: string = '';
  selectedCharacter: any = null;

  constructor(private indexService: IndexService, private router: Router) {}

  ngOnInit(): void {
    this.indexService.getCharacters().subscribe((data: Character[]) => {
      this.characters = data;
      this.filteredCharacters = data;
      console.log(data);
    });
  }

  selectCharacter(character: any) {
    this.selectedCharacter = character;
  }

  closeCharacterDetails() {
    this.selectedCharacter = null;
  }

  searchCharacter() {
    if (this.searchTerm) {
      this.router.navigate(['/search'], { queryParams: { name: this.searchTerm } });
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchCharacter();
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
    doc.text(`URL: ${character.url}`, 10, 70);
    doc.text(`Created: ${new Date(character.created).toLocaleString()}`, 10, 80);

    doc.save(`${character.name}_details.pdf`);
  }
}
