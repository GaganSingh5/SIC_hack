import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const UserData = () => {

  const { user }  = useAuth0()

  const getID = ()=> {
    return user.identities[0].user_id;
  }
  return (
    <div>
      
    </div>
  )
}


export default UserData;