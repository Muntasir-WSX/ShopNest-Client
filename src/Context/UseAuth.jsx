import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider"; // আপনার পাথ অনুযায়ী

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default useAuth;