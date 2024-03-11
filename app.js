var map = L.map('map').setView([36.72016, -4.42034], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
fetch("da_transporte_paradasTaxi-4326.geojson.json")
    .then((res) => res.json())
    .then((data) => {

        data.features.forEach(element => {
            addToMap(element);
            loadTable(element);
        });
    })


var marker;
function addToMap(data) {
    marker = L.marker([data.geometry.coordinates[1], data.geometry.coordinates[0]]).addTo(map);
    marker.bindPopup(
        `<h3>${data.properties.DESCRIPCION}</h3>
        <p>${data.properties.DIRECCION}</p>`
    )
    marker.title = data.properties.DESCRIPCION;
    marker.cap = data.properties.INFOESP.Capacidad_vehiculos;
    marker.id = data.properties.ID;
}


var template = document.querySelector('template');
var rowList = document.querySelector('#rowList');
function loadTable(data) {
    let row = template.content.cloneNode(true);
    row.querySelector(".desc").innerHTML = `<p><strong>${data.properties.DESCRIPCION}</strong></p>`;
    row.querySelector('.address').innerHTML = `<p>${data.properties.DIRECCION}</p>`;
    if(data.properties.ACCESOPMR=="Si"){
        row.querySelector(".access").innerHTML = "<p>Accesible</p>";
    }else{
        row.querySelector(".access").textContent = "";
    }
    var rowInfo = row.querySelector('.rowInfo');
    rowInfo.addEventListener('click', function(){
        if(rowInfo.className!="rowInfoFocused"){
            rowInfo.classList.toggle("rowInfoFocused");
        }
        
    });
    rowList.appendChild(row);

    
    
}


var modal = document.getElementById(modal);
function clickOnMarker(marker){
 var modalTitle = document.getElementById("modalTitle");
 var cap = document.getElementById("cap");
 var id = document.getElementById("id");
modalTitle.textContent= marker.title;
cap.textContent = marker.cap;
id.textContent = marker.id;
modal.showModal();
}

marker.on("click", function(){
    clickOnMarker(marker);
})
