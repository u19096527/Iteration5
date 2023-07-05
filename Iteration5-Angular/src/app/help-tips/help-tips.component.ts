import { Component, OnInit } from '@angular/core';
import { HelpTip } from '../shared/help-tip';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-help-tips',
  templateUrl: './help-tips.component.html',
  styleUrls: ['./help-tips.component.scss']
})
export class HelpTipsComponent implements OnInit {

  constructor(private dataService: DataService) {}
  arrHelpTips: HelpTip[] = [];

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
}
