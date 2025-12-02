"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
const react_1 = require("react");
const getProfile_1 = require("../api/profile/getProfile");
const AuthContext = (0, react_1.createContext)(null);
function AuthProvider({ children }) {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const fetchProfile = async () => {
        const token = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
        if (!token) {
            // ❌ ไม่มี token = ยังไม่ได้ login
            setUser(null);
            setLoading(false);
            return;
        }
        // ✔ มี token → ดึง profile
        const data = await (0, getProfile_1.getProfile)();
        setUser(data);
        setLoading(false);
    };
    (0, react_1.useEffect)(() => {
        fetchProfile();
    }, []);
    return (<AuthContext.Provider value={{ user, loading, refreshProfile: fetchProfile }}>
            {children}
        </AuthContext.Provider>);
}
function useAuth() {
    const ctx = (0, react_1.useContext)(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
