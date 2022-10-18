import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import GBLUSection from "../components/GBLUSection";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Gowdie</title>
        <meta name="description" content="gary gowdie, gary, gowdie" />
        <link rel="icon" href="/gowdie.png" />
      </Head>
      <Header />
      <GBLUSection />
    </>
  );
};

export default Home;
