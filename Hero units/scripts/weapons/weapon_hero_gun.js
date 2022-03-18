var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Gun");
    };
    this.getEnviromentDamage = function(enviromentId)
    {
        return 75;
    };
    this.damageTable = [["HERO", 45],

                        ["INFANTRY", 120],
                        ["MECH", 80],
                        ["MOTORBIKE", 80],
                        ["SNIPER", 120],

                        ["APC", 75],
                        ["FLARE", 85],
                        ["RECON", 120],

                        // tanks
                        ["FLAK", 85],
                        ["HOVERFLAK", 90],
                        ["LIGHT_TANK", 60],
                        ["HOVERCRAFT", 60],

                        // heavy tanks
                        ["HEAVY_HOVERCRAFT", 45],
                        ["HEAVY_TANK", 45],
                        ["NEOTANK", 55],

                        // very heavy tanks
                        ["MEGATANK", 35],

                        ["HOELLIUM", 20],

                        // heli copter
                        ["T_HELI", 25],
                        ["K_HELI", 20],

                        // ranged land units
                        ["ARTILLERY", 65],
                        ["ARTILLERYCRAFT", 65],
                        ["ANTITANKCANNON", 60],
                        ["MISSILE", 135],
                        ["ROCKETTHROWER", 135],
                        ["PIPERUNNER", 60],

                        // ships
                        ["BATTLESHIP", 30],
                        ["CANNONBOAT", 45],
                        ["CRUISER", 30],
                        ["DESTROYER", 30],
                        ["SUBMARINE", 30],
                        ["LANDER", 30],
                        ["BLACK_BOAT", 45],
                        ["AIRCRAFTCARRIER", 30]];

    this.getBaseDamage = function(unit)
    {
        return WEAPON.getDamageFromTable(unit, WEAPON_NEOTANK_GUN.damageTable, "WEAPON_NEOTANK_GUN");
    };
};

Constructor.prototype = WEAPON;
var WEAPON_NEOTANK_GUN = new Constructor();
