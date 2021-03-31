import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from "rxjs";
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";

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

  readonly isLoggedIn$ = this.state$.pipe(map(v => v.isLoggedIn), distinctUntilChanged());


  private get stateSnapshot() {
    return this.stateSubject.getValue();
  }

  constructor() { }

  logUserIn() {
    const isLoggedIn = true;
    window.localStorage.setItem(LOGGED_IN_FLAG, JSON.stringify(isLoggedIn));
    this.setState({
      ...this.stateSnapshot,
      isLoggedIn,
    });
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
    of().subscribe(res => {
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
