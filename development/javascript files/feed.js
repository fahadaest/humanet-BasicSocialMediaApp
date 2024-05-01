
// -----------------------------------------------------------------------------------------------------------------------------  Authenticated User
// function to get current logged in user and show bio data on feed
async function getCurrentAuthUser() {
    try {
        const token = localStorage.getItem("token");

        // Check if token is available
        if (!token) {
            throw new Error("Token not found in localStorage");
        }

        const response = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        var imgElementNav = document.querySelector('.nav-user-image');
        imgElementNav.src = `${data.image}`;

        var imgElement = document.querySelector('.do-post-img');
        imgElement.src = `${data.image}`;

        const bioLeft = `            
            <!-- cover photo -->
            <div class="h-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

            <!-- profile -->
            <div class="flex justify-center mt-[-10%]">
                <a href="myProfile.html">
                    <button class="bg-gray-200 h-[10vh] w-[10vh] rounded-lg flex items-center justify-center">
                        <img class="h-full w-full" src=${data.image} alt="">
                    </button>
                </a>
            </div>

            <div class="w-[100%] h-[80%] flex flex-col justify-between">

                <!-- Bio -->
                <div class="h-[50%]  flex flex-col justify-between items-center text-center mt-3 border-b border-gray-400">
                    <p>${data.firstName} ${data.lastName}</p>
                    <p>${data.company.title}</p>
                    <p class="bio-description text-sm px-2">${data.company.name}, Department: ${data.company.department},  ${data.company.address.address}, ${data.company.address.city}</p>
                    <div class=" w-full h-[30%] flex items-center justify-around">
                        <div class="w-[30%] h-full flex flex-col items-center">
                            <p>23</p>
                            <p>Posts</p>
                        </div>
                        <div class="bg-slate-400 h-12 w-[1px] mt-[-3vh]"></div>
                        <div class="w-[30%] h-full flex flex-col items-center">
                            <p>12.5 K</p>
                            <p>Followers</p>
                        </div>
                        <div class="bg-slate-400 h-12 w-[1px] mt-[-3vh]"></div>
                        <div class="w-[30%] h-full flex flex-col items-center">
                            <p>130</p>
                            <p>Following</p>
                        </div>
                    </div>
                </div>

                <!-- left down menu -->
                <div class="h-[50%] flex flex-col justify-around items-center">
                    <div class="w-[80%] h-8 mt-3">
                        <a href="#" class="flex items-center">
                            <img src="/logo/connections.png" class="h-7 mr-3" alt="">
                            <p>Connections</p>
                        </a>
                    </div>
                    <div class="w-[80%] h-8">
                        <a href="#" class="flex items-center">
                            <img src="/logo/groups.png" class="h-7 mr-3" alt="">
                            <p>Groups</p>
                        </a>
                    </div>
                    <div class="w-[80%] h-8">
                        <a href="#" class="flex items-center">
                            <img src="/logo/page.png" class="h-6 mr-3" alt="">
                            <p>Pages</p>
                        </a>
                    </div>
                    <div class="w-[80%] h-8">
                        <a href="#" class="flex items-center">
                            <img src="/logo/news.png" class="h-6 mr-3" alt="">
                            <p>Latest News</p>
                        </a>
                    </div>
                    <div class="w-[80%] h-8 mb-3">
                        <a href="#" class="flex items-center">
                            <img src="/logo/events.png" class="h-6 mr-3" alt="">
                            <p>Events</p>
                        </a>
                    </div>
                </div>
            </div>`;

        // Assuming main-left-div exists in your HTML
        const mainLeftDiv = document.querySelector('.main-left-div');

        // Append the HTML content to main-left-div
        mainLeftDiv.innerHTML = bioLeft;

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


    } catch (error) {
        console.error("Error occurred:", error.message);

        const alertDiv = document.createElement('div');
        alertDiv.className = 'success bg-red-500 text-white rounded p-4 mb-2';
        alertDiv.textContent = 'Session Expired, Login to use Home Page';
        document.body.prepend(alertDiv);

        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 3000);
    }
}

