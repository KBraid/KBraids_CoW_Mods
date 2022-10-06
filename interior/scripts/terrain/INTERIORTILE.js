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
    this.getDefense = function(terrain)
    {
            return 2;
    };
    this.loadBaseSprite = function(terrain, currentTerrainID, map)
    {
        var random = globals.randInt(0, 6);
            terrain.loadBaseSprite("interiortile+" + random.toString());
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
Constructor.prototype = TERRAIN;
var INTERIORTILE = new Constructor();
