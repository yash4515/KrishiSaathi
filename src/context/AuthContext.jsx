import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('krishisaathi_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch { /* ignore */ }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Simulated login — replace with real API call
        await new Promise(r => setTimeout(r, 800));
        const mockUser = {
            id: '1',
            name: email.includes('farmer') ? 'Rajesh Kumar' : 'Amit Sharma',
            email,
            phone: '+91 98765 43210',
            role: email.includes('farmer') ? 'farmer' : 'buyer',
            avatar: null,
            token: 'mock-jwt-token-' + Date.now(),
        };
        setUser(mockUser);
        localStorage.setItem('krishisaathi_user', JSON.stringify(mockUser));
        return mockUser;
    };

    const signup = async (data) => {
        await new Promise(r => setTimeout(r, 800));
        const mockUser = {
            id: '2',
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role,
            avatar: null,
            token: 'mock-jwt-token-' + Date.now(),
        };
        setUser(mockUser);
        localStorage.setItem('krishisaathi_user', JSON.stringify(mockUser));
        return mockUser;
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
