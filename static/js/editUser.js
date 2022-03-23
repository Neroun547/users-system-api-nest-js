import { ApiService } from "./service/api.service.js";

const editUserForm = document.getElementById("editUserForm");
const wrapperException = document.querySelector(".wrapper__exception");
const apiService = new ApiService();

editUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    const idUser = window.location.pathname.replace("/users/edit-user-form/", "");

    try {
        const response = await apiService.apiCall(`/users/edit-user/${idUser}`, "PUT", JSON.stringify({ username, password }));

        if(response.error) {
            wrapperException.style.border = "1px solid red";
            wrapperException.innerHTML = response.error;
        } else {
            wrapperException.style.border = "1px solid green";
            wrapperException.innerHTML = response.message;
        }

        e.target[0].value = "";
        e.target[1].value = "";
    } catch {
        wrapperException.style.border = "1px solid red";
        wrapperException.innerHTML = "Some error ...";
    }
});
