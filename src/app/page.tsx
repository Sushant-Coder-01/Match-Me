import { auth } from "@/auth";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { MdChat } from "react-icons/md";
import { TiGroup } from "react-icons/ti";

const Home = async () => {
  const session = await auth();

  return (
    <div>
      {!session ? (
        <div className="space-y-10 m-3 md:m-10">
          {/* Welcome Section */}
          <section className="bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 text-white py-10 md:py-16 px-5 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-5">
              Welcome to <span className="text-yellow-300">MatchMe!</span>
            </h1>
            <p className="text-md md:text-xl font-medium max-w-3xl mx-auto">
              Find your perfect match and start meaningful connections today.
            </p>
          </section>

          {/* Feature Highlights */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition">
              <FcLike size={50} />
              <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
                Find Your Match
              </h2>
              <p className="text-gray-600 text-center">
                Discover like-minded individuals through our powerful algorithm.
              </p>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition">
              <MdChat size={50} className="text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
                Chat Instantly
              </h2>
              <p className="text-gray-600 text-center">
                Break the ice with our secure real-time chat.
              </p>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition">
              <TiGroup size={50} className="text-green-500" />
              <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
                Join the Community
              </h2>
              <p className="text-gray-600 text-center">
                Engage in events, forums, and activities with others.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-10 md:py-16 bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Ready to Join Us?
            </h2>
            <p className="text-lg md:text-xl mb-10">
              Sign up now and embark on a journey to find your perfect match.
            </p>
            <div className="flex justify-center gap-5">
              <a
                href="/register"
                className="px-6 py-3 bg-yellow-300 text-pink-800 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition"
              >
                Get Started
              </a>
              <a
                href="/about"
                className="px-6 py-3 border-2 border-yellow-300 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:text-pink-800 transition"
              >
                Learn More
              </a>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-10 m-3 md:m-10">
          {/* Welcome Back Section */}
          <section className="bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 text-white py-10 md:py-16 px-5 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Welcome Back,{" "}
              <span className="text-yellow-300">{session?.user?.name}!</span>
            </h1>
            <p className="text-md md:text-xl font-medium max-w-3xl mx-auto">
              Let&apos;s create meaningful connections and explore exciting
              opportunities!
            </p>
          </section>

          {/* Quick Actions Dashboard */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition">
              <FcLike size={50} />
              <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
                Matches
              </h2>
              <p className="text-gray-600 text-center">
                Discover people who align with your interests and values.
              </p>
              <Link
                href="/members"
                className="mt-4 px-4 py-2 bg-pink-500 text-white text-sm rounded-lg shadow hover:bg-pink-600 transition"
              >
                View Matches
              </Link>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition">
              <MdChat size={50} className="text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
                Messages
              </h2>
              <p className="text-gray-600 text-center">
                Stay connected and start meaningful conversations.
              </p>
              <a
                href="/messages"
                className="mt-4 px-4 py-2 bg-orange-500 text-white text-sm rounded-lg shadow hover:bg-orange-600 transition"
              >
                Open Chat
              </a>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition">
              <TiGroup size={50} className="text-green-500" />
              <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
                Your Likes
              </h2>
              <p className="text-gray-600 text-center">
                See and interact with the members you&apos;ve liked!
              </p>
              <a
                href="/lists"
                className="mt-4 px-4 py-2 bg-pink-500 text-white text-sm rounded-lg shadow hover:bg-pink-600 transition"
              >
                View Your Likes
              </a>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-10 md:py-16 bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Dive In?
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Take the next step and make meaningful connections today.
            </p>
            <Link
              href="/members"
              className="px-6 py-3 bg-yellow-300 text-pink-800 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition"
            >
              Start Exploring
            </Link>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
