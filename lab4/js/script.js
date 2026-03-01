
document.getElementById("zipCode").addEventListener("change", loadCity);
document.getElementById("state").addEventListener("change", loadCounties);
document.getElementById("username").addEventListener("input", checkUsername);
document.getElementById("password").addEventListener("focus", suggestPassword);
document.getElementById("submitBtn").addEventListener("click", validateForm);

loadStates();

function setMessage(element, message, className) {
    element.textContent = message;
    element.className = className;
}

async function loadStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    let stateSelect = document.getElementById("state");

    let defaultOption = document.createElement("option");
    defaultOption.textContent = "-- Select State --";
    defaultOption.value = "";
    stateSelect.appendChild(defaultOption);

    for (let state of data) {
        let option = document.createElement("option");
        option.value = state.usps;
        option.textContent = state.state;
        stateSelect.appendChild(option);
    }
}

async function loadCounties() {
    let state = document.getElementById("state").value;
    let countySelect = document.getElementById("county");
    countySelect.innerHTML = "";

    let url = "https://csumb.space/api/countyListAPI.php?state=" + state;
    let response = await fetch(url);
    let data = await response.json();

    for (let county of data) {
        let option = document.createElement("option");
        option.textContent = county.county;
        countySelect.appendChild(option);
    }
}

async function loadCity() {
    let zip = document.getElementById("zipCode").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zip;

    let response = await fetch(url);
    let data = await response.json();

    if (!data || !data.city) {
        setMessage(document.getElementById("zipStatus"), "Zip code not found", "error");
        document.getElementById("city").textContent = "";
        document.getElementById("latitude").textContent = "";
        document.getElementById("longitude").textContent = "";
        return;
    }

    setMessage(document.getElementById("zipStatus"), "", "");
    document.getElementById("city").textContent = data.city;
    document.getElementById("latitude").textContent = data.latitude;
    document.getElementById("longitude").textContent = data.longitude;
}

async function checkUsername() {
    let username = document.getElementById("username").value;
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + username;

    let response = await fetch(url);
    let data = await response.json();

    if (data.available) {
        setMessage(document.getElementById("usernameStatus"), "Available", "success");
    } else {
        setMessage(document.getElementById("usernameStatus"), "Not Available", "error");
    }
}

async function suggestPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();

    document.getElementById("suggestedPassword").textContent =
        "Suggested: " + data.password;
}

function validateForm() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let retype = document.getElementById("retypePassword").value;

    if (username.length < 3) {
        setMessage(document.getElementById("formStatus"),
            "Username must be at least 3 characters",
            "error");
        return;
    }

    if (password.length < 6) {
        setMessage(document.getElementById("formStatus"),
            "Password must be at least 6 characters",
            "error");
        return;
    }

    if (password !== retype) {
        setMessage(document.getElementById("formStatus"),
            "Passwords do not match",
            "error");
        return;
    }

    setMessage(document.getElementById("formStatus"),
        "Form submitted successfully!",
        "success");
}