import { Component, OnInit } from '@angular/core';
import { IGame } from '../../interfaces/IGame';
import { GamesService } from '../../services/games/games.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  displayedColumns: string[] = ['name', 'developer','year', 'type','console'];
  dataSource: IGame[] = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => this.dataSource = games);
  }
}
