import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') submittedForm: NgForm; 
  defaultQuestion = 'teacher'
  answer = ''
  genders = ['male', 'female']
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  }
  submitted = false

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.submittedForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'female'
    // })
    this.submittedForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  // onSubmit(form: NgForm){
  //   console.log(form.value)
  // }

  // onSubmit(){
  //   console.log(this.submittedForm)
  // }

  onSubmit(){
    this.submitted = true
    this.user.username = this.submittedForm.value.userData.username;
    this.user.email = this.submittedForm.value.userData.email;
    this.user.secretQuestion = this.submittedForm.value.secret;
    this.user.answer = this.submittedForm.value.questionAnswer;
    this.user.gender = this.submittedForm.value.gender;

    this.submittedForm.reset()
  }
}
