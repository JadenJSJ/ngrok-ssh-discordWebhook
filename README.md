# ngrok-ssh-discordWebhook
Don't have portforwarding? But need to expose some ports like ssh?
But can't pay for ngrok pro?

Start a ngrok tunnel and send the domain and port to Discord using webhooks.

Preview:
![Image preview](https://cdn.discordapp.com/attachments/1052466594133069836/1052861495664443393/image.png)

### Plans
- [] Automatically reconnect when network goes down


## How to run
### Setting things up
1. Register for ngrok and get ngrok authtoken
   <details closed>
    <summary>Expand</summary>
    Go to https://dashboard.ngrok.com/signup
    After signing up copy the authtoken as shown highlighted

    Guide image:
    https://cdn.discordapp.com/attachments/660770162072485890/1052868815110811719/2022-12-15_15-43.png

    </details>
2. Get Discord Webhook link
   <details closed>
    <summary>Expand</summary>
    Go to a discord server you own or create one.
    On the server channel you want notifications to be sent, edit the channel, then creat a new webhook and copy the webhook url

    Guide image:
    https://cdn.discordapp.com/attachments/660770162072485890/1052871385900384326/image.png

    </details>
3. Clone the repository
`
git clone https://github.com/JadenJSJ/ngrok-ssh-discordWebhook.git
`

1. Copy the secrets file (.env)
`
cp .env.example .env
`

1. Edit the secrets file (.env)
Make sure to paste the authtoken and webhook
`
nano .env
`

1. Edit the tunnel to your liking
   The default tunnels ssh
   `
   nano ./src/index.ts
   `

2. Downloading dependencies
   `
   npm i --save
   `
## Running program
To run the program
`
npm run dev
`
