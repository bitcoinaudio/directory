// src/utils/browserCheck.js
export function isXverseBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log('userAgent', userAgent);
    // Example: Check for a unique part of the Xverse user agent string
    return userAgent.includes("xverse");
}