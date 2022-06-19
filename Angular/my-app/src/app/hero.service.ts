import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({ // When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it.
  providedIn: 'root'
})

export class HeroService {

  constructor(private messageService: MessageService) { } // Angular will inject the singleton MessageService into that property when it creates the HeroService.
  // This is a typical "service-in-service" scenario

  getHeroes(): Observable<Hero[]>{
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
