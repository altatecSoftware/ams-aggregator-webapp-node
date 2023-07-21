import container from '../../src/start/container'
const sqs = container.cradle.sqs

describe('SQSHelper', () => {
  it('should connect to SQS', async () => {
    const isConnected = await sqs.checkSQSConnection();
    expect(isConnected).toEqual(true)
  });
});
