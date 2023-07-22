import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelpTip } from 'src/app/shared/help-tip';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-add-helptips',
  templateUrl: './add-helptips.component.html',
  styleUrls: ['./add-helptips.component.scss']
})
export class AddHelptipsComponent {
  // public videoUrl: string = '';
  public file: any;
  public showVideo: boolean = false;

  videoUrl!: SafeResourceUrl;

  constructor(private dataService: DataService, private router: Router, private sanitizer: DomSanitizer) { }

  formAddHelpTip: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {}

  addNewHelpTip() {  
      let newHelpTip = new HelpTip();
      newHelpTip.name = this.formAddHelpTip.value.name;
      newHelpTip.description = this.formAddHelpTip.value.description;
      newHelpTip.date = this.formAddHelpTip.value.date;

      this.videoUrl = this.formAddHelpTip.value.video;
      newHelpTip.video = this.videoUrl.toString();
  
      this.dataService.AddNewHelpTip(newHelpTip).subscribe( (response: any) => {
        this.router.navigate(['/help-tips']);
      });
  }

  playVideo() {
    const videoId = this.getYouTubeVideoId(this.formAddHelpTip.value.video);
    if (videoId) {
      const url = `https://www.youtube.com/embed/${videoId}`;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      console.log(this.videoUrl);
      this.showVideo = true;
    } else {
      // Handle invalid video URL or error
      this.videoUrl = ''; // Or set a default video URL
    }
  }
  
  getYouTubeVideoId(url: string): string {
    const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|y2u\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || '' : '';
    }
  
}





