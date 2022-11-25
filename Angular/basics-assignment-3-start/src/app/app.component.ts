import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSecret = false;
  qtyButtonClicks: number[] = [];

  onToggleSecret(){
    this.showSecret = !this.showSecret;
    this.qtyButtonClicks.push(this.qtyButtonClicks.length + 1)
  }
}
