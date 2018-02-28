const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const output = document.querySelector('.output');
const ascii = `@%#*+=-:.`.split('')
const pxlLngth = 256/ascii.length;
const img = new Image();

img.src = "convertMe.jpeg";

let breakCounter  = 0;
let matrix = [];

let merger = 4;
let verticalMerger = (merger * 4);

function mergeTimes(matrix, y, x, timesX, timesY){
	let pixelMerger = 0;
	//merging horizontal
	for(var i = x; i < timesX + x; i++){
		if(matrix[y] && matrix[y][i]){
			pixelMerger += matrix[y][i];
		}
	}
	//merging vertical
	for(var i = y; i < timesY + y; i++){
		if(matrix[i] && matrix[i][x]){
			pixelMerger += matrix[i][x];
		}
	}
	return (pixelMerger / (timesX + timesY))/pxlLngth;
}

img.onload = function(){	//main
	ctx.drawImage(img, 0, 0);
	let imgData = ctx.getImageData(0,0, img.width, img.height);
	let pixels = imgData.data;

	//matrix
	let matrixRow = [];
	for(var i = 0; i < pixels.length; i += 4){
	 let bw = (pixels[i] + pixels[i+1] + pixels[i + 2]) / 3;
	 matrixRow.push(bw);
		if(breakCounter >= img.width){
			breakCounter = 0;
			matrix.push(matrixRow);
			matrixRow = [];
		}
		breakCounter += 1;
	}

	for(var i=0; i < matrix.length; i+= verticalMerger){
	let	domRow = document.createElement('p');
		for(var j = 0; j < matrix[Math.floor(i)].length; j+=merger){
			domRow.innerText += ascii[Math.floor(mergeTimes(matrix, Math.floor(i), Math.floor(j), merger, verticalMerger))];
		}
		output.appendChild(domRow);
	}
};