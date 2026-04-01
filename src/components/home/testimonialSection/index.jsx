import RenderStars from '@/components/common/RenderStars';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react'

const TestimotionSection = () => {
  return (
    <div className="text-center space-y-6 px-15">
      <h2 className="text-4xl font-bold text-neutral-800 ">
        Chia Sẻ Từ Khách Hàng
      </h2>
      <p className="text-xl">
        Sự tin tưởng của cộng đồng yêu thể thao là động lực lớn nhất của chúng
        tôi.
      </p>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-6 mt-12   h-60">
        <div className="rounded-2xl bg-white p-8">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale "
              />
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-neutral-800">
                Nguyễn Văn A
              </h3>
              <RenderStars rating={4} />
            </div>
          </div>
          <p className="mt-4 text-neutral-800 text-left text-lg line-clamp-4">
            "Chất lượng giày chạy bộ ở TLUSport thực sự khác biệt. Tôi cảm nhận
            được sự hỗ trợ tuyệt vời trong mỗi bước chạy."
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale "
              />
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-neutral-800">
                Nguyễn Văn A
              </h3>
              <RenderStars rating={4} />
            </div>
          </div>
          <p className="mt-4 text-neutral-800 text-left text-lg line-clamp-4">
            "Chất lượng giày chạy bộ ở TLUSport thực sự khác biệt. Tôi cảm nhận
            được sự hỗ trợ tuyệt vời trong mỗi bước chạy."
            "Chất lượng giày chạy bộ ở TLUSport thực sự khác biệt. Tôi cảm nhận
            được sự hỗ trợ tuyệt vời trong mỗi bước chạy."
            "Chất lượng giày chạy bộ ở TLUSport thực sự khác biệt. Tôi cảm nhận
            được sự hỗ trợ tuyệt vời trong mỗi bước chạy."
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale "
              />
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-neutral-800">
                Nguyễn Văn A
              </h3>
              <RenderStars rating={4} />
            </div>
          </div>
          <p className="mt-4 text-neutral-800 text-left text-lg line-clamp-4">
            "Chất lượng giày chạy bộ ở TLUSport thực sự khác biệt. Tôi cảm nhận
            được sự hỗ trợ tuyệt vời trong mỗi bước chạy."
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestimotionSection