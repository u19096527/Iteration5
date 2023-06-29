import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Helptip } from 'src/app/shared/helptip';


@Component({
  selector: 'app-add-helptip',
  templateUrl: './add-helptip.component.html',
  styleUrls: ['./add-helptip.component.scss']
})
export class AddHelptipComponent {

  constructor(private dataService: DataService, private router: Router) { }

  formAddHelpTip: FormGroup = new FormGroup
    ({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      video: new FormControl('', [Validators.required])
    })

    ngOnInit(): void {}
      
    addNewHelpTip() {
      let newHelpTip = new Helptip();
      newHelpTip.name = this.formAddHelpTip.value.name;
      newHelpTip.description = this.formAddHelpTip.value.description;
      newHelpTip.date = this.formAddHelpTip.value.date;
      newHelpTip.video = this.formAddHelpTip.value.video;

      this.dataService.AddNewHelpTip(newHelpTip).subscribe( result  => {
        console.log(newHelpTip);
        console.log(result);
        this.router.navigate(['/helptip'])
      });

    }
}

