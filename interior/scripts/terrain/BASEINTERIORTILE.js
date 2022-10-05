var Constructor = function()
{
    // loader for stuff which needs C++ Support
    this.init = function (terrain)
    {
        terrain.setTerrainName(__BASEINTERIORTILE.getName(terrain));
    };
    this.baseTerrainId = "PLAINS";
    this.getName = function(terrain = null)
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
        else if (currentTerrainID === "PLAINS")
        {
            terrain.loadBaseTerrain("PLAINS");
        }
        else
        {
            var baseTerrainId = ""
            if (terrain !== null)
            {
                baseTerrainId = Global[terrain.getTerrainID()].baseTerrainId;
            }
            terrain.loadBaseTerrain(baseTerrainId);
        }
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
    this.getDescription = function()
    {
        return qsTr("The inside of a massive facility. Infantry have no problem navigating but ground vehicles will struggle with.");
    };
    this.getTerrainAnimationBackground = function(unit, terrain, defender, map)
    {
        var variables = terrain.getVariables();
        var variable = variables.getVariable("BACKGROUND_ID");
        var rand = 0;
        if (variable === null)
        {
            rand = globals.randInt(0, 2);
            variable = variables.createVariable("BACKGROUND_ID");
            variable.writeDataInt32(rand);
        }
        else
        {
            rand = variable.readDataInt32();
        }
        var baseTerrainId = ""
        if (terrain !== null)
        {
            baseTerrainId = Global[terrain.getTerrainID()].baseTerrainId;
        }
        var id = TERRAIN.getTerrainAnimationId(terrain, map);
        if (baseTerrainId === "WASTE")
        {
            return __BASEINTERIORTILE.getStreetAnimationBackground(id, "WASTE");
        }
        else if (baseTerrainId === "SNOW")
        {
            return __BASEINTERIORTILE.getStreetAnimationBackground(id, "SNOW");
        }
        else if (baseTerrainId === "DESERT")
        {
            return __BASEINTERIORTILE.getStreetAnimationBackground(id, "DESERT");
        }
        else
        {
            var weatherModifier = TERRAIN.getWeatherModifier(map);
            return __BASEINTERIORTILE.getStreetAnimationBackground(id, weatherModifier);
        }
    };
    this.getStreetAnimationBackground = function(id, weatherModifier)
    {
        switch (id)
        {
        case "LAKE":
        case "SEA":
        case "BEACH":
        case "FOG":
        case "REAF":
        case "ROUGH_SEA":
            return "back_" + weatherModifier + "street+sea";
        case "SNOW_MOUNTAIN":
        case "DESERT_ROCK":
        case "MOUNTAIN":
            return "back_" + weatherModifier + "street+mountain";
        case "BUILDING":
            return "back_" + weatherModifier + "street+town";
        case "DESERT_WELD":
        case "SNOW_WELD":
        case "WELD":
        case "PIPELINE":
        case "DESERT_PIPELINE":
        case "SNOW_PIPELINE":
        case "WASTE_PIPELINE":
        case "ZWELD_N_S":
        case "ZWELD_E_W":
        case "ZSNOWWELD_N_S":
        case "ZSNOWWELD_E_W":
        case "ZDESERTWELD_N_S":
        case "ZDESERTWELD_E_W":
            return "back_" + weatherModifier + "street+pipe";
        case "FOREST":
        case "FOREST1":
        case "FOREST2":
        case "FOREST3":
        case "DESERT_FOREST":
        case "DESERT_FOREST1":
        case "SNOW_FOREST":
        case "SNOW_FOREST1":
        case "SNOW_FOREST2":
            return "back_" + weatherModifier + "street+forest";
        default:
            return "back_" + weatherModifier + "street";
        }
    };
};
Constructor.prototype = TERRAIN;
var __BASEINTERIORTILE = new Constructor();
