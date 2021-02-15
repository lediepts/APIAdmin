export type SocketUser = {
  id: string;
  room: string;
  nick: string;
};
export function getName(name: string, arr: SocketUser[]) {
  let str = name;
  let i = 0;
  while (true) {
    i++;
    if (arr.find((f) => f.nick === str)) {
      str = `${name}_${i}`;
    } else {
      break;
    }
  }
  return str;
}
