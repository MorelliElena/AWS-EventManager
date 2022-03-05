import Axios from "axios";
const moment = require('moment');

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

let mapTag = (tag) =>{
    return{
        name: tag.name,
        desc: tag.desc,
        _id: tag._id,
    }
}

let mapPlaces = (place) =>{
    return{
        name: place.name,
        desc: place.desc,
        _id: place._id,
    }
}

let mapEvent = (event) => {
    let location = event.location ? {
        address: event.location.address,
        city: event.location.city,
        province: event.location.province
    } : {}

    return {
        date_start: moment(event.date_start).format("DD/MM/YYYY"),
        date_finish: moment(event.date_finish).format("DD/MM/YYYY"),
        description: event.desc ? event.desc : "",
        max_participants: event.max_participants,
        name: event.name,
        n_participants: event.n ? event.n_participants.length : 0,
        tags: event.tag || [],
        _id: event._id,
        location: location,
        img: event.img
    }
}

let mapProfile = (user) => {
    return {
        _id: user._id,
        username: user.username,
        password: user.password,
        name: user.name,
        surname: user.surname,
        birthday: moment(user.birthday).format("DD/MM/YYYY")
    }
}

let managePromise = (promise, httpSuccessfulCodes, onError, onSuccess) => {
    promise
        .then(response => {
            console.log("RESPONSE: ")
            console.log(response)
            if (!response || !httpSuccessfulCodes.includes(response.status))
                onError(response)
            else {
                onSuccess(response)
            }
        })
        .catch(error => {
            console.log("ERROR: ")
            console.log(error)
            console.log(error.response)
            onError(error)
        })
}

let getEventInformation = (eventId, onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/events/`+ eventId),
        [200],
        onError,
        response => onSuccess(mapEvent(response.data)))
}

let getEvents = (onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/events/`),
        [200],
        onError,
        response => onSuccess(response.data.map(mapEvent)))
}

let getTags = (onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/tags/`),
        [200],
        onError,
        response => onSuccess(response.data.map(mapTag)))
}

let getPlaces = (onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/places/`),
        [200],
        onError,
        response => onSuccess(response.data.map(mapPlaces)))
}

let checkAuthentication = (username, password, onError, onSuccess) => {
    managePromise(Axios.post(`http://localhost:5000/api/login/`, {username, password}),
        [200],
        error => onError(error.response.data.description),
        response => onSuccess(mapProfile(response.data)))

}

let getProfileData = (userId, onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/login/`+ userId),
        [200],
        onError,
        response => onSuccess(mapProfile(response.data)))

}

let updateProfileData = (userId, name, surname, birthdate, username, password, onError, onSuccess) => {
    const birthday = moment(birthdate, "DD/MM/YYYY").format('YYYY-MM-DD');
    managePromise(Axios.post(`http://localhost:5000/api/update/`,
        {userId, name, surname, birthday , username, password}),
        [200],
        error =>  onError(error.response.data.description),
        resp => {onSuccess(resp.data.description)})
}

export default {
    getEventInformation,
    getEvents,
    getTags,
    getPlaces,
    checkAuthentication,
    getProfileData,
    updateProfileData
}