var Constructor = function()
{
    this.getTerrainGroup = function()
    {
        return 1;
    };
    // loader for stuff which needs C++ Support
    this.init = function (terrain)
    {
        terrain.setTerrainName(INTERIORTILE.getName());
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
    this.loadBaseSprite = function(terrain, currentTerrainID, map)
    {
        var random = globals.randInt(0, 140);
        if (random >= 15)
        {
            random = globals.randInt(15, 20);
            terrain.loadBaseSprite("interiortile+" + random.toString());
        }
        else
        {
            terrain.loadBaseSprite("interiortile+" + random.toString());
        }
    };
    this.getMiniMapIcon = function()
    {
        return "minimap_street";
    };
    this.getTerrainAnimationForeground = function(unit, terrain, defender, map)
    {
        return "fore_interiortile";
    };
    this.getDescription = function()
    {
        return qsTr("The inside of a massive facility. Infantry have no problem navigating but ground vehicles will struggle with.");
    };

    this.getTerrainAnimationForeground = function(unit, terrain, defender, map)
    {
        return "fore_interiortile";
    };
};
Constructor.prototype = __BASEINTERIORTILE;
var INTERIORTILE = new Constructor();
