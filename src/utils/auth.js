import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import serverUrl from "../utils/serverUrl"

const { REACT_APP_NAME } = process.env;

axios.defaults.baseURL = serverUrl;

const setAuthHeaders = () => {
  const token = Cookies.get(`${REACT_APP_NAME}-auth-token`);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  } else {
    return false;
  }
};

const userContext = async () => {
  setAuthHeaders();
  try {
    return data = await axios.get("/auth/me");
  } catch (e) {
    console.log({ message: e.message, stack: e.stack });
    return null;
  }
};

const login = async (credentials) => {
  try {
    const data = await axios.post(
      `${serverUrl}/auth/login`,
      {
        ...credentials,
      }
    );
    const token = data.headers["x-authorization-token"];
    if (token) {
      Cookies.set(`${REACT_APP_NAME}-auth-token`, token);
      return true;
    } else {
      throw new Error(`Login failed`);
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

const decodeToken = () => {
  const token = Cookies.get(`${REACT_APP_NAME}-auth-token`);
  let decodedToken;
  try {
    if (token) {
      decodedToken = jwt.decode(token);
    }
  } catch (error) {
    console.log(error.message);
  }
  return decodedToken;
};

const logout = () => {
  Cookies.remove(`${REACT_APP_NAME}-auth-token`);
};

export {
  axios as client,
  logout,
  userContext,
  setAuthHeaders,
  login,
  decodeToken,
};
