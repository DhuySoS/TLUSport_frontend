import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import HoverCartIcon from "../cart/HoverCartIcon";
import LoginModal from "../auth/LoginModal";

const Header = () => {
  const [language, setLanguage] = useState("VN");
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scroll xuống → ẩn
        setShowTopBar(false);
      } else {
        // scroll lên → hiện
        setShowTopBar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={`
    bg-[#737373] px-12 mx-auto
    transition-transform duration-300
    ${showTopBar ? "translate-y-0" : "-translate-y-full"}
  `}
      >
        <div className="flex items-center justify-between text-white font-medium h-8 ">
          <p className="">Liên hệ: 0123456789</p>
          <ul className="h-full flex items-center">
            <li className="h-full relative">
              <Link
                to=""
                className="hover:bg-neutral-600 flex items-center px-2 h-full"
              >
                Cửa hàng
              </Link>
              <span className="absolute right-0 w-px h-4.5 bg-neutral-300 my-2 top-0"></span>
            </li>
            <li className="h-full relative">
              <Link
                to=""
                className="hover:bg-neutral-600 flex items-center px-2 h-full"
              >
                CSKH
              </Link>
              <span className="absolute right-0 w-px h-4.5 bg-neutral-300 my-2 top-0"></span>
            </li>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className="flex gap-1 px-2.5 items-center bg-transparent text-white border-none shadow-none hover:bg-transparent focus:ring-0 data-[state=open]:bg-transparent cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 64 64"
                    >
                      {language === "VN" ? (
                        <>
                          <circle cx="32" cy="32" r="30" fill="#f42f4c" />
                          <path
                            fill="#ffe62e"
                            d="m32 39l9.9 7l-3.7-11.4l9.8-7.4H35.8L32 16l-3.7 11.2H16l9.8 7.4L22.1 46z"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            fill="#ed4c5c"
                            d="M56 14H32v6h27.5c-.9-2.1-2.1-4.2-3.5-6"
                          />
                          <path
                            fill="#f9f9f9"
                            d="M61.4 38q.6-2.85.6-6H2q0 3.15.6 6z"
                          />
                          <path
                            fill="#ed4c5c"
                            d="M32 2v6h18c-5-3.8-11.2-6-18-6"
                          />
                          <path
                            fill="#f9f9f9"
                            d="M32 14h24q-2.55-3.45-6-6H32zm27.5 6H32v6h29.4c-.4-2.1-1.1-4.1-1.9-6"
                          />
                          <path
                            fill="#ed4c5c"
                            d="M32 26v6h30q0-3.15-.6-6zM4.5 44h55c.8-1.9 1.5-3.9 1.9-6H2.6c.4 2.1 1.1 4.1 1.9 6"
                          />
                          <path
                            fill="#f9f9f9"
                            d="M8 50h48c1.4-1.8 2.6-3.9 3.5-6h-55c.9 2.1 2.1 4.2 3.5 6"
                          />
                          <path
                            fill="#ed4c5c"
                            d="M8 50q2.55 3.45 6 6h36q3.45-2.55 6-6z"
                          />
                          <path
                            fill="#f9f9f9"
                            d="M14 56c5 3.8 11.2 6 18 6s13-2.2 18-6z"
                          />
                          <path
                            fill="#2a5f9e"
                            d="M32 2C15.4 2 2 15.4 2 32h30z"
                          />
                          <path
                            fill="#fff"
                            d="m20 22.2l5.6 3.8l-2.1-6.1l5.5-3.8h-6.9L20 10l-2.1 6.1H11l5.5 3.8l-2.1 6.1z"
                          />
                        </>
                      )}
                    </svg>
                    {language}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setLanguage("VN")}>
                    Việt Nam
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("EN")}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ul>
        </div>
      </div>
      <div
        className={`
     bg-white px-12 mx-auto transition-transform duration-300
    ${showTopBar ? "translate-y-0" : "-translate-y-8"} `}
      >
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="h-full">
            <img
              src="/logo/TLUSportLogo.svg"
              alt="logo"
              className="h-full w-auto cursor-pointer"
            />
          </Link>

          <nav className="h-full flex items-center">
            <ul className="flex gap-12 text-xl font-bold rounded-md uppercase h-full items-center">
              {["Trang chủ", "Nam", "Nữ", "Danh mục", "Yêu thích"].map(
                (item, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      className="relative inline-block py-4 px-2
                     after:absolute after:bottom-0 after:left-0 
                     after:h-1 after:w-full 
                     after:bg-neutral-900
                     after:scale-x-0 
                     after:origin-right 
                     after:transition-transform after:duration-300
                     hover:after:scale-x-100 hover:after:origin-left
                     focus:after:scale-x-100 focus:after:origin-left"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="h-full flex items-center gap-6">
            <div className="rounded-full border border-neutral-300 relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="h-12 px-6 bg-transparent border-none focus:ring-0 
                focus:outline-none placeholder:text-md placeholder:font-semibold "
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 h-full  rounded-r-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                  />
                </svg>
              </button>
            </div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => {
                setIsOpenLogin(true);
                setShowTopBar(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.84em"
                height="1em"
                viewBox="0 0 1280 1536"
              >
                <path
                  fill="currentColor"
                  d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5m-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384"
                />
              </svg>
            </div>
            {/* Mở modal đăng nhập */}
            {isOpenLogin && (
              <LoginModal
                isOpen={isOpenLogin}
                onClose={() => setIsOpenLogin(false)}
              />
            )}
            {/* carticon */}
            <Link to="/cart">
              <div
                className="text-2xl cursor-pointer relative "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14.665 2.33a.75.75 0 0 1 1.006.335l2.201 4.402c1.353.104 2.202.37 2.75 1.047c.436.539.576 1.209.525 2.136H2.853c-.051-.927.09-1.597.525-2.136c.548-.678 1.397-.943 2.75-1.047l2.201-4.402a.75.75 0 0 1 1.342.67l-1.835 3.67Q8.559 7 9.422 7h5.156q.863-.001 1.586.005l-1.835-3.67a.75.75 0 0 1 .336-1.006"
                  />
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3.555 14.257a74 74 0 0 1-.51-2.507h17.91a74 74 0 0 1-.51 2.507l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076zM10 13.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </div>
                {location.pathname !== "/cart" || location.pathname !== "/checkout" && <HoverCartIcon isHovered={isHovered} />}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
