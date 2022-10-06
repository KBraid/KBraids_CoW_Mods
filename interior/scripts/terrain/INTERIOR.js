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
    this.getDefense = function(terrain)
    {
            return 1;
    };
    this.loadBaseSprite = function(terrain, map)
    {
        var surroundings = terrain.getSurroundings("INTERIOR", false, false, GameEnums.Directions_Direct, true, true);
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
        return qsTr("The inside of a massive facility. The open interior permits movement room for vehicles but provides little cover.");
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
    
    this.getBaseOverlayTerrainSprites = function(spriteId)
    {
        return [spriteId + "+SE",
                spriteId + "+NE",
                spriteId + "+SW",
                spriteId + "+NW",];
    };

};
Constructor.prototype = TERRAIN;
var INTERIOR = new Constructor();
