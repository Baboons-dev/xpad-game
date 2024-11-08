
import {
    GetUser, twitterSave
} from '@/api/apiCalls/user';
import {
    login as _login,
    logout as _logout,
    setUser,
} from '../redux/reducer';
import {useDispatch, useSelector} from "react-redux";

const useUser = () => {
    const dispatch = useDispatch();

    const loginTwitter = async (payload: { state: string, code: string,tgId:string,tId:string }) => {
        try {
            const res = await twitterSave(payload)
            console.log('res final login', res);
            if (res.data) {
                localStorage.setItem('token', res.data.data.access);
                localStorage.setItem('refreshToken', res.data.data.refresh);
                setTimeout(async () => {
                    const currentUser = await GetUser();
                    if (currentUser) {
                        dispatch(
                            _login({
                                isAuthenticated: true,
                                refreshToken: res.data.data.access,
                                token: res.data.data.access,
                                user: currentUser.data
                            }),
                        );
                        // message.success('Login success');
                    }
                }, 500)
                return true;
            }

        } catch (error) {
            console.error('error login', error);
            // message.error('Something went wrong');
        }
    };

    const getCurrentUser = async () => {
        try {
            const res = await GetUser();
            // console.log('userrr refresh', res);
            dispatch(setUser(res.data));
        } catch (error) {
            console.error('error getCurrentUser', error);
        }
    };


    const logout = () => {
        dispatch(_logout());
        localStorage.removeItem('token');
        console.log('logout');
    };


    return {
        logout,
        getCurrentUser,
        loginTwitter
    };
};

export default useUser;
