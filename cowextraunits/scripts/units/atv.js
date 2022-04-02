var Constructor = function()
{
    this.getUnitDamageID = function(unit)
    {
        return "RECON";
    };
    var hasDriver = false;
    var wikiSprite = true;
    this.init = function(unit)
    {
        unit.setAmmo1(0);
        unit.setMaxAmmo1(0);
        unit.setWeapon1ID("");

        unit.setAmmo2(0);
        unit.setMaxAmmo2(0);
        unit.setWeapon2ID("");

        unit.setFuel(80);
        unit.setMaxFuel(80);
        unit.setBaseMovementPoints(8);
        unit.setMinRange(1);
        unit.setMaxRange(1);
        unit.setVision(3);

        var driver = unit.spawnUnit("INFANTRY");
        if (driver !== null)
        {
            driver.setHasMoved(true);
            hasDriver = true;
            wikiSprite = false;
        }
        unit.updateSprites(false);
    };
    this.getBaseCost = function()
    {
        return 4000;
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        if (hasDriver || wikiSprite)
        {
            unit.loadSpriteV2("atv+mask", GameEnums.Recoloring_Matrix);
        }
        else
        {
            unit.loadSpriteV2("atv+empty+mask", GameEnums.Recoloring_Matrix);
        }
    };
    this.getBonusDefensive = function(defender, defX, defY, attacker, atkX, atkY, isAttacker, action, luckMode, map)
    {
        if (!hasDriver)
        {
            return -50;
        }
        return 0;
    };
    this.getMovementType = function()
    {
        return "MOVE_ALL_TERRAIN";
    };
    this.actionList = ["ACTION_LOAD", "ACTION_UNLOAD", "ACTION_WAIT"];
    this.doWalkingAnimation = function(action, map)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(map, unit, action);
        var unitID = unit.getUnitID().toLowerCase();
        animation.loadSpriteV2(unitID + "+walk+mask", GameEnums.Recoloring_Matrix, 2);
        animation.setSound("movecar.wav", -2);
        return animation;
    };
    this.startOfTurn = function(unit, map)
    {
        for (var i = 0; i < unit.getLoadedUnitCount(); i++)
        {
            var transportUnit = unit.getLoadedUnit(i);
            var refresh = map.getGameRules().getTransporterRefresh();
            if (refresh)
            {
                transportUnit.setHasMoved(false);
            }
        }
    };
    this.postAction = function(unit, action)
    {
        if (unit.getLoadedUnitCount() > 0)
        {
            hasDriver = true;
            unit.setBaseMovementPoints(8);
            unit.setVision(3);
        }
        else
        {
            hasDriver = false;
            unit.setBaseMovementPoints(-999);
            unit.setVision(-999);
        }
        unit.updateSprites(false);
    };
    this.getLoadingPlace = function()
    {
        return 1;
    };
    this.transportList = ["INFANTRY", "MECH", "SNIPER", "ZCOUNIT_COMMANDO", "ZCOUNIT_PARTISAN"];
    this.getName = function()
    {
        return qsTr("ATV");
    };

    this.getDescription = function()
    {
        return qsTr("An alternative to the Recon that doubles as a transport, though it can only move if a driver is present.\nCompared to the Recon, it has less vision and can't attack, but it traverses open terrain with much more ease and can even ford rivers.\nComes with a free infantry unit pre-loaded.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Ground;
    };
}

Constructor.prototype = UNIT;
var ATV = new Constructor();
