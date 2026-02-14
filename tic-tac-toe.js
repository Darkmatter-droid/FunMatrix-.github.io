let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newgamebtn=document.querySelector("#new-btn");
let mssgcontainer=document.querySelector(".mssg-container");
let mssg = document.querySelector("#mssg")
let turnO = true; //player x or player o

const winpattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


const resetgame = () => {
    turnO = true;
    enableboxes();
    mssgcontainer.classList.add("hide");


}


boxes.forEach((box) =>{
    
    
    box.addEventListener("click",()=>{
        if(turnO){ //playerO turn
            
            box.innerHTML = "<p style='color:blue'>O</p>";
            
            turnO=false;
            
        }else{ //playerX turn
            
            box.innerHTML = "<p style='color:darkmagenta'>X</p>";
            
            turnO=true;
            
        }
        box.disabled = true;
        
        

        checkwinner();
        
        
    });
    
});
const disableboxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const showWinner = (winner) => {
    mssg.innerText=`congratulation , winner is ${winner}`;
    mssgcontainer.classList.remove("hide");
    disableboxes();
}
const enableboxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const checkwinner = () => {
    let isDraw = true; // Assume it's a draw unless proven otherwise

    for (let pattern of winpattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3vaL = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3vaL != "") {
            if (pos1val === pos2val && pos2val === pos3vaL) {
                showWinner(pos1val);
                return;
            }
        } else {
            isDraw = false; // If any box is empty, it's not a draw
        }
    }

    // If no winner and all boxes are filled, it's a draw
    if (isDraw) {
        mssg.innerText = `It's a draw!`;
        mssgcontainer.classList.remove("hide");
        disableboxes();
    }
};



newgamebtn.addEventListener("click" , resetgame);
resetbtn.addEventListener("click" , resetgame);



