import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const providers = [
    {
      name: "google",
      icon: <FcGoogle size={20} />,
      text: "Continue with Google",
    },
    {
      name: "github",
      icon: <FaGithub size={20} />,
      text: "Continue with GitHub",
    },
  ];

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/members",
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      {providers.map((provider) => (
        <Button
          onPress={() => onClick(provider.name as "google" | "github")}
          key={provider.name}
          size="lg"
          fullWidth
          variant="bordered"
          color="default"
          className={`flex items-center justify-center gap-4 py-3 rounded-lg shadow-md hover:bg-opacity-50 hover:bg-pink-100`}
        >
          {provider.icon}
          <span className="text-xs md:text-sm font-semibold">{provider.text}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialLogin;
