import { NgModule } from '@angular/core';
import { OverviewComponent } from './components/overview/overview.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    NzTableModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    CommonModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzIconModule
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class DashboardModule { }
