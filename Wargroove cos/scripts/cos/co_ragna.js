var Constructor = function()
{
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
                audio.addMusic("resources/music/cos/bh_power.mp3", 1091 , 49930);
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("resources/music/cos/bh_superpower.mp3", 3161 , 37731);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/bh_tagpower.mp3", 779 , 51141);
                break;
            default:
                audio.addMusic("mods/wargroove cos/music/cos/ragna.mp3", 12246, 132251)
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 3;
    };
    this.getCOArmy = function()
    {
        return "FH";
    };
    this.getBonusLuck = function(co, unit, posX, posY, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                return 90;
            case GameEnums.PowerMode_Power:
                return 55;
            default:
                if (co.inCORange(Qt.point(posX, posY), unit))
                {
                    return 25;
                }
                break;
        }
        return 10;
    };
	
    this.getBonusMisfortune = function(co, unit, posX, posY, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                return 40;
            case GameEnums.PowerMode_Power:
                return 20;
            default:
                if (co.inCORange(Qt.point(posX, posY), unit))
                {
                    return 10;
                }
                break;
        }
        return 5;
    };

    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                      defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker) ||
                co.getPowerMode() > GameEnums.PowerMode_Off)
        {
            return 10;
        }
        return 0;
    };

    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                       defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        if (co.inCORange(Qt.point(defPosX, defPosY), defender) ||
                co.getPowerMode() > GameEnums.PowerMode_Off)
        {
            return 10;
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
        return qsTr("Created by Valder to be the ultimate commander, Ragna is a patchwork assembly of the best parts of history's greatest warriors. She strives to be the baddest she can be. She is Queen Mercia's dedicated adversary.");
    };
    this.getHits = function(co)
    {
        return qsTr("War.");
    };
    this.getMiss = function(co)
    {
        return qsTr("You.");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Assembled from the remains of fallen heroes, Ragna was created by Valder to lead the Felheim armies. With a mind as fractured as her body, Ragna makes a manic game of war that feeds her compulsive need for victory.");
    };
    this.getLongCODescription = function()
    {
               qsTr("\nGlobal Effect: \nUnits have more luck and misfortune") +
               qsTr("\n\nCO Zone Effect: \nUnits have even more luck and misfortune");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Firepower rises, but so does his chances of reduced firepower.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Brute Force");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Firepower rises dramatically, but so does his chances of reduced power.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Barbaric Blow");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Get outta my way!"),
                qsTr("Fight me!"),
                qsTr("FIGHT ME!!"),
                qsTr("Fight me, Fight me! FIGHT ME!!!"),
                qsTr("I'll crush you!"),
                qsTr("Special move!"),
                qsTr("I'll tear you to pieces!"),
                qsTr("You're gonna need stitches."),
                qsTr("I'm gonna break you!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("And stay down!"),
                qsTr("Get good!"),
                qsTr("It's over loser!"),
                qsTr("I won!"),
                qsTr("I'm unstoppable!")];
    };
    this.getDefeatSentences = function(co)
    {
        var randVar = globals.randInt(0,100);
        if(randVar <100) {
        return [qsTr("I'm already dead idiot!"),
                qsTr("This isn't fair!"),
                qsTr("This isn't over!"),
                qsTr("This sucks!"),
                qsTr("Grrr!")];
        } else {
            return [qsTr("It's not like i like you or anything...")];
        }
    };
    this.getName = function()
    {
        return qsTr("Ragna");
    };
}

Constructor.prototype = CO;
var CO_RAGNA = new Constructor();
