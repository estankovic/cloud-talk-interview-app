import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppStateFacade} from "../../services/app-state.facade";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {

  profileFormData$ = this.appState.profileFormData$;
  profileFormSubmittedSuccessFully$ = this.appState.profileFormSubmittedSuccessfully$;
  isLoading$ = this.appState.userDataLoading$;
  isLoaded$ = this.appState.userDataLoaded$;
  hasError$ = this.appState.userDataHasError$;

  constructor(
    private readonly appState: AppStateFacade,
  ) { }

  ngOnInit() {
    this.appState.loadUserData();
  }

}
