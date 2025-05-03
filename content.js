function checkAndRedirect() {
    const url = window.location.href;
    if (url.includes("youtube.com/shorts/")) {
      window.location.replace("https://www.youtube.com/");
    }
    if (url.includes("instagram.com/reels/")) {
      window.location.replace("https://www.instagram.com/");
    }
  }
  
  chrome.storage.sync.get("blockerEnabled", (data) => {
    if (data.blockerEnabled === false) return; // do nothing if disabled
  
    const observer = new MutationObserver(() => {
      checkAndRedirect();
    });
  
    observer.observe(document, { subtree: true, childList: true });
    checkAndRedirect();
  });
  