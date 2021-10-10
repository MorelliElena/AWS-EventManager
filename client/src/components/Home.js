import React, { Component } from 'react';
import {Button, Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Row} from "react-bootstrap";
import EventCard from "./events/EventCard";
import Navbar from "./sidebar/Navbar";
class Home extends Component {
    render() {
        return(
            <div className= "home">
                <h1> Event Hub </h1>
                <Container>
                   <Row>
                        <Col  xs={6} md={4}>
                            <Navbar/>
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