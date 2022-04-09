import Api from "../../api/Api";
import {Button, InputGroup} from "react-bootstrap";
import React, {useState} from "react";

function PeopleCounter(props) {

    const [counter, setCounter] = useState(props.booking.map(() => 0));

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
        console.log(participants)
        counter[i] = 0
        setCounter([...counter])
        props.handler(e, participants)
    }

    return(
        <div className="d-flex flex-column justify-content-center">
            <ul className="list-group text-start book">
                { props.booking.map((day, i) =>
                    <li className="list-group-item text-center"
                        key = {"booking"+ day.id}>
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
                                            <input type="number"
                                                   className="form text-center form-control"
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