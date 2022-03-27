var Constructor = function()
{
    this.getAiUsePower = function(co, powerSurplus, turnMode)
    {
        // scop spam
        if (co.canUseSuperpower())
        {
            return GameEnums.PowerMode_Superpower;
        }
        return GameEnums.PowerMode_Off;
    };

    this.init = function(co, map)
    {
        co.setPowerStars(5);
        co.setSuperpowerStars(4);
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
                audio.addMusic("mods/wargroove cos/music/cos/sigrid.mp3", 1040, 138497);
                break;
        }
    };

    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        CO_HAWKE.hawkeDamage(co, 1, powerNameAnimation, map);
    };

    this.hawkeDamage = function(co, value, powerNameAnimation, map)
    {

        var player = co.getOwner();
        var units = player.getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);

            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());
            animation.writeDataInt32(value);
            animation.setEndOfAnimationCall("ANIMATION", "postAnimationHeal");
            var delay = globals.randInt(135, 265);
            if (animations.length < 5)
            {
                delay *= i;
            }
            animation.setSound("power4.wav", 1, delay);
            if (animations.length < 5)
            {
                animation.addSprite("power4", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power4", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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

        var playerCounter = map.getPlayerCount();
        for (var i2 = 0; i2 < playerCounter; i2++)
        {
            var enemyPlayer = map.getPlayer(i2);
            if ((enemyPlayer !== player) &&
                (player.checkAlliance(enemyPlayer) === GameEnums.Alliance_Enemy))
            {

                units = enemyPlayer.getUnits();
                units.randomize();
                for (i = 0; i < units.size(); i++)
                {
                    unit = units.at(i);
                    animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                    animation.writeDataInt32(unit.getX());
                    animation.writeDataInt32(unit.getY());
                    animation.writeDataInt32(value);
                    animation.setEndOfAnimationCall("ANIMATION", "postAnimationDamage");
                    var delay = globals.randInt(135, 265);
                    if (animations.length < 5)
                    {
                        delay *= i;
                    }
                    animation.setSound("power4.wav", 1, delay);
                    if (animations.length < 5)
                    {
                        animation.addSprite("power4", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                        powerNameAnimation.queueAnimation(animation);
                        animations.push(animation);
                    }
                    else
                    {
                        animation.addSprite("power4", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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
            }
        }
    };

    this.activateSuperpower = function(co, powerMode, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);

        CO_HAWKE.hawkeDamage(co, 2, powerNameAnimation, map);
    };

    this.getCOUnitRange = function(co, map)
    {
        return 3;
    };
    this.getCOArmy = function()
    {
        return "FH";
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
                return 40;
            default:
                if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
                {
                    return 40;
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
            return 20;
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
        return qsTr("Sigrid is a High Vampire, an ancient being of prodigious power. She serves Valder, Lord of Felheim, and he considers her his most reliable subordinate. Like the icy wastes of her homeland, Sigrid is cold and brutal.");
    };
    this.getHits = function(co)
    {
        return qsTr("Herself.");
    };
    this.getMiss = function(co)
    {
        return qsTr("The exasperating ubiquity of incompetents.");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Sigrid is a High Vampire and one of the most powerful warriors in the vast wastes of Felheim.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nGlobal Effect: \nNo Effects.") +
               qsTr("\n\nCO Zone Effect: \nUnits have more firepower.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("All enemy units suffer one HP of damage. In addition, all allied units recover one HP.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Bleeding Touch");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("All enemy units suffer two HP of damage. In addition, all allied units recover two HP.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Vampiric Touch");
    };
    this.getPowerSentences = function(co)
    {
        var randVar = globals.randInt(0,100);
        if(randVar <100) {
        return [qsTr("Are you afraid?"),
                qsTr("Goodbye."),
                qsTr("Mortal life is of... little worth."),
                qsTr("Mortals dies so easily."),
                qsTr("Blood is life!"),
                qsTr("I'll end you!"),
                qsTr("Face me now!"),
                qsTr("Fall before me!"),
                qsTr("Have at you!"),
                qsTr("I hunger!"),
                qsTr("I'll kill you!"),
                qsTr("You look like my next victim!"),
                qsTr("So hungry!"),
                qsTr("Vampiric force!"),
                qsTr("I've waited long enough!"),
                qsTr("There's nowhere to run!")];
        } else {
            return [qsTr("What is a man?")];
        }
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("I have fought many battles."),
                qsTr("How foolish."),
                qsTr("This is tiresome."),
                qsTr("Victory means little to me..."),
                qsTr("I am older than I look.")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("So be it..."),
                qsTr("What!?"),
                qsTr("You are nothing!")];
    };
    this.getName = function()
    {
        return qsTr("Sigrid");
    };
}

Constructor.prototype = CO;
var CO_SIGRID = new Constructor();
