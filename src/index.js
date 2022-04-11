import React from 'react';
import ReactDOMClient from 'react-dom/client';

import App from "./components/app";
import "./index.css";


let allTasks = [
    {
        description: "Completed task",
        id: 1,
        status: "completed",
        statusBeforeEditing: "completed",
        created: new Date(Date.now())
    },
    {
        description: "Editing task",
        id: 2,
        status: "editing",
        statusBeforeEditing: "",
        created: new Date(Date.now())
    },
    {
        description: "Active task",
        id: 3,
        status: "",
        statusBeforeEditing: "",
        created: new Date(Date.now())
    },
];

let filters = [
    { id: "q1", selected: true, content: "All" },
    { id: "q2", selected: false, content: "Active" },
    { id: "q3", selected: false, content: "Completed" },
];

const rootContainer = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootContainer);
root.render(<App allTasks={allTasks} filters={filters}/>);