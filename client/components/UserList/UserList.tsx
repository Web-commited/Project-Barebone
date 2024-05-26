import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';

interface User {
    id: number;
    name: string;
    email: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                setUsers(response.data);
                setError(null);
            } catch (error) {
                setError('Either the server is down or you are not authorized to view this page.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, error]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className='font-bold text-2xl'>
            Error: {error}
            Go <Link href="/" className='text-slate-500'>Here</Link> to login
        </div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul className="space-y-4">
                {users.map((user) => (
                    <li key={user.id} className="bg-gray-100 p-4 rounded-m text-black hover:scale-105 ease-in-out duration-75">
                        <div>Name: {user.name}</div>
                        <div>Email: {user.email}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
