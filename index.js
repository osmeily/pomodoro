function App(){

    const [displayTime, setDisplayTime] = React.useState(25*60)
    const [breakTime, setBreakTime] = React.useState(5*60)
    const [sessionTime, setSessionTime] = React.useState(25*60)
    const [timerOn, setTimerOn] = React.useState(false)

    const formaTime = (time) => {
        let minutes = Math.floor(time/60)
        let seconds = time % 60 
        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        )
    }

    const changeTime = (amount, type) =>{
        if (type == "break") {
            if(breakTime <= 60 && amount < 0){
                return;
            }
            setBreakTime((prev) => prev + amount)
        }else{
            if(sessionTime <= 60 && amount < 0){
                return;
            }
            setSessionTime((prev) => prev + amount)
            if(!timerOn){
                setDisplayTime(sessionTime + amount)
            }
        }
    }

    return (
        <div className="center-align">
            <h1>25+5 Clock</h1>
            <div className="dual-container">
            <Length title={"break lenght"} changeTime={changeTime} type={"break"} time={breakTime} formaTime={formaTime}/>
            <Length title={"session lenght"} changeTime={changeTime} type={"session"} time={sessionTime} formaTime={formaTime}/>
            </div>
            <h1>{formaTime(displayTime)}</h1>
        </div>
    );
}

function Length({title, changeTime, type, time, formaTime}){
    return(
        <div>
            <h3>{title}</h3>
            <div className="time-sets">
                <button className="btn-small deep-purple accent-1" onClick={()=> changeTime(-60, type)}>
                    <i className="material-icons">arrow_downward</i>
                </button>
            <h3>{formaTime(time)}</h3>
            <button className="btn-small deep-purple accent-1" onClick={()=> changeTime(60, type)}>
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"))