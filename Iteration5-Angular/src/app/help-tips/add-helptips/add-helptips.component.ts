import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelpTip } from 'src/app/shared/help-tip';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-add-helptips',
  templateUrl: './add-helptips.component.html',
  styleUrls: ['./add-helptips.component.scss']
})
export class AddHelptipsComponent {

  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  // public videoUrl: string = '';
  public file: any;
  public showVideo: boolean = false;
  public fileToUpload!: File;
  selectedFile!: File | null;

  videoUrl!: SafeResourceUrl;

  constructor(private dataService: DataService, private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) { }

  formAddHelpTip: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {}

  // addNewHelpTip() {  
  //     let newHelpTip = new HelpTip();
  //     newHelpTip.name = this.formAddHelpTip.value.name;
  //     newHelpTip.description = this.formAddHelpTip.value.description;
  //     newHelpTip.date = this.formAddHelpTip.value.date;

  //     newHelpTip.video = '';
  //     newHelpTip.fileName = this.fileName;

  //     this.filePath = this.filePath.substr("blob:".length);
  //     console.log(this.filePath);
  //     newHelpTip.filePath = this.filePath;

  
  //     this.dataService.AddNewHelpTip(newHelpTip).subscribe( (response: any) => {
  //       this.router.navigate(['/help-tips']);
  //       console.log(response);
  //     });
  // }

  playVideo( ) {
    this.showVideo = true;
  }

  addNewHelpTip() {
    const formData = new FormData();
    formData.append('Name', this.formAddHelpTip.value.name);
    formData.append('Description', this.formAddHelpTip.value.description);
    formData.append('Date', this.formAddHelpTip.value.date);
    formData.append('VideoFile', this.formAddHelpTip.value.video);

    this.http.post('https://localhost:7135/api/Help/upload', formData).subscribe(
      () => {
        console.log('File uploaded successfully.');
      },
      (error: any) => {
        console.error('Error uploading the file:', error);
      }
    );


  }

  uploadVideo(event: Event) {
    const fileInput = (event.target as HTMLInputElement);
    const file = fileInput?.files?.[0];
    this.selectedFile = fileInput?.files?.[0] || null;
  
    if (!file) {
      alert('Please select a video file.');
      return;
    }
  
    if (!file.type.startsWith('video/mp4')) {
      alert('Only video files are allowed.');
      return;
    }

    const model: HelpTip = {
      help_ID: 0,
      Name: this.formAddHelpTip.value.name, // Replace with the actual name input value
      Description: this.formAddHelpTip.value.description, // Replace with the actual description input value
      Date: this.formAddHelpTip.value.date,
      Video: '',
      FilePath: '',
      FileName: '',
      VideoFile: file,
    };

    console.log('model:', model)
    this.dataService.AddABlob(model).subscribe(
      () => {
        alert('Video uploaded successfully.');
      },
      (error) => {
        alert(`There is an error uploading video: ${error.message}`);
      }
    );



    
  
  }

  
}






