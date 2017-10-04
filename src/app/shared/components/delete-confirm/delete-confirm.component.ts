import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/*Services*/
import { CrudService } from './../../services/array/crud.service';

@Component({
  selector: 'ntm-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})

export class DeleteConfirmComponent implements OnInit {
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  dataToDelete: any;
  
  constructor(
    public dialogRef: MdDialogRef<DeleteConfirmComponent>,
    private crud: CrudService,
    private router: Router,
    private mdsnackbar: MdSnackBar,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }
   
  delete() {
    console.log(this.data.paramToDelete)
    this.crud
    .delete({
      route: this.data.route,
      paramToDelete: this.data.paramToDelete
    })
    .then(() => {
      let array: any;
      let string: string;

      this.router.navigate(this.data.route);

      if(this.data.paramToDelete.length < 2) { 
        array= [1, "item", "apagado"];
      } else {
        array= [this.data.paramToDelete.length, "itens", "apagados"];
      };

      string = array[0] + " " + array[1] + " " + array[2];

      this.mdsnackbar.open(string, '', {
        duration: 3000
      });
    });
    
    this.dialogRef.close();
  }
}
