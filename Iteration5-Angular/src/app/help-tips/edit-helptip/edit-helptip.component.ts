import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelpTip } from 'src/app/shared/help-tip';

@Component({
  selector: 'app-edit-helptip',
  templateUrl: './edit-helptip.component.html',
  styleUrls: ['./edit-helptip.component.scss']
})
export class EditHelptipComponent {
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  //Creating the form 
  editedHelpTip: HelpTip = new HelpTip();
  showVideo: boolean = false;
  videoUrl!: SafeResourceUrl;


  formEditHelpTip: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {

    //get id
    this.activatedRoute.params.subscribe(params => {


      //get data by query
      this.dataService.GetSelectedHelpTip(params['id']).subscribe(response => {

        //place response in page
        this.editedHelpTip = response as HelpTip;

        //place retrieved data in cells
        this.formEditHelpTip.controls['name'].setValue(this.editedHelpTip.Name);
        this.formEditHelpTip.controls['date'].setValue(this.editedHelpTip.Date);
        this.formEditHelpTip.controls['description'].setValue(this.editedHelpTip.Description);
        this.formEditHelpTip.controls['video'].setValue(this.editedHelpTip.Video);

      })

    })

  }

  editAHelpTip()
  {
    let selectedHelpTip = new HelpTip();
    selectedHelpTip.Name = this.formEditHelpTip.value.name;
    selectedHelpTip.Description = this.formEditHelpTip.value.description
    selectedHelpTip.Date = this.formEditHelpTip.value.date;
    selectedHelpTip.Video = this.formEditHelpTip.value.video;

   this.dataService.UpdateAHelpTip(this.editedHelpTip.help_ID, selectedHelpTip).subscribe((response:any) => {
      this.router.navigate(['/help-tips'])
   });

  }

  displayVideo() {
    const videoId = this.getYouTubeVideoId(this.formEditHelpTip.value.video);
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
