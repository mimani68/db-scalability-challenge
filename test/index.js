var sinon = require("sinon");

let srv = require('../dist/service/merchant.service')
let redisLocalClient = require('../dist/utils/redis/index')

describe('Service', function() {

  const sandbox = sinon.createSandbox();

  this.beforeAll(function () {
    console.log(`Execute before all`)
  })

  afterEach(function () {
    console.log(`Reset env after test`)
    sandbox.restore();
  });

  it('test', function(done) {
    done()
  });

  it('Find player and show merchant list', function(done) {
    sinon.stub(redisLocalClient, 'client').returns(10)
    let userId = 1
    let start  = new Date(2021, 1, 2)
    let end    = new Date(2021, 5, 1)
    let result = srv.findMerchantsListInPeriod(userId, start, end)
    assert.equals(+result.rank, 1)
    assert.equals(typeof result.mechants, 'object')
    redisLocalClient.client.restore();
    done()
  });

});