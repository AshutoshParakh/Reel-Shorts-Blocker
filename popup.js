const toggleButton = document.getElementById("toggle");

chrome.storage.sync.get("blockerEnabled", (data) => {
  const enabled = data.blockerEnabled !== false; // default to true
  toggleButton.textContent = enabled ? "Disable Blocker" : "Enable Blocker";
});

toggleButton.addEventListener("click", () => {
  chrome.storage.sync.get("blockerEnabled", (data) => {
    const enabled = data.blockerEnabled !== false;
    const newState = !enabled;

    chrome.storage.sync.set({ blockerEnabled: newState });

    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: newState ? ["ruleset_1"] : [],
      disableRulesetIds: newState ? [] : ["ruleset_1"]
    });

    toggleButton.textContent = newState ? "Disable Blocker" : "Enable Blocker";
  });
});
