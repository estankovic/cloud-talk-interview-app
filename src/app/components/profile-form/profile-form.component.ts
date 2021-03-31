import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppStateFacade} from "../../services/app-state.facade";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null),
  })

  constructor(
    private readonly stateFacade: AppStateFacade,
  ) { }

  ngOnInit() {
  }

  hasError(fieldName: string) {
    const field = this.form.get(fieldName);
    return field.touched && field.invalid;
  }

  onSubmit(){
    const data = this.form.getRawValue();
    this.stateFacade.sendProfileForm(
      data.name,
      data.email,
      data.phone_number
    );
  }

  onReset() {
    this.form.reset(); //todo: make this to react to the state ?
    this.stateFacade.resetProfileForm();
  }
}
