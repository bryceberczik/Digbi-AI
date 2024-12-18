import { jwtDecode } from "jwt-decode";

class AuthService {
  // Check if the user is logged in by retrieving the token from localStorage
  loggedIn() {
    const token = this.getToken();
    return token;
  }

  // Retrieve the JWT token from localStorage
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

  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Remove the JWT token from localStorage and redirect to the home page
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

// Export an instance of the AuthService class
export default new AuthService();
