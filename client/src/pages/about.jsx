import Img1 from "../assets/i1.jpg";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import { useSystemSettings } from "../context/SystemSettingsContext";

function AboutUs() {
  const systemSettings = useSystemSettings().settings;

  return (
    <div className="bg-gray-100">
      {/* SECTION 1: HERO IMAGE
        (Your original code - this is a strong start!)
      */}
      <div
        className="relative w-full h-[30rem] md:h-[40rem] bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            systemSettings.about || "https_via.placeholder.com_1920x640"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div className="relative flex items-center justify-center text-center h-full">
          <div className="z-10 p-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
              About Temple Tour
            </h1>
            <p className="text-xl md:text-2xl text-white mt-4 font-light">
              Your Digital Doorway to India's Sacred Heritage
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: OUR MISSION (Replaces 'Company Story')
        - Uses a responsive flex-row (stacks on mobile)
        - Contains compelling, mission-driven text
      */}
      <section className="max-w-7xl mx-auto my-16 p-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Mission: Bringing India's Heart to You
            </h2>
            <p className="text-lg text-gray-700 text-justify mb-4">
              Welcome to <strong>Temple Tour</strong>. We are a team of cultural
              enthusiasts, tech innovators, and passionate storytellers who
              believe that distance should never be a barrier to faith, history,
              or discovery.
            </p>
            <p className="text-lg text-gray-700 text-justify mb-4">
              Our mission is to bring the profound beauty, spiritual energy, and
              rich history of India's most iconic temples directly to you.
              Millions long to visit these sacred sites but are unable to travel.
              We use immersive technology to bridge that gap, offering online
              experiences that are as educational as they are inspiring.
            </p>
            <p className="text-lg text-gray-700 text-justify">
              We aren't just showing you buildings; we are sharing the stories,
              the art, and the culture that make each temple a timeless wonder.
            </p>
          </div>
          {/* Image */}
          <div className="lg:w-1/2 flex justify-center p-3">
            <img
              src={Img1}
              className="rounded-lg shadow-xl object-cover h-auto max-h-[25rem] w-full"
              alt="Indian Temple"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US? (New Attractive Section)
        - Uses a grid layout to highlight key features
      */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Journey With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Authentic Storytelling
              </h3>
              <p className="text-gray-700">
                We partner with local historians and cultural experts to ensure
                every tour is accurate, respectful, and rich with detail.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Explore From Anywhere
              </h3>
              <p className="text-gray-700">
                No travel, no crowds, no limitations. Access India's greatest
                wonders from the comfort of your home, anytime.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Immersive Experience
              </h3>
              <p className="text-gray-700">
                Our high-definition video and guided narratives make you feel
                like you're actually there, walking the sacred grounds.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Discover The Culture
              </h3>
              <p className="text-gray-700">
                Go beyond the architecture. We focus on the "why"—the rituals,
                the art, and the philosophies behind each sacred site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MEET THE TEAM
        - Uses your original flex-wrap layout
        - Populated with realistic team members
      */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Meet the Team
        </h2>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {/* Team Member 1 */}
          <div className="h-[16rem] w-full sm:w-[15rem] bg-white rounded-lg shadow-xl text-center p-4">
            <img
              src={p1}
              className="size-24 my-3 rounded-full m-auto shadow-md"
              alt="Team Member"
            />
            <h3 className="text-2xl font-semibold text-gray-900">Rohan Gupta</h3>
            <p className="text-gray-600 font-medium">Founder & CEO</p>
            <p className="p-2 text-sm text-gray-700">
              Combines a passion for heritage with a vision for digital
              accessibility.
            </p>
          </div>
          {/* Team Member 2 */}
          <div className="h-[16rem] w-full sm:w-[15rem] bg-white rounded-lg shadow-xl text-center p-4">
            <img
              src={p2}
              className="size-24 my-3 rounded-full m-auto shadow-md"
              alt="Team Member"
            />
            <h3 className="text-2xl font-semibold text-gray-900">
              Dr. Jayesh Sharma
            </h3>
            <p className="text-gray-600 font-medium">Head of Cultural Research</p>
            <p className="p-2 text-sm text-gray-700">
              Our lead historian, ensuring every tour is accurate and
              fascinating.
            </p>
          </div>
          {/* Team Member 3 */}
          <div className="h-[16rem] w-full sm:w-[15rem] bg-white rounded-lg shadow-xl text-center p-4">
            <img
              src={p3}
              className="size-24 my-3 rounded-full m-auto shadow-md"
              alt="Team Member"
            />
            <h3 className="text-2xl font-semibold text-gray-900">Arjun Desai</h3>
            <p className="text-gray-600 font-medium">Lead Developer</p>
            <p className="p-2 text-sm text-gray-700">
              The architect behind our immersive platform and seamless user
              experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;