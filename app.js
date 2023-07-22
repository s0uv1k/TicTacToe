const board = document.querySelector("#board")
const info = document.querySelector("#info")

const cells = [
    "","","","","","","","",""
]

let go = "circle"
info.textContent = "Circle go first"

function createBoard(){
    cells.forEach((cell,index)=>{
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click',addGo)
        board.append(cellElement)
    })
}

createBoard()

function addGo(e){
    const goDisplay=document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    info.textContent = "It is now "+go+"'s turn."
    e.target.removeEventListener("click",addGo)
    checkScore()

}

function checkScore(){
    const allSquares = document.querySelectorAll(".square")
    const winCombo = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]

    winCombo.forEach(array =>{
        const circleWins = array.every(cells => 
            allSquares[cells].firstChild?.classList.contains('circle'))
        
        if(circleWins){
            info.textContent = "Circle wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    
        })
        winCombo.forEach(array =>{
            const crossWins = array.every(cells => 
                allSquares[cells].firstChild?.classList.contains('cross'))
            
            if(crossWins){
                info.textContent = "Cross wins!"
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
                return
            }
        
        })
}