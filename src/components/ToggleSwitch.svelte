<script>
import { createEventDispatcher } from 'svelte';
export let checked;

const dispatch = createEventDispatcher();
const onclick = () => dispatch('click');
</script>

<style lang="scss">
@import './styles/variables.scss';

/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    border-radius: 24px;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-gray;
    transition: .4s;

    &:before {
        position: absolute;
        border-radius: 50%;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background-color: $color-white;
        transition: .4s;
    }
}

input:checked + .slider {
    background-color: $color-dark;
}

input:focus + .slider {
    box-shadow: 0 0 1px $color-dark;
}

input:checked + .slider:before {
    transform: translateX(16px);
}
</style>

<label class="switch" on:click={onclick}>
  <input type="checkbox" bind:checked={checked}>
  <span class="slider"></span>
</label>
