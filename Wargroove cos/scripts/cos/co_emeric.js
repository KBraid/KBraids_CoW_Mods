var Constructor = function()
{

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
            audio.addMusic("mods/wargroove cos/music/cos/emeric.mp3", 10110, 155000);
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

    this.getCOUnitRange = function(co, map)
    {
        return 2;
    };
    this.getCOArmy = function()
    {
        return "CS";
    };
    this.coZoneStarBonus = 2;
    this.getTerrainDefenseModifier = function(co, unit, posX, posY, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                return 4;
            case GameEnums.PowerMode_Power:
                return CO_EMERIC.coZoneStarBonus;
            default:

                if (co.inCORange(Qt.point(posX, posY), unit))
                {
                    return CO_EMERIC.coZoneStarBonus;
                }
            return 0;
        }
    };
    this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("Emeric is an immensely powerful mage, well versed in arcane lore. He is a scholar, and his knowledge, alongside his tactical know-how and compassionate wisdom, have made him an indispensable advisor to the Cherrystone throne.");
    };
    this.getHits = function(co)
    {
        return qsTr("The smell of old books.");
    };
    this.getMiss = function(co)
    {
        return qsTr("An unfocused mind.");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Emeric is the Cherrystone Kingdom's royal mage. He channels powerful magic through his set of cherrystones.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nGlobal Effect: \nNo Effects.") +
                qsTr("\n\nCO Zone Effect: \nIncreases Terrain Defenses by 2.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Increases Terrain Defenses by 2.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Elder Shield");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Increases Terrain Defenses by 4.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Elder Shield");
    };
    this.getPowerSentences = function(co)
    {
        var randVar = globals.randInt(0,100);
        if(randVar <100) {
        return [qsTr("Cherrystones defend us!"),
                qsTr("This should do the trick!"),
                qsTr("I have a spell for this."),
                qsTr("This should protect us!")];
        } else {
            return [qsTr("YOU  SHALL NOT  PASS!!!")];
        }
    };
    this.getVictorySentences = function(co)
    {
        var randVar = globals.randInt(0,100);
        if(randVar <100) {
        return [qsTr("You were simply outmatched."),
                qsTr("I had no doubt.")];
        } else {
            return [qsTr("Greetings.")];
        }
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("I was foolish."),
                qsTr("A victory well earned.")];
    };
    this.getName = function()
    {
        return qsTr("Emeric");
    };

}

Constructor.prototype = CO;
var CO_EMERIC = new Constructor();
