var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 5;
    };

    this.getDriverString = function(unit, map)
    {
        if (map === null || unit.getLoadedUnitCount() > 0)
        {
            return "driver+";
        }
        return "";
    };

    this.loadStandingAnimation = function(sprite, unit, defender, weapon)
    {
        var driverName = BATTLEANIMATION_ATV.getDriverString(unit);
        sprite.loadSpriteV2("atv+" + driverName + "mask", GameEnums.Recoloring_Matrix, BATTLEANIMATION_ATV.getMaxUnitCount(), Qt.point(-5, 5), 1);
    };
};

Constructor.prototype = BATTLEANIMATION;
var BATTLEANIMATION_ATV = new Constructor();
