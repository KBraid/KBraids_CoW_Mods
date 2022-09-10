var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Gun");
    };
    this.getEnviromentDamage = function(enviromentId)
    {
        return 65;
    };
    this.damageTable = [["APC", 115],
                        ["FLARE", 115],
                        ["RECON", 115],

                        ["INFANTRY", 40],
                        ["MECH", 35],
                        ["MOTORBIKE", 75],
                        ["SNIPER", 70],

                        // tanks
                        ["FLAK", 115],
                        ["HOVERFLAK", 115],
                        ["LIGHT_TANK", 95],
                        ["HOVERCRAFT", 95],

                        // heavy tanks
                        ["HEAVY_HOVERCRAFT", 85],
                        ["HEAVY_TANK", 70],
                        ["NEOTANK", 85],

                        // very heavy tanks
                        ["MEGATANK", 55],

                        // ranged land units
                        ["ARTILLERY", 110],
                        ["ARTILLERYCRAFT", 105],
                        ["ANTITANKCANNON", 45],
                        ["MISSILE", 110],
                        ["ROCKETTHROWER", 110],
                        ["PIPERUNNER", 110],

                        ["HOELLIUM", 35],

                        // ships
                        ["BATTLESHIP", 20],
                        ["CANNONBOAT", 65],
                        ["CRUISER", 14],
                        ["DESTROYER", 14],
                        ["SUBMARINE", 14],
                        ["LANDER", 28],
                        ["BLACK_BOAT", 65],
                        ["AIRCRAFTCARRIER", 20]];

    this.getBaseDamage = function(unit)
    {
        return WEAPON.getDamageFromTable(unit, WEAPON_GOLIATH_GUN.damageTable, "WEAPON_GOLIATH_GUN");
    };
};

Constructor.prototype = WEAPON;
var WEAPON_GOLIATH_GUN = new Constructor();
