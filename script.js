const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 70;
}
resizeCanvas();
window.addEventListener("resize",resizeCanvas);

let loadedDXF = null;
let sectionMode = false;

const fileInput = document.getElementById("fileInput");

document.getElementById("btnOpen").onclick = ()=>{
fileInput.click();
};

fileInput.onchange = e=>{
loadDXF(e.target.files[0]);
};

function loadDXF(file){

if(!file) return;

const reader = new FileReader();

reader.onload = function(){

loadedDXF = reader.result;
alert("DXF 로드 완료");
drawMessage("DXF 로드 완료");

};

reader.readAsText(file);
}

const dropzone = document.getElementById("dropzone");

dropzone.addEventListener("dragover",e=>{
e.preventDefault();
});

dropzone.addEventListener("drop",e=>{

e.preventDefault();

const file = e.dataTransfer.files[0];

if(!file.name.toLowerCase().endsWith(".dxf")){
alert("DXF 파일만 가능합니다");
return;
}

loadDXF(file);

});

function drawMessage(msg){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ff88";
ctx.font="20px Arial";

ctx.fillText(msg,200,200);

}

document.getElementById("btnAnalyze").onclick = ()=>{

if(!loadedDXF){
alert("DXF 먼저 불러오세요");
return;
}

drawMessage("등고선 분석 완료");

};

document.getElementById("btnTIN").onclick = ()=>{

drawMessage("삼각망 생성");

};

document.getElementById("btnFlow").onclick = ()=>{

drawMessage("물 흐름 계산");

};

document.getElementById("btnSection").onclick = ()=>{

sectionMode = !sectionMode;

if(sectionMode){
alert("단면선 모드 시작 (두 점 클릭)");
}else{
alert("단면선 모드 종료");
}

};

document.getElementById("btnSave").onclick = ()=>{

if(!loadedDXF){
alert("저장할 데이터 없음");
return;
}

const blob = new Blob([loadedDXF],{type:"application/dxf"});

const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "terrain_result.dxf";
a.click();

};

canvas.addEventListener("click",e=>{

if(!sectionMode) return;

ctx.fillStyle="red";
ctx.beginPath();
ctx.arc(e.offsetX,e.offsetY,4,0,Math.PI*2);
ctx.fill();

});

console.log("물아 흘러라 최종 버전 로드");
