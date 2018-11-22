import twilio from 'twilio'

const accountSid = '...'; // Your Account SID from www.twilio.com/console
const authToken = '...';   // Your Auth Token from www.twilio.com/console
const client = twilio(accountSid, authToken);

export const sendSMS = (to: any, body: any) => {
  return client.messages.create({
    body,
    to,  // Text this number
    from: '+????' // From a valid Twilio number
  })
}