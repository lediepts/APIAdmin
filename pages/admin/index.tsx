// pages/products
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const fetcher = async (uri: RequestInfo) => {
  const response = await fetch(uri);
  return response.json();
};

export default withPageAuthRequired(function Products() {
  const { data, error } = useSWR("/api/auth/protected", fetcher);
  if (error) return <div>oops... {error.message}</div>;
  if (data === undefined) return <div>Loading...</div>;
  return (
    <div>
      {JSON.stringify(data)} <a href="/api/auth/logout">Logout</a>
    </div>
  );
});
