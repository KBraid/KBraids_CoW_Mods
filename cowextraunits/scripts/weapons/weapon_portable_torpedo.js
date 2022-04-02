var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Portable Torpedo");
    };
    this.damageTable = [["BATTLESHIP", 35],
                        ["CANNONBOAT", 75],

                        ["CRUISER", 35],
                        ["DESTROYER", 35],
                        ["SUBMARINE", 35],

                        ["LANDER", 55],
                        ["BLACK_BOAT", 75],
                        ["AIRCRAFTCARRIER", 35],
                        ["WATERMINE", 400]];

    this.getBaseDamage = function(unit)
    {
        return WEAPON.getDamageFromTable(unit, WEAPON_PORTABLE_TORPEDO.damageTable, "WEAPON_TORPEDO");
    };
};

Constructor.prototype = WEAPON;
var WEAPON_PORTABLE_TORPEDO = new Constructor();
