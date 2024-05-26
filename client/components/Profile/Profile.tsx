import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface User {
    id: number;
    name: string;
    email: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<User>('http://localhost:3001/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setError(null);
                console.log(response.data);
            } catch (error) {
                setError('Either the server is down or you are not authorized to view this user. Please login.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="bg-gray-100 p-4 rounded-md text-black hover:scale-105 ease-in-out duration-75">
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div>
            </div>
        </div>
    );
};

export default Profile;
