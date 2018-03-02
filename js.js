/*
	by Damian Nowakowski
	https://github.com/Nairorox

*/

let imgSrc = 'convertMe.jpeg';	//relative file path
let verticalMerger = 5;	//scales width, must be positive ingeger
let horizontalMerger = 5 * verticalMerger;	//scales height, must be positive integer
const ascii = `@%#*+=-:.`.split('') //used ascii characters 



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const output = document.querySelector('.output');
const pxlLngth = 256/ascii.length;
const img = new Image();
img.src = imgSrc;
img.onload = function(){	//main
	ctx.drawImage(img, 0, 0);
	let pixels = ctx.getImageData(0,0, img.width, img.height).data;

	let imageRow = '';
	let pxCounter = 0

	for(var i = 0; i < Math.floor(img.height / horizontalMerger); i+= 1){

		let paragraph = document.createElement('p');
		for(var j = 0; j < Math.floor(img.width / verticalMerger); j++){
			let bw = (pixels[pxCounter] + pixels[pxCounter+1] + pixels[pxCounter + 2]) / 3;
			imageRow += ascii[Math.floor(bw/pxlLngth)];
			pxCounter += (4 * verticalMerger);
		}
		if(img.width /verticalMerger % 1 !== 0){
			pxCounter +=  ((img.width - Math.floor(img.width / verticalMerger)*verticalMerger)*4); //adding pixels to 
		}
		pxCounter += ((horizontalMerger - 1) * img.width * 4);	//adds pixels to counter depending on how many lines are vertically scaled
		paragraph.innerText = imageRow
		imageRow = '';
		output.appendChild(paragraph);
	}
};