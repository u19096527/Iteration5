import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelpTip } from 'src/app/shared/help-tip';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-add-helptips',
  templateUrl: './add-helptips.component.html',
  styleUrls: ['./add-helptips.component.scss']
})

export class AddHelptipsComponent {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;


  constructor(private dataService: DataService, private router: Router, private sanitizer: DomSanitizer) { 

  }

  formAddHelpTip: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required])
  });


showVideo: boolean = false;
videoUrl: string = ""; // Initialize the variable
isVideoUploaded: boolean = false;
fileUploadMessage: string = "";
showNoVideoMessage: boolean = false;
isTheRightVideoUploaded: boolean = false;
isWrongVideoUploaded: boolean = false;
verifyButtons: boolean = false;
selectedFile: any;

ngOnInit(): void {
  document.getElementById("videoInput")?.addEventListener("change", this.handleVideoUpload.bind(this));
}

handleVideoUpload(event: Event) {
  this.selectedFile = (event.target as HTMLInputElement).files?.[0];

  if (this.selectedFile) {
    this.isVideoUploaded = true;
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.videoUrl = event.target?.result as string; // Store the data URL
    };

    reader.readAsDataURL(this.selectedFile);
    console.log(this.videoUrl);

  }
  else {
    this.isVideoUploaded = false
  }
}

  VerifyVideo() {
    //if video is not uploaded when verify video is clicked then...
    if (this.isVideoUploaded == false) {
      this.showVideo = false;
      this.showNoVideoMessage = true;
      this.isWrongVideoUploaded = false;
      this.isTheRightVideoUploaded = false;
  
      this.fileUploadMessage = "It looks you haven't uploaded a video, please upload a video.";
    }
    else {
      this.showVideo = true;
      this.showNoVideoMessage = false;
      this.ConfirmButtonsHidden = false;

      this.isWrongVideoUploaded = false;
      this.isTheRightVideoUploaded = false;

    }
    

  }

  ConfirmButtonsHidden: boolean = false;

  YesVideo() {
    this.showVideo = false;
    this.isWrongVideoUploaded = false;
    this.showNoVideoMessage = false;

    this.isTheRightVideoUploaded = true;
    this.ConfirmButtonsHidden = true;
    this.verifyButtons = true;
  }
  
  NoVideo() {
    this.showVideo = false;
    this.isWrongVideoUploaded = true;
    this.isTheRightVideoUploaded = false;
    this.showNoVideoMessage = false;

    this.fileUploadMessage = "It seems you have uploaded the wrong video. If you intended to upload a different video, please use the correct video file and try again. If you need assistance, feel free to contact our support team for help.";

  }



  

  addNewHelpTip() {

    let newHelpTip = new HelpTip();
    newHelpTip.name = this.formAddHelpTip.value.name;
      newHelpTip.description = this.formAddHelpTip.value.description;
      newHelpTip.date = this.formAddHelpTip.value.date;
      // newHelpTip.VideoFile =  this.formAddHelpTip.value.video;
      newHelpTip.VideoFile =  this.selectedFile;


      console.log(newHelpTip)

      this.dataService.AddABlob(newHelpTip).subscribe(
        result => {
          this.router.navigate(['/help-tips'])
        }
      );
  }

}







