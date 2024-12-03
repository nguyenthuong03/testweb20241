import { useState, useEffect } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";

export const useLeaderboardUsers = () => {
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const xpThisWeek = useBoundStore((x) => x.xpThisWeek());
  const name = useBoundStore((x) => x.name);

  const userInfo = {
    name,
    exp: xpThisWeek,
    isCurrentUser: true,
  } as const;

  useEffect(() => {
    const fetchLeaderboardUsers = async () => {
      try {
        const response = await fetch("https://nihongo1-latest.onrender.com/api/user/experience-by-level?level=N5");
        const data = await response.json();
        setLeaderboardUsers(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard users:", error);
      }
    };

    fetchLeaderboardUsers();
  }, []);

  return [...leaderboardUsers, userInfo].sort((a, b) => b.exp - a.exp);
};

export const useLeaderboardRank = () => {
  const leaderboardUsers = useLeaderboardUsers();
  const index = leaderboardUsers.findIndex((user) => user.isCurrentUser);
  return index === -1 ? null : index + 1;
};
