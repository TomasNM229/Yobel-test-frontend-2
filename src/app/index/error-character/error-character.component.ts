import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-character',
  templateUrl: './error-character.component.html',
  styleUrls: ['./error-character.component.css']
})
export class ErrorCharacterComponent {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']); // Redirige a la ruta principal
  }
}
