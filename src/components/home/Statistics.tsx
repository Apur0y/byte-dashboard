
import { CiBag1 } from "react-icons/ci";
import { FaUserClock, FaUserPlus, FaUserTie } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";



export default function Statistics({}) {


const data = [
  { label: 'Total Revenue', value: '1,200', delta: '+12%', image:  <CiBag1 className="size-10 text-green-600" /> },
  { label: 'Total Registered Users', value: '600', delta: '+8%', image: <FaUserPlus className="size-10 text-green-600" /> },
  { label: 'Active Job Seekers', value: '1,252', delta: '+15%', image: <FaUserClock className="size-10 text-green-600" /> },
  { label: 'Active Employers', value: '09', delta: '+3%', image:  <FaUserTie className="size-10 text-green-600"/>},
  { label: 'Jobs Posted Today', value: '12', delta: '+9%', image: <RiShoppingBag4Line className="size-10 text-green-600"/>
},
];

const stats = [
  { label: "Total Posts", value: "150", change: "+12%", positive: true },
  { label: "Active Users", value: "1,234", change: "+8%", positive: true },
  { label: "Engagement Rate", value: "68%", change: "-2%", positive: false },
  { label: "Revenue", value: "$12,450", change: "+15%", positive: true },
]

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {data.map((item, i) => (
        <div
          key={i}
          className="bg-gray-800 text-white py-6 px-4 rounded-xl shadow flex justify-between gap-3 flex-col"
        >
          <div className="flex justify-between mr-3 gap-2">
            <span className="text-xl xl:text-[42px] font-bold ">
              {item.value}
            </span>
            <div className="size-12">{item.image}</div>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-sm ">{item.label}</span>
            <span className="text-green-600 font-medium">{item.delta}</span>
          </div>
        </div>
      ))}
    </section>
  );
}


