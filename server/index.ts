import express, { Express } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
import { getName, SocketUser } from "./lib";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  const users: SocketUser[] = [];
  const typing: string[] = [];

  io.on("connection", (socket: socketio.Socket) => {
    console.log(`${socket.id} is connected`);
    // socket.on("c_send", (data) => {
    //   // socket.emit("emit")
    //   socket.broadcast.emit("sendALl", data);
    //   // io.sockets.emit("sendALl", data);
    //   // io.sockets.in("room1").emit("test emit")
    // });
    socket.on("c_login", (data: { roomId: string; nick: string }) => {
      socket.join(data.roomId);
      users.push({
        id: socket.id,
        room: data.roomId,
        nick: getName(data.nick, users),
      });
      io.to(data.roomId).emit("s_users", users);
    });
    socket.on("c_typing_start", () => {
      if (!typing.includes(socket.id)) {
        typing.push(socket.id);
      }
      let user = users.find((u) => u.id === socket.id);
      if (user) {
        io.to(user.room).emit("s_typing", typing);
      }
    });
    socket.on("c_typing_end", () => {
      let user = users.find((u) => u.id === socket.id);
      if (user) {
        typing.splice(typing.indexOf(socket.id), 1);
        io.to(user.room).emit("s_typing", typing);
      }
    });
    socket.on("c_send", (data: string) => {
      let user = users.find((u) => u.id === socket.id);
      if (user) {
        io.to(user.room).emit("s_send", socket.id, user.nick, data);
      }
    });
    socket.on("disconnect", () => {
      let user = users.find((u) => u.id === socket.id);
      if (user) {
        socket.leave(user.room);
        users.splice(users.indexOf(user), 1);
        io.to(user.room).emit("s_users", users);
      }
      console.log(`${socket.id} is disconnected`);
    });
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
