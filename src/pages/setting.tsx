import type { NextPage } from "next";
import React from "react";

import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";

const Shop: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />

      <div className="flex flex-1">
        <LeftBar selectedTab="Cửa hàng" />

        <div className="flex flex-1 items-center justify-center">
          {/* Empty space to center content if needed */}
        </div>

        <RightBar />
      </div>

      <BottomBar selectedTab="Cửa hàng" />
    </div>
  );
};
export const getServerSideProps = async () => {
  return {
    props: {}, // Không truyền props nào
  };
};
export default Shop;
