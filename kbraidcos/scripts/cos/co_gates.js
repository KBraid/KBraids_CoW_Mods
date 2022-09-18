var Constructor = function()
{
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
                audio.addMusic("mods/kbraidcos/music/cos/Gates.mp3",  73770, 143510);
                break;
        }
    };

    this.init = function(co, map)
    {
        co.setPowerStars(0);
        co.setSuperpowerStars(0);
    };

    this.getCOArmy = function()
    {
        return "BM";
    };

    this.startOfTurn = function(co, map)
{
    co.getOwner().addFunds(10000);
};
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("Master Gates. Head of the Gates family. The richest man in the world and grandfather of Colin and Sasha");
    };
    this.getHits = function(co)
    {
        return qsTr("Money");
    };
    this.getMiss = function(co)
    {
        return qsTr("Taxes");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Gains 10000 funds at the start of every turn.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("No CO Power");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("No Super CO Power");
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("A good showing, chap!"),
        ("Money solves all problems."),
        ("Money well spent!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Well that wasn't a very wise investment."),
        ("This is why I sent the young'uns to the Academy."),
        ("Do you have any idea how much damage you did to the economy?")];
    };
    this.getName = function()
    {
        return qsTr("Gates");
    };
}

Constructor.prototype = CO;
var CO_GATES = new Constructor();
