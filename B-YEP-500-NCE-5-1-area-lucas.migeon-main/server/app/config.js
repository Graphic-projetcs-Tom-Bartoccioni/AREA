module.exports = {
    SERVER: {
        PORT: process.env.PORT || 8080,
    },
    MONGO: {
        USER: "hazbin",
        PWD: "azer",
        HOST: "db",
        PORT: 27017,
        DB: "area"
    },
    AUTH0: {
        DOMAIN: 'dev-aax8fs5i.eu.auth0.com',
        MANAGEMENT_AUDIENCE: 'https://dev-aax8fs5i.eu.auth0.com/api/v2/',
        API_AUDIENCE: 'https://action.reaction/api',
        CLIENT: {
            ID: 'OezABBVWLDCZDqNQzP9QAxgJhHHTfEZQ',
            SECRET: 'bphP-nkcheaPAgQwPc0X3xDJpcxinUJP5iM2yjH9kqyDwlMA6zl7xvZ5Szz-bYJu'
        }
    },
};