import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { SocketUser } from "server/lib";

export default function SocketIO() {
  const router = useRouter();
  const { roomId, nick } = router.query;
  const [socket] = useState(() => io());
  const [typing, setTyping] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    {
      nick?: string;
      message?: string;
    }[]
  >([]);
  console.log(messages);
  const [users, setUsers] = useState<SocketUser[]>([]);
  const [text, setText] = useState("");
  const [socketData, setSocketData] = useState<{
    nick?: string;
    message?: string;
  }>({ nick: "", message: "" });
  useEffect(() => {
    socket.on("s_users", (data: SocketUser[]) => {
      setUsers(data);
    });
    socket.on("s_typing", (data: string[]) => {
      setTyping(data);
    });
    socket.on("s_send", (id: string, nick: string, message: string) => {
      if (id && id !== socket.id) {
        setSocketData({
          nick,
          message,
        });
      }
    });
    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    if (socketData.message) setMessages([...messages, socketData]);
  }, [socketData]);
  useEffect(() => {
    if (roomId && nick) {
      let data = { roomId, nick };
      socket.emit("c_login", data);
    }
  }, [roomId, nick]);
  useEffect(() => {
    if (text) {
      socket.emit("c_typing_start");
    }
  }, [text.length]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== "\n") setText(e.target.value);
  };
  const handleChat = () => {
    if (!text) return;
    setMessages([...messages, { nick: `${nick}`, message: text }]);
    socket.emit("c_send", text);
    socket.emit("c_typing_end");
    setText("");
  };
  return (
    <div className="h-screen bg-gray-800 flex flex-col w-screen text-white justify-center items-center">
      <div className="h-5/6 w-full flex">
        <div className="w-1/6 p-1 bg-yellow-400">
          {users.length &&
            users.map((v, i) => {
              return (
                <p key={i}>
                  <span className="capitalize">{v.nick}</span>
                  {typing.includes(v.id) && <span className="text-xs rounded-md px-2">(typing...)</span>}
                </p>
              );
            })}
        </div>
        <div className="w-5/6 mx-1 bg-white flex-col px-4 overflow-auto">
          {messages.length > 0 &&
            messages.map((v, i) => {
              return (
                <p
                  key={i}
                  className={`text-gray-800 w-full my-2 flex ${
                    v.nick === `${nick}` ? "justify-end" : "justify-items-start"
                  }`}
                  ref={(el) => {
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {v.nick === `${nick}` ? (
                    <>
                      <span className="text-red-700 border border-red-100 p-1">{v.message}</span>
                      <span className="rounded-lg px-1 bg-red-500 ml-2 flex justify-center items-center text-white text-xs">
                        {v.nick}{" "}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="rounded-lg px-1 bg-blue-500 mr-2 flex justify-center items-center text-white text-xs">
                        {v.nick}
                      </span>
                      <span className="border border-blue-100 p-1">{v.message}</span>
                    </>
                  )}
                </p>
              );
            })}
        </div>
      </div>
      <div className="h-1/6 flex w-full bg-white my-1 p-2">
        <div className="w-5/6 mx-1 bg-white">
          <textarea
            name="mes"
            value={text}
            className="w-full h-full border border-gray-700 resize-none text-gray-800"
            onChange={handleChange}
            onKeyUp={(e) => {
              if (e.keyCode === 13) handleChat();
            }}
          ></textarea>
        </div>
        <div className="w-1/6 p-4">
          <button
            className={`rounded-sm bg-blue-800 w-full h-full focus:outline-none hover:bg-blue-600`}
            onClick={handleChat}
            disabled={!text}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
