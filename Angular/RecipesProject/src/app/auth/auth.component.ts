import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

  ngOnDestroy(): void {
    if(this.closeSub) this.closeSub.unsubscribe();
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;

    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(responseData => {
      this.isLoading = false;
      console.log(responseData)
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      console.log(errorMessage)
    })

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    // hostViewContainerRef.createComponent<AlertComponent>(AlertComponent); // New NG versions don't need ComponentFactoryResolver, neither EntryComponents in NG Module.
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}


