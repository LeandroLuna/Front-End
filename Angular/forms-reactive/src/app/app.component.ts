import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna']

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    })

    // this.signupForm.valueChanges.subscribe((data) => console.log(data))
    // this.signupForm.statusChanges.subscribe((data) => console.log(data))

    this.signupForm.setValue({
      'userData': {
        'username': 'test',
        'email': 'test@gmail.com'
      },
      'gender': 'male',
      'hobbies': []
    })

    this.signupForm.patchValue({
      'userData': {
        'username': 'hi'
      }
    })
  }

  onSubmit(){
    console.log(this.signupForm)
    this.signupForm.reset({
      'gender': 'female'
    })
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getHobbyControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls
  }

  forbiddenNames = (control: FormControl): {[s: string]: boolean} => {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true}
    } else {
      return null
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
        }
        else {
          resolve(null)
        }
      }, 1500)
    })
    return promise;
  }
}
