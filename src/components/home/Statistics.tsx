import { motion } from "framer-motion";
import { CiBag1 } from "react-icons/ci";
import { FaUserClock, FaUserTie } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";
import { RiShoppingBag4Line } from "react-icons/ri";

export default function Statistics({}) {
  const data = [
    {
      label: "Total Revenue",
      value: "1,200",
      delta: "+12% ",
      image: <CiBag1 className="size-6 text-green-600" />,
    },
    {
      label: "Total Registered Users",
      value: "600",
      delta: "+8% of total",
      image: <IoStatsChartOutline className="size-6 text-green-600" />,
    },
    {
      label: "Active Users",
      value: "1,252",
      delta: "+15% of total",
      image: <FaUserClock className="size-6 text-green-600" />,
    },
    {
      label: "Engagement Rate",
      value: "68%",
      delta: "+3% of total",
      image: <FaUserTie className="size-6 text-green-600" />,
    },
    {
      label: "Total Posts",
      value: "12",
      delta: "+9% of total",
      image: <RiShoppingBag4Line className="size-6 text-green-600" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      }}
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-neutral-800 text-gray-300 py-6 px-4 rounded-xl shadow flex justify-between gap-3 flex-col"
          >
            <div className="flex items-center mr-3 gap-2">
              <div className="size-6">{item.image}</div>
              <span className="text-sm ">{item.label}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-xl xl:text-2xl font-bold ">
                {item.value}
              </span>
            </div>
            <span className=" text-green-700 font-medium">{item.delta}</span>
          </div>
        ))}
      </section>
    </motion.div>
  );
}
