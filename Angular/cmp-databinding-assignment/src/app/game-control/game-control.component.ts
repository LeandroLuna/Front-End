import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() fired = new EventEmitter<number>();
  incrementalNumber;
  isPlaying = false;
  lastNumber = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onGameState(){
    this.isPlaying = !this.isPlaying;

    if(this.isPlaying){
      this.incrementalNumber = setInterval(() => {
        this.fired.emit(this.lastNumber++);
      }, 1000)
    } else {
      clearInterval(this.incrementalNumber)
    }
  }
}
