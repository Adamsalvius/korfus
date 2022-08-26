const db = require("../db");

function getRooms() {
  const sql = "SELECT * FROM rooms";

  
    return db.query(sql, function (error, rows) {
      if (error) {
        console.error(error.message);
        
      }
      return(rows);
    });
  }






function delRoom(id) {
  const sql = "DELETE FROM rooms WHERE id = $1";
  
    return db.query(sql, [id], function (error)  {
      if (error) {
        console.error(error.message);
        
      }
      return id;
    });
  }

function createRoom(room) {
  const sql = "INSERT INTO rooms (room_name) VALUES ($1)";

  
    return db.query(sql, [room], (err) => {
      if (err) {
        console.error(err.message);
        
      }
      return room;
    });
  }


module.exports = {
  getRooms,
  createRoom,
  delRoom,
};