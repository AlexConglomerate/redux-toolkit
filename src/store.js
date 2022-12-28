import {createStore} from "redux";
import {createSlice} from "@reduxjs/toolkit";

// начальное состояние
const initialState = {count: 0}

// прописываем алгоритм: при каком action как менять состояние
const calcSlice = createSlice({
    name: 'count', // первое слово в названии action + '/'
    initialState,
    reducers: {
        increment(state, action) { // increment - название action
            state.count += action.payload
            return state // без этого в некоторых случаях не сработает
        },
        decrement(state, action) {
            state.count -= action.payload
            return state // без этого в некоторых случаях не сработает
        }
    }
})

// Шаблоны всех actions
export const actionCountIncremented = number => increment(number)
export const actionCountDecremented = number => decrement(number)

const {actions, reducer} = calcSlice
const {increment, decrement} = actions
export default reducer

// Инициализируем store
export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

