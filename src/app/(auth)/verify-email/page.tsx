import { verifyEmail } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import { MdOutlineMailOutline } from "react-icons/md";

type Props = {
  searchParams: Promise<{ token: string }>;
};

const VerifyEmailPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams;
  const result = await verifyEmail(token);
  return (
    <div>
      <CardWrapper
        headerText="Verify Your Email Address"
        headerIcon={MdOutlineMailOutline}
        footer={<ResultMessage result={result} />}
      />
    </div>
  );
};

export default VerifyEmailPage;
