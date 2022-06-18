import Api from "../api/Api";
import {Button, InputGroup} from "react-bootstrap";
import React, {useState} from "react";

function PeopleCounter(props) {

    const [counter, setCounter] = useState(props.booking.map(() => 0));
    let [alert, setAlert] = useState(false)

    function minus(i) {
        if(counter[i] > 0) {
            counter[i]--;
            setCounter([...counter])
        }
    }

    function plus(i) {
        if(counter[i] < 10) {
            counter[i]++;
            setCounter([...counter])
        }

    }



    function book(e, participants, i) {
        if(counter[i] > 0 && e.n_participants + counter[i]<= e.max_participants) {
            console.log(participants)
            counter[i] = 0
            setCounter([...counter])
            props.handler(e, participants)
        } else {
            setAlert(alert => !alert)
        }
    }

    function renderAlert (){
        return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <div className="ps-2 pe-1 text-start col-10">
                    Il valore scelto risulta non essere valido: modificalo per continuare
                </div>
                <button type="col-2 button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                        onClick={()=>setAlert(alert => !alert)}/>
            </div>
        )
    }

    return(
        <div className="d-flex flex-column justify-content-center">
            <ul className="list-group text-start book">
                <div>
                    {alert ? renderAlert(): null}
                </div>
                { props.booking.map((day, i) =>
                    <li className="list-group-item text-center"
                        key = {"booking"+ day._id}>
                        <div>
                            <div>
                                Data: {Api.mapDate(day.date)} <br/>
                                Posti Occupati: {day.n_participants}/
                                {day.max_participants}
                            </div>
                            <div>
                                <div className="d-flex justify-content-center">
                                    <div className="row col-md-4 pe-1 ps-1">
                                        <InputGroup className="mt-3">
                                            <button className="btn btn-danger"
                                                    type="submit"
                                                    onClick={() => minus(i)}>-
                                            </button>
                                            <input type="text"
                                                   className="form form-control m-0 text-center"
                                                   key={i}
                                                   value={counter[i]}
                                                   readOnly={true}/>
                                            <button className="btn btn-success"
                                                    type="submit"
                                                    onClick={() => plus(i)}>+
                                            </button>
                                        </InputGroup>
                                    </div>
                                </div>
                                <Button className="col-md-5 btn btn-primary mt-3"
                                        onClick={()=> book(day, counter[i], i)}>
                                    Prenota
                                </Button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>

    );
}

export default PeopleCounter