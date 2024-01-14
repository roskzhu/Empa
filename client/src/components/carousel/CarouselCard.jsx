import React from 'react';

// interface MetricsProps {
//   card:{
//     _id: string;
//     organization_Name: string;
//     overnight_Service_Type: string;
//     program_Model: string;
//     service_User_Count: number;
//     capacity_Actual_Room: number; 
//   };
// }

const CarouselCard = ({ card }) => {

  return (
    <div className="h-400px mx-2 w-200px grid place-items-center font-rubik font-semibold 
                    relative bg-white/10 hover:bg-white/20 hover:backdrop-blur bg-cover bg-center 
                    pb-5 text-center justify-center max-w-screen-xl overflow-hidden
                    ">
      <div className="w-full mt-4 text-center">
        <div className="text-center justify-center">
          <p className="text-white/90 font-light text-base p-1 px-4 bg-white/10 w-full">
            {card.organization_Name}
          </p>
          <div className="flex justify-evenly">
            <p className="text-white/70 font-light text-sm mt-1">
              {card.overnight_Service_Type}
              {"   ·   "}
              {card.program_Model} 
            </p>
          </div>
        </div>
        <div className="flex justify-evenly">
          <div className="mr-3">
            <p className="bg-gradient-to-r from-pink-500 to-pink-100 text-transparent bg-clip-text text-fill-transparent
                         font-semibold text-8xl uppercase mt-3">
              {card.service_User_Count} 
            </p>
            <p className="text-white font-light text-md uppercase mt-3">
              users using this service
            </p>
          </div>
          <div className="ml-3">
            <p className="bg-gradient-to-r from-indigo-500 to-blue-400 text-transparent bg-clip-text text-fill-transparent
                         font-semibold text-8xl uppercase mt-3">
              {card.capacity_Actual_Room} 
            </p>
            <p className="text-white font-light text-md uppercase mt-3">
              capacity left
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
