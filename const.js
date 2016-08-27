var ENUM_INIT_STATE = {
	TILE 	: 0,
	TOKEN 	: 1,
	HARBOR 	: 2,
	PLAYER_COLOR 	: 3, //AIか人かと席順も決める
	PLAYER_ORDER 	: 4, //初期配置の順番を決める
	END : 5 //CheckButtonで使用
};

var IMG_PATH = "./img/"

var ENUM_RESOURCE			= { BRICK:0, LUNBER:1, WOOL:2, GRAIN:3, ORE:4, DESERT:5};
var RESOURCE_NAMES 		    = ["brick" ,"lumber" ,"wool" ,"grain", "ore" ,"desert"];
var _resource_panel_remains = [       3,        4,      4,      4,       3,      1];

var HARBOR_NAMES 		    = ["brick" ,"lumber" ,"wool" ,"grain", "ore" ,"3_1"];
var _harbor_panel_remains   = [		  1,		1,		1,		1,		 1,	  5];

var ENUM_PLAYER_COLORS = { RED:0, BLUE:1, ORANGE:2, WHITE:3};
var PLAYER_COLORS 	   = ["red" ,"blue" ,"orange" ,"white" ];

var ENUM_ACTIONS = { 
	KNIGHT		:0, //騎士
	PLENTY		:1, //収穫
	ROAD		:2, //がいどう建設
	MONOPOLY	:3, //独占
	POINT		:4,	//勝利点
};
var ACTION_NAMES   = ["knight","plenty","road","monopoly","point"];
var ACTION_REMAINS = [      14,       2,     2,         2,      5];

						//   0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12
var _token_panel_remains = [-1,-1, 1, 2, 2, 2, 2,-1, 2, 2, 2, 2, 1];

var ENUM_CONTROLLER_TAB = {
	DICE		:0,
	ACTION 		:1,
	BUILD		:2,
	DOMESTIC	:3, //貿易
	MARITIME	:4, //交渉
};
var CONTROLLER_TAB_NAMES = ["dice","action","build","domestic_trade","maritime_trade"];

var ENUM_BUILD  = {ROAD:0,SETTLEMENT:1,CITY:2,DEVELOPMENT:3};
var BUILD_NAMES = ["road","settlement","city","development"];

var MAX_PLAYER = 4;