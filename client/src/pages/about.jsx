import gallary2 from "../assets/card2.webp";
import { useSystemSettings } from "../context/SystemSettingsContext";

function AboutUs() {
        const systemSettings = useSystemSettings().settings;

  return (
    <div className="bg-gray-100"> 
    {/* hero imgae */}
    <div className="relative w-full h-[40rem] bg-cover bg-center" style={{ backgroundImage: `url(${systemSettings.about})` }}>
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <section className="flex items-top justify-center text-center "  >
                    <div className=" z-10 p-6 my-16 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg ">
                            About US
                        </h1>
                    </div>
                </section>
            </div>
    {/* copany story  */}
    <section className="">
      <div className="flex flex-row items-center justify-between">

      <div className="w-[55%] rounded-lg m-5 bg-white">
        <h1 className="text-4xl  mb-18">Company Story</h1>
        <p className="text-lg text-justify m-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident debitis cupiditate, veritatis quibusdam aliquid commodi ratione ea, aut similique alias voluptate quas voluptates animi harum neque distinctio! Voluptatum, alias consequuntur!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore explicabo saepe accusamus vitae ullam iure recusandae deleniti iusto facere? Fugit maiores vitae quam, accusantium nam laudantium! Voluptas eveniet sequi iure.
          </p>
      </div>
      <div className=" m-6 p-3">
        <img src={gallary2}  className="p-1 rounded-lg h-[15rem]" alt="" />
      </div>
      </div>
    </section>

    {/* our team */}
    <section className="">
      <div className=" text-4xl px-5 ">Our Team</div>
      <div className="flex items-center justify-left gap-4  px-5 py-6 flex-wrap">
         <div className="h-[15rem] w-[13rem]  bg-white rounded-lg">
          <img src={gallary2} className="size-24 my-3 rounded-full m-auto" alt="" />
          <h1 className="text-2xl text-center">John Doe</h1>
          <p className="p-3 text-center ">john doe expericnced travel writer</p>
         </div>
         <div className="h-[15rem] w-[13rem] bg-white rounded-lg">
          <img src={gallary2} className="size-24 my-3 rounded-full m-auto" alt="" />
          <h1 className="text-2xl text-center">John Doe</h1>
          <p className="p-3 text-center ">john doe expericnced travel writer</p>
         </div>
         <div className="h-[15rem] w-[13rem] bg-white rounded-lg">
          <img src={gallary2} className="size-24 my-3 rounded-full m-auto" alt="" />
          <h1 className="text-2xl text-center">John Doe</h1>
          <p className="p-3 text-center ">john doe expericnced travel writer</p>
         </div>
      </div>
    </section>
  </div>
  );
}
export default AboutUs;