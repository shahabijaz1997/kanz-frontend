const PageNotFound = () => {
  return (
    <main>
      <div className="bg-[#155E75] h-screen w-full">
        <div className="flex justify-center flex-col items-center h-screen min-w-full">
          <p className="font-extrabold flex items-center justify-center text-8xl text-white animate-bounce">
            404{" "}
          </p>
          <p className=" flex items-center justify-center text-xl text-white">
            Page not found
          </p>
        </div>
      
      </div>
    </main>
  );
};
export default PageNotFound;
