import { ApiService } from "./service/api.service.js";
import { createElement } from "./common/createElement.js";

const wrapperUsersItem = document.querySelectorAll(".wrapper__users-item"); 
const deleteUsersBtn = document.querySelectorAll(".wrapper__users-item-delete-btn");
const countUsersLogo = document.querySelector(".count__users");
const loadMoreBtn = document.getElementById("loadMoreUsersBtn");
const wrapperUsers = document.querySelector(".wrapper__users");
const apiService = new ApiService();
let countUsers = 0;

for(let i = 0; i < wrapperUsersItem.length; i++) {
    deleteUsersBtn[i].onclick = async function() {
        await apiService.apiCall(`/users/delete-user/${this.getAttribute("id")}`, "DELETE");
        this.parentElement.remove();
        countUsers-=1;

        countUsersLogo.textContent = String(Number(countUsersLogo.textContent) - 1);
    };
};

loadMoreBtn.addEventListener("click", async () => {
    countUsers+=5;
    const response = await apiService.apiCall(`/users/load-more/${countUsers}`, "GET");

    if(response.message.length < 5) {
        loadMoreBtn.remove();
    }

    response.message.forEach(el => {
        const wrapperUsersItem = createElement(wrapperUsers, "div", { class: "wrapper__users-item" });
        
        const wrapperUserItemUsername = createElement(wrapperUsersItem, "div", { class: "wrapper__user-item-username" });
        createElement(wrapperUserItemUsername, "span").innerHTML = "Username: ";
        createElement(wrapperUserItemUsername, "span").innerHTML = el.username;

        const wrapperUserItemPassword = createElement(wrapperUsersItem, "div", { class: "wrapper__user-item-password" });
        createElement(wrapperUserItemPassword, "span").innerHTML = "Password: ";
        createElement(wrapperUserItemPassword, "span").innerHTML = el.password;

        const linkEditBtn = createElement(wrapperUsersItem, "a", { href: `/users/edit-user-form/${el._id}` });
        createElement(linkEditBtn, "button", { class: "wrapper__users-item-edit-btn" }).innerHTML = "Edit";

        const deleteBtn = createElement(wrapperUsersItem, "button", { class: "wrapper__users-item-delete-btn", id: el._id });
        deleteBtn.innerHTML = "Delete";

        deleteBtn.onclick = async function() {
            await apiService.apiCall(`/users/delete-user/${this.getAttribute("id")}`, "DELETE");
            this.parentElement.remove();
            countUsers-=1;
    
            countUsersLogo.textContent = String(Number(countUsersLogo.textContent) - 1);
        }
    });
});
