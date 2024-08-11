import { useState, useEffect } from "react";
import { cookies } from "next/headers";

// Validate cookie name and value
function isValidCookieName(name) {
  return typeof name === 'string' && /^[a-zA-Z0-9-_]+$/.test(name);
}

function isValidCookieValue(value) {
  return typeof value === 'string' && value.length > 0;
}

// Set a persistent cookie
export function setPersistentCookie(name, value) {
  if (!isValidCookieName(name) || !isValidCookieValue(value)) {
    throw new Error("Invalid cookie name or value");
  }

  cookies().set(name, value, {
    httpOnly: true, // Secure the cookie by making it inaccessible from client-side JavaScript
    secure: true, // Only send the cookie over HTTPS
    maxAge: 31536000, // Set expiration to one year (in seconds)
    path: "/", // Make the cookie available on all paths
  });
}

// Get a cookie value
export function getCookieValue(name) {
  if (!isValidCookieName(name)) {
    throw new Error("Invalid cookie name");
  }
  return cookies().get(name);
}

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const consent = cookies().get("cookieConsent");
    if (String(consent) === "accepted") {
      setShowBanner(false);
    }
  }, []);

  const handleAcceptAll = () => {
    // Set all cookies
    setPersistentCookie("cookieConsent", "accepted");
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div>
        <p>We use cookies to improve your experience. By using our site, you accept our use of cookies.</p>
        <button onClick={handleAcceptAll}>Accept All</button>
      </div>
    )
  );
}

export default CookieBanner;