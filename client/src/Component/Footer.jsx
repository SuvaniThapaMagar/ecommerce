import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="mt-10 bg-gray-900 text-white py-10">
        <div className="flex justify-between mx-10">
          <div>
            <h2 className="text-xl font-semibold mb-3">Company</h2>
            <ul>
              <li className="mb-2 hover:underline cursor-pointer">Feedback</li>
              <li className="hover:underline cursor-pointer">About us</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Follow us on</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-orange-500 transition duration-300"
              >
                <img
                  src="https://i.pinimg.com/originals/2d/2d/c8/2d2dc8ae0ef1c7f6f033b53c1ac57a8d.png"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition duration-300"
              >
                <img
                  src="https://i.pinimg.com/originals/9d/2e/7c/9d2e7c0cd26067881f1fda4ec41834f2.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition duration-300"
              >
                <img
                  src="https://i.pinimg.com/originals/eb/53/3e/eb533e746086b0fdbac9187e4ab7d17d.png"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition duration-300"
              >
                <img
                  src="https://i.pinimg.com/originals/60/6b/0f/606b0f8c8c6a3c3f163e8a37434c80c8.png"
                  alt="YouTube"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition duration-300"
              >
                <img
                  src="https://i.pinimg.com/originals/8c/9d/cf/8c9dcf6158c33a8dd5b7d9883a0a1727.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition duration-300"
              >
                <img
                  src="https://i.pinimg.com/originals/eb/cc/d9/ebccd9182e3ea012e5cc72ef20f32be5.png"
                  alt="TikTok"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition duration-300"
              >
                <img
                  src="https://i.pinimg.com/originals/4c/37/9c/4c379c4cb5d8f1842ff23c6a6c88b946.png"
                  alt="RSS"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <p className="text-sm">
            Copyright © 2004 - 2024 Khajaghar. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
