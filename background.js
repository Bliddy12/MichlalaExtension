chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "login" || request.action === 'loginShortcut') {
        chrome.tabs.create({ url: request.url }, (tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: autoLogin,
                args: [request.userId, request.password]
            });
        });
        setTimeout(() => {
            chrome.tabs.create({ url: "https://www.colman.ac.il/privatearea/students/" });
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    if (tab.url === "https://is.colman.ac.il/nidp/portal?locale=en_US") {
                        chrome.tabs.remove(tab.id, () => {});
                    }
                });
            });
        }, 1500);

    }
});

function autoLogin(userId, password) {

    const userField = document.querySelector('input[name="Ecom_User_ID"]');
    const passField = document.querySelector('input[name="Ecom_Password"]');
    const loginButton = document.querySelector('button[name="loginButton2"]');

    if (userField && passField && loginButton) {
        userField.value = userId;
        passField.value = password;
        loginButton.click();
    }
}