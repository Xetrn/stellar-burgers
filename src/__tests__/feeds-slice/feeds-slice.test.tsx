import { FeedsData, feedsReducer } from "../../../src/services/slices/feedsSlice";
import { TOrder } from "@utils-types";
import { getFeeds } from "../../../src/services/thunks";
import { TFeedsResponse } from "@api";
import { fulfilledDesc, pendingDesc, rejectedDesc } from "../../../src/utils/const";

const feedsData: TOrder[] = [
    {
        "_id": "6761d893750864001d372154",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093d"
        ],
        "status": "done",
        "name": "Флюоресцентный бургер",
        "createdAt": "2024-12-17T20:01:23.267Z",
        "updatedAt": "2024-12-17T20:01:24.258Z",
        "number": 63085
    },
    {
        "_id": "6761d854750864001d372151",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e"
        ],
        "status": "done",
        "name": "Флюоресцентный люминесцентный бургер",
        "createdAt": "2024-12-17T20:00:20.525Z",
        "updatedAt": "2024-12-17T20:00:21.590Z",
        "number": 63084
    },
    {
        "_id": "6761d5a3750864001d372148",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e"
        ],
        "status": "done",
        "name": "Флюоресцентный люминесцентный бургер",
        "createdAt": "2024-12-17T19:48:51.401Z",
        "updatedAt": "2024-12-17T19:48:52.317Z",
        "number": 63083
    },
    {
        "_id": "6761d575750864001d372146",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa0947"
        ],
        "status": "done",
        "name": "Флюоресцентный фалленианский люминесцентный бургер",
        "createdAt": "2024-12-17T19:48:05.754Z",
        "updatedAt": "2024-12-17T19:48:06.628Z",
        "number": 63082
    },
    {
        "_id": "6761c77a750864001d372131",
        "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa093c"
        ],
        "status": "done",
        "name": "Краторный бургер",
        "createdAt": "2024-12-17T18:48:26.420Z",
        "updatedAt": "2024-12-17T18:48:27.583Z",
        "number": 63081
    }
];

const feedsResponse: TFeedsResponse = {
    success: true,
    orders: feedsData,
    total: feedsData.length,
    totalToday: feedsData.length
};

describe("Тесты для редьюсера ленты заказов", () => {

    const initialState: FeedsData = {
        orders: [],
        isFeedsError: false,
        isFeedsLoading: false,
        total: 0,
        totalToday: 0
    }

    describe("Тесты на асинхронные запросы (получение ленты)", () => {
        test(pendingDesc, () => {
            const newState = feedsReducer(initialState, {type: getFeeds.pending.type});
            expect(newState.isFeedsLoading).toBe(true);
        });

        test(fulfilledDesc, () => {
            const newState = feedsReducer(initialState, {type: getFeeds.fulfilled.type, payload: feedsResponse});
            expect(newState.isFeedsLoading).toBe(false);
            expect(newState.orders).toEqual(feedsData);
            expect(newState.total).toBe(feedsResponse.total);
            expect(newState.totalToday).toBe(feedsResponse.totalToday);
        });

        test(rejectedDesc, () => {
            const newState = feedsReducer(initialState, {type: getFeeds.rejected.type});
            expect(newState.isFeedsLoading).toBe(false);
            expect(newState.isFeedsError).toBe(true);
        })
    })
})