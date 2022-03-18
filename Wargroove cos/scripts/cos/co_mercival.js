var Constructor = function()
{
    this.getCOStyles = function()
    {
        // string array containing the endings of the alternate co style
        
        return ["+alt"];
    };

    this.init = function(co, map)
    {
        co.setPowerStars(0);
        co.setSuperpowerStars(0);
    };

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
            default:
                audio.addMusic("mods/wargroove cos/music/cos/mercival.mp3", 636, 115846)
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 5;
    };
    this.getCOArmy = function()
    {
        return "CS";
    };
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
            default:
                if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
                {
                    return 20;
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
            default:
                if (co.inCORange(Qt.point(defPosX, defPosY), defender))
                {
                    return 20;
                }
                break;
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
        return qsTr("King Mercival II ruled Cherrystone for several decades, nurturing peace and prosperity in the kingdom. A wise and fair king, Mercival was much beloved by his people, and even more so by his daughter and only child, Mercia.");
    };
    this.getHits = function(co)
    {
        return qsTr("His precious Bluebird.");
    };
    this.getMiss = function(co)
    {
        return qsTr("Anobium punctatum, scourge of the book-lover!");
    };
    this.getCODescription = function(co)
    {
        return qsTr("The noble King of Cherrystone. A just and wise ruler.");
    };
    this.getLongCODescription = function()
    {
        return
               qsTr("\nGlobal Effect: \nNo Effects.") +
               qsTr("\n\nCO Zone Effect: \nUnits have 20% offensive and defensive bonus.");
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("You have to know these things when you're a king you know."),
                qsTr("The light shall not fade."),
                qsTr("Do not lose hope!"),
                qsTr("Together we stand!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Tell Mercia, I..."),
                qsTr("You are a worthy adversary.")];
    };
    this.getName = function()
    {
        return qsTr("Mercival");
    };
}

Constructor.prototype = CO;
var CO_MERCIVAL = new Constructor();
