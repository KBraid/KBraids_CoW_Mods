var Constructor = function()
{
    this.getCOStyles = function()
    {
        // string array containing the endings of the alternate co style

        return ["+alt"];
    };

    this.getAiUsePower = function(co, powerSurplus, unitCount, repairUnits, indirectUnits, directUnits, enemyUnits, turnMode)
    {
        return CO.getAiUsePowerAtUnitCount(co, powerSurplus, turnMode, directUnits);
    };

    this.init = function(co, map)
    {
        co.setPowerStars(3);
        co.setSuperpowerStars(3);
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
            audio.addMusic("resources/music/cos/max.mp3", 57, 70080)
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
            if (unit.getBaseMaxRange() === 1)
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

    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
     defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
            if (attacker.getBaseMaxRange() === 1 &&
                attacker.getUnitType() !== GameEnums.UnitType_Infantry)
            {
                return 90;
            }                
            else if (attacker.getBaseMaxRange() > 1)
            {
                return 0;
            }
            return 10;
        case GameEnums.PowerMode_Power:
            if (attacker.getBaseMaxRange() === 1 &&
                attacker.getUnitType() !== GameEnums.UnitType_Infantry)
            {
                return 60;
            }

            else if (attacker.getBaseMaxRange() > 1)
            {
                return 0;
            }
            return 10;
        }
        if (attacker.getBaseMaxRange() === 1)
        {
            return 20;
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
            {
                return 10;
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
    this.getCOArmy = function()
    {
        return "OS";
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("A brave and loyal friend, not to mention a strong fighter. Max hates any kind of treachery, preferring a good, old-fashioned brawl.");
    };
    this.getHits = function(co)
    {
        return qsTr("Weight Training");
    };
    this.getMiss = function(co)
    {
        return qsTr("Studying");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Non-infantry direct-combat units are tops.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nGlobal Effect: \nMax's non-infantry direct-combat units have 120% firepower and his indirect-combat units have 1 range penalty.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Max's non-infantry direct-combat units raise their firepower to 160% snd defense to 110%.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Max Force");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Max's non-infantry direct-combat units raise their firepower to 190% snd defense to 110%.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Max Blast");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Roll, tanks, roll!"),
            qsTr("Now you're gonna get hurt!"),
            qsTr("Hey!  Give up while you still can!"),
            qsTr("Wanna test might?  I won't lose!"),
            qsTr("That's enough!  Get outta the road!"),
            qsTr("Alright, the gloves are comin' off.")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("That was a piece of cake!"),
            qsTr("Ha! It'll take more than that to beat me!"),
            qsTr("I'm on a roll!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Ouch... I let my guard down."),
            qsTr("Oh, man! Not good! What are we supposed to do now!?")];
    };
    this.getName = function()
    {
        return qsTr("Max (AWDS)");
    };
}

Constructor.prototype = CO;
var CO_MAX = new Constructor();
