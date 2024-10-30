import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { FindCharacterComponent } from './find-character/find-character.component';
import { ErrorCharacterComponent } from './error-character/error-character.component';

const routes: Routes = [
  { path: '', component: CharacterComponent },
  { path: 'search', component: FindCharacterComponent },
  { path: 'error-404', component: ErrorCharacterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
