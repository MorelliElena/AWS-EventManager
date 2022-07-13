import React, {useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import Api from "../../api/Api";
import "./EventCreation.css"
import {BsXLg} from "react-icons/bs";
import update from "react-addons-update";
import Choice from "../../../common/Choice";

let checked;
let alertType = Choice.Alert

class EditEvent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            readOnly: false,
            event : props.edit,
            tags: [],
            places:[],
        }
    }


    componentDidMount() {
        Api.getTags(
            error => {
                console.log(error)
                //this.onError("Errore nel caricare la home. Ricaricare la pagina.")
            }, tags => {
                this.setState({tags:tags})
            }
        )

        Api.getPlaces(
            error => console.log(error),
            places => this.setState({places:places})
        )
    }

    handleClose = () => {
        this.props.handler1(false)
    }

    handleSubmission = () => {
        if(!this.state.event.name || !this.state.event.description || !this.state.event.daily_capacity ||
            Object.values(this.state.event.location).filter(e => e === "").length > 0 ||
            !this.state.event.tags.length > 0) {
            this.props.handler2("Uno o più campi risultano essere vuoti", false, alertType.ERROR)
        } else {
            Api.updateEvent(this.state.event._id, this.state.event.name, this.state.event.description,
                this.state.event.img, this.state.event.location.address, this.state.event.location.city,
                this.state.event.location.province, this.state.event.tags, this.state.event.daily_capacity,
                error => this.props.handler2(error, false, alertType.ERROR),
                success => this.props.handler2(success, false, alertType.SUCCESS, null, this.state.event, true))
        }
    }

    handleInputChange = e => {
        if(e.target.checked){
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    tags: prevState.event.tags.concat(e.target.id)
                }
            }))
        } else {
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    tags: update(prevState.event.tags, {$splice: [[e.target.id, 1]]})
                }
            }));
        }
    }

    handleChange = e => {
        this.setState(prevState =>({
            event: {
                ...prevState.event,
                [e.target.name]: e.target.value
            }
        }))
    }

    handleChangeLoc = e => {
        this.setState(prevState =>({
            event: {
                ...prevState.event,
                location: {
                    ...prevState.event.location,
                    [e.target.name]: e.target.value
                }
            }
        }))
    }

    render() {
        return (
            <div className="card-body text-center col-md-6 offset-md-3">
                <div className="d-flex justify-content-between">
                    <h2>Modifica Evento</h2>
                    <BsXLg className=" me-1 text-primary" size={28}
                           onClick={this.handleClose}/>
                </div>
                <section>
                    <Form.Group className="text-start mb-5">
                        <Form.Label className="my-2">Titolo</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.event.name}
                                      name="name"
                                      onChange={e => this.handleChange(e)}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Descrizione</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.event.description}
                                      as="textarea"
                                      name="description"
                                      onChange={e => this.handleChange(e)}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Data inizio</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.event.date_start}
                                      placeholder="gg/mm/aaaa"
                                      name="date_start"
                                      readOnly={!this.state.readOnly}/>

                        <Form.Label className="my-2">Data fine</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.event.date_finish}
                                      placeholder="gg/mm/aaaa"
                                      name="date_finish"
                                      readOnly={!this.state.readOnly}/>

                        <Form.Label className="my-2">Località</Form.Label>
                        <Form.Control className="selection"
                                      name="province"
                                      as="select"
                                      defaultValue={this.state.event.location.province}
                                      onChange={e => this.handleChangeLoc(e)}>

                            {this.state.places.map(place => {
                                return <option key={place._id} value={place.name}>
                                    {place.name}</option>
                            })
                            }
                        </Form.Control>
                        <Form.Label className="my-2">Città</Form.Label>
                        <Form.Control type="text"
                                      defaultValue= {this.state.event.location.city}
                                      name="city"
                                      onChange={e => this.handleChangeLoc(e)}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Indirizzo</Form.Label>
                        <Form.Control type="text"
                                      defaultValue= {this.state.event.location.address}
                                      name="address"
                                      onChange={e => this.handleChangeLoc(e)}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Capacità massima giornaliera</Form.Label>
                        <Form.Control type="number"
                                      defaultValue={this.state.event.daily_capacity}
                                      min={this.state.event.daily_capacity}
                                      name="daily_capacity"
                                      onChange={e => this.handleChange(e)}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Link immagine</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.event.img}
                                      name="img"
                                      onChange={e => this.handleChange(e)}
                                      readOnly={this.state.readOnly}/>

                        <div className="form-group">
                            <label className="f-title" htmlFor="formGroupExampleInput">
                                Tipologia</label>
                            <div className="form-check">
                                {this.state.tags.map(t => {
                                    this.state.event.tags.includes(t.name) ? checked=true:checked=false
                                    return <div key={t._id}>
                                        <input className="form-check-input" type="checkbox"
                                               defaultChecked={checked}
                                               id={t.name}
                                               onChange={e => this.handleInputChange(e)}/>
                                        <label className="form-check-label"
                                               htmlFor="inlineCheckbox1">{t.name}</label>
                                    </div>

                                })}
                            </div>
                        </div>
                    </Form.Group>
                </section>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <Button className="btn btn-primary align-self-center"
                            onClick={this.handleSubmission}
                            hidden={this.state.readOnly}> Aggiorna </Button>
                </div>

            </div>
        );
    }

} export default EditEvent
