import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable,  } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a simply test', 'https://www.foodandwine.com/thmb/gE_M3yiTJCgZPKSOEVmjQowKv9E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/Tamarind-Chicken-FT-RECIPE0522-80072d93f7bc4bc7abf1dcf5b5317b0c.jpg', [new Ingredient('Potato', 5), new Ingredient('Chicken', 1)]),
    new Recipe('A test recipe - 2', 'This is a simply test - 2', 'https://www.foodandwine.com/thmb/gE_M3yiTJCgZPKSOEVmjQowKv9E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/Tamarind-Chicken-FT-RECIPE0522-80072d93f7bc4bc7abf1dcf5b5317b0c.jpg', [new Ingredient('Fish', 2), new Ingredient('Orange', 3)])
  ]

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipeslist(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    console.log(this.recipes)
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
