import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  toActive = 0;
  toInactive = 0;

  constructor() { }

  toActiveAction(){
    this.toActive++;
    console.log('New Active User. Current status change count: ', this.toActive)
  }

  toInactiveAction(){
    this.toInactive++;
    console.log('New Inactive User. Current status change count: ', this.toInactive)
  }
}
