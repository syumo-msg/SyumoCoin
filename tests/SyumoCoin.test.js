const SyumoCoin = artifacts.require("SyumoCoin");

contract("SyumoCoin", (accounts) => {
  let syumoCoinInstance;

  beforeEach(async () => {
    syumoCoinInstance = await SyumoCoin.new(100000); // Replace 100000 with the initial supply you want to use for testing
  });

  it("should have the correct initial supply", async () => {
    const totalSupply = await syumoCoinInstance.totalSupply();
    assert.equal(totalSupply, 100000 * 10**18, "Incorrect initial supply");
  });

  it("should transfer tokens correctly", async () => {
    const sender = accounts[0];
    const receiver = accounts[1];
    const amount = 1000;

    await syumoCoinInstance.transfer(receiver, amount, { from: sender });

    const senderBalance = await syumoCoinInstance.balanceOf(sender);
    const receiverBalance = await syumoCoinInstance.balanceOf(receiver);

    assert.equal(senderBalance.toNumber(), 100000 * 10**18 - amount, "Incorrect sender balance");
    assert.equal(receiverBalance.toNumber(), amount, "Incorrect receiver balance");
  });

  it("should not transfer tokens if trading is not enabled", async () => {
    const sender = accounts[0];
    const receiver = accounts[1];
    const amount = 1000;

    try {
      await syumoCoinInstance.transfer(receiver, amount, { from: sender });
      assert.fail("Transfer should not be allowed before trading is enabled.");
    } catch (error) {
      assert(error.message.includes("Trading is not yet enabled."), "Expected error message not received.");
    }

    const senderBalance = await syumoCoinInstance.balanceOf(sender);
    const receiverBalance = await syumoCoinInstance.balanceOf(receiver);

    assert.equal(senderBalance.toNumber(), 100000 * 10**18, "Sender balance should not change");
    assert.equal(receiverBalance.toNumber(), 0, "Receiver balance should remain 0");
  });
});
