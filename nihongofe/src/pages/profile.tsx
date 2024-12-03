import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import {
  BronzeLeagueSvg,
  EditPencilSvg,
  EmptyFireSvg,
  FireSvg,
  LightningProgressSvg,
  EmptyMedalSvg,
  ProfileFriendsSvg,
  ProfileTimeJoinedSvg,
  SettingsGearSvg,
} from "~/components/Svgs";
import Link from "next/link";
import { Flag } from "~/components/Flag";
import { useRouter } from "next/router";

// Define the type for the user data
interface UserData {
  name: string;
  userXP: number;
  phone: string;
  email: string;
}

const Profile: NextPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const userID=getIdUserByToken();
  useEffect(() => {
    fetch(`http://localhost:8080/api/user/info/${userID}`)
      .then(response => response.json())
      .then((data: UserData) => setUserData(data))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileTopBar />
      <LeftBar selectedTab="Hồ sơ" />
      <div className="flex justify-center gap-3 pt-14 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection userData={userData} />
          <ProfileStatsSection userXP={userData.userXP} />
        </div>
      </div>
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="Hồ sơ" />
    </div>
  );
};

export default Profile;

const ProfileTopBar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <div className="invisible" aria-hidden={true}>
        <SettingsGearSvg />
      </div>
      <span className="text-gray-400">Hồ sơ</span>
      <Link href="/settings/account">
        <SettingsGearSvg />
        <span className="sr-only">Cài đặt</span>
      </Link>
    </div>
  );
};
import { getIdUserByToken, getToken } from "~/utils/JWTService";
const ProfileTopSection = ({ userData }: { userData: UserData }) => {
  const router = useRouter();
  const loggedIn = getToken; // Replace with your logic for checking if user is logged in

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  const { name, phone, email } = userData;
  const username = "testuser"; // Replace with your actual username
  const joinedAt = "December 2024"; // Replace with your actual joined date

  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl">
        {username.charAt(0).toUpperCase()}
      </div>
      <div className="flex grow flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="text-sm text-gray-400">{username}</div>
            <div className="text-sm text-gray-400">{phone}</div>
            <div className="text-sm text-gray-400">{email}</div>
          </div>
          <div className="flex items-center gap-3">
            <ProfileTimeJoinedSvg />
            <span className="text-gray-500">{`Tham gia vào ${joinedAt}`}</span>
          </div>
        </div>
      </div>
      <Link
        href="/settings/account"
        className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
      >
        <EditPencilSvg />
        Chỉnh sửa hồ sơ
      </Link>
    </section>
  );
};

const ProfileStatsSection = ({ userXP }: { userXP: number }) => {
  const streak = 0; // Replace with your logic for fetching the user's streak
  const league = "Bronze";
  const top3Finishes = 0;

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">Thống kê</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          {streak === 0 ? <EmptyFireSvg /> : <FireSvg />}
          <div className="flex flex-col">
            <span
              className={[
                "text-xl font-bold",
                streak === 0 ? "text-gray-400" : ""
              ].join(" ")}
            >
              {streak}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Chuỗi ngày
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <LightningProgressSvg size={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{userXP}</span>
            <span className="text-sm text-gray-400 md:text-base">Tổng XP</span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <BronzeLeagueSvg width={25} height={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{league}</span>
            <span className="text-sm text-gray-400 md:text-base">
              Hạng đấu hiện tại
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          {top3Finishes === 0 ? <EmptyMedalSvg /> : <EmptyMedalSvg />}
          <div className="flex flex-col">
            <span
              className={[
                "text-xl font-bold",
                top3Finishes === 0 ? "text-gray-400" : ""
              ].join(" ")}
            >
              {top3Finishes}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Hoàn thành Top 3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
