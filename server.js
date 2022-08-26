const { Server } = require("socket.io");
const PORT = process.env.PORT;
const fs = require("fs");


const roomsModel = require("./models/rooms.model");
const messagesModel = require("./models/message.model");

const io = new Server({
  cors: {
    origin: ["https://frontendkk1.herokuapp.com"],
    methods: ["GET", "POST", "DELETE"],
  },
});


io.on("connection", (socket) => {
  socket.on("ready", async (call) => {
    socket.join("default");
    call({ status: 200 });
    const rooms = await roomsModel.getRooms();
    const messages = await messagesModel.roomMessages("default");

    socket.emit("get_messages", messages);
    socket.emit("get_rooms", rooms);
  });


  socket.on("delete_room", async (id, room, msg) => {
    msg({ status: 200 });
    console.log(`deleted room: ` + room);
    roomsModel.delRoom(id);
    messagesModel.delMessages(room);
    const messages = await messagesModel.roomMessages("default");
    const rooms = await roomsModel.getRooms();
    socket.emit("get_rooms", rooms);
    socket.emit("get_messages", messages);
  });


  socket.on("create_room", async (data, msg) => {
    console.log(`room created: ` + data);
    roomsModel.createRoom(data);
    msg({ status: 200 });
    const rooms = await roomsModel.getRooms();
    socket.emit("get_rooms", rooms);
  });

  socket.on("join_room", async (data, msg) => {
    const roomarr = Array.from(socket.rooms);
    const activeRoom = roomarr[1];

    const messages = await messagesModel.roomMessages(data);
    socket.leave(activeRoom);
    socket.join(data);
    socket.emit("get_messages", messages);
    msg({ status: 200 });
  });
  


  
  socket.on("post_message", async (data, user, msg) => {
    const roomarr = Array.from(socket.rooms);
    let activeRoom = roomarr[1];
    const timeStamp = new Date();
    const date =
      "Year: " +
      timeStamp.getFullYear() +
      " / " +
      (timeStamp.getMonth() + 1) +
      " / " +
      timeStamp.getDate() +
      ", Time: " +
      timeStamp.getHours() +
      ":" +
      timeStamp.getMinutes() +
      ":" +
      timeStamp.getSeconds();

    if (data) {
      messagesModel.addMessage(data, activeRoom, user, date);
      msg({ status: 200 });
      const messages = await messagesModel.roomMessages(activeRoom);
      io.to(activeRoom).emit("get_messages", messages);

      const add = JSON.stringify({
        date: date,
        user: user,
        message: data,
        room: activeRoom,
      });
      fs.writeFile("log.txt", add + "- new post -", { flag: "r+" }, (err) => {
        if (err) throw err;
      });
    } else {
      msg({ status: 400 });
    }
  });
});

io.listen(PORT);