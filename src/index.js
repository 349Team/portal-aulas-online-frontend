import React from "react";
import ReactDOM from "react-dom/client"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

// app
import DefaultRoutes from "./routes"

const root = document.querySelector("#root")
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <DefaultRoutes />
    </React.StrictMode>
);