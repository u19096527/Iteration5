import { UserRole } from './../../shared/user-role';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-userrole',
  templateUrl: './add-userrole.component.html',
  styleUrls: ['./add-userrole.component.scss']
})
export class AddUserroleComponent {
  constructor(private dataService: DataService, private router: Router) { }

  formAddUserRole: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  addNewUserRole() {  
    let newUserRole = new UserRole();
    newUserRole.name = this.formAddUserRole.value.name;
    newUserRole.description = this.formAddUserRole.value.description;

    this.dataService.AddNewUserRole(newUserRole).subscribe( (response: any) => {
      console.log(newUserRole);
      this.router.navigate(['/user-roles']);
    });
}

}
