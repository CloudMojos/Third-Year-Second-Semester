# Problem Description
Create a sudoku solver ai that will solve the board.

# My Journal
I have little idea regarding this one. So it is only logical to research as much as possible to understand the concept of how to solve it.

We must first think of a way to represent the board and its entities in code.

I started with counting the number of errors in a given board.
After that, I was able to write code that creates a list of block (will be necessary for the next function) and randomize the values for each of that blocks.
The next step involves randomly selecting a block, and then randomly flipping two values that is not a given. It will be then stored as a proposed state 


```
1 3 | 2 1  - 1
4 2 | 3 4  - 1
---------
3 2 | 3 1  - 1
4 1 | 2 4  - 1

1 1   2 2
TOTAL COST = 10
```

```
[0, 0] [0, 1] [0, 2] [0, 3]
[1, 0] [1, 1] [1, 2] [1, 3]
[2, 0] [2, 1] [2, 2] [2, 3]
[3, 0] [3, 1] [3, 2] [3, 3]
```
```
[0, 0] [0, 1] [0, 2] [0, 3] [0, 4] [0, 5] [0, 6] [0, 7] [0, 8]
[1, 0] [1, 1] [1, 2] [1, 3] [1, 4] [1, 5] [1, 6] [1, 7] [1, 8]
[2, 0] [2, 1] [2, 2] [2, 3] [2, 4] [2, 5] [2, 6] [2, 7] [2, 8]
[3, 0] [3, 1] [3, 2] [3, 3] [3, 4] [3, 5] [3, 6] [3, 7] [3, 8]
[4, 0] [4, 1] [4, 2] [4, 3] [4, 4] [4, 5] [4, 6] [4, 7] [4, 8]
[5, 0] [5, 1] [5, 2] [5, 3] [5, 4] [5, 5] [5, 6] [5, 7] [5, 8]
[6, 0] [6, 1] [6, 2] [6, 3] [6, 4] [6, 5] [6, 6] [6, 7] [6, 8]
[7, 0] [7, 1] [7, 2] [7, 3] [7, 4] [7, 5] [7, 6] [7, 7] [7, 8]
[8, 0] [8, 1] [8, 2] [8, 3] [8, 4] [8, 5] [8, 6] [8, 7] [8, 8]
```

```
[1, 3, 4, 1]
[4, 2, 2, 3]
[2, 3, 3, 1]
[1, 4, 2, 4]
```
