var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Amphibious");
    };
    this.movementpointsTable = [["PLAINS", 1],
                                ["PLAINS_DESTROYED", 1],
                                ["PLAINS_PLASMA", 1],
                                ["BEACH", 1],
                                ["BRIDGE", 1],
                                ["BRIDGE1", 1],
                                ["BRIDGE2", 1],
                                ["DESTROYEDWELD", 1],
                                ["FOREST", 2],
                                ["FOREST1", 2],
                                ["FOREST2", 2],
                                ["FOREST3", 2],
                                ["RUIN", 2],
                                ["STREET", 1],
                                ["SNOW_STREET", 1],
                                ["STREET1", 1],
                                ["WASTELAND", 2],
                                ["AIRPORT", 1],
                                ["FACTORY", 1],
                                ["HARBOUR", 1],
                                ["HQ", 1],
                                ["PIPESTATION", 1],
                                ["RADAR", 1],
                                ["TOWER", 1],
                                ["TOWN", 1],
                                ["SILO", 1],
                                ["SILO_ROCKET", 1],
                                ["LABOR", 1],
                                ["TEMPORARY_AIRPORT", 1],
                                ["TEMPORARY_HARBOUR", 1],
                                ["DESERT_WASTELAND", 1],
                                ["DESERT_PATH", 1],
                                ["DESERT_PATH1", 1],
                                ["DESERT", 1],
                                ["DESERT_DESTROYEDWELD", 1],
                                ["DESERT_FOREST", 2],
                                ["DESERT_FOREST1", 2],
                                ["MINE", 3],
                                ["MOUNTAIN", 3],
                                ["DESERT_ROCK", 3],
                                ["DESERT_TRY_RIVER", 2],
                                ["DESERT_RUIN", 2],
                                ["RIVER", 1],
                                ["SNOW", 2],
                                ["SNOW_DESTROYEDWELD", 2],
                                ["SNOW_FOREST", 3],
                                ["SNOW_FOREST1", 3],
                                ["SNOW_FOREST2", 3],
                                ["SNOW_WASTELAND", 3],
                                ["SNOW_MOUNTAIN", 4],
                                ["SNOW_RUIN", 3],
                                ["WASTE",  1],
                                ["WASTE_PATH", 1],
                                ["WASTE_FOREST", 2],
                                ["WASTE_MOUNTAIN", 3],
                                ["WASTE_WASTELAND", 2],
                                ["WASTE_RUIN", 2],
                                ["CREEPER", 1],
                                ["SEA", 2],
                                ["LAKE", 1],
                                ["FOG", 2],
                                ["ROUGH_SEA", 4],
                                ["REAF", 3],
                                ["TELEPORTTILE", 0]];

    this.getMovementpoints = function(terrain, unit, currentTerrain, trapChecking = false, map)
    {
        var terrainId = terrain.getBaseTerrainID()        
        var id = terrain.getID();
        if ((id === "ZGATE_E_W" || id === "ZGATE_N_S") &&
            (unit !== null) &&
            (unit.getOwner().isAlly(terrain.getBuilding().getOwner())))
        {
            return 1;
        }
        else if (id === "OILRIG")
        {
            if (terrainId !== "SEA" &&
                terrainId !== "LAKE" )
            {
                return 1;
            }
        }

        return MOVEMENTTABLE.getMovementpointsFromTable(terrain, MOVE_AMPHIBIOUS.movementpointsTable);
    };
};
Constructor.prototype = MOVEMENTTABLE;
var MOVE_AMPHIBIOUS = new Constructor();
