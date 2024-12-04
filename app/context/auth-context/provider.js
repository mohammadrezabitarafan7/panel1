'use client'
import { useState, useEffect } from 'react'
import { AuthContext } from './contaxt';
import Cookies from 'js-cookie'

const AuthProvider = ({ children }) => {
    const [cookie, setCookie] = useState("");
    const [user, setUser] = useState(false)


    const SetUser = (id) => {
        Cookies.set('user', id, { expires: 1 });
        setCookie(id);
    };

    const GetUser = () => {
        const user = Cookies.get('user')
        if (user) {
            setCookie(user);
        }
        return user;
    };

    const CheckUser = () => {
        const cookie = GetUser();
        if (cookie) {
            setUser(true);
        }
        return user
    }

    const LogOut=()=>{
        if(cookie){
            Cookies.remove('user')
        }
    }

    useEffect(() => {
        const existingUser = Cookies.get('user');
        if (existingUser) {
            setCookie(existingUser);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ SetUser, GetUser, CheckUser, LogOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;