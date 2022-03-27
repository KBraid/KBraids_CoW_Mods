var Constructor = function()
{
    this.getAiUsePower = function(co, powerSurplus, unitCount, repairUnits, indirectUnits, directUnits, enemyUnits, turnMode)
    {
        return CO.getAiUsePowerAtEnd(co, powerSurplus, turnMode);
    };

    this.init = function(co, map)
    {
        co.setPowerStars(4);
        co.setSuperpowerStars(6);
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
            if (unit.getUnitType() !== GameEnums.UnitType_Infantry)
            {
                unit.setHasMoved(false);
                var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                var delay = globals.randInt(135, 265);
                if (animations.length < 5)
                {
                    delay *= i;
                }
                animation.setSound("power1.wav", 1, delay);
                if (animations.length < 5)
                {
                    animation.addSprite("power1", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5, delay);
                    powerNameAnimation.queueAnimation(animation);
                    animations.push(animation);
                }
                else
                {
                    animation.addSprite("power1", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5, delay);
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
            if (unit.getUnitType() !== GameEnums.UnitType_Infantry)
            {
                unit.setHasMoved(false);
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
                audio.addMusic("mods/wargroove cos/music/cos/caesar.mp3", 408, 111164)
                break;
        }
    };

    this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };

    this.getCOUnitRange = function(co, map)
    {
        return 1;
    };
    this.getCOArmy = function()
    {
        return "CS";
    };

    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("As the court’s royal dog, Caesar has stayed by Mercia’s side since childhood, guarding her at all costs.");
    };
    this.getHits = function(co)
    {
        return qsTr("Cheese sandwiches ");
    };
    this.getMiss = function(co)
    {
        return qsTr("Strawberry jam ");
    };
    this.getCODescription = function(co)
    {
        return qsTr("A magnificent and majestic canine, Caesar leads armies with wordless dignity. His mere presence is enough to inspire and guide troops through battle.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("All non-infantry units that have already carried out orders may move again, but their firepower is cut in half.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Motivate");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("All non-infantry units that have already carried out orders may move again with no firepower penalty.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Inspire");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Woof!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Woof!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Whimper.")];
    };
    this.getName = function()
    {
        return qsTr("Caesar");
    };
}

Constructor.prototype = CO;
var CO_CAESAR = new Constructor();
