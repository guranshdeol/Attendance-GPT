import React from 'react';

const Team = () => {
  return (
    <div className="pb-40 max-w-7xl px-2 mx-8 lg:mx-24 md:px-0">
      <div className="my-4">
        <h1 className="text-3xl font-bold">People who made it successful</h1>
        <p className="mt-2 text-gray-500">
        Each team member brings unique skills and passion, contributing to our collective achievements.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
        <div className="flex flex-col items-center text-start">
          <div
            className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
            style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            <img
              src="src\assets\mishika.jpg"
              alt=""
              className="z-0 h-full w-full rounded-[10px] object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-xl font-semibold text-white">Mishika Maluja</h1>
              <h6 className="text-base text-white">Backend Developer</h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-start">
          <div
            className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
            style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            <img
              src="src\assets\vidit.jpg"
              alt=""
              className="z-0 h-full w-full rounded-[10px] object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-xl font-semibold text-white">Vidit Garg</h1>
              <h6 className="text-base text-white">Frontend Developer</h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-start">
          <div
            className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
            style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            <img
              src="src\assets\guransh.jpg"
              alt=""
              className="z-0 h-full w-full rounded-[10px] object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-xl font-semibold text-white">Guransh Deol</h1>
              <h6 className="text-base text-white">Python Developer</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
