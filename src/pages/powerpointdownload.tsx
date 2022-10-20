import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import PPTXDownloadSection from "../components/PPTXDownloadSection";

const Download: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Gowdie - Download to Excel</title>
        <meta name="description" content="gary gowdie, gary, gowdie" />
        <link rel="icon" href="/gowdie.png" />
      </Head>
      <Header />
      <PPTXDownloadSection />
    </>
  );
};

export default Download;
