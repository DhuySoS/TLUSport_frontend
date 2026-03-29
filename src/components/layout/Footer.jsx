import React from "react";
import fbIcon from "../../assets/images/footer/icon-facebook.svg";
import insIcon from "../../assets/images/footer/icon-instagram.svg";
import ytIcon from "../../assets/images/footer/icon-youtube.svg";
import zaloIcon from "../../assets/images/footer/icon-zalo.svg";
import tiktokIcon from "../../assets/images/footer/icon-tiktok.svg";
const Footer = () => {
  return (
    <footer className="bg-black text-white px-12 mx-auto py-8">
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-150 space-y-4">
          <h2 className="text-2xl font-semibold">TLUSport lắng nghe bạn!</h2>
          <p className="text-sm font-medium">
            Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp
            từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt
            hơn nữa.
          </p>
          <div className="px-6 py-2 rounded-full bg-white text-black w-fit font-medium flex items-center gap-2 cursor-pointer">
            Đóng góp ý kiến
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64c0 247.4 200.6 448 448 448c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368c-70.4-33.3-127.4-90.3-160.7-160.7l49.3-40.3c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
              />
            </svg>
            <div className="font-bold">
              <p>Hotline</p>
              <p>1900 9999</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 16 14"
            >
              <path
                fill="currentColor"
                d="M14.5 13h-13C.67 13 0 12.33 0 11.5v-9C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v9c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-9c0-.28-.22-.5-.5-.5z"
              />
              <path
                fill="currentColor"
                d="M8 8.96c-.7 0-1.34-.28-1.82-.79L.93 2.59c-.19-.2-.18-.52.02-.71s.52-.18.71.02l5.25 5.58c.57.61 1.61.61 2.18 0l5.25-5.57c.19-.2.51-.21.71-.02s.21.51.02.71L9.82 8.18c-.48.51-1.12.79-1.82.79Z"
              />
            </svg>
            <div className="font-bold">
              <p>Email</p>
              <p>support@tlusport.com</p>
            </div>
          </div>
        </div>
        <div className=" flex items-center gap-4">
          <img src={fbIcon} alt="Facebook" width={40} height={40} />
          <img src={insIcon} alt="Instagram" width={40} height={40} />
          <img src={ytIcon} alt="YouTube" width={40} height={40} />
          <img src={zaloIcon} alt="Zalo" width={40} height={40} />
          <img src={tiktokIcon} alt="TikTok" width={40} height={40} />
        </div>
      </div>
      <hr className="my-6 border-gray-500" />
      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-12">
          <div>
            <h3 className="font-bold text-lg mb-2">Thành viên</h3>
            <ul className="text-sm space-y-1">
              <li>Đăng ký thành viên</li>
              <li>Ưu đãi và độc quyền</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Tài liệu & tuyển dụng</h3>
            <ul className="text-sm space-y-1">
              <li>Tuyển dụng</li>
              <li>Đăng ký bản quyền</li>
            </ul>
          </div>
        </div>
        <div className="space-y-12">
          <div>
            <h3 className="font-bold text-lg mb-2">Chính sách & điều khoản</h3>
            <ul className="text-sm space-y-1">
              <li>Chính sách đổi trả tại cửa hàng</li>
              <li>Chính sách đổi trả 60 ngày online</li>
              <li>Chính sách khuyến mãi</li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách giao hàng</li>
            </ul>
          </div>
        </div>
        <div className="space-y-12">
          <div>
            <h3 className="font-bold text-lg mb-2">Chăm sóc khách hàng</h3>
            <ul className="text-sm space-y-1">
              <li>Trải nghiệm mua sắm 100% hài lòng</li>
              <li>Hỏi đáp - FAQs</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Kiến thức mặc đẹp</h3>
            <ul className="text-sm space-y-1">
              <li>Hướng dẫn chọn size</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className="space-y-12">
          <div>
            <h3 className="font-bold text-lg mb-2">Về TLUSport</h3>
            <ul className="text-sm space-y-1">
              <li>Quy tắc ứng xử của TLUSport</li>
              <li>DVKH xuất sắc</li>
              <li>Nhà máy</li>
              <li>Care & Share</li>
              <li>Cam kết bền vững</li>
              <li>Tầm nhìn 2030</li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-500" />
      <div className="text-center text-sm">
        <p>
          © 2026 TLUSport. Bản quyền thuộc về Công ty TNHH TLUSport Việt Nam.
          Mọi quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
