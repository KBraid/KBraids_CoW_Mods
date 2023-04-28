var Constructor = function()
{
    this.getCOStyles = function()
    {
        return ["+alt"];
    };

    this.init = function(co, map)
    {
        co.setPowerStars(6);
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
            audio.addMusic("resources/music/cos/nell.mp3", 59, 61394);
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
            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            var delay = globals.randInt(135, 265);
            if (animations.length < 5)
            {
                delay *= i;
            }
            if (i % 2 === 0)
            {
                animation.setSound("power7_1.wav", 1, delay);
            }
            else
            {
                animation.setSound("power7_2.wav", 1, delay);
            }
            if (animations.length < 5)
            {
                animation.addSprite("power7", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power7", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
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
    this.getBonusLuck = function(co, unit, posX, posY, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Power:
            return 60;
        default:
            if (co.inCORange(Qt.point(posX, posY), unit))
            {
                return 20;
            }
            break;
        }
    };
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
      defender, defPosX, defPosY, isDefender, action, luckmode, map)
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
    this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("Rachel's older sister and supreme commander of the Orange Star army, Nell is an able commanding officer with a superb sense of fashion.");
    };
    this.getHits = function(co)
    {
        return qsTr("Willful students");
    };
    this.getMiss = function(co)
    {
        return qsTr("Downtime");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Sometimes strikes with slightly more force than expected. She's the first to tell you she was born lucky.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nGlobal Effect: \nNell's units can inflict up to +20% luck damage instead of the standard +10%.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Nell's luck damage increases up to +60%. 110% damage dealt and 90% damage received by all units.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Lucky Star");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Luck IS a skill!"),
            qsTr("Hmm... Time to get serious!"),
            qsTr("I'm just getting started!"),
            qsTr("Don't hate me just because I'm lucky!"),
            qsTr("Everything will work out!"),
            qsTr("I'm feelin' lucky!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Did I go too far?"),
            qsTr("Lady luck was with me!"),
            qsTr("...And that's how it's done.")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Seems like I just wasn't lucky enough..."),
            qsTr("Congratulations! You've beaten me!")];
    };
    this.getName = function()
    {
        return qsTr("Nell (AW)");
    };
}

Constructor.prototype = CO;
var CO_NELL_AW = new Constructor();
