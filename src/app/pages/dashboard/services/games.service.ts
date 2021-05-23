import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGame } from '../interfaces/IGame';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export default class GamesService {
  urlBase = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${this.urlBase}/games`);
  }

  deleteGame(id: string) {
    return this.http.delete(`${this.urlBase}/games/${id}`);
  }

  createGame({name, developer,year, type,console}: { name: string, developer: string, year: number, type: string, console: string}) {
    return this.http.post<IGame>(`${this.urlBase}/games`, { name, developer,year,type,console }, this.httpOptions);
  }

  updateGame({id, name, developer,year, type,console}: { id: string, name: string, developer: string,year: number, type: string, console: string}) {
    return this.http.put<IGame>(`${this.urlBase}/games/${id}`, { name, developer,year, type,console }, this.httpOptions);
  }
}
