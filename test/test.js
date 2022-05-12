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
//test 1
        it('test 1', async () => {
            const name = await diginotice.name()
            assert.equal(name, 'Diginotice')
        })
    })
    describe('posts', async () => {
        let result, postCount
        const message = 'abc123123123'
        const year='2022'
        const teacher ='ashutosh'

        before(async () => {
          result = await diginotice.addPost(message, year, teacher, {from:author})
          postCount = await diginotice.postCount()
        })

        // it('creates posts', async () => {
        //     // SUCESS
        //     assert.equal(postCount.toNumber(), 2)
        //     const event = result.logs[0].args
        //     assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is not matching')
        //     assert.equal(event.message, message, 'Message is not maching')
        //     assert.equal(event.teacher, teacher)
        //     assert.equal(event.year, year)
        //     assert.equal(event.author, author, 'Author is not matching')


        //     // FAILURE: Post must have hash
        //     await diginotice.addPost('', 'Post description', { from: author }).should.be.rejected;

        //     // FAILURE: Post must have description
        //     await diginotice.addPost('Post hash', '', { from: author }).should.be.rejected;
        // })

        before(async () => {
            result = await diginotice.addPost('abc123123123', "2020", "Indian hostel", {from:author})
            postCount = await diginotice.postCount()
          })

        it('creates the second post', async () => {
            assert.equal(postCount.toNumber(), 2)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is not matching')
            assert.equal(event.message, 'abc123123123', 'Message is not maching')
            assert.equal(event.teacher, "Indian hostel")
            assert.equal(event.year, "2020")
            assert.equal(event.author, author, 'Author is not matching')
        })
        // from struct

        it('lists posts', async () => {
            const post = await diginotice.posts(1)
            assert.equal(post.id.toNumber(), 1, 'id is correct')
            assert.equal(post.message, message, 'Message is correct')
            assert.equal(post.teacher, 'ashutosh')
            assert.equal(post.year, '2022')
            assert.equal(post.author, author)
          })
    })
})
