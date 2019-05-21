onFirstLoadPosts = [
	JSON.stringify({
		fname: "Billy",
		lname: "Jean",
		thought: "I love school so much... I want to stay here forever.",
	}),
	JSON.stringify({
		fname: "John",
		lname: "Smith",
		thought: "I HATE school. I can't wait to be out of here.",
	}),
	JSON.stringify({
		fname: "Krissy",
		lname: "Jones",
		thought: "I can't wait till this day is over. I'm hungry.",
	}),
];

window.onload = function () {
	if (localStorage.getItem("renderedPostsBefore") === null) {
		localStorage.setItem("postsKey", JSON.stringify(onFirstLoadPosts));
		localStorage.setItem("renderedPostsBefore", true);
	}
}

function savePost() {
	if (!validatePost()) {
		return;
	}

	newPost = {
		fname: document.getElementById("fname").value,
		lname: document.getElementById("lname").value,
		thought: document.getElementById("thought").value,
	};

	posts = JSON.parse(localStorage.getItem("postsKey"));
	posts.push(JSON.stringify(newPost));
	localStorage.setItem("postsKey", JSON.stringify(posts));
	window.location.href = "posts.html";
}

function validatePost() {
	var shouldSave = true;
	elemIds = ["fname", "lname", "thought"];

	for(var i = 0; i < elemIds.length; i++) {
		elem = document.getElementById(elemIds[i]);
		if (elem.value === "") {
			shouldSave = false;
			elem.style.borderColor = "#bc0101";
		} else {
			elem.style.borderColor = "";
		} 
	}

	return shouldSave;
}

function renderPosts() {
	posts = JSON.parse(localStorage.getItem("postsKey"));
	var ul = document.createElement("ul");
	ul.setAttribute("id", "tList");
	document.getElementById("renderPosts").appendChild(ul);

	for(var i = 0; i < posts.length; i++) {
		pPost = JSON.parse(posts[i])
		var li = document.createElement("li");
		li.setAttribute("class", "item");
		ul.appendChild(li);
		li.innerHTML=li.innerHTML + pPost.fname + " " + pPost.lname + ": " + pPost.thought;
	}
}

function clearPosts() {
	posts = [];
	localStorage.setItem("postsKey", JSON.stringify(posts));
	location.reload();
}
