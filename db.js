const {Client} = require("pg");

const roomsq = `
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    room_name TEXT)`;

  const messagesq = `
  CREATE TABLE IF NOT EXISTS message (
    id SERIAL PRIMARY KEY,
    value TEXT NOT NULL,
    room TEXT NOT NULL,
    user TEXT NOT NULL,
    date TEXT)`;


const db = new Client( {
  
    ssl: {
      rejectUnauthorized: false
    },
    connectionString: process.env.DATABASE_URL 
   
    // Heroku lägger till ENV-variablen DATABASE_URL när du 
    // lägger till Heroku Postgres som addon till din app
  });
  /* if (error) {
    console.error(error.message);
    throw error;
  } */
  db.connect();
  console.log("connected to db");

  
  
  
  db.query(roomsq, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      const insertroomsq = `INSERT INTO rooms (room_name) VALUES ($1)`;
     
    }
  });
  db.query(messagesq, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      const insertmsgsq = `INSERT INTO message (value, room, user, date) VALUES ($1, $2, $3, $4)`;
    db.query(insertmsgsq, [
      "hi",
      "defaultas",
      "korv",
      "2022"
    ])
    }
  });

module.exports = db;
