import { jwtDecode } from "jwt-decode";

export function setJWTWithExpiry(key: string, token: string) {
  const decoded: any = jwtDecode(token);

  // Get expiry from token payload (converted to milliseconds)
  const expiry = decoded.exp * 1000;

  const item = {
    token,
    expiry,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

function getDecodedJWTIfValid(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = Date.now();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    const decoded = jwtDecode(item.token);
    return decoded;
  } catch (err) {
    console.error("JWT error:", err);
    localStorage.removeItem(key);
    return null;
  }
}

export function getRawJWT(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  return item.token;
}

export function clearJWT(key: string) {
  localStorage.removeItem(key);
}

export const token = localStorage.getItem("authToken");
export const userLoginInfo: any = getDecodedJWTIfValid("authToken");
