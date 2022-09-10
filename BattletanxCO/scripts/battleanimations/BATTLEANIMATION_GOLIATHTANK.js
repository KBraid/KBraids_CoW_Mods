var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 5;
    };

    this.loadMoveInAnimation = function(sprite, unit, defender, weapon)
    {
        var count = sprite.getUnitCount(BATTLEANIMATION_GOLIATHTANK.getMaxUnitCount());
        var startX = -90;
        BATTLEANIMATION_GOLIATHTANK.loadSprite(sprite, unit, defender, weapon, "+move", -1, Qt.point(startX, 5), Qt.point(65, 0), 600)
        sprite.loadMovingSprite("vehicle_dust", false, sprite.getMaxUnitCount(), Qt.point(startX - 20, 7),
                                Qt.point(65, 0), 600, false,
                                -1, 1);
        for (var i = 0; i < count; i++)
        {
            sprite.loadSound("heavy_tank_move.wav", 5, i * BATTLEANIMATION.defaultFrameDelay);
        }
    };

    this.loadStopAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_GOLIATHTANK.loadSprite(sprite, unit, defender, weapon, "+stop", 1);
        var armyName = BATTLEANIMATION_GOLIATHTANK.getArmyName(unit);
        var offset = Qt.point(-45, 7);
        sprite.loadSprite("vehicle_dust_stop",  false,
                          BATTLEANIMATION_GOLIATHTANK.getMaxUnitCount(), offset, 1);
    };

    this.loadStandingAnimation = function(sprite, unit, defender, weapon)
    {
        sprite.loadSpriteV2("goliath_tank+mask", GameEnums.Recoloring_Matrix,
                            BATTLEANIMATION_GOLIATHTANK.getMaxUnitCount(), Qt.point(-35, 0));
        BATTLEANIMATION.loadSpotterOrCoMini(sprite, unit, false);
    };

    this.loadFireAnimation = function(sprite, unit, defender, weapon)
    {
        sprite.loadAnimation("loadStandingAnimation", unit);
        var offset = Qt.point(32, 26);
        var count = sprite.getUnitCount(BATTLEANIMATION_GOLIATHTANK.getMaxUnitCount());
        {

            sprite.loadSprite("medium_shot",  false, sprite.getMaxUnitCount(), offset,
                              1, 1.0, 0, 0);
            for (var i = 0; i < count; i++)
            {
                sprite.loadSound("megacannon_weapon_fire.wav", 1, i * BATTLEANIMATION.defaultFrameDelay);
            }
        }
    };

    this.getFireDurationMS = function(sprite, unit, defender, weapon)
    {
        return 600 + BATTLEANIMATION.defaultFrameDelay * sprite.getUnitCount(BATTLEANIMATION_GOLIATHTANK.getMaxUnitCount());
    };

    this.loadImpactAnimation = function(sprite, unit, defender, weapon)
    {
        var count = sprite.getUnitCount(BATTLEANIMATION_GOLIATHTANK.getMaxUnitCount());
        var i = 0;
        {
            sprite.loadSprite("bullet_megatank",  false, 5, Qt.point(0, 30),
                              1, 1.0, 0, 0, true, true, 50);
            sprite.loadSprite("cannon_heavy_hit",  false, 5, Qt.point(0, 20),
                              1, 1.0, 0, 100, true);
            sprite.addSpriteScreenshake(8, 0.95, 800, 300);
            for (i = 0; i < count; i++)
            {
                sprite.loadSound("tank_hit.wav", 1, 50 + i * BATTLEANIMATION.defaultFrameDelay);
                sprite.loadSound("impact_explosion.wav", 1, 100 + i * BATTLEANIMATION.defaultFrameDelay);
            }
        }
    };
};

Constructor.prototype = BATTLEANIMATION;
var BATTLEANIMATION_GOLIATHTANK = new Constructor();
