var Constructor = function()
{
    this.getAiUsePower = function(co, powerSurplus, unitCount, repairUnits, indirectUnits, directUnits, enemyUnits, turnMode)
    {
        return CO.getAiUsePowerAtUnitCount(co, powerSurplus, turnMode, directUnits);
    };

    this.init = function(co, map)
    {
        co.setPowerStars(3);
    };

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Power:
            audio.addMusic("resources/music/cos/power.mp3", 992, 45321);
            break;
        case GameEnums.PowerMode_Tagpower:
            audio.addMusic("resources/music/cos/tagpower.mp3", 14611, 65538);
            break;
        default:
            audio.addMusic("resources/music/cos/max.mp3", 57, 70080)
            break;
        }
    };

    this.getCOUnitRange = function(co)
    {
        return -2;
    };

    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            if (unit.getBaseMaxRange() === 1)
            {
                var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                var delay = globals.randInt(135, 265);
                if (animations.length < 5)
                {
                    delay *= i;
                }
                animation.setSound("power6.wav", 1, delay);
                if (animations.length < 5)
                {
                    animation.addSprite("power6", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                    powerNameAnimation.queueAnimation(animation);
                    animations.push(animation);
                }
                else
                {
                    animation.addSprite("power6", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                    animations[counter].queueAnimation(animation);
                    animations[counter] = animation;
                    counter++;
                    if (counter >= animations.length)
                    {
                        counter = 0;
                    }
                }
            }
        }
    };

    this.getStarGain = function(co, fundsDamage, x, y, hpDamage, defender, counterAttack, map)
    {
        var gamerules = map.getGameRules();
        var powerCostIncrease = gamerules.getPowerUsageReduction();
        var multiplier = 1 / (1.0 + co.getPowerUsed() * powerCostIncrease);
        var gainMode = gamerules.getPowerGainMode();
        var gainZone = gamerules.getPowerGainZone();
        var baseValue = 0;
        // select gain value
        if (gainMode === GameEnums.PowerGainMode_Money)
        {
            baseValue = fundsDamage / CO.starFundsCost;
            if (!defender)
            {
                // reduce damage for attacker
                baseValue *= 0.25;
            }
        }
        else if (gainMode === GameEnums.PowerGainMode_Money_OnlyAttacker)
        {
            if (!defender)
            {
                // only charge for attacker
                baseValue = fundsDamage / CO.starFundsCost;
            }
        }
        else if (gainMode === GameEnums.PowerGainMode_Hp)
        {
            baseValue = hpDamage / CO.starHpCost;
            if (!defender)
            {
                // reduce damage for attacker
                baseValue *= 0.25;
            }
        }
        else if (gainMode === GameEnums.PowerGainMode_Hp_OnlyAttacker)
        {
            if (!defender)
            {
                // only charge for attacker
                baseValue = hpDamage / CO.starHpCost;
            }
        }
        var powerGain = baseValue * multiplier;
        if (gainZone === GameEnums.PowerGainZone_Global)
        {
            // do nothing
        }
        else if (gainZone === GameEnums.PowerGainZone_GlobalCoZoneBonus)
        {
            if (!co.inCORange(Qt.point(x, y), null))
            {
                // reduce power meter gain when not in co range
                powerGain *= 2;
            }
        }
        var chargeBonus = co.getPowerChargeBonus();
        return powerGain * (100 + chargeBonus) / 100;
    },

    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
     defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Power:
            if (attacker.getBaseMaxRange() === 1 &&
                attacker.getUnitType() !== GameEnums.UnitType_Infantry)
            {
                return 87;
            }
            else if (attacker.getBaseMaxRange() > 1)
            {
                return -1;
            }
            return 0;
        default:
            if (attacker.getBaseMaxRange() === 1 &&
                attacker.getUnitType() !== GameEnums.UnitType_Infantry)
            {
                return 50;
            }
            break;
        }
        if (attacker.getBaseMaxRange() > 1)
        {
            return -10;
        }
        return 0;
    };

    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
       defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Power:
            if (defender.getBaseMaxRange() > 1)
            {
                return 0;
            }
            return 10;
        default:
            if (defender.getBaseMaxRange() > 1)
            {
                return -10;
            }
            return 0;
            break;
        }
        return 0;
    };

    this.getMovementpointModifier = function(co, unit, posX, posY, map)
    {
        if (co.getPowerMode() > GameEnums.PowerMode_Off)
        {
            if (unit.getBaseMaxRange() === 1 &&
                unit.getUnitType() !== GameEnums.UnitType_Infantry)
            {
                return 1;
            }
        }
        return 0;
    };
    
    this.getFirerangeModifier = function(co, unit, posX, posY, map)
    {
        if (unit.getBaseMaxRange() > 1)
        {
            return -1;
        }
        return 0;
    };

    this.getCOUnits = function(co, building, map)
    {
        return [ZCOUNIT_TANK_HUNTER];
    },

    this.getAiCoUnitBonus = function(co, unit, map)
    {
        if (unit.getBaseMaxRange() === 1 &&
            unit.getUnitType() !== GameEnums.UnitType_Infantry)
        {
            return 3;
        }
        else if (unit.getBaseMaxRange() > 1)
        {
            return -3;
        }
        return 0;
    };

    this.getAiCoBuildRatioModifier = function(co, map)
    {
        // multiplier shifting the general indirect to direct unit ratio the ai tries to maintain.
        return 5;
    },

    this.getCOArmy = function()
    {
        return "OS";
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return  qsTr("Dependable and brave. Over-protective of Sami and Andy.\n \"Now it's my turn!\"");
    };
    this.getHits = function(co)
    {
        return  qsTr("Weight Training");
    };
    this.getMiss = function(co)
    {
        return  qsTr("Studying");
    };
    this.getCODescription = function(co)
    {
        return  qsTr("Direct combat units have high firepower. Distance units are weak and have small attack ranges.");
    };
    this.getLongCODescription = function()
    {
        return  qsTr("\nGlobal Effect: \nMax's direct combat vehicles have +50% firepower. However, his indirect-combat units suffer -10% firepower and defense, and have -1 maximum range.");
    };
    this.getPowerDescription = function(co)
    {
        return  qsTr("Increases all abilities of direct combat units.\nMax's direct combat vehicles and transports gain +27% firepower and +1 movement.\nCO Power grants all units a bonus +10% firepower and defense.");
    };
    this.getPowerName = function(co)
    {
        return  qsTr("Max Force");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Roll, tanks, roll!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("That was a piece of cake!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Ouch... I let my guard down."),
                qsTr("Oh, man! Not good! What are we supposed to do now!?")];
    };
    this.getName = function()
    {
        return  qsTr("Max (AW)");
    };
}

Constructor.prototype = CO;
var CO_MAX_AW = new Constructor();
