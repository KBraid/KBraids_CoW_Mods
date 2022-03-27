var Constructor = function()
{
    this.getAiUsePower = function(co, powerSurplus, unitCount, repairUnits, indirectUnits, directUnits, enemyUnits, turnMode)
    {
        if (turnMode === GameEnums.AiTurnMode_StartOfDay)
        {
            if (co.canUseSuperpower())
            {
                return GameEnums.PowerMode_Superpower;
            }
            else if (powerSurplus <= 0.5 &&
                     co.canUsePower())
            {
                return CO.getAiUsePowerAtUnitCount(co, powerSurplus, turnMode, repairUnits);
            }
        }
    };

    this.init = function(co, map)
    {
        co.setPowerStars(3);
        co.setSuperpowerStars(3);
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

            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());
            animation.writeDataInt32(2);
            animation.setEndOfAnimationCall("ANIMATION", "postAnimationHeal");
            var delay = globals.randInt(135, 265);
            if (animations.length < 5)
            {
                delay *= i;
            }
            animation.setSound("power0.wav", 1, delay);
            if (animations.length < 5)
            {
                animation.addSprite("power0", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power0", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
                }
            }
        }
        units.remove();
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

            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());
            animation.writeDataInt32(5);
            animation.setEndOfAnimationCall("ANIMATION", "postAnimationHeal");
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
        units.remove();
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
                audio.addMusic("mods/wargroove cos/music/cos/mercia.mp3",  11495, 122494);
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 4;
    };
    this.getCOArmy = function()
    {
        return "CS";
    };
    this.coZoneBonus = 20;
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                return 20;
            case GameEnums.PowerMode_Power:
                return 10;
            default:
                if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
                {
                    return CO_ANDY.coZoneBonus;
                }
                break;
        }
        return 0;
    };
    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        if (co.inCORange(Qt.point(defPosX, defPosY), defender) ||
            co.getPowerMode() > GameEnums.PowerMode_Off)
        {
            return CO_ANDY.coZoneBonus;
        }
        return 0;
    };
    this.getMovementpointModifier = function(co, unit, posX, posY, map)
    {
        if (co.getPowerMode() === GameEnums.PowerMode_Superpower ||
            co.getPowerMode() === GameEnums.PowerMode_Tagpower)
        {
            return 1;
        }
        return 0;
    };

    this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };

    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("The well-meaning but inexperienced Queen Mercia is more at home on the battlefield than in the throne room. Having just inherited the rule of Cherrystone Kingdom, she yearns to do her late Father and her people proud.");
    };
    this.getHits = function(co)
    {
        return qsTr("Summer");
    };
    this.getMiss = function(co)
    {
        return qsTr("Wasps");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Mercia's Healing Aura is at its most efficient when used to repair expensive and powerful units. This Groove also increases her sustainability, allowing her to take risks other commanders cannot.");
    };
    this.getLongCODescription = function()
    {
        var text = qsTr("\nGlobal Effect: \nNone") +
                   qsTr("\n\nCO Zone Effect: \nUnits gain %0% firepower and defence.");
        text = replaceTextArgs(text, [CO_ANDY.coZoneBonus]);
        return text;
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Restores two HP to all units.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Healing Field");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Restores five HP to all units. Firepower rises and unit movement increases by one space.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Healing Aura");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("None shall fall while i still stand!   Healing Aura!"),
                qsTr("I'm hear to help!   Healing Aura!"),
                qsTr("I will save you all!   Healing Aura!")];
    };
    this.getVictorySentences = function(co)
    {
        var randVar = globals.randInt(0,100);
        if(randVar <100) {
            return [qsTr("We did it!"),
                    qsTr("That was Tough!"),
                    qsTr("I am Queen Mercia."),
                    qsTr("Victory will be ours!")];
        } else {
            return [qsTr("I have a high protein diet.")];
        }
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("I'm Sorry..."),
                qsTr("I've Failed!")];
    };
    this.getName = function()
    {
        return qsTr("Mercia");
    };
}

Constructor.prototype = CO;
var CO_MERCIA = new Constructor();
