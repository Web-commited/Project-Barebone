import { useState, ChangeEvent, FormEvent } from 'react';
import FormData from '@/type';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const RegistrationForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.username.trim() || !formData.password.trim() || !formData.confirmPassword.trim() || !formData.dateOfBirth.trim()) {
            alert('Please fill in all fields');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() < 18) {
            alert('You must be 18 years or older to register');
            return;
        }

        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
            ,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-8 p-10 bg-slate-200">
            <div>
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-600">Registration Form</h1>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Birth
                </label>
                <DatePicker
                    selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                    onChange={(date: Date) =>
                        setFormData({
                            ...formData,
                            dateOfBirth: date.toISOString(),
                        })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    showYearDropdown
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default RegistrationForm;
