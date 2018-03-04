const previewImage = document.querySelector('.preview-image');
const fileInput = document.querySelector('#file');
const sampleButton = document.querySelector('.sampleImage');
const mergers = document.querySelectorAll('.merger');

function loadingOn(){
	overlay.innerText = 'Loading...';
	body.classList.add('overlay-show');
	overlay.classList.add('overlay-transition');
}

function uploadImage(object){
	if(!object || !object.type.includes('image')){
		return;
	}
	loadingOn();
	const reader = new FileReader();
	reader.readAsDataURL(object);
	reader.addEventListener('load', function(){
		let dimensionsReader = new Image();
		dimensionsReader.src = reader.result;
		dimensionsReader.onload = function(){
			previewImage.width = `${dimensionsReader.width/3}`;
			console.log(previewImage);
			previewImage.height = `${dimensionsReader.height/3}`;
			previewImage.src = reader.result;
		}
		convertImage(reader.result, verticalMerger, horizontalMerger, output);
	});
}


fileInput.addEventListener('change', function(){
	uploadImage(fileInput.files[0])
});

document.addEventListener('paste', function(e){
	uploadImage(e.clipboardData.files[0])
})

document.addEventListener('dragover', function(e){
	e.preventDefault();
	overlay.innerText = 'Upload';
	body.classList.add('overlay-show');
});

overlay.addEventListener('dragleave', function(e){
	e.preventDefault();
	if(e.path.includes(overlay)){
		body.classList.remove('overlay-show');
	}
})

document.addEventListener('drop', function(e){
	e.preventDefault();
	if(e.dataTransfer.items[0].type.includes('image')){
		let img = e.dataTransfer.items[0].getAsFile();
		uploadImage(img);
	}
	else{
		body.classList.remove('overlay-show');
	}
});


sampleButton.addEventListener('click', function(){
	loadingOn();
	convertImage('convertme.jpeg', verticalMerger, horizontalMerger, output);
});