<script>
import ToggleSwitch from './ToggleSwitch.svelte';
export let bulb;

$: light = bulb.lightList.length ? bulb.lightList[0] : null;

const toggle = () => light.toggle();
const setColorTemperature = temp => () => light.setColorTemperature(temp);
const setBrightness = brightness => () => light.setBrightness(brightness);
</script>

<style lang="scss">
$color-orange: #ffbe4f;
$color-yellow: #fff820;
$color-white: #ffffff;
$color-black: #000000;

.lightbulb {
    background: $color-white;
    position: relative;
    text-align: initial;
	width: 160px;
	height: 160px;
    margin: 20px;
    padding: 10px;
    border-radius: 10%;
    transition: box-shadow .2s ease-in;
    
    &--yellow {
        box-shadow: lighten($color-yellow, 30%) 0 8px 60px;
    }
    &--white {
        box-shadow: $color-white 0 8px 60px;
    }
    &--orange {
        box-shadow: lighten($color-orange, 20%) 0 8px 60px;
    }
    &--off {
        box-shadow: none !important;
    }
    &--disabled {
        pointer-events: none;
        opacity: 0.60;
    }

    &__title {
        margin-top: 25px !important;
        text-align: center !important;
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
            cursor: pointer;
        }
    }
    &__brightness {
        position: absolute;
        bottom: 14px;
        left: 10px;
        span {
            margin-right: 5px; 
            cursor: pointer;
        }
    }
}

.circle {
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    border-style: hidden;

    &:hover {
        transform: scale(1.15);
    }

    &--white {
        background-image: radial-gradient($color-white, darken($color-white, 7%));
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
    class:lightbulb--white="{light.colorTemperature < 40}"
    class:lightbulb--off="{!light.onOff}"
>
    <ToggleSwitch bind:checked={light.onOff} on:click={() => light.toggle()} />

    <div class="lightbulb__title">
        <h3>{bulb.name}</h3>
    </div>

    <div class="lightbulb__icon">
        <i
            class="fa-lightbulb"
            class:fas="{light.onOff}"
            class:far="{!light.onOff}"
            title={light._modelName}
            on:click={() => light.toggle()}
        />
    </div>
    <div class="lightbulb__brightness">
        <span on:click={setBrightness(1)}>L</span>
        <span on:click={setBrightness(50)}>M </span>
        <span on:click={setBrightness(100)}>F</span>
    </div>

    <div class="lightbulb__colors">
        <button
            class="circle circle--white"
            on:click={setColorTemperature(0)} 
        />
        <button
            class="circle circle--yellow"
            on:click={setColorTemperature(50)} 
        />
        <button
            class="circle circle--orange"
            on:click={setColorTemperature(100)} 
        />
    </div>
</div>

