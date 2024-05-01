// const { data } = require("autoprefixer");

// ---------------------------------------------------------------------------------------------------------------------------  Load Functions
document.addEventListener('DOMContentLoaded', async function () {
    peopleSuggestions();
    loadUser();
    getCurrentAuthUser();
});

// ---------------------------------------------------------------------------------------------------------------------------  My Profile Navbar
// show my profile on navbar
function getCurrentAuthUser() {
    const token = localStorage.getItem("token");
    fetch(`https://dummyjson.com/auth/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.image)

            // div for showing user data in navbar
            const navIntro = `
                              <div>
                                 <img class="h-10" src=${data.image} alt="">
                              </div>
                              <div class="text-sm px-2">
                                 <p class="font-bold">${data.firstName} ${data.lastName}</p>
                                 <p>${data.company.title}</p>
                              </div>`
            const navIntoData = document.querySelector('.nav-user-profile-data');
            navIntoData.innerHTML = navIntro;
        });
}


// ---------------------------------------------------------------------------------------------------------------------------  SIGN OUT
// signout class
class SignOut {
    constructor() {
        this.itemsToRemove = ["token", "image", "firstName", "lastName", "email", "username", "id"];
    }

    removeItems() {
        this.itemsToRemove.forEach(item => {
            localStorage.removeItem(item);
        });
    }

    redirectToLoginPage() {
        window.location.href = '../../index.html';
    }

    signOut() {
        this.removeItems();
        this.redirectToLoginPage();
    }
}

// Create an instance of the SignOut class
const signOutInstance = new SignOut();

// Add event listener to the "Sign Out" button
const signOutButton = document.getElementById('sign-out-button');
signOutButton.addEventListener('click', () => {
    signOutInstance.signOut();
});


// ---------------------------------------------------------------------------------------------------------------------------- Generate Random Image
// generate random image
function generateRandomImageLink() {
    var randomNumber = Math.floor(Math.random() * 1000); // Generate a random number
    var url = `https://source.unsplash.com/random/500x300?${randomNumber}`; // Append random number as query parameter
    return url;
}


// ----------------------------------------------------------------------------------------------------------------------------Navbar profile drop down
// function to show dropdown in navbar
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}


