import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './main.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, { 
    path: 'home', 
    component: HomeComponent 
  }, {
    path: 'participant',
    component: ParticipantComponent
  }, {
    path: 'schedule',
    component: ScheduleComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
