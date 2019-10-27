<script>
import ToggleSwitch from './ToggleSwitch.svelte';
import Slider from './Slider.svelte';
export let bulb;

$: light = bulb.lightList.length ? bulb.lightList[0] : null;
$: brightness = light.dimmer / 100;
const DEBUG = true;
const log = DEBUG ? console.log : () => {};

const toggleLight = () => {
    log('toggle')
    light.toggle()
};
const setColorTemperature = temp => () => {
    log('setColorTemperature', temp);
    light.setColorTemperature(temp);

}
let canSetBrightness = true;
let brightnessTimeoutId = 0;
let brightnessTimeoutId2 = 0;

function setBrightness(brightness) {
    log('setBrightness', brightness);
    light.setBrightness(brightness);
}
function onBrightnessChanged() {
    const dimmer = brightness * 100;
    clearTimeout(brightnessTimeoutId2);

    if (canSetBrightness) {
        clearTimeout(brightnessTimeoutId);
        canSetBrightness = false;
        setBrightness(dimmer);
        brightnessTimeoutId = setTimeout(() => canSetBrightness = true, 200);
    } else {
        log('del', Math.round(dimmer));
        brightnessTimeoutId2 = setTimeout(() => setBrightness(dimmer), 200);
    }
}
</script>

<style lang="scss">
@import './styles/variables.scss';

.lightbulb {
    background: $color-white;
    position: relative;
    text-align: initial;
    width: 160px;
    height: 160px;
    min-width: 160px;
    min-height: 160px;
    margin: 20px;
    padding: 10px;
    border-radius: 10%;
    transition: box-shadow .2s ease-in;
    
    &--yellow {
        box-shadow: lighten($color-yellow, 20%) 0 8px 60px;
    }
    &--bright {
        box-shadow: $color-bright 0 8px 60px;
    }
    &--orange {
        box-shadow: lighten($color-orange, 20%) 0 8px 60px;
    }
    &--off {
        box-shadow: none;
    }
    &--disabled {
        pointer-events: none;
        opacity: 0.60;
    }

    &__title {
        margin-top: 25px;
        text-align: center;
    }
    &__colors {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    &__icon {
        position: absolute;
        top: 10px;
        right: 10px;
        i {
            color: $color-dark;
            cursor: pointer;
        }
    }
    &__brightness {
        position: absolute;
        bottom: 10px;
        left: 10px;
    }
}

.circle {
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    border-style: hidden;
    &:hover {
        transform: translateY(6px) scale(1.15);
    }
    transform: translateY(6px);

    &--bright {
        background-image: radial-gradient($color-bright, darken($color-bright, 7%));
    }
    &--yellow {
        background-image: radial-gradient(lighten($color-yellow, 10%), $color-yellow);
    }
    &--orange {
        background-image: radial-gradient(lighten($color-orange, 10%), $color-orange);
    }
}
</style>

<div
    class="lightbulb" 
    class:lightbulb--disabled="{!bulb.alive}"
    class:lightbulb--orange="{light.colorTemperature > 70}"
    class:lightbulb--yellow="{light.colorTemperature > 40 && light.colorTemperature < 70}"
    class:lightbulb--bright="{light.colorTemperature < 40}"
    class:lightbulb--off="{!light.onOff}"
>
    <ToggleSwitch bind:checked={light.onOff} on:click={toggleLight} />

    <div class="lightbulb__title">
        <h3>{bulb.name}</h3>
    </div>

    <div class="lightbulb__icon">
        <i
            class="fa-lightbulb"
            class:fas="{light.onOff}"
            class:far="{!light.onOff}"
            title={light._modelName}
            on:click={toggleLight}
        />
    </div>
    <div class="lightbulb__brightness">
        <Slider bind:value={brightness} on:changed={onBrightnessChanged} />
    </div>

    <div class="lightbulb__colors">
        <span
            class="circle circle--bright"
            on:click={setColorTemperature(0)} 
        />
        <span
            class="circle circle--yellow"
            on:click={setColorTemperature(50)} 
        />
        <span
            class="circle circle--orange"
            on:click={setColorTemperature(100)} 
        />
    </div>
</div>

