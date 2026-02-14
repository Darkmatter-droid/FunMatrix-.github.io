let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");

const mssg = document.querySelector("#mssg");

const userscorepara = document.querySelector("#user-score");

const compscorepara = document.querySelector("#comp-score");



const gencompchoice = () => {

    const options = ["rock", "paper" ,"scissor"];

    //math.floor(math.random() * 3)  here random wil generate a number between 0 to 1 then we multiply it by to get a 
    // number bet 0.something to 2.something then we use floor funcn to rremove all decimal points we can use these number as random  index

    const randidx = Math.floor(Math.random() * 3);
    return options[randidx];
};

const drawgame = () => {
    
    mssg.innerText = "game draw , play again";
    mssg.style.backgroundColor = "#081b31";
}

const showwinner = (userwin , userchoice , compchoice) => {
    if(userwin) {
        userscore++;
        userscorepara.innerText = userscore ;
        
        mssg.innerText = `you win! ${userchoice} beats ${compchoice}`;
        mssg.style.backgroundColor = "green";
        
    }else { 
        compscore++;
        compscorepara.innerText = compscore ;
        mssg.innerText = (`you lose ${compchoice} beats ${userchoice}`)
        mssg.style.backgroundColor = "red";
    }
}


const playgame = (userchoice) =>{
    

    //generate computer choice
    const compchoice = gencompchoice();
    

    if(userchoice === compchoice){
        //draw game
        drawgame()
    }else{
        let userwin = true;
        if(userchoice === "rock"){
            //paper scissor
            userwin = compchoice === "paper" ? false : true ;
        }else if(userchoice === "paper"){
            //rock , scissor
            userwin = compchoice === "scissor" ? false :true ;

        }else{
            //rock , paper
            userwin = compchoice === "rock" ? false :true ;
            
        }
        showwinner(userwin , userchoice , compchoice);
    }


}

choices.forEach((choice) => {
    
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id")
        
        playgame(userchoice)

    })
})