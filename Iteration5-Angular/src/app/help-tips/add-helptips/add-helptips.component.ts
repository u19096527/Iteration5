import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelpTip } from 'src/app/shared/help-tip';

@Component({
  selector: 'app-add-helptips',
  templateUrl: './add-helptips.component.html',
  styleUrls: ['./add-helptips.component.scss']
})
export class AddHelptipsComponent {

  constructor(private dataService: DataService, private router: Router) { }

  formAddHelpTip: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required])
  });

  public videoUrl: string = '';
  public base64String: string = '';
  public file: any;

  ngOnInit(): void {}

  addNewHelpTip() {
    const fileInput = document.getElementById('videoInput') as HTMLInputElement;
    this.file = fileInput.files && fileInput.files[0];
  
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.base64String = event.target?.result as string;

      const prefixToRemove = "data:video/mp4;base64,";
      this.base64String = this.base64String.substring(prefixToRemove.length);

  
      let newHelpTip = new HelpTip();
      newHelpTip.name = this.formAddHelpTip.value.name;
      newHelpTip.description = this.formAddHelpTip.value.description;
      newHelpTip.date = this.formAddHelpTip.value.date;
      newHelpTip.video = this.base64String;
  
      console.log(newHelpTip);

      this.dataService.AddNewHelpTip(newHelpTip).subscribe( (response: any) => {
        console.log("You have successfully added a help tip");
        this.router.navigate(['/help-tips']);
      });
    };

  }

  convertBase64ToVideo(base64String: string) {
    // Convert the base64 string to a Blob
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'video/mp4' });

    // Create an object URL from the Blob
    this.videoUrl = URL.createObjectURL(blob);

    console.log("Video URL ", this.videoUrl);
  }
}



