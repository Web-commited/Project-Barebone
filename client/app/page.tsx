"use client";
import React, { useState } from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import LoginForm from '@/components/LoginForm';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';



export default function Home() {
  const [componentDisplay, setComponentDisplay] = useState('default')
  const [fade, setFade] = useState(true);

  const handleClick = (component: 'login' | 'register' | 'default') => {
    setFade(false);
    setTimeout(() => {
      setComponentDisplay(component);
      setFade(true);
    }, 500);
  };

  const renderComponent = () => {
    switch (componentDisplay) {
      case 'login':
        return <LoginForm onLogin={onLogin} />;
      case 'register':
        return <RegistrationForm />;
      default:
        return <div>Start By clicking one of the Buttons</div>;
    }
  }
  const onLogin = () => {
    router.push('/user');
  }
  const router = useRouter();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">BackBone</h1>
      <Provider store={store}>
        <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {renderComponent()}
        </div>
        <div className="flex justify-between w-1/2">
          <button onClick={() => handleClick('login')} className="bg-slate-800 hover:bg-slate-600 duration-75 ease-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
          <button onClick={() => handleClick('register')} className="bg-slate-800 hover:bg-slate-600 duration-75 ease-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
        </div>
      </Provider>
    </main>
  );
}
