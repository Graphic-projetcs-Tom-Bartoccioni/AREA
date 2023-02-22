db.createUser(
    {
        user: "hazbin",
        pwd: "azer",
        roles: [
            {
                role: "readWrite",
                db: "area"
            }
        ]
    }
);
db.createCollection('users');
db.createCollection('datas');