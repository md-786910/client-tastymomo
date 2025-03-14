import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" bg-black shadow-md" style={{
      position: "relative"
    }}>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center ">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center">
            <span className="text-md font-bold">34234242442</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <h1 className="border-2 border-orange-500 rounded-full px-4 py-1 text-md font-bold text-white">
              Cart <span className="font-bold text-orange-300">(5)</span>
            </h1>
          </Link>
          <button className="text-gray-400 hover:text-white transition-colors" onClick={() => {
            window.location.href = "/";
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;