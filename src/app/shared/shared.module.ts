import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdChipsModule, MdDatepickerModule, MdNativeDateModule, MdCardModule, MdDialogModule, MdSelectModule, MdCheckboxModule,
  MdInputModule,MatSnackBarModule, MdIconModule, MdButtonModule, MatSlideToggleModule,MdToolbarModule, MdProgressBarModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';
import { MultipleSelectComponent } from './components/multiple-select/multiple-select.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard';

/**
 * Modules
 */
import { TextMaskModule } from 'angular2-text-mask';
/**
 * Services
 */
import { AuthenticationService } from './services/laravel/authentication.service';
import { CrudService } from './services/array/crud.service';
import { LaravelCrudService } from './services/laravel/crud.service';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdSelectModule,
    MdCheckboxModule,
    MatSnackBarModule,
    MdIconModule,
    MdInputModule,
    MdProgressBarModule,
    MdButtonModule,
    MatSlideToggleModule,
    MdToolbarModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  exports:[
    DeleteConfirmComponent,
    LoginComponent,
    LogoutComponent,
    MdCardModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdSelectModule,
    MdCheckboxModule,
    MatSnackBarModule,
    MdNativeDateModule,
    MdIconModule,
    MdInputModule,
    MdProgressBarModule,
    MdButtonModule,
    MenuSidenavComponent,
    MatSlideToggleModule,
    MdToolbarModule,
    MultipleSelectComponent,
    ScheduleComponent,
    TableDataComponent
  ],
  declarations: [
    DeleteConfirmComponent,
    LoginComponent,
    LogoutComponent,
    MenuSidenavComponent,
    MultipleSelectComponent,
    ScheduleComponent,
    TableDataComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    CrudService,
    LaravelCrudService
  ],
  entryComponents: [
    DeleteConfirmComponent
  ]
})
export class SharedModule { }
