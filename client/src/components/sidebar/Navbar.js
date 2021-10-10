import React from "react";
import {Button, Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import Api from "../api/Api";



class Navbar extends React.Component{

    constructor() {
        super();
        this.state = {
            tags: []
        }
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
                                    <input className="form-check-input" type="checkbox" id={tag._id}/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox1">{tag.name}</label>
                                </div>
                            })}
                        </div>
                    </div>
                    <Button variant="outline-secondary" id="button-addon2">
                        Filter
                    </Button>
                </div>

            );
        }
    }

}

export default Navbar