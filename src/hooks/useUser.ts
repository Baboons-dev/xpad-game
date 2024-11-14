import { GetUser, twitterSave } from "@/api/apiCalls/user";
import { useSelector } from "@/store";
import { message } from "antd";

const useUser = () => {
  const setAccessToken = useSelector.use.setAccessToken();
  const setRefreshToken = useSelector.use.setRefreshToken();
  const logoutUser = useSelector.use.logoutUser();
  const setUser = useSelector.use.setUser();

  const loginTwitter = async (payload: {
    state: string;
    code: string;
    tgId: string;
    tId: string;
    codeVerifier?: string;
  }) => {
    try {
      const res = await twitterSave(payload);
      console.log("res final login", res);
      if (res.data) {
        message.success("Login Success");
        localStorage.setItem("token", res.data.data.access);
        localStorage.setItem("refreshToken", res.data.data.refresh);
        setAccessToken(res.data.data.access as string);
        setRefreshToken(res.data.data.refresh as string);
        setTimeout(async () => {
          await getCurrentUser();
        }, 500);
        return true;
      }
    } catch (error) {
      console.error("error login", error);
      message.error("Something went wrong");
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await GetUser();
      // console.log('userrr refresh', res);
      setUser(res.data);
    } catch (error) {
      logout();
      console.error("error getCurrentUser", error);
    }
  };

  const logout = () => {
    logoutUser();
    localStorage.removeItem("token");
    console.log("logout");
  };

  return {
    logout,
    getCurrentUser,
    loginTwitter,
  };
};

export default useUser;
