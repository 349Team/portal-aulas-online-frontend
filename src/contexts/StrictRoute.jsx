

import { useContext } from "react";
import { useAuthContext } from "./AuthContext";

const hasRoles = (context, roles) => {
  const { logged, user } = context;

  const userHasOneOf = (roles) => {
    for(let role of roles){
      if(user.role?.includes(role)) return true
    }
    return false
  }

  if (!!logged && !!user && userHasOneOf(roles)) return true
  return false
}

export const StrictRoute = ({ children, roles }) => {
  const authContext = useAuthContext();
  return hasRoles(authContext, roles) ? children : <></>
}

export const OnlyNotLogged = ({ children }) => {
  const { logged } = useAuthContext();
  return !logged ? children : <></>
}