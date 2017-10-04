import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Components
 */
import { HomeComponent } from './components/home/home.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { MainComponent } from './main.component';

 /**
  * Modules
  */
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TextMaskModule
  ],
  declarations: [
    HomeComponent,
    MainComponent,
    ParticipantComponent,
    ScheduleComponent
  ]
})
export class MainModule { }
