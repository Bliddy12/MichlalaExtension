document.addEventListener("DOMContentLoaded", () => {
    //Implementing saved data on fields
    chrome.storage.local.get(["id", "pass"], (result) => {
        document.getElementById('text').value = result.id;
        document.getElementById('password').value = result.pass;
    });

    //Handling login function
    document.getElementById('login').addEventListener('click', () => {
        const userId = document.getElementById("text").value;
        const password = document.getElementById("password").value;
        
        chrome.runtime.sendMessage({
            action: "login",
            url: "https://is.colman.ac.il/nidp/app/login?id=colman&sid=0&option=credential&sid=0",
            userId: userId,
            password: password
        });
    });

    //Saving new credentials
    document.getElementById('save').addEventListener('click', () => {
        const userId = document.getElementById("text").value; 
        const password = document.getElementById("password").value;
        chrome.storage.local.set({ id: userId, pass: password });
    });

    //Shortcut CTRL + M handling 
    chrome.commands.onCommand.addListener((command) => {
        const userId = document.getElementById("text").value; 
        const password = document.getElementById("password").value;
        if(command === 'login') {
            chrome.runtime.sendMessage({action: "loginShortcut",
                url: "https://is.colman.ac.il/nidp/app/login?id=colman&sid=0&option=credential&sid=0",
                userId: userId,
                password: password})
        }
    })
});
