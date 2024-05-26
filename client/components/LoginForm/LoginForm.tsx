import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import axios from 'axios';

interface LoginFormProps {
    onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                username: username,
                password: password,
            });

            const token = response.data.access_token;
            console.log(token);
            dispatch(login({ token: token, userId: username }));
            onLogin();
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
