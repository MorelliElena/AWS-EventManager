
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
    }

}



export default {
    mapEvent
}