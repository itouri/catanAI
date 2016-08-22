//隣接点をひたすら定義

//辺の隣接
var _adjacents = [];
_adjacents[ 0] = [3 ,4];
_adjacents[ 1] = [4 ,5];
_adjacents[ 2] = [5 ,6];

_adjacents[ 3] = [0 ,   7 ];
_adjacents[ 4] = [0 ,1, 8 ];
_adjacents[ 5] = [1 ,2, 9 ];
_adjacents[ 6] = [2 ,   10];

_adjacents[ 7] = [3 ,11,12];
_adjacents[ 8] = [4 ,12,13];
_adjacents[ 9] = [5 ,13,14];
_adjacents[10] = [6 ,14,15];

_adjacents[11] = [7 ,   16];
_adjacents[12] = [7 ,8 ,17];
_adjacents[13] = [8 ,9 ,18];
_adjacents[14] = [9 ,10,19];
_adjacents[15] = [10,   20];

_adjacents[16] = [11,21,22];
_adjacents[17] = [12,22,23];
_adjacents[18] = [13,23,24];
_adjacents[19] = [14,24,25];
_adjacents[20] = [15,25,26];

_adjacents[21] = [16,   27];
_adjacents[22] = [16,17,28];
_adjacents[23] = [17,18,29];
_adjacents[24] = [18,19,30];
_adjacents[25] = [19,20,31];
_adjacents[26] = [20,   32];

_adjacents[27] = [21,   33];
_adjacents[28] = [22,33,34];
_adjacents[29] = [23,34,35];
_adjacents[30] = [24,35,36];
_adjacents[31] = [25,36,37];
_adjacents[32] = [26,   37];

_adjacents[33] = [27,28,38];
_adjacents[34] = [28,29,39];
_adjacents[35] = [29,30,40];
_adjacents[36] = [30,31,41];
_adjacents[37] = [31,32,42];

_adjacents[38] = [33,   43];
_adjacents[39] = [34,43,44];
_adjacents[40] = [35,44,45];
_adjacents[41] = [36,45,46];
_adjacents[42] = [37,   46];

_adjacents[43] = [38,39,47];
_adjacents[44] = [39,40,48];
_adjacents[45] = [40,41,49];
_adjacents[46] = [41,42,50];

_adjacents[47] = [43,   51];
_adjacents[48] = [44,51,52];
_adjacents[49] = [45,52,53];
_adjacents[50] = [46,   53];

_adjacents[51] = [47,48];
_adjacents[52] = [48,49];
_adjacents[53] = [49,50];

//各タイルがどの点を持っているか
var _adjacents_tiles = [];
_adjacents_tiles[0]  = [ 0, 3, 4, 7, 8,12];
_adjacents_tiles[1]  = [ 1, 4, 5, 8, 9,13];
_adjacents_tiles[2]  = [ 2, 5, 6, 9,10,14];
_adjacents_tiles[3]  = [ 7,11,12,16,17,22];
_adjacents_tiles[4]  = [ 8,12,13,17,18,23];
_adjacents_tiles[5]  = [ 9,13,14,18,19,24];
_adjacents_tiles[6]  = [10,14,15,19,20,25];
_adjacents_tiles[7]  = [16,21,22,27,28,33];
_adjacents_tiles[8]  = [17,22,23,28,29,34];
_adjacents_tiles[9]  = [18,23,24,29,30,35];
_adjacents_tiles[10] = [19,24,25,30,31,36];
_adjacents_tiles[11] = [20,25,26,31,32,37];
_adjacents_tiles[12] = [28,33,34,38,39,43];
_adjacents_tiles[13] = [29,34,35,39,40,44];
_adjacents_tiles[14] = [30,35,36,40,41,45];
_adjacents_tiles[15] = [31,36,37,41,42,46];
_adjacents_tiles[16] = [39,43,44,47,48,51];
_adjacents_tiles[17] = [40,44,45,48,49,52];
_adjacents_tiles[18] = [41,45,46,49,50,53];

//各港がどの交差点に隣接してるか
var _adjacents_harbar = [];
_adjacents_harbar[0] = [2,5];
_adjacents_harbar[1] = [1,5];
_adjacents_harbar[2] = [1,4];
_adjacents_harbar[3] = [0,4];
_adjacents_harbar[4] = [0,3];
_adjacents_harbar[5] = [3,7];
_adjacents_harbar[6] = [7,11];
_adjacents_harbar[7] = [11,16];
_adjacents_harbar[8] = [16,21];
_adjacents_harbar[9] = [21,27];
_adjacents_harbar[10] = [27,33];
_adjacents_harbar[11] = [33,38];
_adjacents_harbar[12] = [38,43];
_adjacents_harbar[13] = [43,47];
_adjacents_harbar[14] = [47,51];
_adjacents_harbar[15] = [48,51];
_adjacents_harbar[16] = [48,52];
_adjacents_harbar[17] = [49,52];
_adjacents_harbar[18] = [49,53];
_adjacents_harbar[19] = [50,53];
_adjacents_harbar[20] = [46,50];
_adjacents_harbar[21] = [42,46];
_adjacents_harbar[22] = [37,42];
_adjacents_harbar[23] = [32,37];
_adjacents_harbar[24] = [26,32];
_adjacents_harbar[25] = [20,26];
_adjacents_harbar[26] = [15,20];
_adjacents_harbar[27] = [10,15];
_adjacents_harbar[28] = [6,10];
_adjacents_harbar[29] = [2,6];

