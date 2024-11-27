function CounterButton ({by,incrementMethod,decrementMethod}) {

    return(
        <div className="CounterButton">
            <div>
                <button className="counterButton" 
                onClick={() =>incrementMethod(by)} 
                >+{by}</button>
                <button className="counterButton" 
                onClick={() =>decrementMethod(by)} 
                >-{by}</button>
            </div>
        </div>
    )
}
export default CounterButton;  