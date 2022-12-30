import {createStore} from "redux";
import {applyMiddleware, compose, createSlice} from "@reduxjs/toolkit";
import {logger} from "./middleware/logger";
import {thunk} from "./middleware/thunk";

const middlewareEnhancer = applyMiddleware(logger, thunk)
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
export const actionCountIncrementedError = number => {
    increment(number)
    increment({}) // намеренно создаю ошибку
}
// dispatch и getState забираем из middleware thunk
export const actionCountIncrementedClosures = (number) => (dispatch, getState) => dispatch(increment(number))


const {actions, reducer} = calcSlice
const {increment, decrement} = actions
export default reducer

// Инициализируем store
// // если у нас один middleware:
// export const store = createStore(
//     reducer,
//     initialState,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
// если у нас два middleware
export const store = createStore(
    reducer,
    initialState,
    compose(
        middlewareEnhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

