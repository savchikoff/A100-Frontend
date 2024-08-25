import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const useCurrentUser = () => {
    const [user, setUser] = useLocalStorage<string>("username", "");

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem("username");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [user, setUser]);

    return {
        user,
        setUser,
    };
};

export { useCurrentUser };
