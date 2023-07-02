const Pool = require('pg').Pool
const pool = new Pool(
    {
        user: "postgres",
        password: "mysecretpassword",
        host: "141.147.31.0",
        port: 32768,
        database: "inconnect"
    }
)

module.exports = pool