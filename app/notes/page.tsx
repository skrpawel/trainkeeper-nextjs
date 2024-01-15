"use client";
import { useGlobalContext } from "@/app/context/store";
import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import dayjs, { Dayjs } from "dayjs";
import { activityIcon, effortIcon } from "@/components/activity-icon";

interface CustomSession extends Session {
  user: {
    id: number;
    email: string;
  };
}

export default function Page() {
  const { savedEvents, setSavedEvents } = useGlobalContext();
  const { data: session } = useSession();

  const getWorkouts = async (userId: number) => {
    try {
      const res = await axios.get(`/api/workout/get?id=${userId}`);
      setSavedEvents(res.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    if (session) {
      const customSession = session as CustomSession;
      getWorkouts(customSession?.user?.id);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500z">
      {savedEvents.map((item, idx) =>
        item.note || item.postNote ? (
          <div className="p-4 bg-white  w-1/2">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <h2 className="text-xl">
                  {item.title ? item.title : "Untitled workout"}{" "}
                </h2>
                {effortIcon(parseInt(item.effort))}
                {activityIcon(item.type)}
                {item.distance ? `${item.distance}km` : item.duration}
              </div>
              <span className="text-xs">
                {dayjs(item.date).format("DD/MM/YYYY")}{" "}
              </span>
            </div>
            <span className="text-xs">Description:</span>
            <p>{item.note}</p>
            <span className="text-xs">Post workout note:</span>
            <p>{item.postNote}</p>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
}
