import React from "react";
import {Button, Form} from "react-bootstrap";
import Api from "../../api/Api";
import "./EventCreation.css"
import update from "react-addons-update";
import {BsXLg} from "react-icons/bs";
import moment from "moment";
import Util from "../../../common/Util";
import Choice from "../../../common/Choice";

let alertType = Choice.Alert

class EventCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            readOnly: false,
            tags: [],
            places: [],
            title: "",
            desc:"",
            date_start:"",
            date_finish:"",
            address:"",
            province:"",
            city:"",
            link:"",
            capacity:0,
            event_tags:[],
        }
    }


    componentDidMount() {
        Api.getTags(
            error => {
                console.log(error)
                this.props.handler2("Funzionalità non disponibile. Riprova più tardi", false, alertType.ERROR)
                this.props.handler1(false)
            }, tags => {
                this.setState({tags:tags})
            }
        )

        Api.getPlaces(
            error => {console.log(error)
                this.props.handler2("Funzionalità non disponibile. Riprova più tardi", false, alertType.ERROR)
                this.props.handler1(false)},
            places => this.setState({places:places})
        )
    }

    handleClose = () => {
        this.props.handler1(false)
    }

    handleSubmission = () => {
        const ds = moment(this.state.date_start, "DD/MM/YYYY", true).isValid();
        const df = moment(this.state.date_finish, "DD/MM/YYYY", true).isValid();
        if(this.state.title && this.state.desc && ds && df && this.state.province && this.state.city
            && this.state.address && this.state.capacity!==0 && this.state.event_tags.length!==0){
            if(Util.mapDateISO(this.state.date_start) >= Util.getCurrentDate() &&
                Util.mapDateISO(this.state.date_finish) >= Util.mapDateISO(this.state.date_start)) {
                Api.createEvent(this.state.title, this.state.desc, this.state.date_start, this.state.date_finish,
                    this.state.link, this.state.address, this.state.city, this.state.province,
                    this.state.event_tags, this.state.capacity, sessionStorage.getItem("token"),
                    error => {
                        this.props.handler2(error, false, alertType.ERROR, false)
                    }, success => {
                        console.log(success.id)
                        const ev = Util.mapEvent(this.state.title, this.state.date_start, this.state.date_finish,
                            this.state.address, this.state.city, this.state.province, success.id)
                        this.setState({
                            title: "", desc: "", date_start: "",
                            date_finish: "", link: "", address: "", city: "",
                            province: "", event_tags: [], capacity: 0
                        }, () =>
                            this.props.handler2(success.description, false, alertType.SUCCESS, false, ev))
                    })
            } else {
                this.props.handler2("Le date non risultano essere valide", false, alertType.ERROR, true)
            }
        } else {
            this.props.handler2("Alcuni campi risultano vuoti o non validi", false, alertType.ERROR, true)
        }
    }

    handleInputChange = e => {
        if(e.target.checked){
            this.setState({event_tags:this.state.event_tags.concat(e.target.id)})
        } else {
            this.setState(prevState => ({
                event_tags: update(prevState.event_tags, {$splice: [[e.target.id, 1]]})
            }));
        }
    }

    render() {
        return (
            <div className="card-body text-center col-md-6 offset-md-3">
                <div className="d-flex justify-content-between">
                    <h2>Creazione Evento</h2>
                    <BsXLg className=" me-1 text-primary" size={28}
                           onClick={this.handleClose}/>
                </div>
                <section>
                    <Form.Group className="text-start mb-5">
                        <Form.Label className="my-2">Titolo</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.title}
                                      name="title"
                                      onChange={e => this.setState({title: e.target.value})}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Descrizione</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.desc}
                                      as="textarea"
                                      name="description"
                                      onChange={e => this.setState({desc: e.target.value})}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Data inizio</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.date_start}
                                      placeholder="gg/mm/aaaa"
                                      name="date_start"
                                      onChange={e => this.setState({date_start: e.target.value})}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Data fine</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.date_finish}
                                      placeholder="gg/mm/aaaa"
                                      name="date_finish"
                                      onChange={e => this.setState({
                                          date_finish: e.target.value})}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Località</Form.Label>
                        <Form.Control className="selection"
                                      as="select"
                                      defaultValue={'DEFAULT'}
                                      onChange={e => this.setState({province: e.target.value})}>
                            <option disabled value ="DEFAULT"> -- Seleziona opzione -- </option>
                            {this.state.places.map(place => {
                                return <option key={place._id} value={place.name}>
                                    {place.name}</option>
                            })
                            }
                        </Form.Control>
                        <Form.Label className="my-2">Città</Form.Label>
                        <Form.Control type="text"
                                      defaultValue= {this.state.city}
                                      name="citta"
                                      onChange={e => this.setState({city: e.target.value})}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Indirizzo</Form.Label>
                        <Form.Control type="text"
                                      defaultValue= {this.state.address}
                                      name="indirizzo"
                                      onChange={e => this.setState({address: e.target.value})}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Capacità massima</Form.Label>
                        <Form.Control type="number"
                                      defaultValue={this.state.capacity}
                                      placeholde= "0"
                                      min="0"
                                      name="capacita"
                                      onChange={e => this.setState({capacity: e.target.value})}
                                      readOnly={this.state.readOnly}/>

                        <Form.Label className="my-2">Link immagine*</Form.Label>
                        <Form.Control type="text"
                                      defaultValue={this.state.link}
                                      name="link"
                                      onChange={e => this.setState({link: e.target.value})}
                                      readOnly={this.state.readOnly}/>

                        <div className="form-group">
                            <label className="f-title" htmlFor="formGroupExampleInput">
                                Tipologia</label>
                            <div className="form-check">
                                {this.state.tags.map(tag => {
                                    return <div key={tag._id}>
                                        <input className="form-check-input" type="checkbox"
                                               id={tag.name}
                                               onChange={e => this.handleInputChange(e)}/>
                                        <label className="form-check-label"
                                               htmlFor="inlineCheckbox1">{tag.name}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </Form.Group>
                </section>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <Button className="btn btn-primary align-self-center"
                            onClick={this.handleSubmission}
                            hidden={this.state.readOnly}> Crea </Button>
                </div>

            </div>
        );
    }

} export default EventCreation