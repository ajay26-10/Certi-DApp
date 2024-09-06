const {loadFixture}=require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { ethers } = require('hardhat');
const { expect} =require("chai")
describe('Pass Test',function(){
    async function deployCertFixture(){
        const [admin,other]=await ethers.getSigners()

        const Cert=await ethers.getContractFactory('Cert');
        const cert=await Cert.deploy()

        return {admin,other,cert};
    }
    it('Should set the right admin value',async function(){

        const {cert,admin}=await loadFixture(deployCertFixture);

        expect(cert.deploymentTransaction().from).to.equal(admin.address);
    });
    it("Testing issue",async function(){
        const {cert}=await loadFixture(deployCertFixture);
        await expect(cert.issue(101,'Sujin','EDP','S','01-09-2024'))
        .to.emit(cert,'Issued')
        .withArgs('EDP',101,'S')
    })
    
    it('Read value',async function(){
        const {cert}=await loadFixture(deployCertFixture);
        await cert.issue(101,'Sujin','EDP','S','01-09-2024')
        const certificates=await cert.Certificates(101)

        // console.log(certificates);

        expect(certificates[0]).equal('Sujin')
        expect(certificates[1]).equal('EDP')
        expect(certificates[2]).equal('S')
        expect(certificates[3]).equal('01-09-2024')
    })


});

describe('Fail Test',function(){
    async function deployCertFixture(){
        const [admin,other]=await ethers.getSigners()

        const Cert=await ethers.getContractFactory('Cert');
        const cert=await Cert.deploy()

        return {admin,other,cert};
    }

    it('Test for another account',async function(){
        const {cert,other}=await loadFixture(deployCertFixture)
        await expect(cert.connect(other).issue(101,'Sujin','EDP','S','01-09-2024'))
        .to.be.revertedWith('Access Denied')
    })

})