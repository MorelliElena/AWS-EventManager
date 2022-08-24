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
        const response = await request(app).post(`/api/booking/`).send({userId, eventId, bookingId, name, date, location, participants})
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
        const response = await request(app).post(`/api/booking/`).send({userId, eventId, bookingId, name, date, location, participants})
        expect(response.statusCode).toEqual(202)
        expect(response.body.err).toBe(undefined);
        expect(response.body.description.length > 0).toBe(true)

    });


});
