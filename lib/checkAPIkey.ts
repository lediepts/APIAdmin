export const checkAPIKey = (apiKey?: string | string[]) => {
  if (typeof apiKey === "string")
    if (apiKey) {
      let { X_API_KEY } = process.env;
      if (X_API_KEY) {
        return X_API_KEY === apiKey;
      }
    }
  return false;
};

export function sum(a: number, b: number) {
  return a + b;
}
