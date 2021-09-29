import React from 'react';
import Api from '../api/Api'

let routes = require("../routes/Routes")

class EventInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            idEvent: props.match.params.id,
            eventInfo: undefined,
            showDefaultMessage: false,
        }


    }
    componentDidMount() {

        Api.getEventInformation(
            this.state.idEvent,
            error => {
                console.log(error)
                this.setState({showDefaultMessage: true})
                this.onError("Errore nel caricare le informazioni dell'evento. Ricaricare la pagina.")
            },
            event => {
                this.setState({eventInfo:event})
            }
        )

    }

    render() {
        if (!this.state.showDefaultMessage && !this.state.eventInfo) {
            return <div> Loading ... </div>
        } else if(!this.state.showDefaultMessage && this.state.eventInfo) {
            return (
                <div>
                    {this.state.eventInfo.name}
                </div>
            );
        }
    }
}
export default EventInfo