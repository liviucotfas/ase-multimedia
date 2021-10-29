const imageEditor = new ImageEditor();

const buttons = document.getElementsByClassName("effectType");
for(let i=0; i<buttons.length; i++){
    //more about the data attribute: https://developer.mozilla.org/en/docs/Web/Guide/HTML/Using_data_attributes
    buttons[i].addEventListener("click", function(){ imageEditor.changeEffect(this.dataset.effect)}); 
}

document.getElementById("fileBrowser").addEventListener("change", function(e){  
    //1. create the reader
    const reader = new FileReader();
    //2. attach events
    reader.addEventListener('load', function(event){

        const img = document.createElement("img");
        img.addEventListener("load", function(){
            imageEditor.changeImage(img);
        });
        img.src = event.target.result;
    });
    //3. start loading the file
    reader.readAsDataURL(e.target.files[0]);    
});