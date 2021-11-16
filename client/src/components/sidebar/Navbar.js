import React from "react";
import {Button, Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import Api from "../api/Api";
import update from 'react-addons-update';
import "./Navbar.css"
import {event} from "../routes/Routes";


class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            checked:[],
            places: [],
            show: props.state,
            selected: "Tutte le province"
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        Api.getTags(
            error => {
                console.log(error)
               //Error
            }, tags => {
                this.setState({tags:tags})
            }
        )

        Api.getPlaces(
            error => console.log(error),
            places => this.setState({places:places})
        )
    }

    handleInputChange = (event) => {
        if(event.target.checked){
            this.setState({checked:this.state.checked.concat(event.target.id)})
        } else {
            this.setState(prevState => ({
                checked: update(prevState.checked, {$splice: [[event.target.id, 1]]})
            }));
        }
    }

    handleSelect = (event) => {
       this.props.handler1(event)
       this.setState({selected:event})
    }

    render() {
        if(!this.state.tags){
            return <div> Loading ... </div>
        } else {
            return (
                <div className="side-bar nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button className="btn-md" variant="primary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>

                    {this.state.show ?
                        <div>
                            <div>
                                <InputGroup>
                                    <DropdownButton variant="primary"
                                                    title="Località"
                                                    id="input-group-dropdown"
                                                    onSelect={this.handleSelect}>
                                        <Dropdown.Item key = "Empty" value = "Empty" eventKey="Tutte le province">
                                            Tutte le province </Dropdown.Item>
                                        {this.state.places.map(place => {
                                                return <Dropdown.Item key={place._id} eventKey={place.name}>
                                                    {place.name}</Dropdown.Item>

                                            }
                                        )}
                                    </DropdownButton>
                                    <FormControl onChange= {this.handleSelect} value={this.state.selected}
                                                 readOnly={true}/>
                                </InputGroup>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Filtra per tipologia</label>
                                <div className="form-check">
                                    {this.state.tags.map(tag => {
                                        return <div key={tag._id}>
                                            <input className="form-check-input" type="checkbox" id={tag._id}
                                                   onChange={e => this.handleInputChange(e)}/>
                                            <label className="form-check-label"
                                                   htmlFor="inlineCheckbox1">{tag.name}</label>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="d-grid gap-2">
                                <Button className="btn btn-primary btn-block"
                                    onClick={() => this.props.handler(this.state.checked)}> Filter </Button>
                            </div>
                        </div>
                       :  null }
                </div>

            );
        }
    }

}

export default Navbar