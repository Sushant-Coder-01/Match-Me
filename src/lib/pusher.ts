import PusherServer from "pusher";
import PusherClient from "pusher-js";

const CLUSTER = "ap2";

let pusherServerInstance: PusherServer | undefined;
if (typeof window === "undefined") {
  if (!globalThis.pusherServerInstance) {
    globalThis.pusherServerInstance = new PusherServer({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_API_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: CLUSTER,
      useTLS: true,
    });
  }
  pusherServerInstance = globalThis.pusherServerInstance;
}

let pusherClientInstance: PusherClient | undefined;
if (typeof window !== "undefined") {
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
  pusherClientInstance = globalThis.pusherClientInstance;
}

export const pusherServer = pusherServerInstance;
export const pusherClient = pusherClientInstance;
