'use client'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import ThemeProvider from '../context/themeContext/provider';
import AuthProvider from '../context/auth-context/provider'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context/contaxt';
import Page404 from '../components/page404';
import Loading from '../ui/loading';

const Layout = ({ children }) => {
    const { CheckUser, GetUser } = useContext(AuthContext);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userIdFromStorage = localStorage.getItem('userId');
                if (userIdFromStorage) {
                    setId(userIdFromStorage);
                    setLoading(false);
                } else {
                    const userId = CheckUser() ? GetUser() : null;
                    setId(userId);
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [CheckUser, GetUser]);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (id) {
        return (
            <AuthProvider>
                <ThemeProvider>
                    <div className='flex flex-row h-screen max-md:h-0'>
                        <Sidebar />
                        <div className="flex flex-1 flex-col">
                            <Header />
                            <div className="flex-1 flex-grow p-6 md:overflow-y-auto">
                                {children}
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </AuthProvider>
        );
    } else {
        // اگر شناسه کاربر null باشد، صفحه 404 را نمایش می‌دهیم
        return <Page404 />;
    }
}

export default Layout;
