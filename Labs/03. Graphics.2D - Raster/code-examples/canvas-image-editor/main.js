const visibleCanvas = document.getElementById("visibleCanvas");
const imageEditor = new ImageEditor(visibleCanvas);

const buttons = document.getElementsByClassName("effectType");
for(let i=0; i<buttons.length; i++){
    //more about the data attribute: https://developer.mozilla.org/en/docs/Web/Guide/HTML/Using_data_attributes
    buttons[i].addEventListener("click", function(){ imageEditor.changeEffect(this.dataset.effect)}); 
}

document.getElementById("fileBrowser").addEventListener("change", function(ev){  
    //1. create the reader
    const reader = new FileReader();
    //2. attach events
    reader.addEventListener('load', function(ev){
        const dataUrl = ev.target.result;

        const img = document.createElement("img");
        img.addEventListener("load", function(){
            imageEditor.changeImage(img);
        });
        img.src = dataUrl;
    });
    //3. start loading the file
    reader.readAsDataURL(ev.target.files[0]);    
});

document.getElementById("btnDownload").addEventListener("click", function(){
    imageEditor.downloadImage();
})