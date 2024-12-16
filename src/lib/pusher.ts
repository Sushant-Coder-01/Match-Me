import PusherServer from "pusher";
import PusherClient from "pusher-js";

const CLUSTER = "ap2";

declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

export {};

  if (!globalThis.pusherServerInstance) {
    globalThis.pusherServerInstance = new PusherServer({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_API_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: CLUSTER,
      useTLS: true,
    });
  }

  if (!globalThis.pusherClientInstance) {
    globalThis.pusherClientInstance = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_API_KEY!,
      {
        cluster: CLUSTER,
        channelAuthorization: {
          endpoint: "/api/pusher-auth",
          transport: "ajax",
        },
      }
    );
  }

export const pusherServer = globalThis.pusherServerInstance;
export const pusherClient = globalThis.pusherClientInstance;
