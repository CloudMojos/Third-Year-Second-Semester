/**********Submitted by:********/
/***Joshuel Ernest Q. Simbulan**/
/****Artificial Intelligence****/

// NOTE! To run this code, install node using npm. Then `node ./solution.js`
// This also works with 4x4, 16x16, maybe even 25x25 and greater. I made it so that it works with all perfect square length.
// I didn't change the `printSudoku()` function to accomodate all sizes.

// I've spent ridiculous amount of hours on this one 😅
let startingSudoku = [
                    [1, 0, 0, 0],
                    [0, 2, 0, 0],
                    [0, 0, 3, 0],
                    [0, 0, 0, 4]
]

let dummySudoku = [
                [1, 3, 2, 2],
                [4, 1, 2, 2],
                [3, 2, 2, 2],
                [4, 2, 2, 2]
]

// const listOfBlocks = createListOfBlocks(dummySudoku)
// // console.log(rowErrors(dummySudoku, 0, 2))
// console.log(highestErrorBlock(dummySudoku, listOfBlocks))


// takes a sudoku (n x n array) and print it on the console
// this is configured for  4x4 sudoku
function printSudoku(sudoku) {
    for (let i = 0; i < sudoku.length; i++) {
        let line = ''
        for (let j = 0; j < sudoku[i].length; j++) {
            if (j == 2) {
                line += '| '
            } 
            line += `${sudoku[i][j].toString()} `
        }
        if (i == 2) {
            console.log('---------')
        }
        console.log(line)
    }
}

// creates a clone of the array but instead only 1 and 0
// 1 being it is a given cell, 0 if it is not
function fixSudoku(sudoku){
    let fixedSudoku = [...sudoku]
    for (let i = 0; i < sudoku.length; i++) {
        fixedSudoku[i] = sudoku[i].slice()
    }
    for (let i = 0; i < fixedSudoku.length; i++) {
        for (let j = 0; j < fixedSudoku[i].length; j++) {
            if (fixedSudoku[i][j] != 0) {
                fixedSudoku[i][j] = 1
            }
        }
    }
    return fixedSudoku
}
// printSudoku(startingSudoku)
// Cost function
function totalNumOfErrors(sudoku) {
    return rowErrors(sudoku) + columnErrors(sudoku)
}

function countOccurence(arr, value) {
    return arr.filter((v) => (v === value)).length > 0 ? arr.filter((v) => (v === value)).length - 1 : 0
}


// Counts the total number of errors in rows
function rowErrors(sudoku, startingRow = 0, endingRow = sudoku.length) {
    let errorCount = 0
    for (let i = startingRow; i < endingRow; i++) {
    //    errorCount += countOccurence(sudoku[i], i + 1)
        for (let j = 0; j < sudoku.length; j++) {
            errorCount += countOccurence(sudoku[i], j + 1)
        } 
    }
    return errorCount
}

// console.log(columnErrors(dummySudoku))

function columnErrors(sudoku, startingCol = 0, endingCol = sudoku.length) {
    let errorCount = 0
    // traverse, print the columns
    let column = []
    for (let i = startingCol; i < endingCol; i++) {
        for (let j = 0; j < sudoku.length; j++) {
            column.push(sudoku[j][i])
        }
        for (let j = 0; j < sudoku.length; j++) {
            errorCount += countOccurence(column, j + 1)
        }
        column = []
    }
    return errorCount
}

function blockErrors(block, sudoku) {
    let errorCount = 0
    
    let tempBox = block[0]
    const rowStart = tempBox[0]
    const colStart = tempBox[1]
    
    tempBox = block[sudoku.length - 1]
    const rowEnd = tempBox[0] + 1
    const colEnd = tempBox[1] + 1

    return rowErrors(sudoku, rowStart, rowEnd) + columnErrors(sudoku, colStart, colEnd)
}

// n is the size of an n by n block, 
function createListOfBlocks(sudoku) {
    let listOfBlocks = []
    // Number of blocks per "row"
    const blockSize = Math.sqrt(sudoku.length)
    let blocks = Array.from({ length: blockSize }, () => [])
    let counter = 1, blockIndex = 0
    // Iterate over all blocks
    for (let i = 0; i < sudoku.length; i++) {
       for (let j = 0; j < sudoku.length; j++, counter++) {
        blocks[blockIndex].push([i, j])
        if (counter / blockSize === 1) {
            blockIndex++
            blockIndex = blockIndex % blockSize
            counter = 0
        }
       }
       if ((i + 1) % blockSize === 0) {
        blocks.forEach(block => {
            listOfBlocks.push(block)
        })
        blocks = Array.from({ length: blockSize }, () => [])
       }

    }
    return listOfBlocks
}

function shuffle(array) {
    const newArray = [...array]
    const length = newArray.length
  
    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor((newArray.length - start) * Math.random())
      const randomItem = newArray.splice(randomPosition, 1)
  
      newArray.push(...randomItem)
    }
  
    return newArray
}

