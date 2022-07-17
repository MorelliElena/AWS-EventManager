import Axios from "axios";

const moment = require('moment');
const momentTZ = require('moment-timezone');

let mapDate = (date) =>{
    return moment(date).format("DD/MM/YYYY")
}

let mapTimeZone = (date) =>{
    return momentTZ.tz(date, "Europe/Rome").format('DD/MM/YYYY, kk:mm:ss');
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
        tot_participants: event.tot_participants,
        owner: event.owner,
        status: event.status,
        followers: event.followers || [],
        daily_capacity: event.max_capacity_daily
    }
}

let mapProfile = (user) => {
    return {
        _id: user._id,
        username: user.username,
        password: user.password,
        name: user.name,
        surname: user.surname,
        birthday: mapDate(user.birthday),
        isAdmin: user.isAdmin,
        bookings: user.bookings || [],
        likes: user.likes || []
    }
}

let mapNotification = (notification) => {
    return {
        _id: notification._id,
       date: notification.date,
       eventId: notification.event.eventId,
       read: notification.read,
       name: notification.event.name,
       msg: notification.msg
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

let addUserBooking = (userId, eventId, bookingId, name, date, location, participants, old_part, tot_old_part,
                      onError, onSuccess) => {
    managePromise(Axios.post(`http://localhost:5000/api/booking/`,
        {userId, eventId, bookingId, name, date, location, participants}),
        [200, 202],
        error =>  onError(error.response.data.description),
        resp => {
        if(resp.status === 200){
            managePromise(Axios.post(`http://localhost:5000/api/events/`,
                    {eventId, bookingId, participants, old_part, userId, tot_old_part}),
                [200],
                error =>  onError(error.response.data.description),
                resp => onSuccess(resp.data.description))
        } else {
           onError(resp.data.description)
        }
    })
}

let removeBooking = (userId, eventId, bookingId, participants, onError, onSuccess) => {
    managePromise(Axios.delete(`http://localhost:5000/api/booking/`,
        {data:{userId, bookingId}}),
        [200],
        error =>  onError(error.response.data.description),
        resp => {
            if(resp.status === 200) {
                managePromise(Axios.delete(`http://localhost:5000/api/events/`,
                        {data: {eventId, bookingId, participants, userId}}),
                    [200],
                    error => onError(error.data.description),
                    resp => onSuccess(resp.data.description))
            }
    })
}

let addUserLike = (userId, eventId, name, date_start, date_finish, location, onError, onSuccess) => {
    const ds = moment(date_start, "DD/MM/YYYY").format('YYYY-MM-DD');
    const df = moment(date_finish, "DD/MM/YYYY").format('YYYY-MM-DD');
    managePromise(Axios.post(`http://localhost:5000/api/like/`,
        {userId, eventId, name, ds, df, location}),
        [200, 202],
        error =>  onError(error.response.data.description),
        resp => {if(resp.status === 200){
            onSuccess(resp.data.description)
            managePromise(Axios.post(`http://localhost:5000/api/events/follower/`,
                    {userId, eventId, isUpdate:true}),
                [200],
                () => onError(),
                () => onSuccess()
            )
        }})
}

let getIfEventIsLiked = (userId, eventId, onError, onSuccess) =>{
    managePromise(Axios.post(`http://localhost:5000/api/like/check`,
        {userId, eventId}),
        [200],
        () =>  onError(),
        () => onSuccess())
}

let removeLike = (userId, eventId, likeId, onError, onSuccess) =>{
    managePromise(Axios.delete(`http://localhost:5000/api/like/`,
        {data:{userId, likeId}}),
        [200],
        error =>  onError(error.response.data.description),
        resp => {
            onSuccess(resp.data.description)
            managePromise(Axios.post(`http://localhost:5000/api/events/follower/`,
                    {userId, eventId, isUpdate:false}),
                [200],
                () => onError(),
                () => onSuccess()
            )
        })
}

let addUser = (email, password, birthday, name, surname, onError, onSuccess) =>{
    managePromise(Axios.post(`http://localhost:5000/api/registration/`,
            {email, password, birthday, name, surname}),
        [200, 202],
        error =>  onError(error.response.data.description),
        resp => {
            if(resp.status === 200) {
                onSuccess(resp.data.description)
            } else {
                onError(resp.data.description)
            }
    })
}

let createEvent = (title, desc, date_start, date_finish, img, address, city, province, tag, capacity,
                   owner_id, onError, onSuccess) =>{
    const ds = moment(date_start, "DD/MM/YYYY").format('YYYY-MM-DD');
    const df = moment(date_finish, "DD/MM/YYYY").format('YYYY-MM-DD');
    managePromise(Axios.post(`http://localhost:5000/api/events/creation/`,
            {title, desc, ds, df, img, address, city, province, tag, capacity, owner_id}),
        [200],
        error =>  onError(error.response.data.description),
        resp => {onSuccess(resp.data)})
}

let getOwnerEvents = (owner_id, onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/events/admin/` + owner_id),
        [200],
        onError,
        resp => {onSuccess(resp.data.map(mapEvent))})
}

let cancelEvent = (eventId, onError, onSuccess) =>{
    managePromise(Axios.delete(`http://localhost:5000/api/events/creation/`,
            {data: {eventId}}),
        [200],
        error => onError(error.data.description),
        resp => onSuccess(resp.data.description))

}

let updateEvent = (eventId, title, desc, img, address, city, province, tag, capacity, onError, onSuccess) => {
    managePromise(Axios.post(`http://localhost:5000/api/events/update/`,
            {eventId, title, desc, img, address, city, province, tag, capacity}),
        [200],
        error =>  onError(error.data.description),
        resp => {onSuccess(resp.data.description)})
}

let getUserNotification = (userId, onError, onSuccess) => {
    managePromise(Axios.get(`http://localhost:5000/api/notification/`+ userId),
        [200],
        onError,
        response => onSuccess(response.data.map(mapNotification)))

}

let deleteNotification = (notificationId, onError, onSuccess) => {
    managePromise(Axios.delete(`http://localhost:5000/api/notification/`,
        {data: {notificationId}}),
        [200],
        onError,
        response => onSuccess(response))

}

let markNotifications = (notifications, onError, onSuccess) =>{
    managePromise(Axios.put(`http://localhost:5000/api/notification/`,
            {notifications}),
        [200],
        onError,
        response => onSuccess(response))
}

let getFollowers = (eventId, onError, onSuccess) => {
    console.log("entra")
    managePromise(Axios.get(`http://localhost:5000/api/events/follower/`+ eventId),
        [200],
        onError,
        response => { console.log(response)
            onSuccess(response.data)})
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
    addUserBooking,
    removeBooking,
    addUserLike,
    getIfEventIsLiked,
    removeLike,
    addUser,
    createEvent,
    getOwnerEvents,
    cancelEvent,
    updateEvent,
    getUserNotification,
    mapTimeZone,
    deleteNotification,
    markNotifications,
    getFollowers
}