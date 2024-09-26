//Api
const autorizacion = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI2LCJlbWFpbCI6Imp1YW4udmFzcXVlekB1dHAuZWR1LmNvIiwiaWF0IjoxNzI3MTU5MzgyLCJleHAiOjE3NDQ0MzkzODJ9._1OzCY1XapnxSoaGb5fDXs9aJhEtmXC0DVo16BzoFWE'
const url_api = 'https://fake-api-vq1l.onrender.com/posts'

//botones
const agregar = document.getElementById('crear');
//listar
fetch(url_api,{
    headers: {
        "Authorization": autorizacion
    }
})
.then(response => response.json())
.then(data => {

    const lista = document.getElementById('lista');
    data.forEach( product => {

        lista.innerHTML += 
        `<li>
            <img src='${product.images.replace(/["\[\]]/g, '')}' class="card-img-top" width="160px>
            <div class="card">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>${product.value}</p>
                <p>categoria: ${product.category_id}</p>
                <div>
                    <button onclick='borrar(${product.id})' id='eliminar'>Eliminar</button>
                    <button onclick='editar(${product.id})' id='editar'>Editar</button>
                </div>
            </div>
        </li>`;
    });
        
});
        
//agregar
agregar.addEventListener('submit', function(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let value = parseInt(document.getElementById('value').value);
    let category = parseInt(document.getElementById('category_id').value);
    let images = [document.getElementById('images').value];
    let hola = ['hola', 'adios']
    console.log(typeof(title), typeof(description), typeof(value), typeof(category), typeof(images), typeof(hola));

    fetch(url_api, {
        method: 'POST',
        headers: {
            "Authorization": autorizacion,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            value: value,
            category_id: category,
            images: images
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        if(response) {
            alert('Producto creado');
        }
        location.reload();
    })
})

//editar
function editar(id){

    let title = prompt("Digite el nuevo titulo")
    let description = prompt("Digite la nueva descripcion")
    let value = parseInt(prompt("Digite el nuevo valor"))
    let category = parseInt(prompt("Digite la nueva categoria"))
    let images = [prompt("Digite la nueva imagen")]

    fetch(url_api + '/' + id, {
        method: 'PATCH',
        headers: {
            "Authorization": autorizacion,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            value: value,
            category_id: category,
            images: images
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        if(response){
            alert('Producto actualizado');
        }
        location.reload();
    })
}


//borrar
function borrar(id){
    fetch(url_api + '/' + id, {
        method: 'DELETE',
        headers: {
            "Authorization": autorizacion
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        if(response){
            alert('el producto: ' + id + ' fue eliminado');
        }
        location.reload();
    })
}