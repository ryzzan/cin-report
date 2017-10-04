import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/*Services*/
import { AuthenticationService } from './../../services/laravel/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  isLoading = true;
  msg;
  forgotPasswordForm: FormGroup;
  
  constructor(
    private authentication: AuthenticationService,
    public dialogRef: MdDialogRef<any>,
    private router: Router,
    public snackBar: MdSnackBar
  ) {
    this.forgotPasswordForm = new FormGroup({
      'field_0_email': new FormControl('', [Validators.email, Validators.required])
    });
  }

  ngOnInit() {

  }
  
  forgotPassword = () => {
    let email;
    
    email = this.forgotPasswordForm.controls['field_0_email'].value;
    
    /*this.authentication.recoverPasswordEmail(email)
    .then(res => {
      this.msg = res;

      this.snackBar.open(this.msg.message, '', {
        duration: 2000
      });
      
      if(this.msg.cod == "rpe-01") {
        this.router.navigate(['/login']);
      }

      this.dialogRef.close();
    });*/
  }
}
