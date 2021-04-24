import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview/overview.component';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule
  ],
  exports: [
    OverviewComponent
  ]
})
export class DashboardModule { }