// ---------------------------------------------------------------------------------------------------------------------------  Load User Profile Data
//Check Authenticated user and load User Data
function loadUser() {

    try {
        // fetch auth user data
        const id = localStorage.getItem("user profile id");
        console.log(id)

        fetch(`https://dummyjson.com/users/${id}`)


            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                const currentUser = data;

                const loggedInUserImg = localStorage.getItem("image");


                var imgElementNav = document.querySelector('.nav-user-image');
                imgElementNav.src = `${loggedInUserImg}`;



                // load bio data
                const myBio = `
                <div class="h-[50%] w-full">

                <img class="w-full h-full object-cover" src="https://source.unsplash.com/random/500x250" alt="">

            </div>

            <div class="relative h-[25%] w-full flex items-center justify-around ">

                <div class="w-[15%]">

                    <button
                        class="user-image-button absolute bottom-2 left-0 bg-gray-200 h-[20vh] w-[20vh] rounded-lg flex items-center justify-center ml-10">
                        <img class="h-full w-full" src="${currentUser.image}" alt="">
                    </button>

                </div>


                <div class=" h-full w-[40%] px-5 py-4 bio-username">

                    <p id='fullName' class="font-bold text-xl bio-name">${currentUser.firstName} ${currentUser.lastName}</p>
                    <p>Username: ${currentUser.username}</p>

                </div>

                <div class="h-full w-[30%] flex items-center justify-center">
                </div>
            </div>

            <div class="h-[25%] w-full flex flex-col items-center justify-center">

                <div class="w-[90%] h-[50%] flex items-center border-b border-gray-300 bottom-icons-div">

                    <div class="flex px-3 py-3 bio-bottom-per-div">
                        <img class="h-4 mt-1 mr-2 bio-bottom-img" src="/logo/portfolio.png" alt="">
                        <p class="mr-7 text-gray-500 bio-bottom-div-text">${currentUser.company.title}</p>
                    </div>

                    <div class="flex px-3 py-3 bio-bottom-per-div">
                        <img class="h-4 mt-1 mr-2 bio-bottom-img" src="/logo/location.png" alt="">
                        <p class="mr-7 text-gray-500 bio-bottom-div-text">${currentUser.address.city}, ${currentUser.address.state}</p>
                    </div>

                    <div class="flex px-3 py-3 bio-bottom-per-div">
                        <img class="h-4 mt-1 mr-2 bio-bottom-img" src="/logo/calendar.png" alt="">
                        <p class="mr-7 text-gray-500 bio-bottom-div-text">Age: ${currentUser.age}</p>
                    </div>

                </div>

                <div class="w-[90%] h-[50%]">

                    <ul class="h-full flex items-center justify-around ">

                        <li><a class="text-sm font-bold bio-down-menu-items" href="#">Posts</a></li>

                        </li>

                        <li class="text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </li>

                        <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">About</a>

                        <li class="text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </li>

                        <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Connections</a></li>

                        <li class="text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </li>

                        <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Media</a></li>

                        <li class="text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-line    join="round" stroke-width="2"
                                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </li>

                        <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Activity</a></li>

                    </ul>

                </div>

                            </div>`
                document.querySelector('.user-bio-div').insertAdjacentHTML('beforeend', myBio);


                // load about data
                const about = `
                <p class="font-bold items-start text-xl mb-3">About</p>
                    <p class="items-start text-md mb-5">Hi, i am a ${currentUser.company.title} at ${currentUser.company.department} department in ${currentUser.company.name}, ${currentUser.company.address.address}, ${currentUser.company.address.city}</p>

                    <span class="flex items-center mt-2">
                        <p class="items-start text-sm mr-2 about-content">Born: </p>
                        <p class="items-start text-sm font-bold about-content">${currentUser.birthDate}</p>
                    </span>

                    <span class="flex items-center mt-2">
                        <p class="items-start text-sm mr-2 about-content">Gender: </p>
                        <p class="items-start text-sm font-bold about-content">${currentUser.gender}</p>
                    </span>

                    <span class="flex items-center mt-2">
                        <p class="items-start text-sm mr-2 about-content">Email: </p>
                        <p class="items-start text-sm font-bold about-content">${currentUser.email}</p>
                            </span>`
                document.querySelector('.about-div').insertAdjacentHTML('beforeend', about);


                // load posts
                const id = localStorage.getItem("user profile id");
                fetch(`https://dummyjson.com/posts/user/${id}`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return res.json();
                    })
                    .then(data => {
                        const posts = data.posts;
                        posts.forEach(post => {
                            const urlImg = generateRandomImageLink();
                            const myImg = localStorage.getItem("image");
                            console.log(myImg)

                            // my posts
                            const myPosts = `<!-- post div-->
                     <div class="h-[auto] w-full bg-white mb-4 flex flex-col items-center justify-center posts-container border-4">
    
                    <!-- post head -->
                    <div class="h-[10vh] w-[93%] mt-3  flex justify-between">
                        <div class="h-[10vh] w-[50vh] flex">
                            <div class="h-[100%] w-[auto] flex items-center">
                                <a href="#" class="w-[100%] flex ">
                                    <img class="h-[6vh]" src="${currentUser.image}" alt="">
                                </a>
                            </div>
                            <div class="h-[100%] w-[80%] flex flex-col justify-center ml-3">
                                <p>${currentUser.firstName} ${currentUser.lastName} - <span class="text-xs">3 min</span></p>
                                <p class="text-xs">${currentUser.company.title}</p>
                            </div>
                        </div>
                        <div class="h-[10vh] w-[auto] flex items-center">
                            <button class=" px-3 py-1 rounded-md text-sm flex">
                                <img class="h-5" src="/logo/post-menu.png" alt="">
                            </button>
                        </div>
                    </div>
    
                    <!-- post caption -->
                    <div class=" h-auto w-[93%] flex items-center">
                        <div class="mt-2 mb-5">
                            <p class="text-sm ">${post.body}</p>
                        </div>
                    </div>
    
                    <!-- post img -->
                    <div class="flex items-center justify-center w-[95%]">
                        <img class="w-[100%] h-[auto]" id="postImage" src="${urlImg}" alt="Fetched Image"s>
                    </div>
    
                    <!-- post likes etc -->
                    <div class=" h-[5vh] w-[93%] flex items-center justify-between mb-2">
    
                        <div class=" h-full w-auto flex items-center justify-between">
    
                            <div class=" h-full w-auto flex items-center justify-center mr-5">
                                <img class="h-4 mr-1" src="../../logo/like.png" alt="">
                                <p> ${post.reactions} Likes</p>
                            </div>
    
                            <div class=" h-full w-auto flex items-center justify-center">
                                <img class="h-5 mr-1" src="/logo/comment.png" alt="">
                                <p>Comments</p>
                            </div>
    
                        </div>
    
                        <div class=" h-full w-auto flex items-center justify-center">
                            <img class="h-4 mr-1" src="/logo/share.png" alt="">
                            <p>Shares</p>
                        </div>
                    </div>
    

                    <!-- Add comment -->
                    <div class="add-comment-${post.id} h-[7vh] w-[93%] flex items-center justify-between ">
                        <div class=" h-full w-15 ">
                            <a href="#" class="flex items-center justify-center">
                                <img class="add-com-user h-[6vh] mt-0.5 mr-2" src="${myImg}" alt="">
                            </a>
                        </div>
                        <div class="add-comments-container h-full w-full flex items-center justify-center">
                            <input class="comment-input-${post.id} w-full h-[6vh] px-5 border-[2px] outline-none focus:border-[4px]" type="text" placeholder="Add a Comment">
                            <div>
                                <button class="add-comment-button h-[6vh] px-2 bg-slate-200 hover:bg-slate-400 ">send</button>
                            </div>
                        </div>
                    </div>
    
                    <!-- Show comment -->
                    <div
                        class="comments-div-${post.id} com-div-myProfile bg-slate-200 max-h-[25vh] w-[79vh] mt-1 ml-10 mb-2 overflow-auto px border-8 border-slate-200">
    
    
                        <!-- load more comments -->
                        <div class=" h-auto w-[94%] flex justify-between mt-2 ml-2 mr-4 mb-2 comments-container">
                             <div class=" w-[10%] h-auto flex justify-center">
                             </div>
                             <div class=" w-[89%] h-auto  flex-col">
                                 <button class=" bg-white h-full w-full flex items-center justify-center">
                                     <img class="h-5 mr-2" src="/logo/post-menu.png" alt=""> Show more comments
                                 </button>
                             </div>
                         </div>
                    </div>
    
                                            </div>`
                            document.querySelector('.myPosts-div').insertAdjacentHTML('beforeend', myPosts);

                            // comments for each post
                            fetch(`https://dummyjson.com/comments/post/${post.id}`)
                                .then(res => res.json())
                                .then(data => {

                                    let com = data.comments;


                                    com.forEach(comment => {
                                        fetch(`https://dummyjson.com/users/${comment.user.id}`)
                                            .then(res => res.json())
                                            .then(data => {



                                                const currentUserId = localStorage.getItem("id");

                                                if (currentUserId == comment.user.id) {
                                                    const comMarkup = `
                                                <div class="h-auto w-[94%] flex justify-between mt-2 ml-2 mr-4 mb-4">
                                                    <div class="w-[10%] h-auto flex justify-center">
                                                        <a href="#">
                                                            <img class="h-10" src="${data.image}" alt="">
                                                        </a>
                                                    </div>
                                                    <div class="bg-white w-[89%] h-auto px-5 py-2 flex flex-col">
                                                        <span class="flex justify-between">
                                                            <p class="font-bold">${data.firstName} ${data.lastName}</p>
                                                            <p class="text-xs">9 minutes</p>
                                                        </span>
                                                        <p class="text-sm">${comment.body}</p>
                                                        <span class="flex justify-end">
                                                            <button class="edit-button rounded-md mr-3 px-3 py-1 bg-slate-200 text-xs hover:bg-slate-300">Edit</button>
                                                            <button class="delete-button rounded-md px-3 py-1 bg-slate-200 text-xs hover:bg-slate-300">Delete</button>
                                                        </span>
                                                    </div>
                                                </div>`;

                                                    document.querySelector(`.comments-div-${post.id}`).insertAdjacentHTML('afterbegin', comMarkup);


                                                    const editButton = document.querySelector(`.comments-div-${post.id} .edit-button`);
                                                    editButton.addEventListener('click', function () {
                                                        localStorage.setItem("commentId", comment.id);
                                                        editComment();
                                                    });


                                                    const deleteButton = document.querySelector(`.comments-div-${post.id} .delete-button`);
                                                    deleteButton.addEventListener('click', function () {
                                                        localStorage.setItem("commentId", comment.id);
                                                        deleteComment();
                                                    });
                                                }
                                                else {
                                                    const comMarkup =
                                                        `<div class=" h-auto w-[94%] flex justify-between mt-2 ml-2 mr-4 mb-4">
                                                           <div class=" w-[10%] h-auto flex justify-center">
                                                               <a href="#">
                                                                   <img class="h-10" src="${data.image}" alt="">
                                                               </a>
                                                           </div>
                                                           <div class="bg-white w-[89%] h-auto px-5 py-2 flex flex-col ">
                                                               <span class="flex justify-between">
                                                                   <p class="font-bold">${data.firstName} ${data.lastName}</p>
                                                                   <p class="text-xs">9 minutes</p>
                                                               </span>
                                                               <p class="text-sm">${comment.body}</p> <!-- Use 'comment.body' here -->
                                                           </div>
                                                           </div>`;
                                                    document.querySelector(`.comments-div-${post.id}`).insertAdjacentHTML('afterbegin', comMarkup);
                                                }
                                            });
                                    });
                                });


                            const addCommentButton = document.querySelector(`.add-comment-${post.id} .add-comments-container .add-comment-button`);
                            addCommentButton.addEventListener('click', function () {
                                const inputElement = document.querySelector(`.comment-input-${post.id}`);
                                const comment = inputElement.value;
                                addComment(post.id, comment);
                            });


                        })
                    })
                    .catch(error => {
                        console.error("Error fetching user posts:", error.message);
                    });
            })
            .catch(error => {
                console.error("Error fetching user data:", error.message);

                const alertDiv = document.createElement('div');
                alertDiv.className = 'success bg-red-500 text-white rounded p-4 mb-2';
                alertDiv.textContent = 'Session Expired, Login to use Home Page';
                document.body.prepend(alertDiv);

                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 3000);
            });
    }
    catch (error) {
        console.error("Error occurred:", error.message);
    }
}


