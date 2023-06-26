
async function init() {

    let allinfo = await fetchinfo();

    displayinfo(allinfo);

    let allcategories = await fetchcategories();

    displaycategories(allcategories);

    listevent();

    sendmodal();

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
    let galleryModale = document.querySelector(".gallery-modale");
    galleryModale.innerHTML = "";
    for (const info of allinfo) {
        gallery.insertAdjacentHTML("beforeend",
            `
            <figure>
				<img src="${info.imageUrl}" alt="${info.title}">
				<figcaption>${info.title}</figcaption>
			</figure>
        `
        );
        galleryModale.insertAdjacentHTML("beforeend",
            `
        <figure class="figure">
            <img src="${info.imageUrl}" alt="${info.title}">
            <i class="trash fa-solid fa-trash-can" onclick="supprimerTravail(event, ${info.id})"></i>
            <span class="editer">éditer</span>
        </figure>
    `
        );
    }
}

function supprimerTravail(event, idTravail) {
    event.preventDefault();
    let token = window.localStorage.getItem("token");
    let figure = event.target.closest(".figure");
    console.log(event.target.closest(".figure"));
    fetch("http://localhost:5678/api/works/" + idTravail, {
        method: 'DELETE',
        headers: {
            "Accept": "*/*",
            "Authorization": 'Bearer ' + token,
        }
    })
        .then(res => {
            if (res.ok) {
                figure.remove();
            }
            else {
                console.log("erreur");
            }
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la suppression du travail :', error);
        });
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

    let categorie = document.querySelector(".categorieselect");

    for (const info of allinfo) {
        categorie.insertAdjacentHTML("beforeend",
            `
            <option value="${info.id}">
            ${info.name}
            </option>
            `
        );
    }
}

function listevent() {
    const modale1 = document.querySelector(".modale")
    const btnmodale = document.getElementById("modale1")
    const btnmodale2 = document.getElementById("modale2")
    const btnmodale3 = document.getElementById("modale3")
    const modalback = document.querySelector(".modalback");
    const gostep1 = document.getElementById("retourstep1");
    const gostep2 = document.querySelector(".AddPhoto");
    const btnfermermodale = document.getElementById("fermermodale");
    const step1 = document.querySelector(".step1");
    const step2 = document.querySelector(".step2");

    btnmodale.addEventListener("click", (e) => {
        e.preventDefault();
        modale1.style.display = "block";
        modalback.style.display = "block";
    })

    btnmodale2.addEventListener("click", (e) => {
        e.preventDefault();
        modale1.style.display = "block";
        modalback.style.display = "block";
    })

    btnmodale3.addEventListener("click", (e) => {
        e.preventDefault();
        modale1.style.display = "block";
        modalback.style.display = "block";
    })

    modalback.addEventListener("click", function () {
        modale1.style.display = "none";
        modalback.style.display = "none";
        step2.style.display = "none";
        step1.style.display = "block";
    });

    btnfermermodale.addEventListener("click", function () {
        modale1.style.display = "none";
        modalback.style.display = "none";
        step2.style.display = "none";
        step1.style.display = "block";
    });

    gostep2.addEventListener("click", function () {
        step1.style.display = "none";
        step2.style.display = "block";
    });

    gostep1.addEventListener("click", function () {
        step2.style.display = "none";
        step1.style.display = "block";
    });
}

const loadFile = function (event) {
    document.querySelector(".uploadImage").classList.add("previewImage");

    document.querySelector("#output").innerHTML = "<img src='" + URL.createObjectURL(event.target.files[0]) + "' alt='image' width='100%'>";

    let imagesend = document.querySelector("#ImageSend").files[0];
    this.imagesend = imagesend;
};

function btndisabled() {
    var title = document.getElementById("titre").value;
    var categorie = document.getElementById("categorie").value;
    let btnsendmodal = document.getElementById("AddWork");
    this.title = title;
    this.categorie = categorie;
    if (!imagesend || !title || !categorie) {
        btnsendmodal.disabled = true
    }
    else {
        btnsendmodal.disabled = false
    }
}

function sendmodal() {
    let btnsendmodal = document.getElementById("AddWork")

    btnsendmodal.addEventListener("click", async function (e) {
        e.preventDefault();

        var image = document.querySelector("#ImageSend").files[0];
        var title = document.querySelector("#titre").value;
        var categorie = document.querySelector("#categorie").value;
        let token = window.localStorage.getItem("token");

        if (!image || !title || !categorie) {
            document.getElementById("errormodal").innerText = "Veuillez renseigner les bonnes valeurs";
            return false;
        }

        var formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", categorie);

        const res = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        })

        if (res.status === 201) {
            init();
        }
    })
}

document.getElementById("logout-link").addEventListener("click", function () {
    // Code de déconnexion à exécuter lorsque l'utilisateur clique sur "logout"
    // Par exemple, vous pouvez rediriger l'utilisateur vers une page de déconnexion
    window.location.href = "../index.html";
});

