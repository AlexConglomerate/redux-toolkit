// // 1 вариант логгера
// Это логгер, который пропускает через себя данные, и ничего с ними не делает
export function logger(state) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // console.log(`store`, state)
            return next(action)
        }
    }
}

// // 2 вариант логгера
// // Этот логгер перехватывает событие 'count/decrement', и изменяет его на 'count/increment'
// export function logger({getState, dispatch}) {
//     return function wrapDispatch(next) {
//         return function handleAction(action) {
//             if (action.type === 'count/decrement') {
//                 return dispatch({
//                     type: 'count/increment',
//                     payload: action.payload,
//                 })
//             }
//             return next(action)
//         }
//     }
// }