const { assert } = require('chai')

const Diginotice = artifacts.require("../contracts/Diginotice")

require('chai')
    .use(reqiure('chai-as-promised'))
    .should()

contract('Diginotice', ([deployer, author, tipper]) => {
    let diginotice

    before(async () => {
        diginotice = await Diginotice.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const address = await diginotice.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await diginotice.name()
            assert.equal(name, 'Diginotice')
        })
    })
})