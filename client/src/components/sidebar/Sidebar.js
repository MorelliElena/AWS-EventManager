import React from "react";
import {Button, Dropdown, DropdownButton, FormControl} from "react-bootstrap";
import Api from "../api/Api";
import "./Sidebar.css"
import {BsSearch,BsXCircle} from "react-icons/bs";
import Choice from "../../common/Choice";

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
            logout: false,
            clear:false,
            cBClear: false,
            error: false
        }
        this._isMounted = true
    }

    componentDidMount() {
        Api.getTags(
            error => {
                console.log(error)
                this.setState({error:true})
            }, tags =>
               this._isMounted ? this.setState({tags:tags}): null

        )

        Api.getPlaces(
            error =>  {
                console.log(error)
                this.setState({error:true})
            },
            places => this._isMounted ? this.setState({places:places}):null
        )
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleInputChange = (event) => {
        if(event.target.checked){
            this.setState({checked:this.state.checked.concat(event.target.id)})
        } else {
            this.setState(prevState => ({
                checked:prevState.checked.filter(h => h !== event.target.id)
            }));
        }
    }

    handleUserChoice = (event) => {
        this.props.handler4(event.target.value)
    }

    handleSelect = (event) => {
       this.props.handler1(event)
       this.setState({selected:event})
    }

    handleSearch = (search) => {
        if (search && this.state.search !== "") {
            this.props.handler2(this.state.search)
            this.setState({clear:true})
        } else {
            this.props.handler2("")
            this.setState({search:"", clear: false})
        }
    }

    logout = () => {
        this.setState({logout: true})
    }

    handleCheckBoxFilter = (check) => {
        if(check) {
            this.props.handler(this.state.checked)
            this.setState({cBClear: true})
        } else {
            document.querySelectorAll('input[type=checkbox]')
                .forEach( el => el.checked = false )
            this.setState({cBClear: false, checked:[]})
            this.props.handler([])
        }
    }

    render() {
        if(!this.state.tags){
            return <div> Loading ... </div>
        } else {
            return (
                <div className="nav flex-column flex-nowrap text-white p-2">
                    <h1 className="text-center"> Event Hub</h1>
                    <h5 className="desc">
                        Per rimanere sempre aggiornato su tutti gli eventi della regione Emilia-Romagna</h5>
                        {!this.state.error ?
                            this.state.show === Choice.SidebarChoice.HOME ?
                            <div>
                                <div className="input-group input mb-3" >
                                    <input type="text" className="form-control px-1"
                                        value={this.state.search}
                                        onChange= {e => this.setState({search: e.target.value})}
                                        aria-label="search-bar"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                    {this.state.clear ?
                                    <Button className="btnClear btn btn-md btn-light py-1 px-2"
                                            onClick={() => this.handleSearch(false)}>
                                        <BsXCircle className="search text-secondary" size={20}/>
                                    </Button> : null}

                                    <Button className="border-light btn btn-md btn-primary py-1 px-2"
                                            onClick={() => this.handleSearch(true)}>
                                        <BsSearch className="search text-white" size={20}/>
                                    </Button>
                                </div>
                                <div>
                                    <div>
                                        <DropdownButton className="d-flex flex-column justify-content-end"
                                                        variant="primary"
                                                        title="Province" id="input-group-dropdown" align="end"
                                                        onSelect={this.handleSelect}>
                                            <Dropdown.Item key = "Empty" value = "Empty"
                                                           eventKey="Tutte le province">
                                                Tutte le province </Dropdown.Item>
                                            {this.state.places.map(place => {
                                                    return <Dropdown.Item key={place._id} eventKey={place.name}>
                                                        {place.name}</Dropdown.Item>
                                                    })
                                            }
                                        </DropdownButton>
                                    </div>
                                    <FormControl className="text-center px-0" style={{backgroundColor:"white"}}
                                                 onChange= {this.handleSelect} value={this.state.selected}
                                                 readOnly={true}/>
                                </div>
                                <div className="form-group">
                                    <label className="f-title" htmlFor="formGroupExampleInput">
                                        Filtra per tipologia</label>
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
                                    <Button className="border-light btn btn-primary btn-block mt-2"
                                        onClick={() => this.handleCheckBoxFilter(true) }> Filtra </Button>
                                    {this.state.cBClear ? <Button className="border-light btn btn-danger btn-block"
                                        onClick={() => this.handleCheckBoxFilter(false)}
                                        hidden={this.state.readOnly}> Rimuovi filtri</Button> : null}
                                </div>
                            </div>
                            :  this.state.show === Choice.SidebarChoice.PROFILE ?
                                <div className="mb-3">
                                    <div className="btn-group-vertical">
                                        <Button className="btn btn-light btn-outline-primary profile-menu"
                                                value={Choice.UserComponents.BOOKING}
                                                onClick={e => this.handleUserChoice(e)}> Prenotazioni </Button>
                                        <Button className="btn btn-light btn-outline-primary profile-menu"
                                                value={Choice.UserComponents.LIKES}
                                                onClick={e => this.handleUserChoice(e)}> Interessi </Button>
                                        <Button className="btn btn-light btn-outline-primary profile-menu"
                                                value={Choice.UserComponents.PROFILE}
                                                onClick={e => this.handleUserChoice(e)}> Profilo </Button>
                                        <Button className="btn btn-light btn-outline-primary profile-menu"
                                                value={Choice.UserComponents.LOGOUT}
                                                onClick={e => this.handleUserChoice(e)}> Logout </Button>
                                    </div>
                                </div>
                            :  this.state.show === Choice.SidebarChoice.ADMIN ?
                                <div className="mb-3">
                                    <div className="btn-group-vertical">
                                        <Button className="btn btn-light btn-outline-primary profile-menu"
                                                value={Choice.UserComponents.EVENTS}
                                                onClick={e => this.handleUserChoice(e)}> Gestione Eventi </Button>
                                        <Button className="btn btn-light btn-outline-primary profile-menu"
                                                value={Choice.UserComponents.PROFILE}
                                                onClick={e => this.handleUserChoice(e)}> Profilo </Button>
                                        <Button className="btn btn-light btn-outline-primary profile-menu"
                                                value={Choice.UserComponents.LOGOUT}
                                                onClick={e => this.handleUserChoice(e)}> Logout </Button>
                                    </div>
                                </div>
                          :null
                        :null
                        }
                </div>

            );
        }
    }

}

export default Sidebar