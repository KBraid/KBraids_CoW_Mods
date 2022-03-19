var Constructor = function()
{
    this.getAiUsePower = function(co, powerSurplus, unitCount, repairUnits, indirectUnits, directUnits, enemyUnits, turnMode)
    {
        return CO.getAiUsePowerAtUnitCount(co, powerSurplus, turnMode, indirectUnits);
    };

    this.init = function(co, map)
    {
        co.setPowerStars(4);
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
                audio.addMusic("mods/kbraidcos/music/cos/kidd.mp3", 0, 192361)
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
            if (unit.getBaseMaxRange() > 1)
            {
                var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                var delay = globals.randInt(135, 265);
                if (animations.length < 5)
                {
                    delay *= i;
                }
                if (i % 2 === 0)
                {
                    animation.setSound("power9_1.wav", 1, delay);
                }
                else
                {
                    animation.setSound("power9_2.wav", 1, delay);
                }
                if (animations.length < 5)
                {
                    animation.addSprite("power9", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                    powerNameAnimation.queueAnimation(animation);
                    animations.push(animation);
                }
                else
                {
                    animation.addSprite("power9", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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
            if (unit.getBaseMaxRange() > 1)
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
        units.remove();
    };

    this.getCOUnitRange = function(co, map)
    {
        return 2;
    };
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                return 40;
            case GameEnums.PowerMode_Power:
                return 20;
            default:
        return 0;
    };
    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                       defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        return -10;
    };
    this.getFirerangeModifier = function(co, unit, posX, posY, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                if (unit.getBaseMinRange() > 1)
                {
                    return -2;
                }
                break;
            case GameEnums.PowerMode_Power:
                if (unit.getBaseMinRange() > 1)
                {
                    return -1;
                }
                break;
            default:
                if (unit.getBaseMinRange() > 1)
                {
                    return 0;
                }
                break;
        }
        return 0;
    };

    this.getFirstStrike = function(co, unit, posX, posY, attacker, isDefender, map)
    {
        if(unit !== null)
        {
            switch (co.getPowerMode())
            {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Power:
                if (isDefender)
                {
                    return true;
                }
                else
                {
                    return false;
                }
                if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
                if (isDefender)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            default:
                return false;
            }
        }
        return false;
    };

    this.getCOArmy = function()
    {
        return "BD";
    };

    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("A wanted fugitive in Blue Moon, Kidd fled to Brown Desert after stealing a notable portion of the Gates family's vast fortune during a train robbery. Olaf had dispatched grit to bring him in, however upon confronting Kidd Grit instead offered a set of sharpshooting challenges for him to keep his freedom. After beating all but one of Grit's challenges Grit chose to let him go, though only after returning the stolen gains.");
    };
    this.getHits = function(co)
    {
        return qsTr("");
    };
    this.getMiss = function(co)
    {
        return qsTr("");
    };
    this.getCODescription = function(co)
    {
        return qsTr("");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nGlobal Effect: \nall units have +20 attack and -10 defense and deal extra damage against transports and trains (Cat units)") +
               qsTr("\n\nCO Zone Effect: \nall units attack first when counterattacking");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Indirect minimum range reduced by 1 and attack increased by 20, indirects can counterattack direct units if within minimum range.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Big Iron");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Indirect minimum range reduced by 2 and attack increased by 40, indirects can counterattack any units if within minimum range.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Desperado");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Draw!"),
                qsTr("This battlefield ain't big ennough for the two of us."),
                qsTr("Should've kept t'yer own business stranger."),
                qsTr("Today's yerr bad day.")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Now let's hightail it outa' here before they can try again!"),
                qsTr("Payday boys!"),
                qsTr("Grab them loot'n let's go!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Ugh! Ya got me..."),
                qsTr("Ya haven't heard the last of Kidd!")];
    };
    this.getName = function()
    {
        return qsTr("Kidd");
    };
}

Constructor.prototype = CO;
var CO_KIDD = new Constructor();
