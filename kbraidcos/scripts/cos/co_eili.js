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
        co.setSuperpowerStars(5);
    };

    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        CO_EILI.eiliDamage(co, 1, powerNameAnimation, map);
    };

    this.activateSuperpower = function(co, powerMode, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);
        
        CO_EILI.eiliDamage(co, 2, animation, map);
    };

    this.eiliDamage = function(co, value, animation2, map)
    {
        var player = co.getOwner();
        var counter = 0;
        var playerCounter = map.getPlayerCount();
        var animation = null;
        var animations = [];
        for (var i2 = 0; i2 < playerCounter; i2++)
        {
            var enemyPlayer = map.getPlayer(i2);
            if ((enemyPlayer !== player) &&
                (player.checkAlliance(enemyPlayer) === GameEnums.Alliance_Enemy))
            {

                var units = enemyPlayer.getUnits();
                units.randomize();
                for (i = 0; i < units.size(); i++)
                {
                    var unit = units.at(i);

                    animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                    var delay = globals.randInt(135, 265);
                    if (animations.length < 5)
                    {
                        delay *= i;
                    }
                    animation.setSound("power10.wav", 1, delay);
                    if (animations.length < 5)
                    {
                        animation.addSprite("power13", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                        if (animation2 !== null)
                        {
                            animation2.queueAnimation(animation);
                        }
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
                    animation.writeDataInt32(unit.getX());
                    animation.writeDataInt32(unit.getY());
                    animation.writeDataInt32(value);
                    animation.setEndOfAnimationCall("CO_EILI", "postAnimationDamage");

                }
                units.remove();
            }
        }
    };

    this.postAnimationDamage = function(postAnimation, map)
    {
        postAnimation.seekBuffer();
        var x = postAnimation.readDataInt32();
        var y = postAnimation.readDataInt32();
        var damage = postAnimation.readDataInt32();
        if (map.onMap(x, y))
        {
            var unit = map.getTerrain(x, y).getUnit();
            if (unit !== null)
            {
                unit.setFuel(unit.getFuel() / 2);
                unit.setAmmo1(unit.getAmmo1() / 2);
                unit.setAmmo2(unit.getAmmo2() / 2);
            }

        }
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
                audio.addMusic("mods/kbraidcos/music/cos/eili.mp3",  73770, 143510);
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 2;
    };
    this.getCOArmy = function()
    {
        return "AI";
    };
    this.coZoneBonus = -10;
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Power:
            default:
                if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
                {
                    return CO_EILI.coZoneBonus;
                }
                break;
        }
        return -20;
    };
    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        if (co.inCORange(Qt.point(defPosX, defPosY), defender) ||
            co.getPowerMode() > GameEnums.PowerMode_Off)
        {
            return CO_EILI.coZoneBonus;
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

    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("");
    };
    this.getHits = function(co)
    {
        return qsTr("Braid");
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
        var text =qsTr("\nGlobal Effect: \nNone") +
                   qsTr("\n\nCO Zone Effect: \n");
        text = replaceTextArgs(text, [CO_EILI.coZoneBonus]);
        return text;
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("all enemy units have their attack reduced by -20 and defense by -10");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Call for Peace");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("all units on the map have their attack reduced by -50 and defense by -20. all enemy units have their ammo supply cut in half.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Ceasefire");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("")];
    };
    this.getName = function()
    {
        return qsTr("Eili");
    };
}

Constructor.prototype = CO;
var CO_EILI = new Constructor();
