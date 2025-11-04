const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RoboToken", function () {
  let roboToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const RoboToken = await ethers.getContractFactory("RoboToken");
    roboToken = await RoboToken.deploy(owner.address);
    await roboToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await roboToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await roboToken.balanceOf(owner.address);
      expect(await roboToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have correct name and symbol", async function () {
      expect(await roboToken.name()).to.equal("RoboVM");
      expect(await roboToken.symbol()).to.equal("RVM");
    });

    it("Should have 18 decimals", async function () {
      expect(await roboToken.decimals()).to.equal(18);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await roboToken.transfer(addr1.address, 50);
      const addr1Balance = await roboToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await roboToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await roboToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await roboToken.balanceOf(owner.address);
      await expect(
        roboToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(roboToken, "ERC20InsufficientBalance");

      expect(await roboToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      await roboToken.mint(addr1.address, 1000);
      expect(await roboToken.balanceOf(addr1.address)).to.equal(1000);
    });

    it("Should not allow non-owner to mint", async function () {
      await expect(
        roboToken.connect(addr1).mint(addr1.address, 1000)
      ).to.be.revertedWithCustomError(roboToken, "OwnableUnauthorizedAccount");
    });
  });

  describe("Burning", function () {
    it("Should allow token holders to burn their tokens", async function () {
      await roboToken.transfer(addr1.address, 1000);
      await roboToken.connect(addr1).burn(500);
      expect(await roboToken.balanceOf(addr1.address)).to.equal(500);
    });
  });
});

