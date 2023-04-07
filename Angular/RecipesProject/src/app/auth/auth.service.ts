import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_KEY = 'AIzaSyB-b-vEOvqpENkhBxEdbasCDtDgODzQBsY'
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`
    return this.http.post<AuthResponseData>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
  }

  login(email: string, password: string){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`
    return this.http.post<AuthResponseData>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthetication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
    }))
  }

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'))
    if(!userData) return;

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'An unknown error ocurred!';

    if(!errorResponse.error || !errorResponse.error.error){
     return throwError(errorMessage); 
    }
    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this e-mail.'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid.'
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthetication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDateInMs = new Date().getTime() + expiresIn * 1000;
    const expirationDate = new Date(expirationDateInMs);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }
}
