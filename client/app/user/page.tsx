'use client';

import React from "react";
import UserList from "@/components/UserList";
import { Provider } from "react-redux";
import store from "@/store/store";



export default function User() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">BackBone</h1>
            <Provider store={store}>
                <UserList />
            </Provider>

        </div>
    );
}


