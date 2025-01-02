import axios from "axios";
import { API } from "../API";
import Cookies from "js-cookie";
import { FailSignUpError } from "./errors";

interface SignUpResponse {
  token: string;
}

interface SignInResponse {
  token: string;
}

export class SessionsRepository {
  async sign_up(signUpData: { email: string; password: string; name: string}): Promise<{ token: string }> {
    try {
      const response = await axios.post<SignUpResponse>(API.createURL(API.URL.sign_up()), signUpData, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (response.status === 201) {
        return { token: response.data.token };
      } else {
        console.warn('Non-201 status code:', response.status);
        return { token: "" };
      }
    } catch (error: unknown) {
      console.error('Error in SessionsRepository sign_up:', error);
      throw new FailSignUpError('Failed to sign up');
    }
  }

  async log_in(signInData: { email: string; password: string }): Promise<{ token: string }> {
    try {
      const response = await axios.post<SignInResponse>(API.createURL(API.URL.log_in()), signInData, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 7 }); // トークンをCookieに7日間保存
        return { token };
      } else {
        console.warn("Non-200 status code:", response.status);
        return { token: "" };
      }
    } catch (error: unknown) {
      console.error("Error in SessionsRepository log_in:", error);
      throw new FailSignUpError("Failed to sign in");
    }
  }
}