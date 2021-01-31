const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c";
const CNAVAS_SIZE = 700;

canvas.width = CNAVAS_SIZE;
canvas.height = CNAVAS_SIZE;

ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR"
ctx.lineWidth = 2.5;

//'그림을 그린다'의 기본값은 false
let painting = false;
let filling =false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

// 마우스를 캔버스 안에 뒀을 때만 그림을 그릴 수 있도록 한다.
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath(); // 경로를 생성한다.
        ctx.moveTo(x,y); // 선이 시작하는 좌표
     } else{
         ctx.lineTo(x,y); //선이 끝나는 좌표
         ctx.stroke(); // 선을 그린다.
        }
    }

// 마우스를 클릭했을 때 그림을 그린다.
function onMouseDown(event){
    painting =true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
// 붓의 크기를 변경한다.
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

// Fill / Paint 버튼 이름 변경하기
function handleModeClick(){
    if (filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

// canvas를 클릭하면 canvas사이즈만큼 색이 채워진다.
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CNAVAS_SIZE, CNAVAS_SIZE);
    }
}

// 마우스 우클릭 방지. contextmenu 나오지 않게 하기.
function handleCM(event){
    event.preventDefault();
}

// 저장 버튼을 클릭하면 저장할 수 있다.
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color=>
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if (mode){
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}