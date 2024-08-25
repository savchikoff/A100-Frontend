import { Navigate } from "react-router-dom";
import CyberManChat from "../../components/CyberManChat/CyberManChat";

const CyberManChatPage = () => {

    const user = localStorage.getItem("username");

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <CyberManChat />
}

export default CyberManChatPage;