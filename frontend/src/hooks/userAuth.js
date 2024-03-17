import { useSelector } from "react-redux";

export function useAuth() {
    const {user, accessToken, refreshToken} = useSelector(state => state.user)

    return {
        isAuth: !!accessToken,
        user,
        accessToken,
        refreshToken
    }
};