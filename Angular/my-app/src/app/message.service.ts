import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[]  = []; // service exposes its cache

  constructor() { }

  add(message: string){
    this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }
}
