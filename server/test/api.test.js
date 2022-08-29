const request = require( 'supertest')
const app = require('./app')

describe("Events", () => {
    test("should return 200", async () => {
        const response = await request(app).get("/api/events").send()
        expect(response.statusCode).toEqual(200)
        expect(response.body.error).toBe(undefined);
    });

    test("should return events", async () => {
        const response = await request(app).get("/api/events").send();
        expect(response.body.length > 0).toBe(true)
    });

    test("single event should return 200", async () => {
        const id = "6145fff4f82e8b5a82285448"
        const response = await request(app).get(`/api/events/${id}`).send()
        expect(response.statusCode).toEqual(200)
        expect(response.body.error).toBe(undefined);
    });

    test("single event should return some data", async () => {
        const id = "6145fff4f82e8b5a82285448"
        const response = await request(app).get(`/api/events/${id}`).send()
        expect(response.body !== null).toBe(true)
    });

    test("update booking event", async () => {
        const userId = "62d9841607ca7d551c8d3db6"
        const eventId = "6145fff4f82e8b5a82285448"
        const participants = 6
        const bookingId="622f51dfcab635273dcebf65"
        const response = await request(app).post(`/api/events/`).send({eventId, bookingId, participants,
            userId})
        expect(response.statusCode).toEqual(200)
        expect(response.body.err).toBe(undefined);
        expect(response.body !== null).toBe(true)

    });

    test("remove booking event", async () => {
        const userId = "62d9841607ca7d551c8d3db6"
        const eventId = "6145fff4f82e8b5a82285448"
        const participants = 6
        const bookingId="622f51dfcab635273dcebf65"
        const response = await request(app).delete(`/api/events/`).send({eventId, bookingId, participants,
            userId})
        expect(response.statusCode).toEqual(200)
        expect(response.body.err).toBe(undefined);
        expect(response.body !== null).toBe(true)

    });



});

