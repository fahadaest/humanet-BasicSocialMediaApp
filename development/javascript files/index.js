// shoow all user on console log just to help login to different accounts
class UserFetcher {
    constructor(url) {
        this.url = url;
    }
    fetchUsers() {
        fetch(this.url)
            .then(res => res.json())
            .then(data => {
                const allUsers = data.users;
                allUsers.forEach(user => {
                    console.log("User: ", user.id);
                    console.log("Username: ", user.username);
                    console.log("password: ", user.password);
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }
}
const userFetcher = new UserFetcher('https://dummyjson.com/users');
userFetcher.fetchUsers();


// login user
class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.loginButton = document.getElementById('loginButton');
        this.loginButton.addEventListener('click', this.loginUser.bind(this));
    }

    async loginUser(event) {
        event.preventDefault();

        try {
            const username = this.usernameInput.value;
            const password = this.passwordInput.value;

            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    expiresInMins: 1000,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Response: ", data);

            // store user info to local storage
            localStorage.setItem("token", data.token);
            localStorage.setItem("image", data.image);
            localStorage.setItem("firstName", data.firstName);
            localStorage.setItem("lastName", data.lastName);
            localStorage.setItem("email", data.email);
            localStorage.setItem("username", data.username);
            localStorage.setItem("id", data.id);

            // alert for successsful login
            const alertDiv = document.createElement('div');
            alertDiv.className = 'success bg-green-500 text-white rounded p-4 mb-2 fixed top-0 left-0 right-0 text-center';
            alertDiv.textContent = 'Signup successful!';
            document.body.appendChild(alertDiv);

            // remove alert after 1 seconds
            setTimeout(() => {
                alertDiv.remove();
                window.location.href = '/development/html pages/feed.html';
            }, 1000);

        } catch (error) {
            // alert for wrong credentials
            const alertDiv = document.createElement('div');
            alertDiv.className = 'success bg-red-500 text-white rounded p-4 mb-2 fixed top-0 left-0 right-0 text-center';
            alertDiv.textContent = 'Invalid Credentials';
            document.body.appendChild(alertDiv);

            // remove alert after 3 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);

            console.error("There was a problem with the fetch operation:", error);
        }
    }
}
const loginForm = new LoginForm();