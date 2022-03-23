import { ApiService } from "./service/api.service.js";

const signInForm = document.getElementById("signInForm");
const wrapperException = document.querySelector(".wrapper__exception");
const apiService = new ApiService();

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    try {
        const response = await apiService.apiCall("/signin/", "POST", JSON.stringify({username, password}));

        if(response.error) {
            wrapperException.style.border = "1px solid red";
            wrapperException.innerHTML = response.error;
        } else {
            wrapperException.style.border = "1px solid green";
            wrapperException.innerHTML = response.message;

            window.location.href = "/users";
        }

        e.target[0].value = "";
        e.target[1].value = "";
    } catch {
        wrapperException.style.border = "1px solid red";
        wrapperException.innerHTML = "Some error ...";
    }
});
