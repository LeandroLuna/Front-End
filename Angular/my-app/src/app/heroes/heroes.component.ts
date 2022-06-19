import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

// @Component is a decorator function that specifies the Angular metadata for the component.
@Component({
  selector: 'app-heroes', // The component's CSS element selector.
  templateUrl: './heroes.component.html', // The location of the component's template file.
  styleUrls: ['./heroes.component.css'] // The location of the component's private CSS styles.
})
export class HeroesComponent implements OnInit {
  selectedHero?: Hero;
  heroes: Hero[] = [];


  constructor(private heroService: HeroService, private messageService: MessageService) {

   }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void{ // method to retrieve the heroes from the service.
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes); //  The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  }
}
