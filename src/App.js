import {useDispatch, useSelector} from "react-redux";
import {actionCountDecremented, actionCountIncremented, countDecremented, countIncremented, store} from "./store";
import {useEffect, useState} from "react";

function App() {
    const [count, setCount] = useState(store.getState().count);
    useEffect(() => {
        // добавляем слушателя события
        store.subscribe(() => {
            setCount(store.getState().count)
        })
    }, [])

    // useSelector - альтернативный способ достать state (альтернатива строчкам выше)
    // const count = useSelector(state => state.count)
    const dispatch = useDispatch() // функция, которая изменяет state

    // В функциях ниже вызываем dispatch, и передаём в него action. Тогда измениться state
    const handleIncrement = (i) => dispatch(actionCountIncremented(i))
    const handleDecrement = (i) => dispatch(actionCountDecremented(i))

    const headerClass = 'text-3xl hover:font-bold text-red-800 m-1'
    const buttonClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 m-1'

    return (
        <div className="flex justify-center flex-col ">
            <h1 className={headerClass}> Count: {count} </h1>
            <button className={buttonClass} onClick={() => handleIncrement(1)}>increment</button>
            <button className={buttonClass} onClick={() => handleDecrement(1)}>decrement</button>
        </div>
    )
}

export default App;
