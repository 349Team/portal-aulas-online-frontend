import ReactDOM from "react-dom/client"

// app
import App from "./App"
import LoginScreen from "./LoginScreen"
import RegisterScreen from "./RegisterScreen"

const root = document.querySelector("#root")
ReactDOM.createRoot(root).render(<RegisterScreen />)