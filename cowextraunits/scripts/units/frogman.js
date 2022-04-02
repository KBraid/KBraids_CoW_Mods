var Constructor = function()
{
    this.getUnitDamageID = function(unit)
    {
        return "INFANTRY";
    };
    this.init = function(unit)
    {
        unit.setAmmo1(10);
        unit.setMaxAmmo1(10);
        unit.setWeapon1ID("WEAPON_INFANTRY_MG");

        unit.setAmmo2(1);
        unit.setMaxAmmo2(1);
        unit.setWeapon2ID("WEAPON_PORTABLE_TORPEDO");

        unit.setFuel(70);
        unit.setMaxFuel(70);
        unit.setBaseMovementPoints(4);
        unit.setMinRange(1);
        unit.setMaxRange(1);
        unit.setVision(2);
    };

    this.loadSprites = function(unit)
    {
        var terrain = unit.getTerrain();
        if (terrain !== null)
        {
            var terrainId = terrain.getID();
            if (terrainId === "SEA" ||
                    terrainId === "FOG" ||
                    terrainId === "ROUGH_SEA" ||
                    terrainId === "REAF")
            {
                unit.loadSpriteV2("frogman+sea+mask", GameEnums.Recoloring_Matrix);
            }
            else
            {
                unit.loadSpriteV2("frogman+mask", GameEnums.Recoloring_Matrix);
            }
        }
        else
        {
            unit.loadSpriteV2("frogman+mask", GameEnums.Recoloring_Matrix);
        }
    };
    this.getMovementType = function()
    {
        return "MOVE_AMPHIBIOUS";
    };
    this.actionList = ["ACTION_FIRE", "ACTION_MISSILE", "ACTION_CAPTURE", "ACTION_JOIN", "ACTION_LOAD", "ACTION_WAIT", "ACTION_CO_UNIT_0", "ACTION_CO_UNIT_1"];

    this.doWalkingAnimation = function(action, map)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(map, unit, action);
        animation.loadSpriteV2("infantry+os+walk+mask", GameEnums.Recoloring_Matrix, 2);
        animation.setSound("movewalk.wav", -2);
        return animation;
    };
    this.getBaseCost = function()
    {
        return 3500;
    };
    this.getName = function()
    {
        return qsTr("Frogman");
    };
    this.canMoveAndFire = function()
    {
        return true;
    };

    this.getDescription = function()
    {
        return qsTr("Amphibious infantry unit that is slow on land, but can quickly traverse water. Due to its small posture, they're able to hide in plain sight within deep water, though consuming 2 units of fuel each turn doing so. It also carries a single use portable torpedo to inflict moderate damage to ships, but can only use it within deep water.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Infantry;
    };
    this.startOfTurn = function(unit, map)
    {
        var terrain = unit.getTerrain();
        if (terrain !== null)
        {
            var terrainId = terrain.getID();
            if (terrainId === "SEA" ||
                terrainId === "FOG" ||
                terrainId === "ROUGH_SEA" ||
                terrainId === "REAF")
            {
                var fuelCosts = 2 + unit.getFuelCostModifier(Qt.point(unit.getX(), unit.getY()), 2);
                if (fuelCosts < 0)
                {
                    fuelCosts = 0;
                }
                unit.setFuel(unit.getFuel() - fuelCosts);
            }
        }
        FROGMAN.cloak(unit, map);
    };

    this.cloak = function(unit, map)
    {
        var terrain = unit.getTerrain();
        if (terrain !== null)
        {
            var terrainId = terrain.getID();
            if (terrainId === "SEA" ||
                terrainId === "FOG" ||
                terrainId === "ROUGH_SEA" ||
                terrainId === "REAF")
            {
                var cloaked = unit.getCloaked();
                unit.setCloaked(2);
                var cloakedNow = unit.getCloaked();
                if (cloaked !== cloakedNow)
                {
                    var animationCount = GameAnimationFactory.getAnimationCount();
                    var queueAnimation = null;
                    if (animationCount > 0)
                    {
                        queueAnimation = GameAnimationFactory.getAnimation(animationCount - 1);
                    }
                    var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                    animation.addSprite("dive", -map.getImageSize() / 2, -map.getImageSize() / 2, 0, 2);
                    animation.setSound("dive.wav", 1);
                    if (queueAnimation !== null)
                    {
                        queueAnimation.queueAnimation(animation);
                    }
                    unit.updateSprites(false);
                }
            }
            else
            {
                var cloaked = unit.getCloaked();
                unit.removeCloaked();
                var cloakedNow = unit.getCloaked();
                if (cloaked !== cloakedNow)
                {
                    var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                    animation.addSprite("undive", -map.getImageSize() / 2, -map.getImageSize() / 2, 0, 2);
                    animation.setSound("undive.wav", 1);
                    unit.updateSprites(false);
                }
            }
        }
    };
    this.postBattleActions = function(unit, damage, otherUnit, gotAttacked, weapon, action, map)
    {
        FROGMAN.cloak(unit, map);
    }
    this.postAction = function(unit, action, map)
    {
        FROGMAN.cloak(unit, map);
    };
    this.canUseWeapon = function(unit, weaponIndex, unitX, unitY, targetX, targetY, rangeCheck)
    {
        var terrain = map.getTerrain(unitX, unitY);
        if (weaponIndex === 1)
        {
            if (terrain !== null)
            {
                var terrainId = terrain.getID();
                if (terrainId === "SEA" ||
                    terrainId === "FOG" ||
                    terrainId === "ROUGH_SEA" ||
                    terrainId === "REAF")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        else
        {
            return true;
        }
    };
}

Constructor.prototype = UNIT;
var FROGMAN = new Constructor();