describe("Profile", () => {
    test("authentication should return 200", async () => {
        const username = "mora19396@gmail.com"
        const password = "schifoso"
        const response = await request(app).post(`/api/login`).send({username, password})
        expect(response.statusCode).toEqual(200)
        expect(response.body.error).toBe(undefined);
    });

    test("authentication should return 401 - username do not exist", async () => {
            const username = "casa@gmail.com"
            const password = "schifoso"
            const response = await request(app).post(`/api/login`).send({username, password})
            expect(response.statusCode).toEqual(401)
            expect(response.body.description).toBe("Username inesistente");

    });

    test("authentication should return 401 - username wrong password", async () => {
        const username = "mora19396@gmail.com"
        const password = "macchina"
        const response = await request(app).post(`/api/login`).send({username, password})
        expect(response.statusCode).toEqual(401)
        expect(response.body.description).toBe("Autenticazione fallita");

    });

    test("profile data - get information", async () => {
        const userId = "62d9841607ca7d551c8d3db6"
        const response = await request(app).get(`/api/login/${userId}`).send()
        expect(response.statusCode).toEqual(200)
        expect(response.body.err).toBe(undefined);
        expect(response.body !== null).toBe(true)

    });

    test("add booking once", async () => {
        const userId = "62d9841607ca7d551c8d3db6"
        const eventId = "6145fff4f82e8b5a82285448"
        const name = "Imola in musica"
        const date = new Date("2022-09-02T22:00:00.000+00:00")
        const location = {
            address: "via Emilia 172",
            city: "Imola",
            province: "Bologna",
        };
        const participants = 6
        const bookingId="622f51dfcab635273dcebf65"
        const response = await request(app).post(`/api/booking/`).send({userId, eventId, bookingId, name,
            date, location, participants})
        expect(response.statusCode).toEqual(200)
        expect(response.body.err).toBe(undefined);
        expect(response.body !== null).toBe(true)

    });

    test("add booking duplicated", async () => {
        const userId = "62d9841607ca7d551c8d3db6"
        const eventId = "6145fff4f82e8b5a82285448"
        const name = "Imola in musica"
        const date = new Date("2022-09-02T22:00:00.000+00:00")
        const location = {
            address: "via Emilia 172",
            city: "Imola",
            province: "Bologna",
        };
        const participants = 6
        const bookingId="622f51dfcab635273dcebf65"
        const response = await request(app).post(`/api/booking/`).send({userId, eventId, bookingId, name,
            date, location, participants})
        expect(response.statusCode).toEqual(202)
        expect(response.body.err).toBe(undefined);
        expect(response.body.description.length > 0).toBe(true)

    });

    test ("remove booking", async () => {
        const userId = "62d9841607ca7d551c8d3db6"
        const bookingId="622f51dfcab635273dcebf65"
        const response = await request(app).delete(`/api/booking/`).send({userId, bookingId})
        expect(response.statusCode).toEqual(200)
        expect(response.body.err).toBe(undefined);
    })

    test("add like", async () => {
        const userId = "62d9841607ca7d551c8d3db6"
        const eventId = "6145fff4f82e8b5a82285448"
        const name = "Imola in musica"
        const ds = new Date("2022-09-02T22:00:00.000+00:00")
        const df = new Date("2022-09-05T22:00:00.000+00:00")
        const location = {
            address: "via Emilia 172",
            city: "Imola",
            province: "Bologna",
        };
        const response = await request(app).post(`/api/like/`).send({userId, eventId,name, ds, df, location})
        expect(response.statusCode).toEqual(200)
        expect(response.body.err).toBe(undefined);

    });

    test("is liked", async () => {
        const userId = "62d9841607ca7d551c8d3db6"
        const eventId = "6145fff4f82e8b5a82285448"
        const response = await request(app).post(`/api/like/check`).send({userId, eventId})
        expect(response.statusCode).toEqual(200)
        expect(response.body.err).toBe(undefined);
    });

    test("add user return 200", async () => {
        const email = "casa@gmail.com"
        const name = "Paolo"
        const surname = "Belli"
        const salt = "$2a$10$8uNlS7ZH7GHlnQxf5mzd3u"
        const password = "provapaolo"
        const birthday = new Date("2012-07-15T22:00:00.000+00:00")
        const response = await request(app).post(`/api/registration`).send({email, password, salt, birthday,
            name, surname})
        expect(response.statusCode).toEqual(200)
        expect(response.body.err).toBe(undefined);
    });

    describe("Administrator", () => {
        test("create new event return 200", async () => {
            const title = "Prova"
            const desc = "Prova prova prova"
            const ds = new Date("2022-09-15T22:00:00.000+00:00")
            const df = new Date("2022-09-17T22:00:00.000+00:00")
            const img = ""
            const address = "Prova"
            const city = "Prova"
            const province = "Parma"
            const tag = ["sagra", "musica"]
            const capacity = 120
            const owner_id = "62d9826907ca7d551c8d3d6a"
            const response = await request(app).post(`/api/events/creation/`).send({
                title, desc, ds, df, img,
                address, city, province, tag, capacity, owner_id
            })
            expect(response.statusCode).toEqual(200)
            expect(response.body.err).toBe(undefined);
        })

        test("get event should return 200", async () => {
            const id = "62d9826907ca7d551c8d3d6a"
            const response =  await request(app).get(`/api/events/admin/${id}`).send()
            expect(response.statusCode).toEqual(200)
            expect(response.body.err).toBe(undefined);
        })
    });

    describe("Notification", () => {
        test("notification should return 200", async () => {
            const userId = "62d9841607ca7d551c8d3db6"
            const response = await request(app).get(`/api/notification/${userId}`).send()
            expect(response.statusCode).toEqual(200)
            expect(response.body.err).toBe(undefined);
        })

        test("notification should return 200", async () => {
            const eventId = "62b725b39d1ff84974e4abcd"
            const response = await request(app).get(`/api/events/follower/${eventId}`).send()
            expect(response.statusCode).toEqual(200)
            expect(response.body.err).toBe(undefined);
        })
    })

});
