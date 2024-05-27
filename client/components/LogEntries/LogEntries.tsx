import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import toast, { Toaster } from 'react-hot-toast';


interface LogEntry {
    id: number;
    username: string;
    actionType: string;
    timestamp: string;
    metadata: any;
}


const LogList: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const username = useSelector((state: RootState) => state.auth.userId);
    const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
    const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

    //toggle expands every log entry

    const toggleExpand = (id: number) => {
        setExpandedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;

        })
    }
    useEffect(() => {
        //fetch log entries, token is required
        const fetchData = async () => {
            try {
                const response = await axios.get<LogEntry[]>(`http://localhost:3001/logs/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLogEntries(response.data);
            } catch (error) {
                toast.error('Failed to fetch logs');
            }
        };

        if (token) {
            fetchData();
        }
    }, []);
    return (
        <div className="space-y-4 absolute left-10 top-40">
            {logEntries.map((entry) => (
                <div
                    key={entry.id}
                    className="border border-gray-300 p-4 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 w-96"
                    onClick={() => toggleExpand(entry.id)}
                >
                    <p><strong>Action Type:</strong> {entry.actionType}</p>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out w-60 ${expandedIds.has(entry.id) ? 'max-h-screen' : 'max-h-0'
                            }`}
                    >
                        {expandedIds.has(entry.id) && (
                            <ul>
                                <li><strong>Username:</strong> {entry.username}</li>
                                <li><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</li>
                                <li><strong>Metadata:</strong> {entry.metadata ? JSON.stringify(entry.metadata) : 'None'}</li>
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LogList;



