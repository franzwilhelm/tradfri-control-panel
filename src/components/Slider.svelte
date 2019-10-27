<script>
import { createEventDispatcher } from 'svelte';

export let value;

const dispatch = createEventDispatcher();
const width = 60;

function setValueFromEvent({ offsetX, srcElement: { offsetWidth } }) {
    if (offsetX < 0) {
        value = 0;
    } else if (offsetX > width) {
        value = 1;
    } else {
        value = offsetX / offsetWidth;
    } 
    dispatch('changed');
}

/*
 * Mouse events
 */
let mouseIsDown = false;
let timeoutId = 0;

// Set value if mouse is pressed during mousemove
const onmousemove = event => mouseIsDown && setValueFromEvent(event);

// Mouseup outside the slider area is not detected, so set 
// mouseIsDown to false when leaving the area
const onmouseleave = () => {
    if (mouseIsDown) {
        setValueFromEvent(event);
        mouseIsDown = false
    }
};

// Wait to trigger mouseIsDown for animation purposes
const onmousedown = () => {
    setValueFromEvent(event);
    timeoutId = setTimeout(() => mouseIsDown = true, 150)
}
const onmouseup = () => {
    clearTimeout(timeoutId);
    mouseIsDown = false;
}
</script>

<style lang="scss">
@import './styles/variables.scss';
$slider-height: 20px;
$slider-width: 60px;
$border-radius: $slider-height / 2.5;

.slider {
    position: relative;
    width: $slider-width;
    height: $slider-height;
    border-radius: $border-radius;
    background: $color-white;
    overflow: hidden;
    cursor: pointer;
    transition: .4s ease;

    &:hover {
        background: $color-gray;
        display: block;
        box-shadow: 0 0 20px 1px rgb(225, 225, 225);
        transform: scale(1.05)
    }
    &:hover span {
        opacity: 0;
    }
    &:hover svg {
        width: 12px;
        height: 12px;
        margin-bottom: 3px;
    }
    &__overlay {
        &--transition {
            transition: all .15s ease-in-out;
        }
        position: absolute;
        top: 0;
        left: 0;
        height: $slider-height;
        border-radius: $border-radius;
        background: $color-white;
        pointer-events: none;
    }
    &__icon {
        pointer-events: none;
        position: relative;
        left: 5px;
        top: 2px;
        color: $color-dark;
        font-size: 12px;
        span {
            transition: opacity .3s ease;
            vertical-align: 4px;
        }
        svg {
            transition: all .2s ease;
            width: 17px;
            height: 17px;
        }
    }
}
</style>

<div
    class="slider"
    on:mousemove={onmousemove}
    on:mousedown={onmousedown}
    on:mouseup={onmouseup}
    on:mouseleave={onmouseleave}
>
    <div 
        class="slider__overlay"
        class:slider__overlay--transition="{!mouseIsDown}"
        style="width: {`${value*width}px`}"
    />
    <div class="slider__icon">
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
            enable-background="new 0 0 1000 1000"
        >
            <g>
                <path d="M270.3,500c0,126.9,102.8,229.7,229.7,229.7S729.7,626.9,729.7,500c0-126.9-102.8-229.7-229.7-229.7S270.3,373.1,270.3,500z"/>
                <path d="M500,193.8c16.8,0,30.6-13.8,30.6-30.6V40.6c0-16.8-13.8-30.6-30.6-30.6c-16.8,0-30.6,13.8-30.6,30.6v122.5C469.4,180,483.2,193.8,500,193.8z"/>
                <path d="M500,806.3c-16.8,0-30.6,13.8-30.6,30.6v122.5c0,16.8,13.8,30.6,30.6,30.6c16.8,0,30.6-13.8,30.6-30.6V836.9C530.6,820,516.8,806.3,500,806.3z"/>
                <path d="M959.4,469.4H836.9c-16.8,0-30.6,13.8-30.6,30.6c0,16.8,13.8,30.6,30.6,30.6h122.5c16.8,0,30.6-13.8,30.6-30.6C990,483.2,976.2,469.4,959.4,469.4z"/>
                <path d="M193.8,500c0-16.8-13.8-30.6-30.6-30.6H40.6C23.8,469.4,10,483.2,10,500c0,16.8,13.8,30.6,30.6,30.6h122.5C180,530.6,193.8,516.8,193.8,500z"/>
                <path d="M239.7,284.1c6.1,6.1,13.8,9.2,21.4,9.2s15.3-3.1,21.4-9.2c12.3-12.3,12.3-30.6,0-42.9l-87.3-87.3c-12.3-12.3-30.6-12.3-42.9,0s-12.3,30.6,0,42.9L239.7,284.1z"/>
                <path d="M760.3,715.9c-12.3-12.3-30.6-12.3-42.9,0s-12.3,30.6,0,42.9l87.3,87.3c6.1,6.1,13.8,9.2,21.4,9.2s15.3-3.1,21.4-9.2c12.3-12.3,12.3-30.6,0-42.9L760.3,715.9z"/>
                <path d="M738.9,291.8c7.7,0,15.3-3.1,21.4-9.2l87.3-87.3c12.3-12.3,12.3-30.6,0-42.9s-30.6-12.3-42.9,0l-88.8,87.3c-12.3,12.3-12.3,30.6,0,42.9C722,288.7,729.7,291.8,738.9,291.8z"/>
                <path d="M239.7,715.9l-87.3,87.3c-12.3,12.3-12.3,30.6,0,42.9c6.1,6.1,13.8,9.2,21.4,9.2s15.3-3.1,21.4-9.2l87.3-87.3c12.3-12.3,12.3-30.6,0-42.9C271.8,705.2,251.9,705.2,239.7,715.9z"/>
            </g>
        </svg>
        <span>{Math.round(value*100)}%</span>
    </div>
</div>
