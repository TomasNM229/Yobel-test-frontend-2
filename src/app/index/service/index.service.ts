import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../interface/character';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${environment.URL_BACKEND}/characters`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.URL_BACKEND}/characters/${id}`);
  }


  searchCharacterByName(name: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${environment.URL_BACKEND}/characters/search?name=${name}`);
  }
}
