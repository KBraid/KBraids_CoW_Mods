var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Amphibious");
    };
    this.movementpointsTable = [
    ["PLAINS", 2],
    ["PLAINS_DESTROYED", 2],
    ["PLAINS_PLASMA", 2],
    ["BEACH", 2],
    ["BRIDGE", 1],
    ["BRIDGE1", 1],
    ["BRIDGE2", 1],
    ["DESTROYEDWELD", 2],
    ["FOREST", 3],
    ["FOREST1", 3],
    ["FOREST2", 3],
    ["FOREST3", 3],
    ["RUIN", 3],
    ["STREET", 1],
    ["SNOW_STREET", 1],
    ["STREET1", 1],
    ["WASTELAND", 3],
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
    ["OILRIG", 1],
    ["DESERT_WASTELAND", 2],
    ["DESERT_PATH", 2],
    ["DESERT_PATH1", 2],
    ["DESERT", 2],
    ["DESERT_DESTROYEDWELD", 2],
    ["DESERT_FOREST", 3],
    ["DESERT_FOREST1", 3],
    ["MINE", 4],
    ["MOUNTAIN", 4],
    ["DESERT_ROCK", 4],
    ["DESERT_TRY_RIVER", 2],
    ["DESERT_RUIN", 3],
    ["RIVER", 1],
    ["SNOW", 3],
    ["SNOW_DESTROYEDWELD", 3],
    ["SNOW_FOREST", 4],
    ["SNOW_FOREST1", 4],
    ["SNOW_FOREST2", 4],
    ["SNOW_WASTELAND", 4],
    ["SNOW_MOUNTAIN", 5],
    ["SNOW_RUIN", 4],
    ["WASTE", 2],
    ["WASTE_PATH", 2],
    ["WASTE_FOREST", 3],
    ["WASTE_MOUNTAIN", 4],
    ["WASTE_WASTELAND", 3],
    ["WASTE_RUIN", 3],
    ["CREEPER", 2],
    ["SEA", 1],
    ["LAKE", 1],
    ["FOG", 1],
    ["ROUGH_SEA", 3],
    ["REAF", 2],
    ["TELEPORTTILE", 0]];

    this.getMovementpoints = function(terrain, unit, currentTerrain, trapChecking = false, map)
    {    
        var id = terrain.getID();
        var baseId = terrain.getBaseTerrainID();
        var currentBaseId = currentTerrain.getBaseTerrainID();
        var currentId = currentTerrain.getID();
        if ((id === "ZGATE_E_W" || id === "ZGATE_N_S") &&
            (unit !== null) &&
            (unit.getOwner().isAlly(terrain.getBuilding().getOwner())))
        {
            return 1;
        }
        var costs = MOVEMENTTABLE.getMovementpointsFromTable(terrain, MOVE_AMPHIBIOUS.movementpointsTable);
        if (baseId === "LAKE" ||
            currentBaseId === "LAKE")
        {
            return costs;
        }
        var currentGroup = currentTerrain.getTerrainGroup();
        var targetGroup = terrain.getTerrainGroup();
        // if (currentGroup === 0)
        // {
        //     // check all fields we can attack
        //     var valid = false;
        //     var fields = globals.getCircle(1, 2);
        //     var size = fields.size();
        //     for (var i = 0; i < size; i++)
        //     {
        //         var x = fields.at(i).x + terrain.getX();
        //         var y = fields.at(i).y + terrain.getY();
        //         if (map.onMap(x, y))
        //         {
        //             if (map.getTerrain(x, y).getTerrainGroup() > 0)
        //             {
        //                 // not a sea tile. -> land tile
        //                 valid = true;
        //                 break;
        //             }
        //         }
        //     }
        //     fields.remove();
        //     if (!valid)
        //     {
        //         return -1;
        //     }
        // }
        if (currentGroup === targetGroup)
        {
            return costs;
        }
        else
        {
            // from sea to land or vice versa
            if (currentGroup === 0 || targetGroup === 0)
            {
                // fields we can move from land to sea
                var crossable = ["HARBOUR", "BEACH", "TEMPORARY_HARBOUR", "RIVER", "TELEPORTTILE"];
                for (var i = 0; i < crossable.length; i++)
                {
                    if (crossable[i] === id ||
                        crossable[i] === currentId)
                    {
                        return costs;
                    }
                }
            }
            else
            {
                return costs;
            }
        }
        return -1;
    };
};
Constructor.prototype = MOVEMENTTABLE;
var MOVE_AMPHIBIOUS = new Constructor();