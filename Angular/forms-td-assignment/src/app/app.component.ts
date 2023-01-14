import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') submittedForm: NgForm;
  data = {
    email: '',
    subscription: "advanced",
    password: ''
  }
  isSubmitted = false;

  onSubmit(){
    this.isSubmitted = true;
    console.log(this.submittedForm.value);

    this.data.email = this.submittedForm.value.email;
    this.data.subscription = this.submittedForm.value.subscription;
    this.data.password = this.submittedForm.value.password;

    this.submittedForm.reset();
  }
}
