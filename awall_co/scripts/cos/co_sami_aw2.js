var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(3);
        co.setSuperpowerStars(6);
    };

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Power:
            audio.addMusic("resources/music/cos/power.mp3", 992, 45321);
            break;
        case GameEnums.PowerMode_Superpower:
            audio.addMusic("resources/music/cos/superpower.mp3", 1505, 49515);
            break;
        case GameEnums.PowerMode_Tagpower:
            audio.addMusic("resources/music/cos/tagpower.mp3", 14611, 65538);
            break;
        default:
            audio.addMusic("resources/music/cos/sami.mp3", 1934, 62918);
            break;
        }
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
            if (unit.getUnitType() === GameEnums.UnitType_Infantry)
            {
                var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                var delay = globals.randInt(135, 265);
                if (animations.length < 5)
                {
                    delay *= i;
                }
                if (i % 2 === 0)
                {
                    animation.setSound("power10_1.wav", 1, delay);
                }
                else
                {
                    animation.setSound("power10_2.wav", 1, delay);
                }
                if (animations.length < 5)
                {
                    animation.addSprite("power10", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                    powerNameAnimation.queueAnimation(animation);
                    animations.push(animation);
                }
                else
                {
                    animation.addSprite("power10", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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

    this.activateSuperpower = function(co, powerMode, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            if (unit.getUnitType() === GameEnums.UnitType_Infantry)
            {
                var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                var delay = globals.randInt(135, 265);
                if (animations.length < 7)
                {
                    delay *= i;
                }
                if (i % 2 === 0)
                {
                    animation.setSound("power12_1.wav", 1, delay);
                }
                else
                {
                    animation.setSound("power12_2.wav", 1, delay);
                }
                if (animations.length < 7)
                {
                    animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 2, delay);
                    powerNameAnimation.queueAnimation(animation);
                    animations.push(animation);
                }
                else
                {
                    animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 2, delay);
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

    this.getCOUnitRange = function(co, map)
    {
        return -2;
    };
    this.getCOArmy = function()
    {
        return "OS";
    };

    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
      defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
            if (attacker.getUnitType() === GameEnums.UnitType_Infantry)
            {
                return 80;
            }
        case GameEnums.PowerMode_Power:
            if (attacker.getUnitType() === GameEnums.UnitType_Infantry)
            {
                return 50;
            }
        default:
            if (attacker.getUnitType() === GameEnums.UnitType_Infantry)
            {
                return 30;
            }
            break;
        }
        if (attacker.getBaseMaxRange() === 1)
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
        case GameEnums.PowerMode_Superpower:
        case GameEnums.PowerMode_Power:
            {
                return 10;
            }
        }
        return 0;
    };
    this.getCaptureBonus = function(co, unit, posX, posY, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
            {
                return 20;
            }
        }
        {
            var hp = unit.getHpRounded();
            return hp / 2;
        }
    };

    this.getMovementpointModifier = function(co, unit, posX, posY, map)
    {
        if (unit.isTransporter())
        {
            return 1;
        }
        if (unit.getUnitType() === GameEnums.UnitType_Infantry)
        {
            switch (co.getPowerMode())
            {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                return 2;
            case GameEnums.PowerMode_Power:
                return 1;
            default:
                return 0;
            }
        }
        return 0;
    };
    this.getAiCoUnitBonus = function(co, unit, map)
    {
        if (unit.getUnitID !== "INFANTRY")
        {
            if (unit.getUnitType() === GameEnums.UnitType_Infantry)
            {
                return 8;
            }
            else if (unit.getBaseMaxRange() === 1)
            {
                return -1;
            }
        }
        return 2;
    };
    this.getAiCoBuildRatioModifier = function(co, map)
    {
        return 0.5;
    };
    this.getCOUnits = function(co, building, map)
    {
        var buildingId = building.getBuildingID();
        if (buildingId === "FACTORY" ||
            buildingId === "TOWN" ||
            buildingId === "HQ")
        {
            return ["ZCOUNIT_COMMANDO"];
        }
        return [];
    };

    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("A strong-willed Orange Star special forces captain who loves long hair. Despite having short hair. Whatever, IS.");
    };
    this.getHits = function(co)
    {
        return qsTr("Chocolate");
    };
    this.getMiss = function(co)
    {
        return qsTr("Cowards");
    };
    this.getCODescription = function(co)
    {
        return qsTr("As an infantry specialist, her foot soldiers do more damage and capture faster. Non-infantry direct-combat units have weaker firepower.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nSpecial Unit:\nCommando\n") +
        qsTr("\nGlobal Effect: \nSami's foot soldier units have 130% firepower and capture at 1.5 times the normal rate. Her transport units have one extra movement space. Her other direct-combat units deal 90% damage.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Sami's foot soldiers gain 1 movement and their firepower becomes 150%. (Standard +10% defense.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Double Time");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Sami's foot soldiers gain 2 movement, increase their capture rate to 2000%, and their firepower becomes 180%. (Standard +10% defense.)");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Victory March");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("You're not bad!  Now it's my turn!"),
            qsTr("All right!  Time to end this!"),
            qsTr("Infantry... Assault!"),
            qsTr("Ready or not, here I come!"),
            qsTr("All right, it's make-or-break time!"),
            qsTr("Move out, grunts!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Mission accomplished! Awaiting orders!"),
            qsTr("Commandos always complete their mission."),
            qsTr("Score one for the grunts!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Things would be easier if we had more infantry units..."),
            qsTr("Next time's for real. I won't lose focus.")];
    };
    this.getName = function()
    {
        return qsTr("Sami (AW2)");
    };
}

Constructor.prototype = CO;
var CO_SAMI_AW2 = new Constructor();
