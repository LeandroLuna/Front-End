import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  statusOptions: Array<string> = ['Stable', 'Critical', 'Finished']

  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.forbiddenNames], this.asyncForbiddenNames),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable'),
    })
  }

  onSubmit(){
    console.log(this.reactiveForm)
  }

  forbiddenNames = (control: FormControl): {[s: string]: boolean} => {
    if(control.value === 'Test') {
      return {'forbiddenNames': true}
    } 
  }

  asyncForbiddenNames(control: FormControl): Observable<any> | Promise<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'Testt'){
          resolve({'forbiddenNames': true})
        }
      }, 2000)
    })
    return promise;
  }
}
