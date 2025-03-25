import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import profilelogo from "../../logo/man.png";
const AuthorCard = ({ closemodalprofile }) => {
  const [user, setUser] = useState({
    fullname:"",
    eamil:""
  });

      useEffect(() => {
        const userData = localStorage.getItem("user");
    
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
    
          console.log("ParsedUseData:", parsedUser);
        } else {
          console.log("No user data found in localStorage.");
        }
      }, []);
  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-[1000]">
    //   <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
    //     <div className="flex justify-between  items-center    ">
    //       <h2 className="text-xl font-bold  text-gray-800">Profile</h2>
    //       <button>
    //         <RxCross1 onClick={closemodalprofile} size={20} className="" />
    //       </button>
    //     </div>

       
    //       {/* Author card */}
    //       <div className="relative  items-center w-full max-w-2xl my-3  flex flex-col  space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">
    //         {/* Author Image */}
    //         <div className="w-full flex items-center justify-center ">
    //         <div className="w-full flex justify-center sm:justify-start sm:w-auto">
    //           <img
    //             className="object-cover w-20 h-20 mt-3 mr-3 rounded-full"
    //             src={profilelogo}
               
    //           />
    //         </div>

    //         {/* Author Details */}
    //         <div className="w-full mt-4 sm:w-auto flex flex-col items-center sm:items-start">
    //           <p className="font-display  text-xl  text-gray-400">
    //             Name :  {user.fullname || "User"}
    //           </p>

    //           <p className="font-display mb-2 text-xl  text-gray-400">
    //             Email ID : {user.email || "User"}
    //           </p>
    //         </div>
    //       </div>

    //       <p>
    //         "A passionate and driven individual who believes in continuous learning and innovation. Always eager to take on new challenges, grow professionally, and contribute meaningfully to any project or team."
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
  <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
    {/* Header Section */}
    <div className="flex justify-between items-center border-b pb-4">
      <h2 className="text-2xl font-bold  text-[#884dee]">Profile</h2>
      <button onClick={closemodalprofile} className="text-gray-600 hover:text-gray-900">
        <RxCross1 size={22} />
      </button>
    </div>

    {/* Profile Content */}
    <div className="flex flex-col items-center text-center mt-6">
      {/* Profile Image */}
      <img
        className="object-cover w-24 h-24 rounded-full border-2 border-gray-300 shadow-md"
        src={profilelogo}
        alt="Profile"
      />

      {/* User Info */}
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-700">Name: {user.fullname || "User"}</p>
        <p className="text-lg text-gray-600">Email: {user.email || "user@example.com"}</p>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-500 italic text-center px-6">
        "A passionate and driven individual who believes in continuous learning and innovation. Always eager to take on new challenges, grow professionally, and contribute meaningfully to any project or team."
      </p>
    </div>
  </div>
</div>

  );
};

export default AuthorCard;
