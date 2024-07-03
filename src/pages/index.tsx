import { type NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  return null;
}

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin?callbackUrl=%2Fdashboard",
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/dashboard",
    },
  };
};
