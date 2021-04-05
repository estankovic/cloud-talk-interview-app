import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {AppStateFacade} from "../../services/app-state.facade";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {

  @Input() customBgColor: string;

  profileFormData$ = this.appState.profileFormData$;
  profileFormSubmittedSuccessFully$ = this.appState.profileFormSubmittedSuccessfully$.pipe(
    tap(submitted => this.changeBgColor(submitted))
  );
  isLoading$ = this.appState.userDataLoading$;
  isLoaded$ = this.appState.userDataLoaded$;
  hasError$ = this.appState.userDataHasError$;

  constructor(
    private readonly appState: AppStateFacade,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef,
  ) { }

  ngOnInit() {
    this.appState.loadUserData();
  }

  changeBgColor(formStatus: boolean) {
    console.log(formStatus)
    if (formStatus && this.customBgColor) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.customBgColor)
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'white')
    }
  }
}
