import React, { Component } from 'react';
import {Button, Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Row} from "react-bootstrap";
import EventCard from "./events/EventCard";
class Home extends Component {
    render() {
        return(
            <div className= "home">
                <h1> Event Hub </h1>
                <Container>
                    <Row>
                        <Col  xs={6} md={4}>
                            <div className= "side-bar">
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
                                <InputGroup className="mb-5">
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title="Dropdown"
                                        id="input-group-dropdown-1">
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                    </DropdownButton>
                                    <FormControl aria-label="Text input with dropdown button" readOnly={true}/>
                                </InputGroup>
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">Example label</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col  xs={12} md={8}>
                            <div className="show-events" >
                                <EventCard />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Home;