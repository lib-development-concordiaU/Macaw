// *************************************************************************************************************************
// UX
// *************************************************************************************************************************

function toggleAccordion(elem){
    var accordionElement = elem.parentElement;
    var accordionContent = accordionElement.querySelector('.item-accordion-element-content');
    var accordionIcon = accordionElement.querySelector('.item-accordion-element-icon');

    if(accordionContent.style.display == "block"){
        accordionContent.style.display = "none";
        accordionIcon.src = "assets/chevron-bottom-svgrepo-com.svg";
    }else{
        accordionContent.style.display = "block";
        accordionIcon.src = "assets/chevron-top-svgrepo-com.svg";
    }
    
    
}




// *************************************************************************************************************************
// INITIALIZATION
// *************************************************************************************************************************


// loadJSON: loads a JSON file and returns the data as an object
async function loadJSON(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

async function init(){
    // get the swallow id from the URL
    const url = new URL(window.location.href);
    const swallowId = url.searchParams.get("id");
    
    const configData = await loadJSON('config.json');
    const collecionData = await loadJSON(configData.collectionURL);

    document.getElementById('header').src = configData.headerimage;
    document.getElementById('title').innerHTML = configData.title;
    
    
    const record = getRecord(collecionData,  swallowId);    
    
    // TITLE
    document.getElementById('item-main-title').innerHTML = record["Item_Description"]["title"];
    
    // CATALOGUER INFORMATION
    const cataloguer = record["cataloguer"];
    document.getElementById('item-cataloger-information').innerHTML = "Catalogued by:" + cataloguer["name"] + " "+ cataloguer["lastname"] + " on " + record["create_date"];


    // IMAGE
    const image = record["Item_Description"]["image"];
    if(image != undefined){
        document.getElementById('item-image').src = image;
    }
    const source = record["Item_Description"]["url"];
    if(source != undefined){
        document.getElementById('item-image-link').href = source
    }

    // DESCRIPTION
    const description = record["Item_Description"]["description"];
    if(description != undefined){
      var descriptionElem = document.getElementById('item-description-template').content.cloneNode(true);
      descriptionElem.querySelector('.item-accordion-element').id = "description";
      descriptionElem.querySelector('.item-accordion-element-title-text').innerHTML = "Descripción";
      descriptionElem.querySelector('.item-accordion-element-title').setAttribute('onclick',"toggleAccordion(this)");
      descriptionElem.querySelector('.item-accordion-element-content').textContent =  description;
      document.getElementById('item-description-container').appendChild(descriptionElem);
    }

    // FECHA DE CREACIÓN
    const creationDate = record["Item_Description"]["date_Created"];
    if(creationDate != undefined){
      var creationDateElem = document.getElementById('item-description-template').content.cloneNode(true);
      creationDateElem.querySelector('.item-accordion-element').id = "creation-date";
      creationDateElem.querySelector('.item-accordion-element-title-text').innerHTML = "Fecha de creación";
      creationDateElem.querySelector('.item-accordion-element-title').setAttribute('onclick',"toggleAccordion(this)");
      creationDateElem.querySelector('.item-accordion-element-content').textContent =  creationDate;
      document.getElementById('item-description-container').appendChild(creationDateElem);
    }

}

init();