"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Home() {
  const [message, setMessage] = useState({});
  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setMessage(response.data)
        console.log(response.data)
      });
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello from React</h1>
    </main>
  );
}
