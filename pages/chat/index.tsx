import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

export default function chat_index() {
  const router = useRouter();
  const [state, setState] = useState<{
    nickname?: string;
    room?: string;
  }>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(
      state
        ? {
            ...state,
            [e.target.name]: e.target.value,
          }
        : { [e.target.name]: e.target.value }
    );
  };
  const handleSubmit = () => {
    router.push(`/chat/${state?.room}?nick=${state?.nickname}`);
  };
  return (
    <div className="h-screen bg-gray-800 flex flex-col w-screen text-white justify-center items-center">
      <div className="m-2 p-2 w-56">
        <span>User Name</span>
        <input
          className="text-gray-800 focus:bg-yellow-100 pl-2"
          onChange={handleChange}
          name="nickname"
          type="text"
        />
      </div>
      <div className="m-2 p-2 w-56">
        <span>Room</span>
        <input
          className="text-gray-800 focus:bg-yellow-100 pl-2"
          onChange={handleChange}
          name="room"
          type="text"
        />
      </div>
      {JSON.stringify(state)}
      <div className="m-2 p-2 w-56">
        <button
          className="border border-green-50 bg-indigo-800 px-4 py-2 rounded-md hover:bg-purple-900"
          onClick={handleSubmit}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
