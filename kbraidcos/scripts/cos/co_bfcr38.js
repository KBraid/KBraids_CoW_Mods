var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(3);
        co.setSuperpowerStars(2);
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
                animation.setSound("power2_1.wav", 1, delay);
            }
            else
            {
                animation.setSound("power2_2.wav", 1, delay);
            }
            if (animations.length < 5)
            {
                animation.addSprite("power2", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power2", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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
    };

    this.buildedUnit = function(co, unit, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
        case GameEnums.PowerMode_Power:
            return unit.setHasMoved(true);
        default:
            return unit.setHasMoved(false);
        }
    };

    this.getCaptureBonus = function(co, unit, posX, posY, map)
    {
        var hp = unit.getHpRounded();
        return hp * -0.25;
    };

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Power:
            audio.addMusic("mods/kbraidcos/music/cos/machines.mp3", 0, 143832);
            break;
        case GameEnums.PowerMode_Superpower:
            audio.addMusic("mods/kbraidcos/music/cos/machines.mp3", 0, 143832);
            break;
        case GameEnums.PowerMode_Tagpower:
            audio.addMusic("resources/music/cos/bh_tagpower.mp3", 779 , 51141);
            break;
        default:
            audio.addMusic("mods/kbraidcos/music/cos/create.mp3", 22193, 68678)
            break;
        }
    };

    this.costModifier = 50;
    this.globalBonus = -50;
    this.powerBonus = 0;
    this.getCostModifier = function(co, id, baseCost, posX, posY, map)
    {
        return -baseCost * CO_BFCR38.costModifier / 100;
    };
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
      defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
        case GameEnums.PowerMode_Power:
            return CO_BFCR38.powerBonus;
        default:
            return CO_BFCR38.globalBonus;
        }
    };
    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
     defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
        case GameEnums.PowerMode_Power:
            return CO_BFCR38.powerBonus;
        default:
            return CO_BFCR38.globalBonus;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 0;
    };
    this.getCOArmy = function()
    {
        return "MA";
    };
    this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("BF-CR-38 is another rogue experiment of Lash's where she attempted to build and artificial intelligence to run the Black Factories with greater efficiency.");
    };
    this.getHits = function(co)
    {
        return qsTr("Plastic models");
    };
    this.getMiss = function(co)
    {
        return qsTr("Plush dolls");
    };
    this.getCODescription = function(co)
    {
        return qsTr("BF-CR-38 upon activation immidiately tried to self replicate, however Lash had the forsight to hardcode preventative measure to keep it from doing that. But that didn't stop it from replicating endlessly in other ways.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nGlobal Effect: \nUnits have 50/50 ststs and are built for 50% of their value, units built can be moved immediatly. Capture rate reduced by 25%.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Units stats are brought up to the standard 100/100 stats, movement after building is revoked.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Potential Assembly");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Units built on this turn get a permanent 150/150 stat boost, movement after building is revoked.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Prime Production");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("CREATE MACHINES CREATE MACHINES CREATE MACHINES CREATE"),
            qsTr("MACHINES CREATE")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("CREATE MACHINES CREATE MACHINES CREATE MACHINES CREATE"),
            qsTr("MACHINES CREATE")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("MACHINES . . . MACHINES. . . MACHINES . . .")];
    };
    this.getName = function()
    {
        return qsTr("BF-CR-38");
    };
    this.getAiUsePower = function(co, powerSurplus, turnMode)
    {
        // cop spam
        if (co.canUseSuperpower())
        {
            return GameEnums.PowerMode_Superpower;
        }
        else if (co.canUsePower())
        {
            return GameEnums.PowerMode_Power;
        }
        return GameEnums.PowerMode_Off;
    };
}
Constructor.prototype = CO;
var CO_BFCR38 = new Constructor();
