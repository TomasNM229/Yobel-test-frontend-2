import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { CharacterComponent } from './character/character.component';
import { FindCharacterComponent } from './find-character/find-character.component';
import { ErrorCharacterComponent } from './error-character/error-character.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CharacterComponent,
    FindCharacterComponent,
    ErrorCharacterComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class IndexModule { }
