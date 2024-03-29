import { Action } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 3),
      ]
}

export function shoppingListReducer(state = initialState, action: Action){
    switch(action.type){
        case 'CASE_INGREDIENT':
            return {
                ...state,
                ingredients: [...state.ingredients, action]
            }
    }
}