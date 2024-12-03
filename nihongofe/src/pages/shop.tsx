import type { NextPage } from "next";
import type { ComponentProps } from "react";
import React from "react";

import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";
import { StreakFreezeSvg, EmptyGemSvg,DoubleOrNothingSvg,DuoPlushieSvg } from "~/components/Svgs";

const Shop: NextPage = () => {
  const streakFreezes = 0;

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab="Cửa hàng" />
      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="px-4 pb-20">
          <div className="py-7">
            <h2 className="mb-5 text-2xl font-bold">Vật phẩm</h2>
            <div className="flex border-t-2 border-gray-300 py-5">
              <StreakFreezeSvg className="shrink-0" />
              <section className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">Streak Freeze</h3>
                <p className="text-sm text-gray-500">
                Streak Freeze cho phép chuỗi của bạn được giữ nguyên trong một lần
                cả ngày không hoạt động.
                </p>
                <div className="w-fit rounded-full bg-gray-200 px-3 py-1 text-sm font-bold uppercase text-gray-400">
                  {streakFreezes} / 2 có sẵn
                </div>
                <button
                  className="flex w-fit items-center gap-1 rounded-2xl border-2 border-gray-300 bg-white px-4 py-2 text-sm font-bold uppercase text-gray-300"
                  disabled
                >
                  MUA: <EmptyGemSvg /> 10
                </button>
              </section>
            </div>
            <div className="flex border-t-2 border-gray-300 py-5">
              <DoubleOrNothingSvg className="shrink-0" />
              <section className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">Double or Nothing</h3>
                <p className="text-sm text-gray-500">
                Hãy nỗ lực gấp đôi số tiền cược năm lingot của bạn bằng cách duy trì chuỗi thắng trong bảy ngày liên tiếp.
                </p>
                <button
                  className="flex w-fit items-center gap-1 rounded-2xl border-2 border-gray-300 bg-white px-4 py-2 text-sm font-bold uppercase text-gray-300"
                  disabled
                >
                  MUA: <EmptyGemSvg /> 5
                </button>
              </section>
            </div>
          </div>
          
        </div>
        <RightBar />
      </div>
      <BottomBar selectedTab="Cửa hàng" />
    </div>
  );
};

export default Shop;
