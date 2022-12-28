import {createStore} from "redux";
import {createAction, createReducer} from "@reduxjs/toolkit";

// начальное состояние
const initialState = {count: 0}

// список всех actions
const increment = createAction("count/increment")
const decrement = createAction("count/decrement")
// export const countIncremented = "count/increment";
// export const countDecremented = "count/decrement";

// Шаблоны всех actions
export const actionCountIncremented = (number) => increment(number)
export const actionCountDecremented = (number) => decrement(number)
// export const actionCountIncremented = (number) => ({type: countIncremented, payload: number})
// export const actionCountDecremented = (number) => ({type: countDecremented, payload: number})

const reducer = createReducer(initialState, builder => {
    builder
        .addCase(increment, (state, action) => {
            state.count++
            return state // без этого в некоторых случаях не сработает
        })
        .addCase(decrement, (state, action) => {
            state.count--
            return state // без этого в некоторых случаях не сработает
        })
})

// Инициализируем store
export const store = createStore(reducer, initialState)

