module.export = {
    networks: {
        // Define your network configurations here (e.g., development, ropsten, mainnet, etc.)
    },
    compilers: {
        solc: {
            version: "0.8.0", // Use the desired Solidity compiler version
            docker: true,   // Use a version obtained through docker
            parser: "solcjs",  // Leverage solc-js purely for speedy parsing

        },
    },
};