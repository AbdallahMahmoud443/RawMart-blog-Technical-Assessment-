import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const user = localStorage.getItem('user')
        if (storedToken && user) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(user));
            } catch (e) {
                console.error("Failed to decode token", e);
                logout();
            }
        }
        setLoading(false);
    }, []);
    const login = async (email, password) => {
        try {
            const response = await authApi.login({ email, password });
            const { access_token, user: { name, image, id } } = response.data; // Response only has access_token and message
            if (!access_token) throw new Error("No token received");
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify({ id: id, name: name, image: image }));
            setToken(access_token);
            setUser({ id: id, name: name, image: image });
            toast.success('Login successful!');
            return true;
        } catch (error) {
            // Only log unexpected errors
            if (!error.response || (error.response.status !== 401 && error.response.status !== 422)) {
                console.error("Login error", error);
            }

            const errorMessage = error.response?.data?.message || error.response?.data?.title || 'Login failed';
            // Only show toast if it's not a validation error (422) or unauthorized (401) which are handled by the form
            if (error.response?.status !== 422 && error.response?.status !== 401) {
                toast.error(errorMessage);
            }
            throw error;
        }
    };
    const register = async (data) => {
        try {
            const response = await authApi.register(data);
            // If backend returns a token on registration (which it does), auto-login
            if (response.data?.access_token) {
                const { access_token, user: { name, image, id } } = response.data; // Response only has access_token and message
                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify({ id: id, name: name, image: image }));
                setToken(access_token);
                setUser({ id: id, name: name, image: image });
                toast.success('Registration successful!');
            } else {
                toast.success('Registration successful! Please login.');
            }
            return true;
        } catch (error) {
            if (!error.response || error.response.status !== 422) {
                console.error("Registration error", error);
            }
            const errorMessage = error.response?.data?.message || error.response?.data?.title || 'Registration failed';
            if (error.response?.status !== 422) {
                toast.error(errorMessage);
            }
            throw error;
        }
    };
    const logout = () => {
        authApi.logout();
        setToken(null);
        setUser(null);
        toast.success('Logged out successfully');
    };
    const value = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
