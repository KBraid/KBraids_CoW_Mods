var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(6);
        co.setSuperpowerStars(4);
    };

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

    this.activatePower = function(co, map)
    {
        var variables = co.getVariables();
        var boostVar = variables.createVariable("CYRUS_BOOST");

        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        var playerCounter = map.getPlayerCount();
        var animations = [];
        var counter = 0;
        for (var i2 = 0; i2 < playerCounter; i2++)
        {
            var otherPlayer = map.getPlayer(i2);
            var units = otherPlayer.getUnits();
        }
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());
            animation.writeDataInt32(5);
            animation.setEndOfAnimationCall("ANIMATION", "postAnimationHeal");
            var boost = boostVar.readDataInt32();
            boost++;
            boostVar.writeDataInt32(boost);
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
        units.remove();
    };

    this.activateSuperpower = function(co, powerMode, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);

        var variables = co.getVariables();
        var boostVar = variables.createVariable("CYRUS_BOOST");
        var counit = co.getCOUnit();
        if (counit !== null)
        {
            var currBoost = counit.getCosts() * 0.004;
            currBoost = currBoost * (counit.getHpRounded() / 10);
            boostVar.writeDataInt32(currBoost);
            counit.killUnit();
        }

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
            animation.setSound("power11.wav", 1, delay);
            if (animations.length < 5)
            {
                animation.addSprite("power11", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power11", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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
            audio.addMusic("resources/music/cos/power_awdc.mp3", 0, 0);
            break;
        case GameEnums.PowerMode_Superpower:
            audio.addMusic("resources/music/cos/power_awdc.mp3", 0, 0);
            break;
        case GameEnums.PowerMode_Tagpower:
            audio.addMusic("resources/music/cos/tagpower.mp3", 14611, 65538);
            break;
        default:
            audio.addMusic("mods/cyrus/music/cos/cyrus.mp3", 50429, 101243)
            break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 2;
    };
    this.getCOArmy = function()
    {
        return "DM";
    };
    this.coZoneBonus = 20;
    this.superPowerBonus = 20;
    this.powerBonus = 10;
    this.coGlobalBonus = 0;
    this.coHealing = 2;
    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                       defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        var variables = co.getVariables();
        var boostVar = variables.createVariable("CYRUS_BOOST");
        var boost = boostVar.readDataInt32();
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
            return CO_CYRUS.superPowerBonus + boost;
        case GameEnums.PowerMode_Power:
            return CO_CYRUS.powerBonus + boost * 2;
        default:
            if (co.inCORange(Qt.point(defPosX, defPosY), defender))
            {
                return CO_CYRUS.coZoneBonus;
            }
            else
            {
                return -CO_CYRUS.coGlobalBonus;
            }
        }
    };

    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                      defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        var variables = co.getVariables();
        var boostVar = variables.createVariable("CYRUS_BOOST");
        var boost = boostVar.readDataInt32();
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
            return CO_CYRUS.superPowerBonus + boost;
        case GameEnums.PowerMode_Power:
            return CO_CYRUS.powerBonus + boost * 2;
        default:
            if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
            {
                return CO_CYRUS.coZoneBonus;
            }
            else
            {
                return -CO_CYRUS.coGlobalBonus;
            }
        }
    };

    this.startOfTurn = function(co, map)
    {
        var variables = co.getVariables();
        var boostVar = variables.createVariable("CYRUS_BOOST");
        var boost = boostVar.readDataInt32();
        boost = 0;
        boostVar.writeDataInt32(boost);
        var player = co.getOwner();
        if (!player.getIsDefeated())
        {
            var counit = co.getCOUnit();
            var coRange = co.getCORange();
            if (counit !== null)
            {
                var animations = [];
                var counter = 0;
                var fields = globals.getCircle(1, coRange);
                var x = counit.getX();
                var y = counit.getY();
                var animation = null;
                var viewplayer = map.getCurrentViewPlayer();
                var healed = false;
                for (var i = 0; i < fields.size(); i++)
                {
                    var point = fields.at(i);
                    var unitX = x + point.x;
                    var unitY = y + point.y;
                    if (map.onMap(unitX, unitY))
                    {
                        var unit = map.getTerrain(unitX, unitY).getUnit();
                        if (unit !== null)
                        {
                            var unithp = unit.getHpRounded();
                            UNIT.repairUnit(unit, CO_CYRUS.coHealing, map);
                            if (unithp < 10)
                            {
                                healed = true;
                            }
                            var delay = globals.randInt(135, 265);
                            animation = GameAnimationFactory.createAnimation(map, unitX, unitY);
                            animation.setSound("power0.wav", 1, delay);
                            if (animations.length < 5)
                            {
                                animation.addSprite("power0", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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
                            if (!viewplayer.getFieldVisible(unitX, unitY))
                            {
                                animation.setVisible(false);
                            }
                        }
                    }
                }
                if (healed)
                {
                    var hp = counit.getHpRounded();
                    if (hp <= 1)
                    {
                        counit.setHp(0.001);
                    }
                    else
                    {
                        counit.setHp(hp - 1);
                    }
                }
                fields.remove();
            }
        }
    };

    this.getRepairBonus = function(co, unit, posX, posY, map)
    {
        return -1;
    };
    this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("Appalled by Caulder's experiments in both reasons and methods, Cyrus has made it his mission to thwart him by aiding those he has harmed. Though, due to his upbringing by Caulder, he has no sense of self-preservation.");
    };
    this.getHits = function(co)
    {
        return qsTr("Assisting those less fortunate");
    };
    this.getMiss = function(co)
    {
        return qsTr("His father");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Cyrus will provide aid to all forces at his own expense, regardless of affiliation.");
    };
    this.getLongCODescription = function()
    {
        var text = qsTr("\nGlobal Effect: \nUnits will only heal 1HP on proporties but at a discount.") +
                   qsTr("\n\nCO Zone Effect: \nAll units excluding the CO unit will heal 2HP each turn, but the CO unit is drained by 1HP if any units are healed that turn.");
        text = replaceTextArgs(text, [CO_CYRUS.coGlobalBonus, CO_CYRUS.coZoneBonus, CO_CYRUS.coHealing]);
        return text;
    };
    this.getPowerDescription = function(co)
    {
        var text = qsTr("10% increased firepower and defense. All units are healed by 2HP, regardless of alliance. For each unit healed this way, Cyrus' units gain an additional 2% increased firepower and defense.");
        text = replaceTextArgs(text, [CO_CYRUS.powerBonus]);
        return text;

    };
    this.getPowerName = function(co)
    {
        return qsTr("Indiscriminate Aid");
    };
    this.getSuperPowerDescription = function(co)
    {
        var text = qsTr("20% increased firepower and defense. Cyrus' CO unit is destroyed, and its value (accounting for HP) is converted into a firepower and defense boost of 1% per 250g");
        text = replaceTextArgs(text, [CO_CYRUS.superPowerBonus]);
        return text;
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Sacrifice");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("I refuse to be like my father."),
                qsTr("I will help in any way that I can, regardless of what it costs me..."),
                qsTr("This is the best I can do. I hope it's enough..."),
                qsTr("I will sacrifice everything to end this suffering.")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Did... did I make a difference?"),
                qsTr("But... can this really be called a victory?"),
                qsTr("We need to hold onto hope...")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("You can't stop hope..."),
                qsTr("I stood in your way, that was enough...")];
    };
    this.getName = function()
    {
        return qsTr("Cyrus");
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
var CO_CYRUS = new Constructor();
