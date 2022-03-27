var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(2);
        co.setSuperpowerStars(2);
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
                audio.addMusic("mods/wargroove cos/music/cos/valder.mp3", 5416, 109427);
                break;
        }
    };

    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        CO_SENSEI.spawnUnits(co, "INFANTRY", 3, powerNameAnimation, map);
    };

    this.activateSuperpower = function(co, powerMode, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);

        CO_SENSEI.spawnUnits(co, "INFANTRY", 5, powerNameAnimation, map);
    };

    this.spawnUnits = function(co, unitID, hp, powerNameAnimation, map)
    {
        var buildings = co.getOwner().getBuildings();
        var animations = [];
        var counter = 0;
        buildings.randomize();
        var size = buildings.size();
        for (var i = 0; i < size; i++)
        {
            var building = buildings.at(i);
            if (building.getBuildingID() === "TOWN")
            {
                if (map.getTerrain(building.getX(), building.getY()).getUnit() === null)
                {
                    var animation = GameAnimationFactory.createAnimation(map, building.getX(), building.getY());
                    animation.writeDataInt32(building.getX());
                    animation.writeDataInt32(building.getY());
                    animation.writeDataString(unitID);
                    animation.writeDataInt32(co.getOwner().getPlayerID());
                    animation.writeDataInt32(hp);
                    animation.setStartOfAnimationCall("ANIMATION", "postAnimationSpawnUnit");
                    var delay = globals.randInt(135, 265);
                    if (animations.length < 5)
                    {
                        delay *= i;
                    }
                    if (i % 2 === 0)
                    {
                        animation.setSound("power8_1.wav", 1, delay);
                    }
                    else
                    {
                        animation.setSound("power8_2.wav", 1, delay);
                    }
                    if (animations.length < 5)
                    {
                        animation.addSprite("power8", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                        powerNameAnimation.queueAnimation(animation);
                        animations.push(animation);
                    }
                    else
                    {
                        animation.addSprite("power8", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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
        }
        buildings.remove();
    };

    this.getCOUnitRange = function(co, map)
    {
        return 1;
    };
    this.getCOArmy = function()
    {
        return "FH";
    };

    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("Valder is the ruler of Felheim, and wielder of the Fell Gauntlet. A combination of keen intellect, consummate martial skill, and potent magics makes him a singularly capable and intimidating foe.");
    };
    this.getHits = function(co)
    {
        return qsTr("The Fell Gauntlet.");
    };
    this.getMiss = function(co)
    {
        return qsTr("Oranges.");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Ruling necromancer of the Felheim Legion, Valder secured control of the Fell Gauntlet at a young age and with it, the power to raise the dead. Valder aims to show the world there is more to a zombie than a shambling corpse.");
    };
    this.getLongCODescription = function()
    {
               qsTr("\nGlobal Effect: \n") +
               qsTr("\n\nCO Zone Effect: \n");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Infantry units with 3 HP appear in all his cities, ready to be moved.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Stir Dead");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Infantry units with 5 HP appear in all his cities, ready to be moved.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Raise Dead");
    };
    this.getPowerSentences = function(co)
    {
        var randVar = globals.randInt(0,100);
        if(randVar <100) {
        return [qsTr("Behold the Fell Gauntlet!"),
                qsTr("By my heand, rise!"),
                qsTr("Felheim rises."),
                qsTr("You will not escape!"),
                qsTr("Rise from your grave!"),
                qsTr("This fight shall be your last...")];
        } else {
            return [qsTr("Nothing personal, kid.")];
        }
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("I claim this power!"),
                qsTr("Farewell."),
                qsTr("Our dominion grows."),
                qsTr("Return to dust!"),
                qsTr("Victory belongs to Felheim."),
                qsTr("You fought well."),
                qsTr("Your kingdom has fallen."),
                qsTr("I am Valder of the Fellheim Legion.")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("The dead outnumber the living..."),
                qsTr("I have been a fool!"),
                qsTr("I will have retribution!"),
                qsTr("This is not the end!")];
    };
    this.getName = function()
    {
        return qsTr("Valder");
    };
}

Constructor.prototype = CO;
var CO_VALDER = new Constructor();
