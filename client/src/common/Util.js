import moment from "moment";
import momentTZ from "moment-timezone";

let mapEvent = (name, date_start, date_finish, add, city, prov, id) => {
    return {
        "_id":id,
        "name": name,
        "date_start": date_start,
        "date_finish": date_finish,
        "location": {
            "address": add,
            "city": city,
            "province": prov
        },
        "status": "on"
    }

}

let mapDateISO = (date) => {
    return moment(date, "DD/MM/YYYY").format('YYYY-MM-DD');
}

let mapDate = (date) =>{
    return moment(date).format("DD/MM/YYYY")
}

let mapTimeZone = (date) =>{
    return momentTZ.tz(date, "Europe/Rome").format('DD/MM/YYYY, kk:mm:ss');
}

let getCurrentDate = () => {
   return moment().format('YYYY-MM-DD')
}

let mapUTC = (date) => {
    return moment.utc(mapDateISO(date))
}

export default {
    mapEvent,
    mapTimeZone,
    mapDate,
    getCurrentDate,
    mapDateISO,
    mapUTC
}