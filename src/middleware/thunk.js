// Это middleware для обработки ошибок
export function thunk({getState, dispatch}) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            if (typeof action === "function") {
                // из-за этого мы можем запустить функцию actionCountIncrementedClosures
                action(dispatch, getState)
            }
            if (typeof action === "undefined") {
                alert(`Ошибочка: action === undefined`)
            }
            if (typeof action !== "undefined" && typeof action !== "function") {
                next(action)
            }
        };
    };
}