import checkOpenSingles from "./openSingles";
import checkLoneSingles from "./loneSingles";
import checkHiddenSingles from "./hiddenSingle";

export const STRATEGY_HIERARCHY = [
    {
        name: 'Open Single',
        description: 'If a row, column, or block is missing just one number, that number must go in the empty cell.',
        explanation: 'is the last remaining number in the row/column/block, so it must go there.',
        detect: checkOpenSingles
    },
    {
        name: 'Lone Single',
        description: 'When a cell has only one possible candidate remaining, that number is the solution for that cell.',
        explanation: 'is the only number remaining that fits in this cell.',
        detect: checkLoneSingles
    },
    {
        name: 'Hidden Single',
        description: 'A hidden single occurs when a number appears as a candidate in only one cell within a row, column, or block. Even if other candidates are present in the cell, this number must be the solution.',
        explanation: 'can only fit in this cell.',
        detect: checkHiddenSingles,
    },
    // {
    //     name: 'Naked Pairs',
    //     description: 'When exactly two cells in the same row, column, or block contain only the same two candidates, those numbers must be assigned to these two cells. As a result, these numbers can be eliminated from all other cells in that row, column, or block.',
    //     detect: checkNakedPairs
    // },
    // {
    //     name: 'Naked Triplets',
    //     description: 'An extension of Naked Pairs—when three cells within the same row, column, or block contain only the same three candidates (or subsets of them), these three numbers must be assigned to those three cells. Therefore, they can be eliminated from all other cells in that region.',
    //     detect: checkNakedTriplets
    // },
    // {
    //     name: 'Hidden Pairs',
    //     description: 'If two numbers appear as candidates in only two specific cells within a row, column, or block, those numbers must go in those two cells, even if additional candidates are present. Any other candidates in those cells can be removed.',
    //     detect: checkHiddenPairs
    // },
    // {
    //     name: 'Pointing Pairs',
    //     description: 'If a number appears only in two cells of a block and both cells are in the same row or column, then that number cannot appear anywhere else in that row or column outside the block.',
    //     detect: checkPointingPairs
    // },
    // {
    //     name: 'Hidden Triplets',
    //     description: 'If three numbers appear as candidates in exactly three cells within a row, column, or block, they must be the solutions for those three cells, even if other candidates are present. All other candidates in those cells can be removed.',
    //     detect: checkHiddenTriplets
    // },
    // {
    //     name: 'Pointing Triple',
    //     description: 'A variation of Pointing Pairs: If a number appears in exactly three cells within a block, and those cells are also in the same row or column, that number can be eliminated from all other cells in the same row or column outside the block.',
    //     detect: checkPointingTriple
    // },
    // {
    //     name: 'Naked Quads',
    //     description: 'If four cells in a row, column, or block contain only the same four candidates (or subsets of them), then those four numbers must go into those four cells, and they can be eliminated from all other cells in that region.',
    //     detect: checkNakedQuads
    // },
    // {
    //     name: 'Hidden Quads',
    //     description: 'If four numbers appear as candidates in only four specific cells within a row, column, or block, those numbers must be assigned to those four cells. All other candidates in those cells can be removed.',
    //     detect: checkHiddenQuads
    // },
    // {
    //     name: 'Unique Rectangle',
    //     description: 'A uniqueness-based strategy: If four unsolved cells form a rectangle and contain only the same two candidates in three of the cells, then the fourth cell cannot contain those candidates—one must be eliminated to maintain a unique solution.',
    //     detect: checkUniqueRectangle
    // },
    // {
    //     name: 'BUG',
    //     description: 'If every unsolved cell in the puzzle has exactly two candidates, except for one cell with three candidates, removing a candidate that would create a non-unique solution (a BUG) reveals the correct answer.',
    //     detect: checkBUG
    // },
    // {
    //     name: 'X-Wing',
    //     description: 'The X-Wing technique is used to eliminate candidates by identifying a pattern in two rows and two columns. If a candidate appears in exactly two cells in two different rows, and those cells align in the same two columns (forming a rectangle), then that number can be eliminated from all other cells in those two columns. The same logic applies to columns and rows. The reasoning behind this is that the candidate must occupy one of those two positions in each row, which means it cannot appear elsewhere in the affected columns.',
    //     detect: checkXWing
    // },
    // {
    //     name: 'W-Wing',
    //     description: 'A W-Wing consists of two bivalue cells (cells with exactly two candidates) that share one candidate and are connected by a strong link. This means that one of these two numbers must be placed in one of the bivalue cells, allowing you to eliminate the other shared candidate in all other affected cells.',
    //     detect: checkWWing
    // },
    // {
    //     name: 'Finned X-Wing',
    //     description: 'A variation of the X-Wing that accounts for an additional "fin"—a cell outside the X-Wing pattern but in the same block as one of the X-Wing candidates. If the fin turns out to be the solution, it disrupts the X-Wing, but if it is not, the normal X-Wing eliminations apply.',
    //     detect: checkFinnedXWing
    // },
    // {
    //     name: 'Sashimi Finned X-Wing',
    //     description: 'An advanced variation of the Finned X-Wing where one of the X-Wing cells is already resolved. If a candidate appears in two key cells forming an X-Wing but also appears in a "fin" cell that belongs to the same block as one of those key cells, then all candidates present in the same block and row (or column) can be eliminated. ',
    //     detect: checkSashimiXWing
    // },
    // {
    //     name: 'Swordfish',
    //     description: 'An extension of the X-Wing strategy that involves three rows and three columns instead of two. If a number appears in exactly three positions in three different rows, and these positions align perfectly in three columns, then that number can be eliminated from all other cells in those three columns. The same logic applies if the pattern is reversed (three columns affecting three rows). Swordfish patterns are harder to spot but very effective in eliminating possibilities.',
    //     detect: checkSwordfish
    // },
    // {
    //     name: 'XY-Wing',
    //     description: 'The XY-Wing technique involves three interdependent cells, each containing only two candidates. The key is that the middle cell (the pivot) shares a candidate with each of the two other cells (the wings). If the pivot’s number is resolved, it forces one of the wings to take a specific value, which then forces the other wing’s value. Since one of these values must occur, any candidate that appears in both wings can be eliminated from any cell that sees both wing cells.',
    //     detect: checkXYWing
    // },
    // {
    //     name: 'XYZ-Wing',
    //     description: 'An extension of the XY-Wing strategy where the pivot cell contains three candidates instead of two. The wings still have only two candidates each, and they must each share one of their candidates with the pivot. If a common candidate appears in all three cells, any cell that can see all three cells can safely eliminate that candidate.',
    //     detect: checkXYZWing
    // },
    // {
    //     name: 'WXYZ-Wing',
    //     description: 'A more complex variation of the XYZ-Wing involving four cells and four candidates. The pivot cell contains all four numbers, while the three "wing" cells contain different subsets. The key to solving with a WXYZ-Wing is identifying a candidate that appears in all four cells but not necessarily in the same manner. If this candidate is guaranteed to be placed in one of the four cells, it can be eliminated from any other cell that sees all four of them. ',
    //     detect: checkWXYZwing
    // }
];
