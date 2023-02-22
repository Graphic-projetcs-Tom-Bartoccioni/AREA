const axios = require('axios').default;
const { AUTH0 } = require('../config');

const roles = {
    god: 'rol_CzWRSMUOqzqab5Sp',
    plebs: 'rol_5DyHdA7fvqdH39US',
}

async function getAccessToken() {
    const req = {
        method: 'POST',
        url: `https://${AUTH0.DOMAIN}/oauth/token`,
        headers: { 'content-type': 'application/json' },
        data: {
            grant_type: 'client_credentials',
            client_id: AUTH0.CLIENT.ID,
            client_secret: AUTH0.CLIENT.SECRET,
            audience: AUTH0.MANAGEMENT_AUDIENCE
        }
    };

    var res;
    try {
        res = await axios.request(req);
    } catch (err) {
        throw err;
    }
    if (res.status != 200) throw "getAccessToken: " + res.data;

    return res.data['access_token'];
}

async function listUsers() {
    var accessToken;
    try {
        accessToken = await getAccessToken();
    } catch (err) {
        throw err;
    }
    var users = {};

    try {
        users.god = await (async () => {
            const req = {
                method: 'GET',
                url: `https://dev-aax8fs5i.eu.auth0.com/api/v2/roles/rol_CzWRSMUOqzqab5Sp/users`,
                headers: { 'Authorization': `Bearer ${accessToken}` }
            };
        
            var res;
            try {
                res = await axios.request(req);
            } catch (err) {
                throw err;
            }
            return res.data;
        })();

        users.plebs = await (async () => {
            const req = {
                method: 'GET',
                url: `https://dev-aax8fs5i.eu.auth0.com/api/v2/roles/rol_5DyHdA7fvqdH39US/users`,
                headers: { 'Authorization': `Bearer ${accessToken}` }
            };
        
            var res;
            try {
                res = await axios.request(req);
            } catch (err) {
                throw err;
            }
            return res.data;
        })();
    } catch (err) {
        throw err;
    }
    
    return users;
}

async function createUser(payload) {
    var accessToken;
    try {
        accessToken = await getAccessToken();
    } catch (err) {
        throw err;
    }

    payload.connection = "Username-Password-Authentication";
    const bruh = {
        method: 'POST',
        url: `https://dev-aax8fs5i.eu.auth0.com/api/v2/users`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: payload,
        body: payload,
    };
    var res;
    try {
        res = await axios.request(bruh);
    } catch (err) {
        throw err;
    }

    try {
        addUserRole(res.data['user_id'], roles.plebs);
    } catch (err) {
        throw err;
    }

    return res;
}

async function deleteUser(user) {
    var accessToken;
    try {
        accessToken = await getAccessToken();
    } catch (err) {
        throw err;
    }
    
    const req = {
        method: 'DELETE',
        url: `https://dev-aax8fs5i.eu.auth0.com/api/v2/users/${user}`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
    };

    var res;
    try {
        res = await axios.request(req);
    } catch (err) {
        throw err;
    }

    return res;
}

async function addUserRole(user, role) {
    var accessToken;
    try {
        accessToken = await getAccessToken();
    } catch (err) {
        throw err;
    }
    
    const req = {
        method: 'POST',
        url: `https://dev-aax8fs5i.eu.auth0.com/api/v2/users/${user}/roles`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: {'roles':[role]},
    };

    var res;
    try {
        res = await axios.request(req);
    } catch (err) {
        throw err;
    }
    
    return res;
}

async function deleteUserRole(user, role) {
    var accessToken;
    try {
        accessToken = await getAccessToken();
    } catch (err) {
        throw err;
    }
    const req = {
        method: 'DELETE',
        url: `https://dev-aax8fs5i.eu.auth0.com/api/v2/users/${user}/roles`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: {'roles':[role]},
    };

    var res;
    try {
        res = await axios.request(req);
    } catch (err) {
        throw err;
    }
    return res;
}

module.exports = {
    roles,
    getAccessToken,
    listUsers,
    createUser,
    deleteUser,
    addUserRole,
    deleteUserRole,
};