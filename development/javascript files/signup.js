// class to signup
class SignUpForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();

        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        this.signUp({
            firstName,
            lastName,
            username,
            email,
            password
        });
    }

    signUp(userData) {
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                // alert for successsful signup
                const alertDiv = document.createElement('div');
                alertDiv.className = 'success bg-green-500 text-white rounded p-4 mb-2 fixed top-0 left-0 right-0 text-center';
                alertDiv.textContent = 'Signup successful!';
                document.body.appendChild(alertDiv);

                // remove alert after 3 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

// Initialize SignUpForm
const signUpForm = new SignUpForm('signUpForm');