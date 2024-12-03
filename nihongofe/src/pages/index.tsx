import { type NextPage } from "next";
import Link from "next/link";
import { GlobeSvg } from "~/components/Svgs";
import React from "react";
import { LanguageHeader } from "~/components/LanguageHeader";
import { useLoginScreen, LoginScreen } from "~/components/LoginScreen";
import { LanguageCarousel } from "~/components/LanguageCarousel";

const Home: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-white text-black"
    >
      <LanguageHeader />
      <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-16 md:flex-row md:gap-36">
        <GlobeSvg className="h-fit w-7/12 md:w-[360px]" />
        <div>
          <p className="mb-6 max-w-[600px] text-center text-3xl font-bold md:mb-12 text-gray-900">
            Cách học Tiếng Nhật miễn phí, thú vị và hiệu quả!
          </p>
          <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
            <Link
              href="/register"
              className="w-full rounded-2xl border-b-4 border-[#46A402] bg-[#58CC02] px-10 py-3 text-center font-bold uppercase transition hover:border-[#46A402] hover:bg-[#46A402] md:min-w-[320px]"
            >
              Bắt đầu
            </Link>
            <button
              className="w-full rounded-2xl border-2 border-gray-400 bg-white text-blue-500 px-8 py-3 font-bold uppercase transition hover:bg-gray-100 md:min-w-[320px]"
              onClick={() => setLoginScreenState("LOGIN")}
            >
              Tôi đã có tài khoản
            </button>
          </div>
        </div>
      </div>
      <LanguageCarousel />
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </main>
  );
};

export default Home;
