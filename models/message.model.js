const db = require("../db");


function addMessage(message, room, user, date) {
  const sql =
    "INSERT INTO message (value, room, user, date) VALUES ($1, $2, $3, $4)";
  return db.query(sql, [message, room, user, date], function (err, message) {
      if (err) {
        console.error(err.message);
        
      }
      return message
    /*   console.log(message, room, user, date); */
      
    });
  }


function delMessages(room) {
  const sql = "DELETE FROM message WHERE room = $1";/* eller ska det vara $2? */
  return db.query(sql, room, function (err, message) {
      if (err) {
        console.error(err.message);
        
      }
      return message;
    });
  };

function roomMessages(roomName) {
  const sql = "SELECT * FROM message WHERE room = $1";

  return db.query(sql, roomName, (err, rows) => {
      if (err) {
        console.error(err.message);
        
      }
      return(rows);
    });
  }


module.exports = {
  addMessage,
  roomMessages,
  delMessages
};
