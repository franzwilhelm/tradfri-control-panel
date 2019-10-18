<script>
import LightBulb from './components/LightBulb.svelte';
import Tradfri from './util/Tradfri.js';

const tradfri = new Tradfri();
let securityCode = '';
$: lightbulbs = {};
$: isConnected = false;

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

function disconnect() {
	tradfri.disconnect()
	reload()
}
</script>

<style lang="scss">
.error {
	color: red;
}
.page {
    height: 100vh;
	background: rgb(244, 244, 244);
}
.content {
	position: absolute;
	text-align: center;
	top: 50%;
	left: 0;
	right: 0;
	margin: 0 auto;
	-ms-transform: translateY(-50%);
	 transform: translateY(-50%);
}
.button {
	display: inline-block;
    cursor: pointer;
    background-color:white;
	color: black;
    font-weight: 700;
    padding: 0.75rem 1rem;
    vertical-align: middle;
    line-height: 1;
	border-radius: 3px;
}
.form-field {
	padding: 1rem;
	input {
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
</style>

<div class="page">
	<div class="content content--primary">
		{#await tradfri.initializeClient()}
			<p>Finding your gateway...</p>
		{:then _}
			{#if isConnected}
				<!-- <button class="button" on:click={disconnect}>Disconnect</button> -->
				<div class="lightbulb-wrapper">
					{#each Object.values(lightbulbs) as bulb (bulb.instanceId)}
						<LightBulb bulb={bulb} />
					{/each}
				</div>
			{:else}
				<i class="fas fa-2x fa-check" />
				<p>Gateway detected</p>
				<div class="form-field">
					<input
						type="text"
						name="securityCode"
						bind:value={securityCode}
						placeholder="Security code"
					>
				</div>
				{isConnected}
				<button class="button" on:click={() => tradfri.authenticateAndConnect(securityCode)}>
					Connect
				</button>
			{/if}
		{:catch error}
			<i class="fas fa-2x fa-plug" />
			<p class="error">Failed to find your tradfri gateway: {error}</p>
			<button class="button" on:click={reload}>Try again</button>
		{/await}
	</div>
</div>
