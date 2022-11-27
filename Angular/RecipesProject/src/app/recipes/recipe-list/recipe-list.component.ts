import { Recipe } from './../recipe.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a simply test', 'https://www.foodandwine.com/thmb/gE_M3yiTJCgZPKSOEVmjQowKv9E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/Tamarind-Chicken-FT-RECIPE0522-80072d93f7bc4bc7abf1dcf5b5317b0c.jpg'),
    new Recipe('A test recipe', 'This is a simply test', 'https://www.foodandwine.com/thmb/gE_M3yiTJCgZPKSOEVmjQowKv9E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/Tamarind-Chicken-FT-RECIPE0522-80072d93f7bc4bc7abf1dcf5b5317b0c.jpg')
  ]

}