// on load of feed page, it will get the current 
// authenticated user and load its data to the feed page 
function onIndexLoad() {
    getCurrentAuthUser()
}
window.addEventListener('load', onIndexLoad);


// ----------------------------------------------------------------------------------------------------------------------------  User data on right div
// user data on right top div
class UserFetcher {
    async fetchUsers(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.users;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }
}

class UserRenderer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    renderUser(user) {
        const markup = `
            <div class="w-[95%] h-auto py-2 bg-slate-50 mt-2 mx-auto flex justify-between">
                <div class="h-[90%] w-[25%] flex justify-center items-center bg-zinc-200 rounded-lg mt-0.5 ml-1">
                    <a href="#" class="w-[100%] flex justify-center">
                        <img class="h-[6vh]" src="${user.image}" alt="">
                    </a>
                </div>
                <div class="h-[100%] w-[50%] flex flex-col justify-center items-start">
                    <p class="text-xs font-bold">${user.firstName} ${user.lastName}</p>
                    <p class="text-[10px]">${user.company.title}</p>
                </div>
                <div class="h-[100%] w-[20%] flex flex-col justify-center">
                    <a href="" class="hover-img-change">
                        <button class="rounded-full bg-slate-300 w-[4vh] h-[4vh] flex justify-center items-center">
                            <img class="w-4" src="/logo/tick-black.png" alt="">
                        </button>
                    </a>
                </div>
            </div>`;
        this.container.insertAdjacentHTML('beforeend', markup);
    }
}

// Usage
const userFetcher = new UserFetcher();
const userRenderer = new UserRenderer('.people-suggestions-div');
userFetcher.fetchUsers('https://dummyjson.com/users')
    .then(users => {
        users.forEach(user => {
            userRenderer.renderUser(user);
        });
    });


// ----------------------------------------------------------------------------------------------------------------------------  Load posts
// check if the user reached at the last post and 
// call the function to load 10 more posts
document.querySelector('.center-scrollable-div').addEventListener('scroll', function () {
    const scrollableDiv = document.querySelector('.center-scrollable-div');
    if (scrollableDiv.scrollHeight - scrollableDiv.scrollTop <= scrollableDiv.clientHeight + 10) {
        loadMorePosts();
        console.log("10 posts loaded")
    }
});
let skip = 0;

// load 10 more posts
function loadMorePosts() {
    skip += 10;
    fetchPosts();
}

// fetch 10 more posts every time it is called
fetchPosts();

