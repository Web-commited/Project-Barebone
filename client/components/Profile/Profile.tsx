import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateUser } from '@/store/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
}

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const token = useSelector((state: RootState) => state.auth.token);
    const username = useSelector((state: RootState) => state.auth.userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<User>(`http://localhost:3001/users/username/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setError(null);
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

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => {
            if (!prevUser) return null;

            return {
                ...prevUser,
                [name]: value,
            };
        });
    };

    const handleSubmit = async () => {
        if (user?.email === '' || user?.name === '' || user?.username === '') {
            toast.error('Please fill in all fields');
            return;
        }
        if (user?.email && !user.email.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3001/users/${username}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(updateUser(response.data));
            setEditMode(false);
        } catch (error) {
            toast.error('Error updating user data');
        }
    };


    if (loading) {

        return <div>Loading... Click <Link href={'/'} className='text-xl text-gray-200 font-bold'>Here</Link> to go to Login Page</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div className={`form-container bg-slate-900 w-1/3 h-96 flex items-start relative flex-col justify-center transition-colors p-12 rounded-xl`}>
            <Toaster />
            {editMode ? (
                <>
                    <div>
                        <span className="text-2xl">Name:</span>
                        <input type="text" name="name" value={user.name} onChange={handleInputChange} className="bg-slate-900 text-white border border-white border-opacity-50 transition-opacity mt-5" />
                    </div>
                    <div>
                        <span className="text-2xl">Email:</span>
                        <input type="email" name="email" value={user.email} onChange={handleInputChange} className="bg-slate-900 text-white border border-white border-opacity-50 transition-opacity mt-5" />
                    </div>
                    <div>
                        <span className="text-2xl">Username:</span>
                        <input type="text" name="username" value={user.username} onChange={handleInputChange} className="bg-slate-900 text-white border border-white border-opacity-50 transition-opacity mt-5" />
                    </div>
                    <div className="flex justify-between">
                        <button onClick={handleSubmit} className="absolute left-4 bottom-2 bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded duration-75 ease-out">Save</button>
                        <button onClick={handleCancel} className="absolute right-4 bottom-2 bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded duration-75 ease-out">Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='mt-4'>
                        <span className="text-2xl">Name:</span>
                        {user.name}
                    </div>
                    <div className='mt-4'>
                        <span className="text-2xl">Email:</span>
                        {user.email}
                    </div>
                    <div className='mt-4'>
                        <span className="text-2xl">Username:</span>
                        {user.username}
                    </div>
                    <button onClick={handleEdit} className="absolute left-4 bottom-2 bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded duration-75 ease-out">Edit</button>
                </>
            )}
        </div>
    );
};

export default Profile;
