const IMG_PATH = "./img/"

enum EnumInitState {
    Tile,
    Token,
    Harbor,
    PlayerColor,
    PlayerOrder,
    Build,
    End,
}

enum EnumResource {
    Brick,
    Lunber,
    Wool,
    Grain,
    Ore,
    Desert,
}

const RESOURCE_NAMES: string[] = [
    "brick",
    "lumber",
    "wool",
    "grain",
    "ore",
    "desert",
];

const HARBOR_NAMES: string[] = [
    "brick",
    "lumber",
    "wool",
    "grain",
    "ore",
    "3_1",
];

enum EnumPlayerColors {
    Red,
    Blue,
    Orange,
    White,
}

const PLAYER_COLORS: string[] = [
    "red",
    "blue",
    "orange",
    "white,"
];

enum EnumActions {
    Knight,
    Plenty,
    Road,
    Monopoly,
    Point,
}

const ACTION_NAMES: string[] = [
    "knight",
    "plenty",
    "road",
    "monopoly",
    "point",
];

enum EnumControllerTab {
    Dice,
    Action,
    Build,
    Domestic,
    Maritime,
    Victory,
}

const CONTROLLER_TAB_NAMES: string[] = [
    "dice",
    "action",
    "build",
    "domestic_trade",
    "maritime_trade",
];

enum EnumBuild {
    Road,
    Settlement,
    City,
    Development,
}

const BUILD_NAMES: string[] = [
    "road",
    "settlement",
    "city",
    "development",
];