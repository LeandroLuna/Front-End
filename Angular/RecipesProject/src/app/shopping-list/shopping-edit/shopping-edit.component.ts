import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppinglistService: ShoppingListService){}
  
  ngOnInit(): void {
    this.subscription = this.shoppinglistService.startedEditing.subscribe((index: number) => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppinglistService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onSubmit(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppinglistService.updateIngredient(this.editItemIndex, newIngredient)
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
   this.shoppingListForm.reset() 
   this.editMode = false;
  }

  onDelete(){
    this.shoppinglistService.deleteIngredient(this.editItemIndex);
;    this.onClear()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
