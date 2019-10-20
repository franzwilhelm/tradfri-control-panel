class Tradfri {
	constructor(client = null, gatewayAddress = localStorage.getItem('gatewayAddress')) {
		this.connector = require('node-tradfri-client');
		this.client = client;
		this.gatewayAddress = gatewayAddress;
		this.isConnected = false;
		this.gateway = null;
		this.listeners = {
			deviceUpdated: () => {
				console.log('Device updated, device');
			},
			onConnect: () => {
				console.log('Device updated, device');
			},
		}
	}

	onDeviceUpdated(callback) {
		this.listeners.deviceUpdated = callback;
	}

	onConnect(callback) {
		this.listeners.onConnect = callback;
	}

	async discoverGateway() {
		this.gateway = await this.connector.discoverGateway();
	}

	// initialize discovers the gateway, and automatically connects if credentials are stored
	async initializeClient() {
		await this.discoverGateway();
		const newGatewayAddress = this.gateway.addresses[0];
		this.client = new this.connector.TradfriClient(newGatewayAddress);
		
		if (this.gatewayAddress === newGatewayAddress) {
			await this.connectWithLocalstorage();
		} else {
			this.gatewayAddress = newGatewayAddress;
			localStorage.setItem('gatewayAddress', this.gatewayAddress);
		}
	}

	async connectWithLocalstorage() {
		const identity = localStorage.getItem('tradfriIdentity');
		const psk = localStorage.getItem('tradfriPSK');
		await this.connect(identity, psk);
	}

	async authenticateAndConnect(securityCode) {
		const { identity, psk } = await this.client.authenticate(securityCode);
		localStorage.setItem('tradfriIdentity', identity);
		localStorage.setItem('tradfriPSK', psk);
		await this.connect(identity, psk);
	}

	async connect(identity, psk) {
		if (!this.isConnected) {
			await this.client.connect(identity, psk);
			this.listeners.onConnect();
			this.client
				.on('device updated', this.listeners.deviceUpdated)
				.observeDevices();
			this.isConnected = true;
		}
	}

	disconnect() {
		this.client.destroy();
		this.isConnected = false;
	}
}

export default Tradfri;
