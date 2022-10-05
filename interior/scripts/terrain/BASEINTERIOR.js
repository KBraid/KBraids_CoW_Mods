var Constructor = function()
{
    // loader for stuff which needs C++ Support
    this.init = function (terrain)
    {
        terrain.setTerrainName(__BASEINTERIOR.getName(terrain));
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

    this.loadBase = function(terrain, spriteId, map)
    {
        var surroundings = terrain.getSurroundings("INTERIOR,STREET,STREET1,BRIDGE,BRIDGE1,BRIDGE2,SNOW_STREET,DESERT_PATH,DESERT_PATH1,WASTE_PATH", false, false, GameEnums.Directions_Direct, true, true);
        terrain.loadBaseSprite(spriteId + surroundings);
    };

    this.getMiniMapIcon = function()
    {
        return "minimap_street";
    };
    this.getDescription = function()
    {
        return qsTr("The inside of a massive facility. Infantry have no problem navigating but ground vehicles will struggle with.");
    };
    this.getSprites = function(spriteId)
    {
        // array of sprites that can be selected as fix sprites for this terrain
        return [spriteId,
                spriteId + "+E",
                spriteId + "+E+S",
                spriteId + "+E+S+W",
                spriteId + "+E+W",
                spriteId + "+N",
                spriteId + "+N+E",
                spriteId + "+N+E+S",
                spriteId + "+N+E+S+W",
                spriteId + "+N+E+W",
                spriteId + "+N+S",
                spriteId + "+N+S+W",
                spriteId + "+N+W",
                spriteId + "+S",
                spriteId + "+S+W",
                spriteId + "+W"];
    };
    this.loadOverlay = function(terrain, terrainId, spriteId, map)
    {
        // Check every side.
        var surroundings = terrain.getSurroundings(terrainId, false, false, GameEnums.Directions_Direct, false);
        // Load overlay south east, strict.
        if (surroundings.includes("+S") && surroundings.includes("+E"))
        {
            var surroundingsSE = terrain.getSurroundings(terrainId, false, false, GameEnums.Directions_SouthEast, false);
            if (surroundingsSE !== "")
            {
                terrain.loadOverlaySprite(spriteId + "+SE");
            }
        }
        // Load overlay north east, strict.
        if (surroundings.includes("+N") && surroundings.includes("+E"))
        {
            var surroundingsNE = terrain.getSurroundings(terrainId, false, false, GameEnums.Directions_NorthEast, false);
            if (surroundingsNE !== "")
            {
                terrain.loadOverlaySprite(spriteId + "+NE");
            }
        }
        // Load overlay south west, strict.
        if (surroundings.includes("+S") && surroundings.includes("+W"))
        {
            var surroundingsSW = terrain.getSurroundings(terrainId, false, false, GameEnums.Directions_SouthWest, false);
            if (surroundingsSW !== "")
            {
                terrain.loadOverlaySprite(spriteId + "+SW");
            }
        }
        // Load overlay northwest, strict.
        if (surroundings.includes("+N") && surroundings.includes("+W"))
        {
            var surroundingsNW = terrain.getSurroundings(terrainId, false, false, GameEnums.Directions_NorthWest, false);
            if (surroundingsNW !== "")
            {
                terrain.loadOverlaySprite(spriteId + "+NW");
            }
        }
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
            return __BASEINTERIOR.getStreetAnimationBackground(id, "WASTE");
        }
        else if (baseTerrainId === "SNOW")
        {
            return __BASEINTERIOR.getStreetAnimationBackground(id, "SNOW");
        }
        else if (baseTerrainId === "DESERT")
        {
            return __BASEINTERIOR.getStreetAnimationBackground(id, "DESERT");
        }
        else
        {
            var weatherModifier = TERRAIN.getWeatherModifier(map);
            return __BASEINTERIOR.getStreetAnimationBackground(id, weatherModifier);
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
var __BASEINTERIOR = new Constructor();
