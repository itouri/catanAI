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
_adjacents_tiles[2]  = [ 0, 3, 4, 7, 8,12];
_adjacents_tiles[1]  = [ 1, 4, 5, 8, 9,13];
_adjacents_tiles[0]  = [ 2, 5, 6, 9,10,14];

_adjacents_tiles[6]  = [ 7,11,12,16,17,22];
_adjacents_tiles[5]  = [ 8,12,13,17,18,23];
_adjacents_tiles[4]  = [ 9,13,14,18,19,24];
_adjacents_tiles[3]  = [10,14,15,19,20,25];

_adjacents_tiles[11]  = [16,21,22,27,28,33];
_adjacents_tiles[10]  = [17,22,23,28,29,34];
_adjacents_tiles[9]  = [18,23,24,29,30,35];
_adjacents_tiles[8] = [19,24,25,30,31,36];
_adjacents_tiles[7] = [20,25,26,31,32,37];

_adjacents_tiles[15] = [28,33,34,38,39,43];
_adjacents_tiles[14] = [29,34,35,39,40,44];
_adjacents_tiles[13] = [30,35,36,40,41,45];
_adjacents_tiles[12] = [31,36,37,41,42,46];

_adjacents_tiles[18] = [39,43,44,47,48,51];
_adjacents_tiles[17] = [40,44,45,48,49,52];
_adjacents_tiles[16] = [41,45,46,49,50,53];

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

//どの辺がどの点と接しているか
var _adjacents_edge = [];
_adjacents_edge[0] = [0,3];
_adjacents_edge[1] = [0,4];
_adjacents_edge[2] = [1,4];
_adjacents_edge[3] = [1,5];
_adjacents_edge[4] = [2,5];
_adjacents_edge[5] = [2,6];
_adjacents_edge[6] = [3,7];
_adjacents_edge[7] = [4,8];
_adjacents_edge[8] = [5,9];
_adjacents_edge[9] = [6,10];
_adjacents_edge[10] = [7,11];
_adjacents_edge[11] = [7,12];
_adjacents_edge[12] = [8,12];
_adjacents_edge[13] = [8,13];
_adjacents_edge[14] = [9,13];
_adjacents_edge[15] = [9,14];
_adjacents_edge[16] = [10,14];
_adjacents_edge[17] = [10,15];
_adjacents_edge[18] = [11,16];
_adjacents_edge[19] = [12,17];
_adjacents_edge[20] = [13,18];
_adjacents_edge[21] = [14,19];
_adjacents_edge[22] = [15,20];
_adjacents_edge[23] = [16,21];
_adjacents_edge[24] = [16,22];
_adjacents_edge[25] = [17,22];
_adjacents_edge[26] = [17,23];
_adjacents_edge[27] = [18,23];
_adjacents_edge[28] = [18,24];
_adjacents_edge[29] = [19,24];
_adjacents_edge[30] = [19,25];
_adjacents_edge[31] = [20,25];
_adjacents_edge[32] = [20,26];
_adjacents_edge[33] = [21,27];
_adjacents_edge[34] = [22,28];
_adjacents_edge[35] = [23,29];
_adjacents_edge[36] = [24,30];
_adjacents_edge[37] = [25,31];
_adjacents_edge[38] = [26,32];
_adjacents_edge[39] = [27,33];
_adjacents_edge[40] = [28,33];
_adjacents_edge[41] = [28,34];
_adjacents_edge[42] = [29,34];
_adjacents_edge[43] = [29,35];
_adjacents_edge[44] = [30,35];
_adjacents_edge[45] = [30,36];
_adjacents_edge[46] = [31,36];
_adjacents_edge[47] = [31,37];
_adjacents_edge[48] = [32,37];
_adjacents_edge[49] = [33,38];
_adjacents_edge[50] = [34,39];
_adjacents_edge[51] = [35,40];
_adjacents_edge[52] = [36,41];
_adjacents_edge[53] = [37,42];
_adjacents_edge[54] = [38,43];
_adjacents_edge[55] = [39,43];
_adjacents_edge[56] = [39,44];
_adjacents_edge[57] = [40,44];
_adjacents_edge[58] = [40,45];
_adjacents_edge[59] = [41,45];
_adjacents_edge[60] = [41,46];
_adjacents_edge[61] = [42,46];
_adjacents_edge[62] = [43,47];
_adjacents_edge[63] = [44,48];
_adjacents_edge[64] = [45,49];
_adjacents_edge[65] = [46,50];
_adjacents_edge[66] = [47,51];
_adjacents_edge[67] = [48,51];
_adjacents_edge[68] = [48,52];
_adjacents_edge[69] = [49,52];
_adjacents_edge[70] = [49,53];
_adjacents_edge[71] = [50,53];

//点→辺
var _adjacents_intersection = [];
_adjacents_intersection[ 0] = [0,1];
_adjacents_intersection[ 1] = [2,3];
_adjacents_intersection[ 2] = [4,5];

_adjacents_intersection[ 3] = [0,6];
_adjacents_intersection[ 4] = [1,2,7];
_adjacents_intersection[ 5] = [3,4,8];
_adjacents_intersection[ 6] = [5,9];

_adjacents_intersection[ 7] = [6,10,11];
_adjacents_intersection[ 8] = [7,12,13];
_adjacents_intersection[ 9] = [8,14,15];
_adjacents_intersection[10] = [9,16,17];

_adjacents_intersection[11] = [10,18];
_adjacents_intersection[12] = [11,12,19];
_adjacents_intersection[13] = [13,14,20];
_adjacents_intersection[14] = [15,16,21];
_adjacents_intersection[15] = [17,22];

_adjacents_intersection[16] = [18,23,24];
_adjacents_intersection[17] = [19,25,26];
_adjacents_intersection[18] = [20,27,28];
_adjacents_intersection[19] = [21,29,30];
_adjacents_intersection[20] = [22,31,32];

_adjacents_intersection[21] = [23,33];
_adjacents_intersection[22] = [24,25,34];
_adjacents_intersection[23] = [26,27,35];
_adjacents_intersection[24] = [28,29,36];
_adjacents_intersection[25] = [30,31,37];
_adjacents_intersection[26] = [32,38];

_adjacents_intersection[27] = [33,39];
_adjacents_intersection[28] = [34,40,41];
_adjacents_intersection[29] = [35,42,43];
_adjacents_intersection[30] = [36,44,45];
_adjacents_intersection[31] = [37,46,47];
_adjacents_intersection[32] = [38,48];

_adjacents_intersection[33] = [39,40,49];
_adjacents_intersection[34] = [41,42,50];
_adjacents_intersection[35] = [43,44,51];
_adjacents_intersection[36] = [45,46,52];
_adjacents_intersection[37] = [47,48,53];

_adjacents_intersection[38] = [49,54];
_adjacents_intersection[39] = [50,55,56];
_adjacents_intersection[40] = [51,57,58];
_adjacents_intersection[41] = [52,59,60];
_adjacents_intersection[42] = [53,61];

_adjacents_intersection[43] = [55,62];
_adjacents_intersection[44] = [56,57,63];
_adjacents_intersection[45] = [58,59,64];
_adjacents_intersection[46] = [60,61,65];

_adjacents_intersection[47] = [62,66];
_adjacents_intersection[48] = [63,67,68];
_adjacents_intersection[49] = [64,69,70];
_adjacents_intersection[50] = [65,71];

_adjacents_intersection[51] = [66,67];
_adjacents_intersection[52] = [68,69];
_adjacents_intersection[53] = [70,71];
