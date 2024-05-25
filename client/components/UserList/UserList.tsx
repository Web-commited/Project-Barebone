

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users', {
                    headers: {
                        Authorization: `Bearer localStorage.getItem('token')`,
                    },

                });
                setUsers(response.data);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [localStorage.getItem('token')]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
