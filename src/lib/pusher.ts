import PusherServer from "pusher";
import PusherClient from "pusher-js";

const CLUSTER = "ap2";

if (typeof globalThis.pusherServerInstance === "undefined") {
  globalThis.pusherServerInstance = undefined;
}

if (typeof globalThis.pusherClientInstance === "undefined") {
  globalThis.pusherClientInstance = undefined;
}

if (!global.pusherServerInstance) {
  global.pusherServerInstance = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_API_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: CLUSTER,
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  global.pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_API_KEY,
    {
      cluster: CLUSTER,
      channelAuthorization: {
        endpoint: "/api/pusher-auth",
        transport: "ajax",
      },
    }
  );
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;

export {};
