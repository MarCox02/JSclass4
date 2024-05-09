import { getPersonajes } from "./peticiones/getPersonajes.js";

const enviarDatos = (id, name, image, species, status, location) => {


    const rutaArchivoHTML = "../personaje.html";

    fetch(rutaArchivoHTML)
        .then(response => response.text())
        .then((html)=>{
            const parser = new DOMParser();
            const doc = parser.parseFromString(html,'text/html');

            const imagePage = doc.getElementById("imagePage");
            imagePage.src = image;
            imagePage.classList.add("card-img-top");

            const namePage = doc.getElementById("namePage");
            namePage.textContent = `Nombre: ${name}`;

            const speciesPage = doc.getElementById("speciesPage");
            speciesPage.textContent = `Nombre: ${species}`;

            const statusPage = doc.getElementById("statusPage");
            statusPage.textContent = `Nombre: ${status}`;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;

    })
    
}



const crearCard = (result = []) =>{

    let personajeRow = document.getElementById("personajeRow");
    result.map((result)=>{

        const {id, name, image, species, status, location} = result;

        const {name : nameLocation} = location;

        const divCol = document.createElement('div');
        divCol.classList.add('col-xl-3');
        divCol.classList.add('col-lg-3');
        divCol.classList.add('col-md-3');
        divCol.classList.add('col-sm-3');
        divCol.classList.add('col-xs-3');
        divCol.classList.add('mt-2');
        divCol.classList.add('mb-2');
    
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = image;
        img.alt = `Imagen de ${name}`;
        img.classList.add('card-img-top');

        const divBody = document.createElement('div');
        divBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('cart-title');
        title.textContent = `${name}`;

        const subtitle = document.createElement('p');
        subtitle.classList.add('card-text');
        subtitle.textContent = `Especie: ${species} `;

        const subtitle2 = document.createElement('p');
        subtitle2.classList.add('card-text');
        subtitle2.textContent = `Estado: ${status} `;
            
        const bntVer = document.createElement('button');
        bntVer.classList.add('btn','btn-success');
        bntVer.textContent = `Ver Detalles`;
        bntVer.addEventListener("click",()=>enviarDatos(id, name, image, species, status, location));
            


        divBody.appendChild(title);
        divBody.appendChild(subtitle);
        divBody.appendChild(subtitle2);
        divBody.appendChild(bntVer)

        card.appendChild(img);
        card.appendChild(divBody);
        

        divCol.appendChild(card);

        personajeRow.appendChild(divCol);





    })
}
getPersonajes()
    .then((data)=> crearCard(data))
    .catch((error)=>console.log(`EL ERROR ES: ${error}`));