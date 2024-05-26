import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { Toaster, toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import axios from 'axios';

interface LoginFormProps {
    onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                username: username,
                password: password,
            });

            const token = response.data.access_token;
            console.log(response);
            dispatch(login({ token: token, userId: username }));
            onLogin();
        } catch (error) {
            toast.error('Invalid username or password');

        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-slate-700 rounded-lg transition-opacity duration-500 opacity-100">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="border border-gray-300 rounded px-3 py-2 w-full bg-slate-800 "
                        value={username}
                        onChange={(e) => setUsername(DOMPurify.sanitize(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-300 rounded px-3 py-2 w-full bg-slate-800"
                        value={password}
                        onChange={(e) => setPassword(DOMPurify.sanitize(e.target.value))}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-slate-600 hover:bg-slate-800 duration-75 ease-out text-white rounded px-4 py-2 "
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
