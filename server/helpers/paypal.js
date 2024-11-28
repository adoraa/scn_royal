const paypal = require("@paypal/checkout-server-sdk");

// Set up PayPal environment with sandbox credentials
const environment = new paypal.core.SandboxEnvironment(
  PAYPAL_CLIENTID,
  PAYPAL_SECRET
);

// Create a PayPal HTTP client with the environment
const client = new paypal.core.PayPalHttpClient(environment);

// Optional: Configure logging (you may need to adapt this based on the SDK’s capabilities)
client.addLogger({
  level: "info",
  transports: [new paypal.transports.ConsoleTransport()],
});

module.exports = client;
