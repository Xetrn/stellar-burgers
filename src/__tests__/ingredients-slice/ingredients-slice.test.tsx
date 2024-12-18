import { TIngredient } from "@utils-types";
import { IngredientsData, ingredientsReducer } from "../../../src/services/slices/ingredientsSlice";
import { getIngredients } from "../../../src/services/thunks";
import { TIngredientsResponse } from "@api";
import { fulfilledDesc, pendingDesc, rejectedDesc } from "../../../src/utils/const";

const ingredientsData: TIngredient[] = [
    {
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    },
    {
        "_id": "643d69a5c3f7b9001cfa0941",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    },
    {
        "_id": "643d69a5c3f7b9001cfa093e",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    },
    {
        "_id": "643d69a5c3f7b9001cfa0942",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    },
    {
        "_id": "643d69a5c3f7b9001cfa0943",
        "name": "Соус фирменный Space Sauce",
        "type": "sauce",
        "proteins": 50,
        "fat": 22,
        "carbohydrates": 11,
        "calories": 14,
        "price": 80,
        "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    }
];

const buns = ingredientsData.filter(i => i.type === "bun");
const mains = ingredientsData.filter(i => i.type === "main");
const sauces = ingredientsData.filter(i => i.type === "sauce");

const ingredientsResponse: TIngredientsResponse = {
    data: ingredientsData,
    success: true
};


describe("Тесты редьюсера ингредиентов", () => {
    const initialState: IngredientsData = {
        isIngredientsLoading: false,
        isIngredientsError: false,
        ingredients: [],
        buns: [],
        mains: [],
        sauces: []
    };

    describe("Тесты на асинхронные запросы (получение ингредиентов)", () => {
        test(pendingDesc, () => {
            const newState = ingredientsReducer(initialState, {type: getIngredients.pending.type});
            expect(newState.isIngredientsLoading).toBe(true);
        });

        test(fulfilledDesc, () => {
            const newState = ingredientsReducer(initialState, {type: getIngredients.fulfilled.type, payload: ingredientsResponse.data});
            expect(newState.isIngredientsLoading).toBe(false);
            expect(newState.ingredients).toEqual(ingredientsData);
            expect(newState.buns).toEqual(buns);
            expect(newState.mains).toEqual(mains);
            expect(newState.sauces).toEqual(sauces);
        });

        test(rejectedDesc, () => {
            const newState = ingredientsReducer(initialState, {type: getIngredients.rejected.type});
            expect(newState.isIngredientsLoading).toBe(false);
            expect(newState.isIngredientsError).toBe(true);
        })
    })
})