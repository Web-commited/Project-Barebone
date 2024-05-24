"use client";
import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import UserList from '../components/UserList';


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">BackBone</h1>
      <RegistrationForm />
      <UserList />
    </main>
  );
}
