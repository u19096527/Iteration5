import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserRole } from 'src/app/shared/user-role';

@Component({
  selector: 'app-edit-userrole',
  templateUrl: './edit-userrole.component.html',
  styleUrls: ['./edit-userrole.component.scss']
})
export class EditUserroleComponent {

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  //Creating the form 
  editedUserRole: UserRole = new UserRole();
  showVideo: boolean = false;


  formEditUserRole: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {

    //get id
    this.activatedRoute.params.subscribe(params => {


      //get data by query
      this.dataService.GetSelectedHelpTip(params['id']).subscribe(response => {

        //place response in page
        this.editedUserRole = response as UserRole;

        //place retrieved data in cells
        this.formEditUserRole.controls['name'].setValue(this.editedUserRole.name);
        this.formEditUserRole.controls['description'].setValue(this.editedUserRole.description);

      })

    })

  }

  editAUserRole()
  {
    let selectedUserRole = new UserRole();
    selectedUserRole.name = this.formEditUserRole.value.name;
    selectedUserRole.description = this.formEditUserRole.value.description

    this.dataService.UpdateAUserRole(this.editedUserRole.userrole_ID, selectedUserRole).subscribe((response:any) => {
      this.router.navigate(['/users'])
   });

  }

}
