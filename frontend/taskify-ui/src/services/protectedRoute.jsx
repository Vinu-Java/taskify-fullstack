import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./auth";

const ProtectedRoute = ({ children }) => {

    const loggedIn =  isLoggedIn();

    if (!loggedIn) {
        return (<Navigate to="/login" replace />);
    }

    return children;
}

export default ProtectedRoute;
