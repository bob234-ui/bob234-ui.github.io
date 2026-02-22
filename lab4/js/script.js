let zipElement = document.querySelector("#zipCode");

zipElement.addEventListener("change", displayCity);
let availableElement = document.querySelector("#username");
availableElement.addEventListener("change", usernameCheck);
displayStates();
async function displayStates(){
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error accessing API endpoint")
            }
        const data = await response.json();
        console.log(data);
        //alert(data[0].state);

        for (let i of data){
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            optionEl.value = i.usps;

            document.querySelector("#state").append(optionEl);

        }

        } catch (err) {
                if (err instanceof TypeError) {
                    alert("Error accessing API endpoint (network failure)");
                } else {
                    alert(err.message);
                }
        } //catch    
}

usernameCheck();
async function usernameCheck(){
    let username = availableElement.value;
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + username;
    try {
        const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error accessing API endpoint")
            }
        const username = await response.json();
        console.log(username);
        if (username.available == true) {
            document.querySelector("#usernameStatus").textContent = "Username is available";
            document.querySelector("#username").textContent = username.username;

        } else {
            document.querySelector("#usernameStatus").textContent = "Username is not available";
            document.querySelector("#username").textContent = username.username;

        }
        

        } catch (err) {
                if (err instanceof TypeError) {
                    alert("Error accessing API endpoint (network failure)");
                } else {
                    alert(err.message);
                }

   }
}
displayCity();
async function displayCity(){
    //alert("displaying city...")
    let zipCode = zipElement.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    //alert(data.city);
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}

let passwordElement = document.querySelector("#password");
passwordElement.addEventListener("focus", suggestedPassword);

async function suggestedPassword(){ 
    try {
        let url = "https://csumb.space/api/suggestedPassword.php?length=8";  
        const response = await fetch(url);
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        document.querySelector("#suggestedPassword").textContent = data.password;
    } catch (err) {
        console.error(err);
        document.querySelector("#suggestedPassword").textContent = "Error generating";
    }
}

