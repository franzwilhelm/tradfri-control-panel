<script>
import ToggleSwitch from './ToggleSwitch.svelte';

export let bulb;

$: light = bulb.lightList.length ? bulb.lightList[0] : null;
$: wrapperClass = function () {
    const alive = bulb.alive ? 'lightbulb' : 'lightbulb lightbulb--disabled';
    if (light.colorTemperature > 70) {
        return alive + ' lightbulb--orange';
    } else if (light.colorTemperature > 40) {
        return alive + ' lightbulb--yellow';
    }
    return alive + ' lightbulb--white';
}()
$: lightbulbIconClass = light.onOff ? 'fas fa-lightbulb' : 'far fa-lightbulb';

async function toggleLight() {
    if (light) {
        const res = await light.toggle()
        console.log(res)
    }
}

async function setTemperature(temperature) {
   if (light) {
        const res = await light.setColorTemperature(`${temperature}`)
        console.log(res)
    }
}

async function setBrightness(brightness) {
   if (light) {
        const res = await light.setBrightness(`${brightness}`)
        console.log(res)
    }
}
</script>

<style lang="scss">
$color-orange: #ffad20;
$color-yellow: #ffec20;
$color-white: #ffffff;
$color-black: #000000;

.lightbulb {
    background: $color-white;
    position: relative;
    text-align: initial;
    transition: box-shadow .2s ease-in;

    &--yellow {
        box-shadow: lighten($color-yellow, 30%) 0 8px 60px;
    }
    &--white {
        box-shadow: rgba(0,0,0,0.1) 0 8px 60px;
    }
    &--orange {
        box-shadow: lighten($color-orange, 30%) 0 8px 60px;
    }

	width: 160px;
	height: 160px;
    margin: 20px;
    padding: 10px;
    border-radius: 10%;
    
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
            cursor: pointer
        }
    }
    &__brightness {
        position: absolute;
        bottom: 14px;
        left: 10px;
        span {
            margin-right: 5px; 
            cursor: pointer
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
        transform: scale(1.1)
    }
    &--white {
        background-image: radial-gradient($color-white, darken($color-white, 10%));
    }
    &--yellow {
        background-image: radial-gradient(lighten($color-yellow, 10%), $color-yellow);
    }
    &--orange {
       background-image: radial-gradient(lighten($color-orange, 10%), $color-orange);
    }
}
</style>

<div class={wrapperClass}>
    <ToggleSwitch bind:checked={light.onOff} on:click={toggleLight} />
    <div class="lightbulb__title">
        <h3>{bulb.name}</h3>
    </div>

    <div class="lightbulb__icon">
        <i
            class={lightbulbIconClass}
            title={light._modelName}
            on:click={toggleLight}
        />
    </div>
    <div class="lightbulb__brightness">
        <span on:click={() => setBrightness(1)}>L</span>
        <span on:click={() => setBrightness(50)}>M </span>
        <span on:click={() => setBrightness(100)}>F</span>
    </div>
    <div class="lightbulb__colors">
        <button
            class="circle circle--white"
            on:click={() => setTemperature(0)} 
        />
        <button
            class="circle circle--yellow"
            on:click={() => setTemperature(50)} 
        />
        <button
            class="circle circle--orange"
            on:click={() => setTemperature(100)} 
        />
    </div>
</div>

