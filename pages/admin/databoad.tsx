import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import Layout from "../../components/ADMIN/layout";

export default function Admin() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user)
    return (
      <Layout>
        <div>
          {JSON.stringify(user, null, 4)}
          Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        </div>
      </Layout>
    );
  return <a href="/api/auth/login">Login</a>;
}
