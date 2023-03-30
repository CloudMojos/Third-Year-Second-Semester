let startingSudoku = [
                    [1, 0, 0, 0],
                    [0, 2, 0, 0],
                    [0, 0, 3, 0],
                    [0, 0, 0, 4]
]

let dummySudoku = [
                [1, 3, 2, 1],
                [4, 2, 3, 4],
                [3, 2, 3, 1],
                [4, 1, 2, 4]
]

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
function fixSudoku(fixedSudoku){
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
function rowErrors(sudoku) {
    let errorCount = 0
    for (let i = 0; i < sudoku.length; i++) {
    //    errorCount += countOccurence(sudoku[i], i + 1)
        for (let j = 0; j < sudoku.length; j++) {
            errorCount += countOccurence(sudoku[i], j + 1)
        } 
    }
    return errorCount
}

function columnErrors(sudoku) {
    let errorCount = 0
    // traverse, print the columns
    let column = []
    for (let i = 0; i < sudoku.length; i++) {
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
    console.log(sudoku)
    return sudoku
}

console.log()
// printSudoku(dummySudoku)
// console.log(totalNumOfErrors(dummySudoku))
const listOfBlocks = createListOfBlocks(dummySudoku)
const sudoku = fillBlocksRandom(startingSudoku, listOfBlocks)
                                    