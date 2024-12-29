// utils/browserCheck.js

export function isXverseBrowser() {
    // 1. URL param approach
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('inXverse')) {
        return true;
      }
    }
  
    // 2. Check global object
    if (typeof window !== 'undefined' && window?.bitcoin?.isXverse) {
      return true;
    }
  
    // 3. (Optional) User-Agent check
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent || '';
      if (/Xverse/i.test(ua)) return true;
    }
  
    // If none match, assume not in Xverse
    return false;
  }
  