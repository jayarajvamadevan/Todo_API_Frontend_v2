import './Counter.css'
import CounterButton  from './CounterButton';
import {useState} from 'react';

function Counter()
{
    const [count,setCount] =useState(0);

    function incrementCounterparent(by){
        setCount(count + by)
    }
    function decrementCounterparent(by){
        setCount(count - by)
    }
    function resetCounter(){
        setCount(0)
    }
     
    return (
        <div >
                <div className='center'>
                    <CounterButton by ={1}
                    incrementMethod={incrementCounterparent}
                    decrementMethod={decrementCounterparent}/>
                </div>
                <div className='center'>    
                    <CounterButton by ={5}
                    incrementMethod={incrementCounterparent}
                    decrementMethod={decrementCounterparent}/>
                </div>
                <div className='center'>
                    <CounterButton by ={10}
                    incrementMethod={incrementCounterparent}
                    decrementMethod={decrementCounterparent}/>
                </div>
                <div className='center1'>
                    <span className="totalcount">{count}</span> 
                </div>    
                <div className='center'>
                    <button className="resetButton" onClick={resetCounter}>Reset</button>
                </div>
        </div>
    )
}  
export default Counter; 