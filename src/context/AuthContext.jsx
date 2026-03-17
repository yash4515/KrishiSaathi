import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount, check if stored token is still valid
    useEffect(() => {
        const stored = localStorage.getItem('krishisaathi_user');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed);
                // Verify token with backend
                authAPI.me()
                    .then((res) => {
                        const freshUser = { ...res.data.data.user, token: parsed.token };
                        setUser(freshUser);
                        localStorage.setItem('krishisaathi_user', JSON.stringify(freshUser));
                    })
                    .catch(() => {
                        // Token expired or invalid — clear it
                        setUser(null);
                        localStorage.removeItem('krishisaathi_user');
                    })
                    .finally(() => setLoading(false));
            } catch {
                localStorage.removeItem('krishisaathi_user');
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await authAPI.login({ email, password });
        const { user: userData, token } = res.data.data;
        const fullUser = { ...userData, token };
        setUser(fullUser);
        localStorage.setItem('krishisaathi_user', JSON.stringify(fullUser));
        return fullUser;
    };

    const signup = async (data) => {
        const res = await authAPI.register({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: data.role,
        });
        const { user: userData, token } = res.data.data;
        const fullUser = { ...userData, token };
        setUser(fullUser);
        localStorage.setItem('krishisaathi_user', JSON.stringify(fullUser));
        return fullUser;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('krishisaathi_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
