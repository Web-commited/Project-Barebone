import { useState, ChangeEvent, FormEvent } from 'react';
import FormData from '@/type';
import DatePicker from "react-datepicker";
import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

interface RegistrationFormProps {
    onLogin: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onLogin }) => {
    const dispatch = useDispatch();
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

    const onSuccessfulRegistration = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                username: formData.username,
                password: formData.password,
            });

            const token = response.data.access_token;
            console.log(response);
            dispatch(login({ token: token, userId: formData.username }));
            onLogin();
        } catch (error) {
            toast.error('Login failed, this is embarrassing');
        }

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        //validate form data
        if (!formData.name.trim() || !formData.email.trim() || !formData.username.trim() || !formData.password.trim() || !formData.confirmPassword.trim() || !formData.dateOfBirth.trim()) {
            toast.error('Please fill in all fields');
            return;
        }
        //validate password
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        //whether the user is 18 years or older
        if (new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() < 18) {
            toast.error('You must be 18 years or older to register');
            return;
        }
        //sanitize form data
        Object.entries(formData).forEach(([key, value]) => {
            const sanitizedValue = DOMPurify.sanitize(value);
            if (value !== sanitizedValue) {
                toast.error(`Are you trying to hack me in ${key}? `);
                return;
            }
        });


        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success('Registration successful');
                setTimeout(() => {
                    onSuccessfulRegistration();
                }, 1000);
            })
            .catch((error) => {
                toast.error('Registration failed, this is embarrassing');
            });

    };

    return (
        <div className='w-full max-w-md mx-auto mt-8 p-10 bg-slate-200 rounded-lg transition-opacity duration-500 opacity-100'>
            <div>
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-600">Registration Form</h1>
            </div>
            <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-4">
                <Toaster />

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
                        yearDropdownItemNumber={115}
                        scrollableYearDropdown={true}
                        minDate={new Date("01/01/1902")}
                        maxDate={new Date()}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-slate-800 hover:bg-slate-600 duration-75 ease-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    );
};

export default RegistrationForm;
