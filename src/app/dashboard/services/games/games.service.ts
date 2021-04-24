import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGame} from '../../interfaces/IGame';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>('http://localhost:8082/games');
  }
}
