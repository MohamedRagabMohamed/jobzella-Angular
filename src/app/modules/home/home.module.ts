import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [MainComponent, AddTaskComponent, AddGroupComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DragDropModule,
    NzButtonModule,
    NzIconModule,
    NzAvatarModule,
    NzProgressModule,
    NzListModule,
    NzSpinModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
  ],
  providers: [NzNotificationService],
})
export class HomeModule {}