// function to fetch posts to the feed
async function fetchPosts() {
    try {
        const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`);
        const data = await response.json();

        const allPosts = data.posts;
        for (const post of allPosts) {
            const userResponse = await fetch(`https://dummyjson.com/users/${post.userId}`);
            const userData = await userResponse.json();
            const urlImg = generateRandomImageLink();
            const myImg = localStorage.getItem("image");

            const markup = `
                <!-- post div-->
                <div class="h-[auto] w-full bg-white mb-4 flex flex-col items-center justify-center posts-container border-4">
                    <!-- post head -->
                    <div class="h-[10vh] w-[93%] mt-3  flex justify-between">
                        <div class="h-[10vh] w-[50vh] flex">
                            <div class="h-[100%] w-[auto] flex items-center">
                                <button class="w-[100%] flex user-profile-${userData.id}">
                                    <img class="h-[6vh]" src="${userData.image}" alt="">
                                </button>
                            </div>
                            <div class="h-[100%] w-[80%] flex flex-col justify-center ml-3">
                                <p>${userData.firstName} ${userData.lastName} - <span class="text-xs">3 min</span></p>
                                <p class="text-xs">${userData.company.title}</p>
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
                            <p class="text-sm "> ${post.body}</p>
                        </div>
                    </div>
                    <!-- post img -->
                    <div class="flex items-center justify-center w-[95%]">
                        <img class="w-[100%] h-[auto]" id="postImage" src="${urlImg}" alt="Fetched Image">
                    </div>
                    <!-- post likes etc -->
                    <div class=" h-[5vh] w-[93%] flex items-center justify-between mb-2">
                        <div class=" h-full w-auto flex items-center justify-between">
                            <div class=" h-full w-auto flex items-center justify-center mr-5">
                                <img class="h-4 mr-1" src="/logo/like.png" alt="">
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
                                <img class=" h-[6vh] mt-0.5 mr-2" src=${myImg} alt="">
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
                    <div class="comments-div-${post.id} com-div-myProfile bg-slate-200 max-h-[25vh] w-[79vh] mt-1 ml-10 mb-2 overflow-auto px border-8 border-slate-200">
                        <!-- load more comments -->
                        <div class=" h-auto w-[94%] flex justify-between mt-2 ml-2 mr-4 mb-2 comments-container">
                            <div class=" w-[10%] h-auto flex justify-center"></div>
                            <div class=" w-[89%] h-auto  flex-col">
                                <button class="bg-white h-full w-full flex items-center justify-center show-more-com">
                                    <img class="h-5 mr-2" src="/logo/post-menu.png" alt=""> Show more comments
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            document.querySelector('.center-scrollable-div').insertAdjacentHTML('beforeend', markup);

            const showUserProfile = document.querySelector(`.user-profile-${userData.id}`);
            showUserProfile.addEventListener('click', function () {
                localStorage.setItem("user profile id", userData.id);
                window.location.href = 'userProfile.html';
            });

            const addCommentButton = document.querySelector(`.add-comment-${post.id} .add-comments-container .add-comment-button`);
            addCommentButton.addEventListener('click', function () {
                const inputElement = document.querySelector(`.comment-input-${post.id}`);
                const comment = inputElement.value;
                addComment(post.id, comment);
            });

            const commentResponse = await fetch(`https://dummyjson.com/comments/post/${post.id}`);
            const commentData = await commentResponse.json();
            const comments = commentData.comments;

            for (const comment of comments) {
                const userCommentResponse = await fetch(`https://dummyjson.com/users/${comment.user.id}`);
                const userCommentData = await userCommentResponse.json();
                const currentUserId = localStorage.getItem("id");

                let comMarkup = '';
                if (currentUserId == comment.user.id) {
                    comMarkup = `
                        <div class="h-auto w-[94%] flex justify-between mt-2 ml-2 mr-4 mb-4">
                            <div class="w-[10%] h-auto flex justify-center">
                                <a href="#">
                                    <img class="h-10" src="${userCommentData.image}" alt="">
                                </a>
                            </div>
                            <div class="bg-white w-[89%] h-auto px-5 py-2 flex flex-col">
                                <span class="flex justify-between">
                                    <p class="font-bold">${userCommentData.firstName} ${userCommentData.lastName}</p>
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
                } else {
                    comMarkup = `
                        <div class=" h-auto w-[94%] flex mt-2 ml-2 mr-4 mb-4">
                            <div class=" w-[10%] h-auto flex justify-center">
                                <a href="#">
                                    <img class="h-10 mr-5 com-user-img" src="${userCommentData.image}" alt="">
                                </a>
                            </div>
                            <div class="bg-white w-[89%] h-auto px-5 py-2 flex flex-col each-com">
                                <span class="flex justify-between">
                                    <p class="font-bold">${userCommentData.firstName} ${userCommentData.lastName}</p>
                                    <p class="text-xs ml-5">9 minutes</p>
                                </span>
                                <p class="text-sm">${comment.body}</p>
                            </div>
                        </div>`;
                    document.querySelector(`.comments-div-${post.id}`).insertAdjacentHTML('afterbegin', comMarkup);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
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


// ---------------------------------------------------------------------------------------------------------------------------  Search
// button to search posts
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
    const searchTerm = document.getElementById('searchInput').value;
    searchPost(searchTerm);
});

const searchButtonRes = document.getElementById('searchButtonRes');
searchButtonRes.addEventListener('click', function () {
    const searchTerm = document.getElementById('searchInputRes').value;
    searchPost(searchTerm);
    alert("abcd");
});

async function searchPost(inputValue) {
    document.querySelector('.center-scrollable-div').innerHTML = '';
    const postsContainer = document.querySelector('.center-scrollable-div');
    postsContainer.innerHTML = '';
    if (inputValue.trim() === '') {
        window.location.href = 'feed.html';
    }
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // search posts
        const res = await fetch(`https://dummyjson.com/posts/search?q=${inputValue}`);
        const data = await res.json();
        const searchedPosts = data.posts;

        // show all searched posts
        Promise.all(searchedPosts.map(posts => {
            return fetch(`https://dummyjson.com/users/${posts.userId}`)
                .then(res => res.json())
                .then(postUser => {
                    const postImg = generateRandomImageLink();
                    const markup = `<!-- post div-->
                    <div class="h-[auto] w-full bg-white mb-4 flex flex-col items-center justify-center posts-container border-4">
        
                        <!-- post head -->
                        <div class="h-[10vh] w-[93%] mt-3  flex justify-between">
                            <div class="h-[10vh] w-[50vh] flex">
                                <div class="h-[100%] w-[auto] flex items-center">
                                    <a href="#" class="w-[100%] flex ">
                                        <img class="h-[6vh]" src="${postUser.image}" alt="">
                                    </a>
                                </div>
                                <div class="h-[100%] w-[80%] flex flex-col justify-center ml-3">
                                    <p>${postUser.firstName} ${postUser.lastName} <span class="text-xs">3 min</span></p>
                                    <p class="text-xs">${postUser.company.title}</p>
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
                                <p class="text-sm "> ${posts.body}</p>
                            </div>
                        </div>
        
                        <!-- post img -->
                        <div class="flex items-center justify-center w-[95%]">
                            <img class="w-[100%] h-[auto]" id="postImage" src="${postImg}" alt="Fetched Image"s>
                        </div>
        
                        <!-- post likes etc -->
                        <div class=" h-[5vh] w-[93%] flex items-center justify-between mb-2">
        
                            <div class=" h-full w-auto flex items-center justify-between">
        
                                <div class=" h-full w-auto flex items-center justify-center mr-5">
                                    <img class="h-4 mr-1" src="/logo/like.png" alt="">
                                    <p> ${posts.reactions} Likes</p>
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
                        <div class="add-comment-${posts.id} h-[7vh] w-[93%] flex items-center justify-between ">
                            <div class=" h-full w-15 ">
                                <a href="#" class="flex items-center justify-center">
                                    <img class=" h-[6vh] mt-0.5" src="/logo/profile.png" alt="">
                                </a>
                            </div>
        
                            <div class="add-comments-container h-full w-full flex items-center justify-center">
                                <input class="comment-input-${posts.id} w-full h-[6vh] px-5 border-[2px] outline-none focus:border-[4px]" type="text"
                                    placeholder="Add a Comment">
                                <div>
                                <button class="add-comment-button h-[6vh] px-2 bg-slate-200 hover:bg-slate-400 ">send</button>
                                </div>
                            </div>
                        </div>

                        <!-- Show comment -->
                        <div
                            class="comments-div-${posts.id} bg-slate-200 max-h-[25vh] w-[79vh] mt-1 ml-10 mb-2 overflow-auto px border-8 border-slate-200">
                            <!-- load more comments -->
                            <div class=" h-auto w-[94%] flex justify-between mt-2 ml-2 mr-4 mb-2 comments-container">
                                 <div class=" w-[10%] h-auto flex justify-center">
                                 </div>
                                 <div class=" w-[89%] h-auto  flex-col">
                                     <button class="bg-white h-full w-full flex items-center justify-center">
                                         <img class="h-5 mr-2" src="/logo/post-menu.png" alt=""> Show more comments
                                     </button>
                                 </div>
                             </div>
                        </div>
                    </div>
                    `;
                    document.querySelector('.center-scrollable-div').insertAdjacentHTML('beforeend', markup);


                    async function fetchData() {
                        try {
                            const response = await fetch(`https://dummyjson.com/comments/post/${posts.id}`);
                            const postData = await response.json();
                            const comments = postData.comments;

                            for (const comment of comments) {
                                const userResponse = await fetch(`https://dummyjson.com/users/${comment.user.id}`);
                                const userData = await userResponse.json();

                                const currentUserId = localStorage.getItem("id");

                                if (currentUserId == comment.user.id) {
                                    const comMarkup = `
                                        <div class="h-auto w-[94%] flex justify-between mt-2 ml-2 mr-4 mb-4">
                                            <div class="w-[10%] h-auto flex justify-center">
                                                <a href="#">
                                                    <img class="h-10" src="${userData.image}" alt="">
                                                </a>
                                            </div>
                                            <div class="bg-white w-[89%] h-auto px-5 py-2 flex flex-col">
                                                <span class="flex justify-between">
                                                    <p class="font-bold">${userData.firstName} ${userData.lastName}</p>
                                                    <p class="text-xs">9 minutes</p>
                                                </span>
                                                <p class="text-sm">${comment.body}</p>
                                                <span class="flex justify-end">
                                                    <button class="edit-button rounded-md mr-3 px-3 py-1 bg-slate-200 text-xs hover:bg-slate-300">Edit</button>
                                                    <button class="delete-button rounded-md px-3 py-1 bg-slate-200 text-xs hover:bg-slate-300">Delete</button>
                                                </span>
                                            </div>
                                        </div>`;

                                    document.querySelector(`.comments-div-${posts.id}`).insertAdjacentHTML('afterbegin', comMarkup);

                                    const editButton = document.querySelector(`.comments-div-${posts.id} .edit-button`);
                                    editButton.addEventListener('click', function () {
                                        localStorage.setItem("commentId", comment.id);
                                        editComment();
                                    });

                                    const deleteButton = document.querySelector(`.comments-div-${posts.id} .delete-button`);
                                    deleteButton.addEventListener('click', function () {
                                        localStorage.setItem("commentId", comment.id);
                                        deleteComment();
                                    });
                                } else {
                                    const comMarkup = `
                                        <div class=" h-auto w-[94%] flex justify-between mt-2 ml-2 mr-4 mb-4">
                                            <div class=" w-[10%] h-auto flex justify-center">
                                                <a href="#">
                                                    <img class="h-10" src="${userData.image}" alt="">
                                                </a>
                                            </div>
                                            <div class="bg-white w-[89%] h-auto px-5 py-2 flex flex-col ">
                                                <span class="flex justify-between">
                                                    <p class="font-bold">${userData.firstName} ${userData.lastName}</p>
                                                    <p class="text-xs">9 minutes</p>
                                                </span>
                                                <p class="text-sm">${comment.body}</p>
                                            </div>
                                        </div>`;
                                    document.querySelector(`.comments-div-${posts.id}`).insertAdjacentHTML('afterbegin', comMarkup);
                                }
                            }
                        } catch (error) {
                            console.error('Error fetching data:', error);
                        }
                    }

                    // Call the function
                    fetchData();



                });
        })).then(() => {
            const warning = `<!-- post div-->
            <div class="h-[auto] w-full bg-red-400 mb-4 flex flex-col items-center justify-center posts-container border-4">

                <!-- post caption -->
                <div class=" h-auto w-[93%] flex items-center justify-center">
                    <div class="mt-2 mb-5 flex flex-col justify-center items-center">
                        <p class="text-xl font-bold mt-4    "> No More Searched Posts</p>
                        <p class="text-sm "> Scroll Down to see feed posts</p>
                    </div>
                </div>

            </div>
            `
            document.querySelector('.center-scrollable-div').insertAdjacentHTML('beforeend', warning);
        });

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
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