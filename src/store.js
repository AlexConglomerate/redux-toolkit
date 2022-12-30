import {createStore} from "redux";
import {applyMiddleware, combineReducers, compose, configureStore, createSlice} from "@reduxjs/toolkit";
import {logger} from "./middleware/logger";
import {thunk} from "./middleware/thunk";
import todosService from "./services/todos.service";
import errorReducer, {setErrorsetError} from "./errorsReducer";


const initialState = {count: 0, isLoading: false} // задаём начальное состояние

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
        },
        taskRequested(state) {
            state.isLoading = true;
            console.log(`taskRequested`)
        },
        taskRequestedFinish(state) {
            state.isLoading = false;
            console.log(`taskRequested`)
        },
        taskRequestFailed(state, action) {
            console.log('action', action)
            setErrorsetError(action.payload)
            // state.error = action.payload
            state.isLoading = true;
            console.log(`taskRequestFailed`)
        },
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
// это чистая функция, а значит мы можем реализорвать её в каком угодно файле
// т.к. мы передаём функцию, то мы можем  реализовать этот функционал в другом файле
export const actionCountIncrementedClosures = number => dispatch => {
    dispatch(increment(number))
//     Можем добавить функционал
}

export const actionAsync = () => async dispatch => {
    try {
        dispatch(taskRequested())
        const data = await todosService.fetch()
        console.log(data)
        dispatch(taskRequestedFinish())
    } catch (error) {
        dispatch(setErrorsetError(error.message))
        dispatch(taskRequestFailed())
    }
}


const {actions, reducer} = calcSlice
const {increment, decrement, taskRequested, taskRequestFailed, taskRequestedFinish} = actions
export default reducer

// Инициализируем store

// // если у нас один middleware:
// export const store = createStore(
//     reducer,
//     initialState,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

// // если у нас два middleware
// const middlewareEnhancer = applyMiddleware(logger, thunk) // подключаем middleware
// export const store = createStore(
//     reducer,
//     initialState,
//     compose(
//         middlewareEnhancer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// )


const rootReducer = combineReducers({
    errors: errorReducer,
    calc: reducer,
})

// configureStore вместо createStore
export const store = configureStore({
        // reducer: reducer, // если редьюсер один, то можно сюда
        reducer: rootReducer,
        // thunk подключен по умлчанию. Добавляем ещё логгер
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production",
    }
)
