import { jwtDecode } from "jwt-decode";

class AuthService {
  loggedIn() {
    const token = this.getToken();
    return token;
  }

  getToken(): string {
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  getProfile() {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<{ id: string; username: string }>(token);
        return decoded;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
