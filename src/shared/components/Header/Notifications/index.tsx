import React, { useEffect, useRef } from "react";

const Notifcations = ({ open, setOpen  }: any) => {
  const refInd: any = useRef();
  const notificationMockData = [
    {
      name: "Alice",
      message: "You have a new friend request",
      timeAgo: "2 hours ago",
    },
    {
      name: "Bob",
      message: "Your post has been liked",
      timeAgo: "4 hours ago",
    },
    {
      name: "Charlie",
      message: "New message received",
      timeAgo: "6 hours ago",
    },
    {
      name: "David",
      message: "Event reminder: Meeting at 3 PM",
      timeAgo: "8 hours ago",
    },
    {
      name: "Eva",
      message: "You've been mentioned in a comment",
      timeAgo: "10 hours ago",
    },
    {
      name: "Frank",
      message: "New job opportunity matched your preferences",
      timeAgo: "12 hours ago",
    },
    {
      name: "Grace",
      message: "Congratulations! You reached a milestone",
      timeAgo: "14 hours ago",
    },
    {
      name: "Harry",
      message: "Weather alert: Rain expected tomorrow",
      timeAgo: "16 hours ago",
    },
    {
      name: "Ivy",
      message: "Your package has been delivered",
      timeAgo: "18 hours ago",
    },
    {
      name: "Jack",
      message: "Upcoming event: Birthday party on Saturday",
      timeAgo: "20 hours ago",
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refInd.current && !refInd.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refInd, open]);

  return (
    open && (
      <section ref={refInd}
        className={`absolute right-24 top-14 z-[1] flex align-middle w-[400px] h-[400px] bg-white border-[1px] border-neutral-200 rounded-md  flex-col overflow-auto custom-scroll  max-h-[400px] shadow-lg`}
      >
        <span className="w-full flex items-center justify-between py-2 px-3 border-b-[1px]">
          <span className="font-bold">Notifications</span>
          <span className="text-[#155E75] font-medium">Mark all as read</span>
        </span>
        {notificationMockData.map((noti) => (
          <div
            className="w-full border-t-[1px] border-b-[1px] hover:bg-slate-100 border-neutral-100"
            key={noti.name}
          >
            <div className="w-full flex items-center gap-2  p-2">
              <span>
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
              </span>
              <span className="flex-col flex">
                <span className=" text-sm w-full flex gap-1">
                  <span className="font-medium">{noti.name}</span>
                  <span>{noti.message}</span>
                </span>
                <span className="text-xs text-[#828B91]">{noti.timeAgo}</span>
              </span>
            </div>
          </div>
        ))}
      </section>
    )
  );
};

export default Notifcations;
