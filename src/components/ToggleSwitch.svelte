<script>
import { createEventDispatcher } from 'svelte';
export let checked;

const dispatch = createEventDispatcher();
const onclick = () => dispatch('click');
</script>

<style lang="scss">
$color-checked: rgb(21, 21, 21);
$color-unchecked: rgb(145, 145, 145);

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
    background-color: $color-unchecked;
    -webkit-transition: .4s;
    transition: .4s;

    &:before {
        position: absolute;
        border-radius: 50%;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
}

input:checked + .slider {
    background-color: $color-checked;
}

input:focus + .slider {
    box-shadow: 0 0 1px $color-checked;
}

input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
}
</style>

<label class="switch" on:click={onclick}>
  <input type="checkbox" bind:checked={checked}>
  <span class="slider"></span>
</label>
