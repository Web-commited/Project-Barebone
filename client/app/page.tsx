"use client";
import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import LoginForm from '@/components/LoginForm';
import UserList from '../components/UserList';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';



export default function Home() {
  const onLogin = () => {
    router.push('/user');
  }
  const router = useRouter();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">BackBone</h1>
      <Provider store={store}>
        <RegistrationForm />
        <LoginForm onLogin={onLogin} />
        <UserList />
      </Provider>
    </main>
  );
}
