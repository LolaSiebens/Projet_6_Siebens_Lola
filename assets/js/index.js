
async function init() {

    let allinfo = await fetchinfo();

    displayinfo(allinfo);

    let allcategories = await fetchcategories();

    displaycategories(allcategories);

    filtercategories();
}

init();

function fetchinfo() {
    return fetch("http://localhost:5678/api/works")
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error)
        })
}

function displayinfo(allinfo) {

    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    for (const info of allinfo) {
        gallery.insertAdjacentHTML("beforeend",
            `
            <figure>
				<img src="${info.imageUrl}" alt="${info.title}">
				<figcaption>${info.title}</figcaption>
			</figure>
        `
        );
    }
}

function fetchcategories() {
    return fetch("http://localhost:5678/api/categories")
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error)
        })
}

function displaycategories(allinfo) {

    let buttons = document.querySelector(".buttons");

    for (const info of allinfo) {
        buttons.insertAdjacentHTML("beforeend",
            `
            <li>
            <button class="button" id="${info.id}">${info.name}</button>
            </li>
            `
        );
    }
}

function filtercategories() {

    let btnall = document.querySelector(".btnall")
    btnall.addEventListener("click", async (e) => {
        let allinfo = await fetchinfo();

        displayinfo(allinfo);
    })

    let button = document.querySelectorAll(".button");
    for (const btn of button) {
        btn.addEventListener("click", async (e) => {
            let allinfo = await fetchinfo();
            const filterallinfo = Object.values(allinfo).filter(info => info.categoryId == btn.id);
            displayinfo(filterallinfo);
        })
    }
}
