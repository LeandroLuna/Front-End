import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

// @Component is a decorator function that specifies the Angular metadata for the component.
@Component({
  selector: 'app-heroes', // The component's CSS element selector.
  templateUrl: './heroes.component.html', // The location of the component's template file.
  styleUrls: ['./heroes.component.css'] // The location of the component's private CSS styles.
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{ // method to retrieve the heroes from the service.
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes); //  The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  }

  add(name: string): void{
    name = name.trim();
    if(!name) {return; }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
