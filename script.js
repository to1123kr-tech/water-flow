const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize",resizeCanvas);

// 드롭 영역
const dropzone = document.getElementById("dropzone");

dropzone.addEventListener("dragover",(e)=>{
  e.preventDefault();
  dropzone.style.borderColor="#00ffa2";
});

dropzone.addEventListener("dragleave",(e)=>{
  dropzone.style.borderColor="#4aa3ff";
});

dropzone.addEventListener("drop",(e)=>{
  e.preventDefault();
  dropzone.style.borderColor="#4aa3ff";

  const file = e.dataTransfer.files[0];
  if(!file) return;

  if(!file.name.toLowerCase().endsWith(".dxf")){
    alert("DXF 파일만 가능합니다.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(){
    console.log("DXF 파일 로드됨");
    drawDemo();
  };

  reader.readAsText(file);
});

// 테스트용 표시
function drawDemo(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle="#00ff88";
  ctx.lineWidth=2;

  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(400,300);
  ctx.lineTo(600,220);
  ctx.stroke();

  ctx.fillStyle="white";
  ctx.fillText("DXF 로드 테스트 성공",220,180);
}

console.log("물아 흘러라 로드 완료");
