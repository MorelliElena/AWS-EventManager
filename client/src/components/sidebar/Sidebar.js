import React from "react";
import {Button, Dropdown, DropdownButton, FormControl} from "react-bootstrap";
import Api from "../api/Api";
import update from 'react-addons-update';
import "./Sidebar.css"
import {BsSearch} from "react-icons/bs";
import Choice from "../../common/Choice";
import {Link} from "react-router-dom";
import routes from "../routes/Routes"

class Sidebar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            checked:[],
            places: [],
            show: props.state,
            search: "",
            selected: "Tutte le province",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this)
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

    handleSearch = () => {
        this.props.handler2(this.state.search)
    }

    render() {
        if(!this.state.tags){
            return <div> Loading ... </div>
        } else {
            return (
                <div className="side-bar nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
                    <h1> Event Hub</h1>
                    <h4 className="desc">
                        Per rimanere sempre aggiornato su tutti gli eventi della regione Emilia-Romagna</h4>
                    {this.state.show === Choice.HOME ?
                        <div>
                            <div className="input-group input mb-3" >
                                <input type="text" className="form-control px-1"
                                    onChange= {e => this.setState({search: e.target.value})}
                                    aria-label="Recipient's username"
                                    aria-describedby="inputGroup-sizing-sm"
                                />
                                <button className={"btn btn-md btn-primary py-1 px-2"} onClick={this.handleSearch}>
                                    <BsSearch className="search text-white" size={20}/>
                                </button>
                            </div>
                            <div>
                                <div>
                                    <DropdownButton className="d-flex flex-column justify-content-end" variant="primary"
                                                    title="Province" id="input-group-dropdown" align="end"
                                                    onSelect={this.handleSelect}>
                                        <Dropdown.Item key = "Empty" value = "Empty" eventKey="Tutte le province">
                                            Tutte le province </Dropdown.Item>
                                        {this.state.places.map(place => {
                                                return <Dropdown.Item key={place._id} eventKey={place.name}>
                                                    {place.name}</Dropdown.Item>
                                                })
                                        }
                                    </DropdownButton>
                                </div>
                                <FormControl className="text-center px-0" style={{backgroundColor:"white"}}
                                             onChange= {this.handleSelect} value={this.state.selected} readOnly={true}/>
                            </div>
                            <div className="form-group">
                                <label className="f-title" htmlFor="formGroupExampleInput">Filtra per tipologia</label>
                                <div className="form-check">
                                    {this.state.tags.map(tag => {
                                        return <div key={tag._id}>
                                            <input className="form-check-input " type="checkbox" id={tag._id}
                                                   onChange={e => this.handleInputChange(e)}/>
                                            <label className="form-check-label"
                                                   htmlFor="inlineCheckbox1">{tag.name}</label>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="d-grid gap-2">
                                <Button className="btn btn-primary btn-block mt-2"
                                    onClick={() => this.props.handler(this.state.checked)}> Filtra </Button>
                            </div>
                        </div>
                        :  this.state.show === Choice.PROFILE ?
                            <div className="mb-3">
                                <div className="btn-group-vertical">
                                    <Link className="btn btn-light btn-outline-primary profile-menu"
                                          to={routes.bookingUserId(sessionStorage.getItem("token"))}> Prenotazioni
                                    </Link>
                                    <Link className="btn btn-light btn-outline-primary profile-menu"
                                          to={routes.likesUserId(sessionStorage.getItem("token"))}> Likes </Link>
                                    <Link className="btn btn-light btn-outline-primary profile-menu"
                                          to={routes.profile}> Profilo </Link>
                                    <Link className="btn btn-light btn-outline-primary profile-menu"> Log out </Link>
                                </div>

                            </div>
                        : null}

                </div>

            );
        }
    }

}

export default Sidebar