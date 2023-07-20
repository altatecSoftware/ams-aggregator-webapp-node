
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand, ListQueuesCommand } from "@aws-sdk/client-sqs";
import { ISQSObjectConfig } from "./interfaces";

export class SimpleQueueService {
    private _configObject: ISQSObjectConfig
    private _queueUrl: string
    private _sqsClient: SQSClient

    constructor({ config }: any) {
        this._configObject = {
            region: config.AWS_REGION,
            credentials: {
                accessKeyId: config.AWS_SQS_ACCESS_KEY_ID,
                secretAccessKey: config.AWS_SQS_SECRET_ACCESS_KEY
            }
        }
        this._sqsClient = new SQSClient(this._configObject)
        this._queueUrl = config.AWS_SQS_CREATE_ASSET_QUEUE
    }

    public async sendMessageToQueue(message: any) {
        try {

            const command = new SendMessageCommand({
                QueueUrl: this._queueUrl,
                MessageBody: message,
                MessageAttributes: {
                    OrderId: {
                        DataType: 'String',
                        StringValue: '4421x'
                    }
                }
            })

            const response = await this._sqsClient.send(command)
            console.log("Message sent: ", response)

        } catch (error) {
            console.log("Error sending message to SQS service\n", error)
        }
    }

    public async receiveMessageFromQueue() {
        try {

            const command = new ReceiveMessageCommand({
                MaxNumberOfMessages: 10,
                QueueUrl: this._queueUrl,
                WaitTimeSeconds: 5,
                MessageAttributeNames: ["All"]
            })

            const response = await this._sqsClient.send(command)
            const messages = response.Messages

            if (messages) {
                messages.forEach(async (message) => {
                    console.log("Message received: ", message.Body)

                    const deleteCommand = new DeleteMessageCommand({
                        QueueUrl: this._queueUrl,
                        ReceiptHandle: message.ReceiptHandle
                    })

                    await this._sqsClient.send(deleteCommand)
                    console.log('Message removed from queue:', message.MessageId);
                })
            }

        } catch (error) {
            console.log("Error receiving message from SQS service\n", error)
        }
    }

    public async checkSQSConnection() {
        try {
            const command = new ListQueuesCommand({});
            const response = await this._sqsClient.send(command);
        
            if (response.QueueUrls && response.QueueUrls.length > 0) {
              console.log("Connection to Amazon SQS successful.");
              return true;
            } else {
              console.log("No queues were found on the account.");
              return false;
            }
          } catch (error) {
            console.error("Error checking connection to SQS:", error);
            return false;
          }
      }


}