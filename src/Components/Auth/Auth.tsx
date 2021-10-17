import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../Auth/login';
import LogoutButton from "../Auth/logout";

export default function Auth() {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated ? <LogoutButton /> : <LoginButton />
  )
}
