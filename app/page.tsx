import Landing from "@/components/ui/LandingBanners";

import serverUrl from "@/utils/server";

import LandingContent from "@/components/ui/LandingContent";

const HomePage: React.FC = async () => {
  const res = await fetch(`${serverUrl}/merch`, {
    next: { revalidate: 60 },
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    },
  });

  const merch = await res.json();

  return (
    <>
      <Landing />
      <LandingContent merch={merch} />
    </>
  );
};

export default HomePage;
