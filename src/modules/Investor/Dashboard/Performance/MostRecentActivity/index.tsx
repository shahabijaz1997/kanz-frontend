
const MostRecentActivity = ({routeActivity}: any): any => {
    const gotoActivity = () => {
        routeActivity(); 
      };
  return (
    <main className="w-1/2">
      <aside className=" border-[1px] bg-white border-neutral-200 rounded-md w-full p-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Most Recent Activity</span>
          <span onClick={gotoActivity} className="font-bold  text-[#155E75] text-xs flex justify-end cursor-pointer">
            See more Activity
          </span>
        </div>
        <div className="overflow-hidden max-h-36  px-2 mt-2">
        <div className="flex items-center justify-between w-full my-2 text-xs">
          <span className=""><span className="mx-2">Icon</span><span className="font-bold">Syndicate</span> Added you to the group</span>
          <span>8/19/23</span>
        </div>
        <div className="flex items-center justify-between w-full my-2 text-xs">
          <span className=""><span className="mx-2">Icon</span><span className="font-bold">Syndicate</span> Added you to the group</span>
          <span>8/19/23</span>
        </div>
        <div className="flex items-center justify-between w-full my-2 text-xs">
          <span className=""><span className="mx-2">Icon</span><span className="font-bold">Syndicate</span> Added you to the group</span>
          <span>8/19/23</span>
        </div>
        <div className="flex items-center justify-between w-full my-2 text-xs">
          <span className=""><span className="mx-2">Icon</span><span className="font-bold">Syndicate</span> Added you to the group</span>
          <span>8/19/23</span>
        </div>
        <div className="flex items-center justify-between w-full my-2 text-xs">
          <span className=""><span className="mx-2">Icon</span><span className="font-bold">Syndicate</span> Added you to the group</span>
          <span>8/19/23</span>
        </div>
        <div className="flex items-center justify-between w-full my-2 text-xs">
          <span className=""><span className="mx-2">Icon</span><span className="font-bold">Syndicate</span> Added you to the group</span>
          <span>8/19/23</span>
        </div>
        <div className="flex items-center justify-between w-full my-2 text-xs">
          <span className=""><span className="mx-2">Icon</span><span className="font-bold">Syndicate</span> Added you to the group</span>
          <span>8/19/23</span>
        </div>
        <div className="flex items-center justify-between w-full my-2 text-xs">
          <span className=""><span className="mx-2">Icon</span><span className="font-bold">Syndicate</span> Added you to the group</span>
          <span>8/19/23</span>
        </div>
        </div>
      </aside>
    </main>
  );
};
export default MostRecentActivity;
