/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../api/auth-api';
import { HttpStatus } from '../api/default';
import { AUTH_DEBUG } from '../api/default';

const AuthContext = React.createContext({
    up: false,
    logged: false,
    user: null,
    token: null,
    setToken: async () => {}
});

export const AuthProvider = React.FC = ({ children }) => {
    const setToken = async (token) => {
        AUTH_DEBUG && console.log("AuthProvider::setToken(): ", token)
        try {
            if (!!token) {
                const response = await AuthAPI.getUserInfo(token)
                if (response.status === HttpStatus.OK) {
                    setContext({
                        ...context,
                        up: true,
                        user: response.data,
                        logged: true,
                        token: token
                    })
                    return true;
                } else throw Error("token is not valid!")
            } else throw Error("token is not valid!")
        } catch (error) {
            setContext({
                ...context, 
                up: true,
                user: null, 
                logged: false, 
                token: null
            })
            return false;
        }
    }

    const [context, setContext] = React.useState({
        logged: false,
        user: null,
        token: null,
        setToken
    })

    React.useEffect(() => {
        const token = localStorage.getItem("token")
        if(token) setToken(token)
    }, [])

    React.useEffect(() => {
        AUTH_DEBUG && console.log("AuthContext: ", context)
    }, [context])

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    return React.useContext(AuthContext)
}
