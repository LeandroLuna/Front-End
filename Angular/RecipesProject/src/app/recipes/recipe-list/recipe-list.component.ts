import { RecipeService } from './../recipe.service';
import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './../recipe.model';
import { Component, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService){}

  ngOnInit(){
    this.subscription =  this.recipeService.recipesChanged.subscribe((recipe: Recipe[]) => {
      this.recipes = recipe;
    })
    this.recipes = this.recipeService.getRecipesList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
