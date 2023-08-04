import { Component, OnInit } from '@angular/core';
import { HelpTip } from '../shared/help-tip';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

import { AzureBlobStorageService } from '../services/azure-blob-storage.service';


@Component({
  selector: 'app-help-tips',
  templateUrl: './help-tips.component.html',
  styleUrls: ['./help-tips.component.scss']
})
export class HelpTipsComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router, private azureBlobService: AzureBlobStorageService) {}
  arrHelpTips: HelpTip[] = [];
  videoList: string[] = [];

  ngOnInit(): void {
    this.getAllHelpTips()
    console.log(this.arrHelpTips)
    this.reloadVideosFromBlob();
  }

  private reloadVideosFromBlob() {
    this.azureBlobService.listVideos().then( list => {
      this.videoList = list
    })
  }

  //Get All the Help Tips
  getAllHelpTips(){
    this.arrHelpTips = [];
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
      if (this.searchQuery == "") {
        this.getAllHelpTips();
        console.log("searchbar empty");
      }
      else {
        this.dataService.SearchHelpTips(this.searchQuery).subscribe(
          result => {
            let listHelpTips: any[] = result;
            this.arrHelpTips = [];
            listHelpTips.forEach( (element) => {
              this.arrHelpTips.push(element);
            });
            console.log("retrieving search results");
          }
        );
      }
    }

    goToViewHelpTip(help_ID: number) {
      this.router.navigate(['/view-helptip', help_ID]);
    }

    goToEditHelpTip(help_ID: number) {
      this.router.navigate(['/edit-helptip', help_ID]);
    }
    deleteHelpTip(help_ID: number){
      this.dataService.DeleteHelpTip(help_ID).subscribe( (response:any) => {
        window.location.reload();
      })
      window.onload;
    }

}
