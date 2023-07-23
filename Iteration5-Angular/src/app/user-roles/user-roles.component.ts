import { Component } from '@angular/core';
import { UserRole } from '../shared/user-role';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent {
  constructor(private dataService: DataService, private router: Router) {}
  arrUserRoles: UserRole[] = [];

  ngOnInit(): void {
    this.getAllUserRoles()
  }

  //Get All the Help Tips
  getAllUserRoles(){
    this.arrUserRoles = [];
    this.dataService.GetAllTheUserRoles().subscribe( result => {
      let listUserRoles: any[] = result;
      listUserRoles.forEach( (element) => {
        this.arrUserRoles.push(element);
      });
    });
  }

  // Search Help Tips
  searchQuery: string ="";
    searchUserRole() {
      if (this.searchQuery == "") {
        this.getAllUserRoles();
      }
      else {
        this.dataService.SearchUserRoles(this.searchQuery).subscribe(
          result => {
            let listUserRoles: any[] = result;
            this.arrUserRoles = [];
            listUserRoles.forEach( (element) => {
              this.arrUserRoles.push(element);
            });
          }
        );
      }
    }


    goToEditUserRole(userrole_ID: number) {
      this.router.navigate(['/edit-userrole', userrole_ID]);
    }
    deleteUserRole(userrole_ID: number){
      this.dataService.DeleteHelpTip(userrole_ID).subscribe( (response:any) => {
        window.location.reload();
      })
      window.onload;
    }

}
