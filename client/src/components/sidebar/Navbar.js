import React from "react";
import {Button, Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import Api from "../api/Api";
import update from 'react-addons-update';


class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            checked:[],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
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

    render() {
        if(!this.state.tags){
            return <div> Loading ... </div>
        } else {
            return (
                <div className="side-bar">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>
                    <InputGroup className="mb-4">
                        <DropdownButton
                            variant="outline-secondary"
                            title="Dropdown"
                            id="input-group-dropdown-2">
                            <Dropdown.Item href="#">Action</Dropdown.Item>
                        </DropdownButton>
                        <FormControl aria-label="Text input with dropdown button" readOnly={true}/>
                    </InputGroup>

                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Example label</label>
                        <div className="form-check">
                            { this.state.tags.map(tag => {
                                return <div key={tag._id}>
                                    <input className="form-check-input" type="checkbox" id={tag._id} onChange={ e => this.handleInputChange(e)}/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox1">{tag.name}</label>
                                </div>
                            })}
                        </div>
                    </div>
                    <Button className="btn btn-primary" onClick = {() =>  this.props.handler(this.state.checked)} > Filter </Button>
                </div>

            );
        }
    }

}

export default Navbar