import {useDispatch, useSelector} from "react-redux";
import {
    actionCountDecremented,
    actionCountIncremented, actionCountIncrementedError,
    actionCountIncrementedClosures, store, actionAsync
} from "./store";
import {useEffect, useState} from "react";

function App() {
    // const [count, setCount] = useState(store.getState().count);
    // useEffect(() => {
    //     // добавляем слушателя события
    //     store.subscribe(() => {
    //         setCount(store.getState().count)
    //     })
    // }, [])

    // // useSelector - альтернативный способ достать state (альтернатива строчкам выше)
    const count = useSelector(state => state.calc.count)
    const isLoading = useSelector(state => state.calc.isLoading)
    const error = useSelector(state => state.errors.entities[0])

    const dispatch = useDispatch() // функция, которая изменяет state

    // В функциях ниже вызываем dispatch, и передаём в него action. Тогда измениться state
    const handleIncrement = (i) => dispatch(actionCountIncremented(i))
    const handleDecrement = (i) => dispatch(actionCountDecremented(i))
    const handleIncrementClosures = (i) => dispatch(actionCountIncrementedClosures(i))
    const handleIncrementedError = (i) => dispatch(actionCountIncrementedError(i))
    const handleActionAsync = () => dispatch(actionAsync())


    const headerClass = 'text-3xl hover:font-bold text-red-800 m-1'
    const buttonClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-60 m-1'

    if (error) {
        return <h1>{error}</h1>
    }
    if (isLoading) {
        return <h1> Loading ...</h1>
    }
    return (
        <div className="flex justify-center flex-col ">
            <h1 className={headerClass}> Count: {count} </h1>
            <button className={buttonClass} onClick={() => handleIncrement(1)}>increment</button>
            <button className={buttonClass} onClick={() => handleDecrement(1)}>decrement</button>
            <hr/>
            <button className={buttonClass} onClick={() => handleIncrementClosures(1)}>increment + closures</button>
            <button className={buttonClass} onClick={() => handleIncrementedError(1)}>incremented + error</button>
            <button className={buttonClass} onClick={handleActionAsync}>Action async</button>
        </div>
    )
}

export default App;