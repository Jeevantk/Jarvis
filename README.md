# Jarvis

## What is Jarvis?
Jarvis is a facial/emotion recognizer application powered using Microsoft Cognitive APIs and JSFeat

## What technologies did you use?
* A NodeJS server handles queries
* Client-side logic is handled using AngularJS, a bit of JQuery and Vanilla Javascript

## How to run Jarvis?
`cd` into the current directory (`server`)

Install Node (version 4+, preferably using NVM)

Install npm dependencies using `npm install`

Note that a copy of Microsoft's Cognitive API is attached with the repository as it is modified for our use-cases

Once the dependencies are installed, you are ready to run Jarvis

Open a new shell and run the server using

```
% node bin/www
```
To run it as a daemon, you can use the `restart-server` script which uses `forever` to do the job

The default port is `3000`, so navigate to `localhost:3000` and have fun hacking Jarvis :)

Emotion recognizer is also available. Naviagate to `localhost:3000/emotion.html` to test EmoJarvis

## Is there an Online demo for Jarvis?

Yes! It can be found here: http://bit.ly/2zQO2TP. Note that it works on Firefox (not Chrome as Chrome doesn't allow WebRTC from non-secure domains).
