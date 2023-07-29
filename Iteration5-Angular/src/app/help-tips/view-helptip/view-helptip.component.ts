import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelpTip } from 'src/app/shared/help-tip';

@Component({
  selector: 'app-view-helptip',
  templateUrl: './view-helptip.component.html',
  styleUrls: ['./view-helptip.component.scss']
})
export class ViewHelptipComponent {
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  selectedHelpTip: HelpTip = new HelpTip();

  ngOnInit(): void {
    //get id
    this.activatedRoute.params.subscribe(params => {


      //get data by query
      this.dataService.GetSelectedHelpTip(params['id']).subscribe(response => {

        //place response in page
        this.selectedHelpTip = response as HelpTip;
      })
    })
  }

  videoUrl!: SafeResourceUrl;

  getYouTubeVideoId(url: string): string {
    const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|y2u\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || '' : '';
    }

  getVideoUrl(): SafeResourceUrl {
    const videoId = this.getYouTubeVideoId(this.selectedHelpTip.Video);
    if (videoId) {
      const url = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      // Handle invalid video URL or error
      return this.sanitizer.bypassSecurityTrustResourceUrl(''); // Or set a default video URL
    }
  }
  

}
