import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { IGame } from '../../interfaces/IGame';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  isModalVisible = false;
  validateForm!: FormGroup;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: ReadonlyArray<IGame> = [];
  listOfCurrentPageData: ReadonlyArray<IGame> = [];
  setOfCheckedId = new Set<string>();

  constructor(private gamesService: GamesService, private fb: FormBuilder) { }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<IGame>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfSelectedData = this.listOfCurrentPageData.filter(({ isSelected }) => !isSelected);
    this.checked = listOfSelectedData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfSelectedData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ isSelected }) => !isSelected).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onDelete() {
    const listOfSelectedData = Array.from(this.setOfCheckedId.values());
    const requests = listOfSelectedData.map((id) => this.gamesService.deleteGame(id));
    forkJoin(requests).subscribe(() => this.loadGames());
  }

  onAdd() {
    this.isModalVisible = true;
  }

  onEditGame(game: IGame) {
    Object.keys(game).forEach(key => {
      if (this.validateForm.controls[key]) {
        this.validateForm.controls[key].setValue(game[key]);
      }
    });

    this.isModalVisible = true;
  }

  ngOnInit(): void {
    this.loadGames();

    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      developer: [null, [Validators.required]],
      year: [null, [Validators.required]],
      type: [null, [Validators.required]],
      console: [null, [Validators.required]]
    });
  }

  loadGames() {
    this.gamesService.getGames().subscribe(games => this.listOfData = games.map((item) => ({
      id: item.id,
      name: item.name,
      developer: item.developer,
      year: item.year,
      type: item.type,
      console: item.console,
      isSelected: false
    })));
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.validateForm.reset();
  }

  handleOk(): void {
    const { id, name, developer,year, type,console } = this.validateForm.value;

    const observable = id ? this.gamesService.updateGame({id, name, developer, year, type,console}) : this.gamesService.createGame({ name, developer,year, type,console });

    observable.subscribe(() => {
      this.isModalVisible = false;
      this.validateForm.reset();

      this.loadGames();
    });
  }
}
