import { TOrder } from "@utils-types";
import { clearOrders, OrdersData, ordersReducer } from "../../../src/services/slices/ordersSlice";
import { getOrders } from "../../../src/services/thunks";
import { SerializedError } from "@reduxjs/toolkit";


const ordersData: TOrder[] = [
    {
        "_id": "674f6232e367de001daf68e5",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa093f"
        ],
        "status": "done",
        "name": "Био-марсианский флюоресцентный люминесцентный бессмертный бургер",
        "createdAt": "2024-12-03T19:55:30.388Z",
        "updatedAt": "2024-12-03T19:55:31.684Z",
        "number": 61482
    },
    {
        "_id": "674f6264e367de001daf68e7",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa0940"
        ],
        "status": "done",
        "name": "Флюоресцентный люминесцентный метеоритный бургер",
        "createdAt": "2024-12-03T19:56:20.648Z",
        "updatedAt": "2024-12-03T19:56:21.557Z",
        "number": 61483
    },
    {
        "_id": "674f63c3e367de001daf68f3",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0941"
        ],
        "status": "done",
        "name": "Флюоресцентный био-марсианский бургер",
        "createdAt": "2024-12-03T20:02:11.763Z",
        "updatedAt": "2024-12-03T20:02:12.713Z",
        "number": 61484
    },
    {
        "_id": "674f63dae367de001daf68f4",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0940"
        ],
        "status": "done",
        "name": "Флюоресцентный метеоритный бургер",
        "createdAt": "2024-12-03T20:02:34.924Z",
        "updatedAt": "2024-12-03T20:02:35.895Z",
        "number": 61485
    },
    {
        "_id": "674f7292e367de001daf6955",
        "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0943",
            "643d69a5c3f7b9001cfa0944",
            "643d69a5c3f7b9001cfa0945",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093f",
            "643d69a5c3f7b9001cfa0940",
            "643d69a5c3f7b9001cfa0946",
            "643d69a5c3f7b9001cfa0947",
            "643d69a5c3f7b9001cfa0948",
            "643d69a5c3f7b9001cfa0949",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa093c"
        ],
        "status": "done",
        "name": "Антарианский space астероидный фалленианский краторный люминесцентный бессмертный минеральный альфа-сахаридный экзо-плантаго традиционный-галактический spicy био-марсианский метеоритный бургер",
        "createdAt": "2024-12-03T21:05:22.696Z",
        "updatedAt": "2024-12-03T21:05:23.482Z",
        "number": 61494
    },
    {
        "_id": "674f7307e367de001daf6958",
        "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa093c"
        ],
        "status": "done",
        "name": "Краторный астероидный spicy бургер",
        "createdAt": "2024-12-03T21:07:19.749Z",
        "updatedAt": "2024-12-03T21:07:20.651Z",
        "number": 61495
    },
];

const ordersResponse: TOrder[] = ordersData;

const error: SerializedError = {
    message: "Не удалось получить заказы! Попробуйте позже..."
};

describe("Тесты для редьюсера заказов пользователя", () => {
    const initialState: OrdersData = {
        orders: [],
        isOrdersError: false,
        isOrdersRequest: false,
        ordersError: ""
    };

    const filledState: OrdersData = {
        ...initialState,
        orders: ordersData
    };

    describe("Тесты для самих редьюсеров", () => {
        test("Очистка списка заказов", () => {
            const newState = ordersReducer(filledState, clearOrders());
            expect(newState.orders).toHaveLength(0);
        })
    });

    describe("Тесты на асинхронные запросы (получение заказов пользователя)", () => {
        test("Проверка ожидания запроса", () => {
            const newState = ordersReducer(initialState, {type: getOrders.pending.type});
            expect(newState.isOrdersRequest).toBe(true);
        });

        test("Проверка успешного выполнения запроса", () => {
            const newState = ordersReducer(initialState, {type: getOrders.fulfilled.type, payload: ordersResponse});
            expect(newState.isOrdersRequest).toBe(false);
            expect(newState.orders).toEqual(ordersData);
        });

        test("Проверка завершения запроса с ошибкой", () => {
            const newState = ordersReducer(initialState, {type: getOrders.rejected.type, error});
            expect(newState.isOrdersRequest).toBe(false);
            expect(newState.isOrdersError).toBe(true);
            expect(newState.ordersError).not.toHaveLength(0);
        })
    })
})