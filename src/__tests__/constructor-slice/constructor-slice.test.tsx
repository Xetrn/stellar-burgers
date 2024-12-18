import { TConstructorIngredient, TIngredient } from "../../utils/types";
import { orderBurger } from "../../../src/services/thunks";
import { addIngredient, ConstructorItems, constructorReducer, removeIngredient, setBun, swapWithAbove, swapWithBelow } from "../../../src/services/slices/constructorSlice";
import { TNewOrderResponse } from "../../utils/burger-api";
import { fulfilledDesc, pendingDesc, rejectedDesc } from "../../../src/utils/const";


const bun: TIngredient = {
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
};

const someIngredients: TIngredient[] = [
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
    }
];

const orderCreatedResponse: TNewOrderResponse = {
    success: true,
    order: {
        "_id": "6761ad36750864001d3720e6",
        "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa0941"
        ],
        "status": "done",
        "name": "Краторный био-марсианский бургер",
        "createdAt": "2024-12-17T16:56:22.033Z",
        "updatedAt": "2024-12-17T16:56:22.925Z",
        "number": 63074
    },
    name: "Краторный био-марсианский бургер"
};

describe("Тесты для редьюсера конструктора бургера", () => {

    const constructorInitialState: ConstructorItems = {
        constructorItems: {
            bun: null,
            ingredients: [],
        },
        ingredientId: 0,
        isOrderRequest: false,
        isOrderRequestError: false,
        orderData: null
    }

    const constructorFilledState: ConstructorItems = {
        ...constructorInitialState,
        constructorItems: {
            bun: null,
            ingredients: [{...someIngredients[0], id: "0"}, {...someIngredients[1], id: "1"}]
        },
        ingredientId: 2,
    }



    describe("Тесты для самих редьюсеров конструктора", () => {
        test("Добавление ингредиента + проверка, что он не идет в поле булки", () => {
            const chosenIngredient = someIngredients[0];
            const constructorIngredient: TConstructorIngredient = {...chosenIngredient, id: "0"};
            const newState = constructorReducer(constructorInitialState, addIngredient(constructorIngredient));
            expect(newState.constructorItems.ingredients).toHaveLength(1);
            expect(newState.constructorItems.bun).toBe(null);
        });

        test("Удаление ингредиента", () => {
            const toRemove = constructorFilledState.constructorItems.ingredients[0];
            const newState = constructorReducer(constructorFilledState, removeIngredient(toRemove));
            expect(newState.constructorItems.ingredients).toHaveLength(1);
            expect(newState.constructorItems.ingredients).not.toContainEqual(toRemove);
        });

        test("Swap ингредиента с верхним", () => {
            const newState = constructorReducer(constructorFilledState, swapWithAbove(1));
            expect(newState.constructorItems.ingredients[0].id).toBe("1");
        });

        test("Swap ингредиента с нижним", () => {
            const newState = constructorReducer(constructorFilledState, swapWithBelow(0));
            expect(newState.constructorItems.ingredients[0].id).toBe("1");
        });

        test("Проверка, что булка добавляется в соответствующее поле, а не в ингредиенты", () => {
            const newState = constructorReducer(constructorInitialState, setBun(bun));
            expect(newState.constructorItems.bun).toEqual(bun);
            expect(newState.constructorItems.ingredients).toHaveLength(0);
        });
    });

    describe("Тесты для асинхронных запросов конструктора (оформление заказа)", () => {
        test(pendingDesc, () => {
            const newState = constructorReducer(constructorFilledState, {type: orderBurger.pending.type});
            expect(newState.isOrderRequest).toBe(true);
        });

        test(fulfilledDesc, () => {
            const newState = constructorReducer(constructorFilledState, {type: orderBurger.fulfilled.type, payload: orderCreatedResponse});
            expect(newState.isOrderRequest).toBe(false);
            expect(newState.orderData).toEqual(orderCreatedResponse.order);
            expect(newState.constructorItems.bun).toBe(null);
            expect(newState.constructorItems.ingredients).toHaveLength(0);
        });

        test(rejectedDesc, () => {
            const newState = constructorReducer(constructorInitialState, {type: orderBurger.rejected.type});
            expect(newState.isOrderRequest).toBe(false);
            expect(newState.isOrderRequestError).toBe(true);
        })
    });
})