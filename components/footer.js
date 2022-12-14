export default function Footer(){
  return (
    <footer className="text-[#BBBBBB] text-center">
      <div className="container flex items-center flex-col">
        <div className="flex flex-row">
          <p className="flex flex-row text-sm text-[#BBBBBB] sm:py-2 sm:mt-0 mt-2">
            © 2022 백두산호랑팀 - all rights reserved
          </p>
          <span className="flex flex-row text-sm text-[#BBBBBB] ml-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-2">
            <a className="text-[#BBBBBB]">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}