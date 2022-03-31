import Axios from "axios";

const moment = require('moment');

let mapDate = (date) =>{
    return moment(date).format("DD/MM/YYYY")
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
        date_start: mapDate(event.date_start),
        date_finish: mapDate(event.date_finish),
        description: event.desc ? event.desc : "",
        name: event.name,
        tags: event.tag || [],
        _id: event._id,
        location: location,
        img: event.img,
        booking: event.booking || [],
        full: event.full
    }
}

let mapProfile = (user) => {
    return {
        _id: user._id,
        username: user.username,
        password: user.password,
        name: user.name,
        surname: user.surname,
        birthday: mapDate(user.birthday)
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

let getUserBookings = (userId, onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/login/`+ userId + `/bookings/` ),
        [200],
        onError,
        response => onSuccess(response.data.bookings))
}

let getUserLikes = (userId, onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/login/`+ userId + `/likes/` ),
        [200],
        onError,
        response => onSuccess(response.data.likes))
}

export default {
    getEventInformation,
    getEvents,
    getTags,
    getPlaces,
    checkAuthentication,
    getProfileData,
    updateProfileData,
    mapDate,
    getUserBookings,
    getUserLikes
}