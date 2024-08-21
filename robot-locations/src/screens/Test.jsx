import { useEffect, useState } from "react";


const Test = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {

    }, [])

    function Add(){
        setCount(count + 1)
        // count = count + 1;
    }

    function Desc(){
        setCount(count - 1)
        // count = count - 1;
    }

    return(
        <>
            <button onClick={Add}>
                +
            </button>
            <span>
                {count}
            </span>
            <button onClick={Desc}>
                -
            </button>
        </>
    )
}

export default Test;