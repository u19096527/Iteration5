import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelpTip } from 'src/app/shared/help-tip';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer


@Component({
  selector: 'app-add-helptips',
  templateUrl: './add-helptips.component.html',
  styleUrls: ['./add-helptips.component.scss']
})

export class AddHelptipsComponent {

  constructor(private dataService: DataService, private router: Router, private sanitizer: DomSanitizer) { 

  }
  videoUrl: SafeResourceUrl | undefined;


  formAddHelpTip: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required])
  });


  // public videoUrl: string = '';
  public showVideo: boolean = false;

  ngOnInit(): void {
    this.setCookie('my_cookie', 'my_value', { sameSite: 'none', secure: true });
  }

  setCookie(name: string, value: string, options: { [key: string]: any } = {}): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    for (const optionKey in options) {
      if (options.hasOwnProperty(optionKey)) {
        cookieString += `; ${optionKey}`;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
          cookieString += `=${optionValue}`;
        }
      }
    }
    document.cookie = cookieString;
  }

  VerifyVideo() {
    this.showVideo = true;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.formAddHelpTip.value.video);
  }
  
  getEmbeddedVideoUrl(): SafeResourceUrl {
    if (this.videoUrl) {
      const videoId = this.getVideoIdFromUrl(this.videoUrl.toString());
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      }
    }
    // Return an empty SafeResourceUrl if videoUrl is not available or invalid
    return this.sanitizer.bypassSecurityTrustResourceUrl('');
  }
  getVideoIdFromUrl(url: string): string | null {
    const pattern1 = /(?:\?v=|&v=|youtu\.be\/)([^&\n?#]+)/;
    const pattern2 = /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([^\/]+)/;
    
    // Check for the first pattern: https://www.youtube.com/watch?v=4nIFJFgH99w
    let match = url.match(pattern1);
    if (match && match[1]) {
      return match[1];
    }
  
    // Check for the second pattern: https://youtu.be/4nIFJFgH99w
    match = url.match(pattern2);
    if (match && match[1]) {
      return match[1];
    }
  
    // Return null if no match is found
    return null;
  }
  

  addNewHelpTip() {
    let newHelpTip = new HelpTip();
    newHelpTip.Name = this.formAddHelpTip.value.name;
      newHelpTip.Description = this.formAddHelpTip.value.description;
      newHelpTip.Date = this.formAddHelpTip.value.date;
      newHelpTip.Video = this.formAddHelpTip.value.video;

      this.dataService.AddNewHelpTip(newHelpTip).subscribe(
        result => {
          this.router.navigate(['/helptips'])
        }
      );
  }

}







