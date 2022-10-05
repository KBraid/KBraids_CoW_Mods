var Constructor = function()
{
    this.getTerrainGroup = function()
    {
        return 1;
    };
    // loader for stuff which needs C++ Support
    this.init = function (terrain)
    {
        terrain.setTerrainName(INTERIOR.getName());
    };
    this.getName = function()
    {
        return qsTr("Interior");
    };
    this.loadBaseTerrain = function(terrain, currentTerrainID, map)
    {
        if (currentTerrainID === "SNOW")
        {
            terrain.loadBaseTerrain("SNOW");
        }
        else if (currentTerrainID === "DESERT")
        {
            terrain.loadBaseTerrain("DESERT");
        }
        else if (currentTerrainID === "WASTE")
        {
            terrain.loadBaseTerrain("WASTE");
        }
        else
        {
            terrain.loadBaseTerrain("PLAINS");
        }
    };
    this.getDefense = function(terrain)
    {
            return 2;
    };
    this.loadBaseSprite = function(terrain, map)
    {
        var surroundings = terrain.getSurroundings("INTERIOR,STREET,STREET1,BRIDGE,BRIDGE1,BRIDGE2,SNOW_STREET,DESERT_PATH,DESERT_PATH1,WASTE_PATH", false, false, GameEnums.Directions_Direct, true, true);
        terrain.loadBaseSprite("interior" + surroundings);
    };
    this.getMiniMapIcon = function()
    {
        return "minimap_street";
    };
    this.getTerrainAnimationForeground = function(unit, terrain, defender, map)
    {
        return "fore_interior";
    };
    this.getDescription = function()
    {
        return qsTr("The inside of a massive facility. Infantry have no problem navigating but ground vehicles will struggle with.");
    };

    this.getTerrainSprites = function()
    {
        // array of sprites that can be selected as fix sprites for this terrain
        return ["interior",
                "interior+E",
                "interior+E+S",
                "interior+E+S+W",
                "interior+E+W",
                "interior+N",
                "interior+N+E",
                "interior+N+E+S",
                "interior+N+E+S+W",
                "interior+N+E+W",
                "interior+N+S",
                "interior+N+S+W",
                "interior+N+W",
                "interior+S",
                "interior+S+W",
                "interior+W"];
    };
    this.getTerrainAnimationForeground = function(unit, terrain, defender, map)
    {
        return "fore_interior";
    };
};
Constructor.prototype = __BASEINTERIOR;
var INTERIOR = new Constructor();