function fillBlocksRandom(sudoku, listOfBlocks) {
    let values = Array.from({length: sudoku.length}, (_, i) => i + 1)
    listOfBlocks.forEach(block => {
        // Shuffle each block
        values = shuffle(values)
        // Select all the boxes in block in sudoku
        let currentBlock = []

        block.forEach(box => {
            if (sudoku[box[0]][box[1]] == 0) {
                block.forEach(box => {
                    currentBlock.push(sudoku[box[0]][box[1]])
                })
                for (let i = 0; i < values.length; i++) {
                    if (currentBlock.includes(values[i])) { continue }
                    sudoku[box[0]][box[1]] = values[i]
                    break
                }
                currentBlock = []
            }
        })
    })
    // console.log(sudoku)
    return sudoku
}

function boxToFlip(sudoku, listOfBlocks, fixedSudoku, blockIndex = Math.floor(Math.random() * listOfBlocks.length)) {
    const block = listOfBlocks[blockIndex]
    // From block, select valid indeces that are not fixed
    let validBoxes = block.filter(box => {
        if (fixedSudoku[box[0]][box[1]] === 0) {
            return sudoku[box[0]][box[1]]
        }
    })
    if (validBoxes.length < Math.sqrt(sudoku.length)) {
        return []
    }
    // Select two indeces from that validboxes
    validBoxes = shuffle(validBoxes)

    // Returns two indices 
    return [validBoxes[0], validBoxes[1]]
}

// Flip the boxes, then create a new sudoku state
function flipTwoBoxes(sudoku, boxes) {
    let tempBox = []
    let proposedSudoku = [...sudoku]
    for (let i = 0; i < sudoku.length; i++) {
        proposedSudoku[i] = sudoku[i].slice()
    }
    // console.log(sudoku[boxes[0][0]][boxes[0][1]], sudoku[boxes[1][0]][boxes[1][1]])
    // Take the value in boxes[0], boxes[1] then change the values in the copy.
    let box1 = sudoku[boxes[0][0]][boxes[0][1]]
    let box2 = sudoku[boxes[1][0]][boxes[1][1]]

    // Changing the values
    proposedSudoku[boxes[0][0]][boxes[0][1]] = box2
    proposedSudoku[boxes[1][0]][boxes[1][1]] = box1

    // printSudoku(sudoku)
    // console.log()
    // console.log(sudoku[boxes[0][0]][boxes[0][1]], sudoku[boxes[1][0]][boxes[1][1]])
    // console.log()
    // printSudoku(proposedSudoku)

    return proposedSudoku
}

// If total error of proposed is equal or less than current, change current to proposed
function chooseNewState(sudoku, proposedSudoku) {
    errorSudoku = totalNumOfErrors(sudoku)
    errorProposed = totalNumOfErrors(proposedSudoku)

    if (errorProposed >= errorSudoku) {
        return sudoku
    }

    return proposedSudoku
}

function highestErrorBlock(sudoku, listOfBlocks) {
    let blockErrorList = []
    // Iterate over the list of blocks, store the errors
    listOfBlocks.forEach(block => {
        blockErrorList.push(blockErrors(block, sudoku))
    })
    // Select the highest, find its index
    const highest = Math.max(...blockErrorList)
    // let index

    for (let i = 0; i < listOfBlocks.length; i++) {
        if (highest === blockErrors(listOfBlocks[i], sudoku)) {
            index = i
            break
        }
    }
    
    return index
}

function solveSudoku(sudoku) {
    console.log('The given sudoku: ')
    printSudoku(sudoku)

    console.log()
    const fixedSudoku = fixSudoku(sudoku)
    const listOfBlocks = createListOfBlocks(sudoku)
    sudoku = fillBlocksRandom(sudoku, listOfBlocks)

    console.log('First iteration sudoku: ')
    printSudoku(sudoku)
    console.log()

    let error = totalNumOfErrors(sudoku)
    let stuckCount = 0
    while (error > 1) {
        
        let boxes = boxToFlip(sudoku, listOfBlocks, fixedSudoku)
        let proposedSudoku = flipTwoBoxes(sudoku, boxes)
        let newSudoku = chooseNewState(sudoku, proposedSudoku)

        console.log('Boxes before selection: ' + boxes)
        if (stuckCount > 120) {
            let index = highestErrorBlock(sudoku, listOfBlocks)
            boxes = boxToFlip(sudoku, listOfBlocks, fixedSudoku, index)
            console.log('Highest Error is in ' + boxes)
            stuckCount = 0
            newSudoku = flipTwoBoxes(sudoku, boxes)
        }
        
        if (sudoku.join(' ') == newSudoku.join(' ')) {
            stuckCount += 1
            console.log('Stuck: ' + stuckCount)
        } 
        sudoku = newSudoku

        error = totalNumOfErrors(sudoku)

        console.log('Error: ' + error)

        // console.log('New Sudoku')
        // printSudoku(newSudoku)
        // console.log()
        // console.log('Sudoku')
        // printSudoku(sudoku)
        // console.log()
        // console.log(`Error: ${totalNumOfErrors(sudoku)}`)
    }
    return sudoku
}

printSudoku(solveSudoku(startingSudoku))
// console.log(printSudoku([ [ 1, 3, 4, 2 ], [ 4, 2, 1, 3 ], [ 2, 4, 3, 1 ], [ 3, 1, 2, 4 ] ]))
