import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppStateFacade} from "../../services/app-state.facade";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  profileFormData$ = this.appState.profileFormData$;
  profileFormSubmittedSuccessFully$ = this.appState.profileFormSubmittedSuccessfully$;

  constructor(
    private readonly appState: AppStateFacade,
  ) { }

  ngOnInit() {
  }

}
