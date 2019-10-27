<script>
import Tradfri from './Tradfri.js';
import LightBulb from './components/LightBulb.svelte';
import Loader from './components/Loader.svelte';
import { fade } from 'svelte/transition';

let securityCode = '';
$: lightbulbs = {};
$: isConnected = false;
$: shouldShowLoader = false;

const tradfri = new Tradfri();
tradfri.onConnect(() => isConnected = true)
tradfri.onDeviceUpdated(device => {
	console.log(device);
	if (device.type === tradfri.connector.AccessoryTypes.lightbulb) {
		lightbulbs[device.instanceId] = device;
	}
});

function reload() {
	window.location.reload()
}

// Don't show loader before 500ms has passed to avoid awkward loader flash,
// as the gateway usually answers quite fast when connected
setTimeout(() => shouldShowLoader = true, 500);
</script>

<style lang="scss">
@import './styles/variables.scss';

.error {
	color: $color-negative;
}
.page {
    height: 100vh;
	background: darken($color-white, 5%);
}
.content {
	position: absolute;
	text-align: center;
	top: 50%;
	left: 0;
	right: 0;
	margin: 0 auto;
	transform: translateY(-50%);
}
.button {
	display: inline-block;
    cursor: pointer;
    background-color: $color-white;
	color: $color-dark;
    font-weight: 700;
    padding: 0.75rem 1rem;
    vertical-align: middle;
    line-height: 1;
	border-radius: 3px;
	margin: 5px;
}
.form-field {
	padding: 1rem;
	input{
		padding: 0.25rem;
	}
}
.lightbulb-wrapper {
	display: flex;
	flex-wrap: wrap;
	padding: 1.5vh;
	width: 100%;
	align-items: center;
	justify-content: center;
}
p {
	margin-top: 0.5rem;
}
.loader-caption {
	font-size: 12px;
}
</style>

<div class="page">
	<div class="content content--primary">
		{#await tradfri.initializeClient()}
			{#if shouldShowLoader}
				<Loader />
				<p class="loader-caption">Finding your gateway</p>
			{/if}
		{:then _}
			{#if isConnected}
				<div in:fade="{{duration:1500}}" class="lightbulb-wrapper">
					{#each Object.values(lightbulbs) as bulb (bulb.instanceId)}
						<LightBulb bulb={bulb} />
					{/each}
				</div>
			{:else}
				<i class="fas fa-2x fa-check" />
				<p>Gateway detected</p>
      			<small>{tradfri.gatewayAddress}</small>
				<div class="form-field">
					<input
						type="text"
						name="securityCode"
						bind:value={securityCode}
						placeholder="Security code"
					>
				</div>
				<button
					class="button"
					on:click={() => tradfri.authenticateAndConnect(securityCode)}
				>
					Connect
				</button>
			{/if}
		{:catch error}
			<i class="fas fa-2x fa-plug" />
			<p class="error">Failed to find your tradfri gateway</p>
			<button class="button" on:click={reload}>Try again</button>
		{/await}
	</div>
</div>
