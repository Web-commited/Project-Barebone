"use client";
import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import LoginForm from '@/components/LoginForm';
import UserList from '../components/UserList';



export default function Home() {
  const onLogin = () => {
    console.log('login');
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">BackBone</h1>
      <RegistrationForm />
      <LoginForm onLogin={onLogin} />
      <UserList />
    </main>
  );
}
