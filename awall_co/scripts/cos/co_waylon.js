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
        var size = units.size();
        for (var i = 0; i < size; i++)
        {
            var unit = units.at(i);
            if (unit.getUnitType() === GameEnums.UnitType_Air)
            {
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
        var size = units.size();
        for (var i = 0; i < size; i++)
        {
            var unit = units.at(i);
            if (unit.getUnitType() === GameEnums.UnitType_Air)
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

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Power:
                audio.addMusic("resources/music/cos/power_ids_dc.mp3", 0 , 0);
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("resources/music/cos/power_ids_dc.mp3", 0 , 0);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/bh_tagpower.mp3", 779 , 51141);
                break;
            default:
                audio.addMusic("resources/music/cos/waylon.mp3", 58182, 112806);
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 2;
    };
    this.getCOArmy = function()
    {
        return "TI";
    };

    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                if (attacker.getUnitType() === GameEnums.UnitType_Air)
                {
                    return 60;
                }
                return 10;
            case GameEnums.PowerMode_Power:
                if (attacker.getUnitType() === GameEnums.UnitType_Air)
                {
                    return 30;
                }
                return 10;
            default:
                if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
                {
                    if (attacker.getUnitType() === GameEnums.UnitType_Air)
                    {
                        return 30;
                    }
                    return 10;
                }
                break;
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
                if (defender.getUnitType() === GameEnums.UnitType_Air)
                {
                    return 310;
                }
                return 10;
            case GameEnums.PowerMode_Power:
                if (defender.getUnitType() === GameEnums.UnitType_Air)
                {
                    return 200;
                }
                return 10;
            default:
                if (co.inCORange(Qt.point(defPosX, defPosY), defender))
                {
                    if (defender.getUnitType() === GameEnums.UnitType_Air)
                    {
                        return 40;
                    }
                    return 10;
                }
                break;
        }
        return 0;
    };

    this.getCOUnits = function(co, building, map)
    {
        var buildingId = building.getBuildingID();
        if (buildingId === "AIRPORT" ||
            buildingId === "TEMPORARY_AIRPORT")
        {
            return ["ZCOUNIT_KIROV"];
        }
        return [];
    };
    this.getAiCoUnitBonus = function(co, unit, map)
    {
        if (unit.getUnitType() === GameEnums.UnitType_Air)
        {
            return 6;
        }
        return 0;
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("A Teal Isle Commander. Destructive, egotistical and extremely vain.");
    };
    this.getHits = function(co)
    {
        return qsTr("Living the good life");
    };
    this.getMiss = function(co)
    {
        return qsTr("Responsibility");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Air units have higher firepower and defense.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nSpecial Unit:\nKirov\n\nGlobal Effect: \nNo Effects.") +
               qsTr("\n\nCO Zone Effect: \nAir Units have 30% increased firepower and 40% increased defense.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Air units get increased firepower and highly increased defense.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Bad Company");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Air units get increased firepower and highly increased defense.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Wingman");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("I'm over here! C'mon give me your best shot."),
                qsTr("You think you can get the better of me? You've got a lot to learn."),
                qsTr("Woo-hoo!"),
                qsTr("All i want is total air supremacy! Then i'll pick off your forces.")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("The end of the world? Fine by me..."),
                qsTr("Woo-hoo!"),
                qsTr("How'd you like that?")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("This is not the freedom I want!"),
                qsTr("The eagle has landed.")];
    };
    this.getName = function()
    {
        return qsTr("Waylon");
    };
}

Constructor.prototype = CO;
var CO_WAYLON = new Constructor();
