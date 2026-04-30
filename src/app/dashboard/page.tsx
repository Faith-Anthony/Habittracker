import Link from "next/link";

export default function DashboardPage() {
  return (
    <div
      data-testid="dashboard-page"
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8"
    >
      <div className="text-center max-w-md w-full">
        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Target/Growth circles */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
              <circle cx="50" cy="50" r="15" fill="#8B5CF6" />
              
              {/* Arrow pointing up - growth indicator */}
              <path d="M 50 40 L 55 25 L 50 30 L 45 25 Z" fill="#EC4899" />
              
              {/* Decorative sparkles */}
              <circle cx="70" cy="35" r="2" fill="#F472B6" opacity="0.8" />
              <circle cx="30" cy="35" r="2" fill="#A78BFA" opacity="0.8" />
              <circle cx="75" cy="50" r="1.5" fill="#F472B6" opacity="0.6" />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 leading-tight">
          Dashboard
        </h1>

        <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed">
          Welcome to HabitFlow. Your journey to mindful routines starts here.
        </p>

        <p className="text-gray-500 text-sm mb-10">
          Phase 1 Foundation • Routes Active • UI Structure Complete
        </p>

        {/* Button Group with spacing */}
        <div className="space-y-3 w-full mb-10">
          <Link href="/login">
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3.5 rounded-xl hover:from-purple-700 hover:to-purple-800 hover:shadow-lg active:scale-95 transition-all duration-200">
              Go to Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="w-full border-3 border-purple-600 text-purple-600 font-bold py-3.5 rounded-xl hover:bg-purple-50 hover:border-purple-700 active:scale-95 transition-all duration-200">
              Go to Sign Up
            </button>
          </Link>
          <Link href="/">
            <button className="w-auto px-6 mx-auto block border-2 border-gray-300 text-gray-600 font-medium py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Status Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">Phase 1 Status</h2>
          <div className="space-y-3 text-sm text-left">
            <div className="flex items-center">
              <span className="text-green-500 mr-3 font-bold">✓</span>
              <span className="text-gray-700">Routing setup</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3 font-bold">✓</span>
              <span className="text-gray-700">Component structure</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3 font-bold">✓</span>
              <span className="text-gray-700">UI/UX foundation</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3 font-bold">✓</span>
              <span className="text-gray-700">TypeScript setup</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">⊝</span>
              <span className="text-gray-500">Authentication (Phase 2)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
