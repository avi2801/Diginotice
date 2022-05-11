const { assert } = require('chai')

const Diginotice = artifacts.require("../contracts/Diginotice")

require('chai')
    .use(require('chai-as-promised'))
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

    describe('posts', async () => {
        let result, postCount
        const hash = 'abc123123123'
    
        before(async () => {
          result = await diginotice.uploadImage(hash, 'Post description', { from: author })
          postCount = await diginotice.postCount()
        })

        it('creates posts', async () => {
            // SUCESS
            assert.equal(postCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.hash, hash, 'Hash is correct')
            assert.equal(event.description, 'Post description', 'description is correct')
            assert.equal(event.author, author, 'author is correct')
      
      
            // FAILURE: Post must have hash
            await diginotice.uploadImage('', 'Post description', { from: author }).should.be.rejected;
      
            // FAILURE: Post must have description
            await diginotice.uploadImage('Post hash', '', { from: author }).should.be.rejected;
        })
        // from struct
        
        it('lists posts', async () => {
            const post = await diginotice.posts(postCount)
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(post.hash, hash, 'Hash is correct')
            assert.equal(post.description, 'Image description', 'description is correct')
            assert.equal(post.author, author, 'author is correct')
          })
    })
})