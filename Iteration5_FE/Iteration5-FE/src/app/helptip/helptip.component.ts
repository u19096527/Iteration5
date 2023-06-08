import { Component } from '@angular/core';
import { HelpTip } from '../shared/help-tip';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-helptip',
  templateUrl: './helptip.component.html',
  styleUrls: ['./helptip.component.scss']
})

export class HelptipComponent {
  arrHelpTips: HelpTip[] = []
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getAllHelpTips()
    console.log(this.arrHelpTips)
  }

    //Get All Suppliers
    getAllHelpTips() {
      this.dataService.GetAllTheHelpTips().subscribe(result => {
        let listHelpTips: any[] = result
        listHelpTips.forEach((element) => {
          this.arrHelpTips.push(element)
        });
      })
    }
  
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

    goToEditHelpTip(Help_ID: Number) {
      this.router.navigate(['/edit-student', Help_ID]);
    }

    deleteHelpTip(Help_ID: number){
      this.dataService.DeleteHelpTip(Help_ID).subscribe( (response:any) => {
        window.location.reload();
      })
    }

}
