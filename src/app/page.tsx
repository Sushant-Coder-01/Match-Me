import { auth } from "@/auth";
import { FcLike } from "react-icons/fc";
import { MdChat } from "react-icons/md";
import { TiGroup } from "react-icons/ti";

const Home = async () => {
  const session = await auth();

  return (
    <div>
      {!session ? (
        <div className="space-y-10 m-3 md:m-10">
          <section className="text-center bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 text-white px-1 md:px-0 py-10 md:py-16 rounded-lg shadow-lg">
            <h1 className="text-3xl md:text-6xl font-bold mb-5">
              Welcome to <span className="text-yellow-300">MatchMe!</span>
            </h1>
            <p className="text-md font-semibold md:text-2xl max-w-3xl mx-auto">
              Find your perfect match with ease. Join a community of amazing
              people looking for meaningful connections.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg transform hover:scale-105 transition">
              <FcLike size={40} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Find Your Match
              </h2>
              <p className="text-gray-600 text-center">
                Our algorithm connects you with people who share your interests
                and goals.
              </p>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg transform hover:scale-105 transition">
              <MdChat size={40} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Real-Time Chat
              </h2>
              <p className="text-gray-600 text-center">
                Break the ice and connect instantly with our secure, real-time
                chat feature.
              </p>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg transform hover:scale-105 transition">
              <TiGroup size={40} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Join the Community
              </h2>
              <p className="text-gray-600 text-center">
                Explore events, forums, and activities to engage with
                like-minded individuals.
              </p>
            </div>
          </section>

          <section className="text-center py-10 md:py-20 bg-gray-100 rounded-lg">
            <h2 className="text-2xl md:text-5xl font-bold text-gray-800 mb-5">
              Ready to Find Your Match?
            </h2>
            <p className="text-lg md:text-2xl text-gray-600 mb-10">
              Sign up now and start your journey to meaningful connections.
            </p>
            <div className="flex justify-center gap-5">
              <a
                href="/register"
                className="px-6 py-3 bg-pink-500 text-white text-lg rounded-lg shadow-lg hover:bg-pink-600 transition"
              >
                Get Started
              </a>
              <a
                href="/about"
                className="px-6 py-3 border-2 border-pink-500 text-pink-500 text-lg rounded-lg shadow-lg hover:bg-pink-500 hover:text-white transition"
              >
                Learn More
              </a>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <section className="text-center mt-20 p-6 sm:p-10 md:p-20 mx-4 md:mx-24 bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 text-white rounded-lg">
            <h2 className="text-3xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
              Welcome Back,{" "}
              <span className="text-yellow-300">{session?.user?.name}!</span>
            </h2>
            <p className="text-md sm:text-md md:text-xl font-medium mb-6 sm:mb-8">
              Ready to explore new matches or connect with your favorites? Let's
              get started!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <a
                href="/members"
                className="w-2/3 sm:w-auto px-4 py-3 border-2 bg-pink-500 text-white text-sm font-semibold sm:text-lg rounded-lg shadow-lg hover:bg-pink-600 transition"
              >
                Explore Matches
              </a>
              <a
                href="/messages"
                className="w-2/3 sm:w-auto px-4 py-3 border-2 text-sm font-semibold sm:text-lg rounded-lg shadow-lg hover:bg-pink-500 hover:text-white transition"
              >
                View Messages
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
