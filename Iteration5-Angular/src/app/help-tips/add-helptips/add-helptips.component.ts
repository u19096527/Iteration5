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

  formAddHelpTip: FormGroup = new FormGroup
    ({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      video: new FormControl('', [Validators.required])
    })

    ngOnInit(): void {
    }
      
    convertedVideo: string = "";
    convertVideoToBase64(file: File): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64String = reader.result as string;
          this.convertedVideo = base64String;
          resolve();
        };
  
        reader.onerror = (error) => {
          reject(error);
        };
  
        reader.readAsDataURL(file);
      });
    }

    addNewHelpTip() {
      const fileInput: HTMLInputElement | null = document.querySelector('#videoInput') as HTMLInputElement;
      const file = fileInput.files?.[0];
  
      let newHelpTip = new HelpTip();
      newHelpTip.name = this.formAddHelpTip.value.name;
      newHelpTip.description = this.formAddHelpTip.value.description;
      newHelpTip.date = this.formAddHelpTip.value.date;
  
      if (file) {
        this.convertVideoToBase64(file)
          .then(() => {
            console.log(this.convertedVideo);
            newHelpTip.video = this.convertedVideo;
  
            this.dataService.AddNewHelpTip(newHelpTip).subscribe((result) => {
              console.log(newHelpTip);
              console.log(result);
              this.router.navigate(['/helptip']);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  

}

    
