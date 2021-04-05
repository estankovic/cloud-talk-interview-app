import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from "rxjs";
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {RestApiService} from "./rest-api.service";

export interface AppState {
  isLoggedIn: boolean;
  submittedData: {
    name: string;
    email: string;
    phone_number: string;
    sentSuccessfully: boolean;
  };
  userData: {
    loading: boolean;
    loaded: boolean;
    hasError: boolean;
  };
}

const LOGGED_IN_FLAG = 'cloud-talk_is-logged-in';

const _state: AppState = {
  isLoggedIn: JSON.parse(window.localStorage.getItem(LOGGED_IN_FLAG)) || false, // this could be handled better
  submittedData: {
    email: null,
    name: null,
    phone_number: null,
    sentSuccessfully: false
  },
  userData: {
    loading: false,
    loaded: false,
    hasError: false,
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppStateFacade { // this service could be split to multiple based on domain, kept like this for simplicity

  private readonly stateSubject = new BehaviorSubject<AppState>(_state);

  readonly state$ = this.stateSubject.asObservable();

  readonly isLoggedIn$ = this.state$.pipe(map(s => s.isLoggedIn), distinctUntilChanged());

  readonly profileFormSubmittedSuccessfully$ = this.state$.pipe(
    map(s => s.submittedData.sentSuccessfully),
    distinctUntilChanged()
  );

  readonly profileFormData$ = this.state$.pipe(
    map(s => ({
      name: s.submittedData.name,
      email: s.submittedData.email,
      phone_number: s.submittedData.phone_number,
    })),
    distinctUntilChanged(),
  );

  private get stateSnapshot() {
    return this.stateSubject.getValue();
  }

  constructor(
    private readonly router: Router,
    private readonly api: RestApiService,
  ) { }

  logUserIn() {
    const isLoggedIn = true;
    window.localStorage.setItem(LOGGED_IN_FLAG, JSON.stringify(isLoggedIn));
    this.setState({
      ...this.stateSnapshot,
      isLoggedIn,
    });

    this.router.navigate(['']);
  }

  logUserOut() {
    const isLoggedIn = false;
    window.localStorage.setItem(LOGGED_IN_FLAG, JSON.stringify(isLoggedIn));
    this.setState({
      ...this.stateSnapshot,
      isLoggedIn,
    });
  }

  sendProfileForm(name: string, email: string, phone_number: string) {
    this.api.updateProfile(name, email, phone_number).subscribe(res => {
      this.setState({
        ...this.stateSnapshot,
        submittedData: {
          ...this.stateSnapshot.submittedData,
          name,
          email,
          phone_number,
          sentSuccessfully: true,
        }
      })
    });
  }

  resetProfileForm() {
    this.setState({
      ...this.stateSnapshot,
      submittedData: _state.submittedData
    })
  }

  loadUserData() {
    this.setState({
      ...this.stateSnapshot,
      userData: {
        ...this.stateSnapshot.userData,
        loading: true
      }
    })

    of().pipe(
      switchMap(v => of()),
      switchMap(v => of()),
    ).subscribe(res => {
      this.setState({
        ...this.stateSnapshot,
        userData: {
          loaded: true,
          loading: false,
          hasError: false
        }
      })
    }, err => {
      this.setState({
        ...this.stateSnapshot,
        userData: {
          ...this.stateSnapshot.userData,
          loading: false,
          hasError: true
        }
      })
    })
  }

  private setState(state: AppState) {
    this.stateSubject.next(state);
  }
}
