import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({ // When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it.
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes'; // Define the heroesUrl of the form :base/:collectionName with the address of the heroes resource on the server.

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { } // Angular will inject the singleton MessageService into that property when it creates the HeroService.
  // This is a typical "service-in-service" scenario

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', [])) // The catchError() operator intercepts an Observable that failed. The operator then passes the error to the error handling function.
    ); // The following handleError() method reports the error and then returns an innocuous result so that the application keeps working.

  }

  getHero(id: number): Observable<Hero>{
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // * Handle Http operation that failed.
  // * Let the app continue.
  // *
  // * @param operation - name of the operation that failed
  // * @param result - optional value to return as the observable result

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
