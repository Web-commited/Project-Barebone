'use client';

import React from "react";
import LogEntries from "@/components/LogEntries";
import Profile from "@/components/Profile";
import { Provider } from "react-redux";
import store from "@/store/store";



export default function User() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold"></h1>
            <Provider store={store}>
                <Profile />
                <LogEntries />
            </Provider>
        </div>
    );
}


