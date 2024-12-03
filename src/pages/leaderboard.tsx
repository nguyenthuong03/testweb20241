import type { NextPage } from "next";
import React, { useEffect } from "react";
import { LeftBar } from "~/components/LeftBar";
import { BottomBar } from "~/components/BottomBar";
import { useBoundStore } from "~/hooks/useBoundStore";
import Link from "next/link";
import {
  BoySvg,
  BronzeLeagueSvg,
  FirstPlaceSvg,
  LeaderboardExplanationSvg,
  LockedLeagueSvg,
  SecondPlaceSvg,
  ThirdPlaceSvg,
} from "~/components/Svgs";
import { useRouter } from "next/router";
import { useLeaderboardUsers } from "~/hooks/useLeaderboard";
import Image from "next/image";

const defaultPicture = "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/2439bac00452e99ba7bf6a7ed0b04196.svg";

const LeaderboardProfile = ({
  place,
  name,
  exp,
}: {
  place: number;
  name: string;
  exp: number;
}) => {
  return (
    <div
      className="flex items-center gap-5 rounded-2xl px-5 py-2 hover:bg-gray-100 md:mx-0"
    >
      <div className="flex items-center gap-4">
        {place === 1 ? (
          <FirstPlaceSvg />
        ) : place === 2 ? (
          <SecondPlaceSvg />
        ) : place === 3 ? (
          <ThirdPlaceSvg />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center font-bold text-green-700">
            {place}
          </div>
        )}
        <Image
          width={48}
          height={48}
          className="h-12 w-12 rounded-full"
          src={defaultPicture}
          alt=""
        />
      </div>
      <div className="grow overflow-hidden overflow-ellipsis font-bold">
        {name}
      </div>
      <div className="shrink-0 text-gray-500">{`${exp} EXP`}</div>
    </div>
  );
};

const Leaderboard: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  const leaderboardLeague = "Bảng xếp hạng";

  const leaderboardUsers = useLeaderboardUsers();

  return (
    <div>
      <LeftBar selectedTab="Bảng xếp hạng" />
      <div className="flex justify-center gap-3 pt-14 md:ml-24 md:p-6 md:pt-10 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-5 pb-28 md:px-5">
          <div className="sticky top-0 -mt-14 flex w-full flex-col items-center gap-5 bg-white pt-14">
            <div className="flex items-center gap-5">
              <BronzeLeagueSvg className="h-fit w-20" />
              <LockedLeagueSvg />
              <LockedLeagueSvg />
              <LockedLeagueSvg />
              <LockedLeagueSvg />
            </div>
            <h1 className="text-2xl font-bold">{leaderboardLeague}</h1>
            <div className="w-full border-b-2 border-gray-200"></div>
          </div>
          <div className="w-full">
            {leaderboardUsers.map((user, i) => {
              return (
                <LeaderboardProfile
                  key={user.name}
                  place={i + 1}
                  name={user.name}
                  exp={user.exp}
                />
              );
            })}
          </div>
        </div>
      </div>
      <BottomBar selectedTab="Bảng xếp hạng" />
    </div>
  );
};

export default Leaderboard;