// ---------------------------------------------------------------------------------------------------------------------------  Delete Comment
// Function to open delete modal
function deleteComment() {
    var dropdownContent = document.getElementById("delModal");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}

// function to delete comment
function delModal() {
    const commentId = localStorage.getItem("commentId");
    fetch(`https://dummyjson.com/comments/${commentId}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(console.log);
    document.getElementById("delModal").style.display = "none";
    localStorage.removeItem("commentId");

}

// function to clode modal
function closedelModal() {
    var dropdownContent = document.getElementById("delModal");
    dropdownContent.style.display = "none";
    localStorage.removeItem("commentId");
}


// ---------------------------------------------------------------------------------------------------------------------------  Edit comment
// Function to open edit modal
function editComment() {
    const commentId = localStorage.getItem("commentId");
    fetch(`https://dummyjson.com/comments/${commentId}`)
        .then(res => res.json())
        .then(data => {
            const comment = data.body;
            var inputElement = document.getElementById('input-comment');
            inputElement.value = comment;
        });
    var dropdownContent = document.getElementById("editModal");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}

// function to update comment
function updateComment() {
    const commentId = localStorage.getItem("commentId");
    var inputElement = document.getElementById('input-comment').value;
    fetch(`https://dummyjson.com/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: `${inputElement}`,
        })
    })
        .then(res => res.json())
        .then(console.log);
    document.getElementById("editModal").style.display = "none";
    localStorage.removeItem("commentId");


}

// function to clode edit modal
function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}


// ---------------------------------------------------------------------------------------------------------------------------  Add comment
// function to add comment
function addComment(postID, comment) {
    const userID = localStorage.getItem("id");
    fetch('https://dummyjson.com/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: comment,
            postId: postID,
            userId: userID,
        })
    })
        .then(res => res.json())
        .then(console.log);
}




// ---------------------------------------------------------------------------------------------------------------------------  People Suggestion
function peopleSuggestions() {
    // user data on right top div
    fetch('https://dummyjson.com/users')
        .then(res => {
            return res.json();
        })
        .then(data => {
            const allUsers = data.users;
            allUsers.forEach(user => {
                const markup = `
        <div class="w-[95%] h-[25%] bg-slate-50 mt-2 mx-auto flex justify-between">
        <div class="h-[90%] w-[25%] flex justify-center items-center bg-zinc-200 rounded-lg mt-0.5 ml-1">
            <a href="#" class="w-[100%] flex justify-center">
                <img class="h-[6vh]" src= ${user.image} alt="">
            </a>
        </div>
        <div class="h-[100%] w-[50%] flex flex-col justify-center items-start">
            <p class="text-xs font-bold people-suggestion-div"> ${user.firstName} ${user.lastName}</p>
            <p class="text-[10px] people-suggestion-div"> ${user.company.title} </p>
        </div>
        <div class="h-[100%] w-[20%] flex flex-col justify-center">
            <a href="" class="hover-img-change">
                <button
                    class="rounded-full bg-slate-300 w-[4vh] h-[4vh] flex justify-center items-center hover:bg-slate-100">
                    <img class="w-4" src="/logo/tick-black.png" alt="">
                </button>
            </a>
        </div>
        </div>`;
                document.querySelector('.people-suggestions-div').insertAdjacentHTML('beforeend', markup);
            })
        });
}