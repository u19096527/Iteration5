import { Component, OnInit } from '@angular/core';
import { Helptip } from '../shared/helptip';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-helptip',
  templateUrl: './helptip.component.html',
  styleUrls: ['./helptip.component.scss']
})
export class HelptipComponent implements OnInit{
  arrHelpTips: Helptip[] = [];
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getAllHelpTips()
    console.log(this.arrHelpTips)
    
  }

  //Get All the Help Tips
  getAllHelpTips(){
    this.dataService.GetAllTheHelpTips().subscribe( result => {
      let listHelpTips: any[] = result;
      listHelpTips.forEach( (element) => {
        this.arrHelpTips.push(element);
      });
    });
  }

  // Search Help Tips
  searchQuery: string ="";
    searchHelpTip() {
      if (this.searchQuery.trim() === "") {
        window.location.reload();
        this.getAllHelpTips();
      }
      else {
        this.dataService.SearchHelpTips(this.searchQuery).subscribe(
          result => {
            let listHelpTips: any[] = result;
            this.arrHelpTips = [];
            listHelpTips.forEach( (element) => {
              this.arrHelpTips.push(element);
            });
          }
        );
      }
    }

    // goToEditHelpTip(student_ID: Number) {
    //   this.router.navigate(['/edit-student', student_ID]);
    // }

    // deleteHelpTip(student_ID: number){
    //   this.dataService.DeleteHelpTip(student_ID).subscribe( (response:any) => {
    //     window.location.reload();
    //   })
}
