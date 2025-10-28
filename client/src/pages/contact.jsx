import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { useSystemSettings } from "../context/SystemSettingsContext";


function Contact() {
      const systemSettings = useSystemSettings().settings;
    return (
        <>
            <div className="">
                <div className="flex py-20 ">
                    <div className="flex flex-col items-center justify-center w-[70%]">
                        <h1 className="text-3xl font-bold m-6">How we can help you?</h1>
                        <form>
                            <table className=" p-8 ">
                                <tbody className="flex flex-col gap-4">
                                    <tr><td><input type="text" className="h-8 p-4 w-[40rem] border-2 rounded-lg border-slate-300 hover:border-blue-500" id="name" name="name" placeholder="Name" required /></td></tr>
                                    <tr><td><input type="email" className="h-8 p-4  w-[40rem] border-2 rounded-lg border-slate-300 hover:border-blue-500" id="email" name="email" placeholder="Email" required /></td></tr>
                                    <tr><td><textarea id="message" rows={5} className="w-[40rem] p-4 border-2 rounded-lg border-slate-300 hover:border-blue-500 resize-none" name="message" placeholder="message" required></textarea></td></tr>
                                    <tr><td><button type="submit" className="border-2 p-2 rounded-lg border-slate-300 hover:border-blue-500">Submit</button></td></tr>
                                </tbody>
                            </table>
                        </form>

                    </div>
                    <div className="w-[30%] text-[20px] flex flex-col gap-8 pt-16 ">
                        <div><FontAwesomeIcon icon={faPhone} />{systemSettings.contact.phone}</div>
                        <div><FontAwesomeIcon icon={faEnvelope} />{systemSettings.contact.email}</div>
                        <div><FontAwesomeIcon icon={faLocationDot} />{systemSettings.contact.address}</div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-8 ">
                    <div className="bg-gray-200 p-2 rounded-lg ">

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14575.01560826322!2d72.15206614982363!3d24.03974200558194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c90179e219009%3A0x10d7993b64a55595!2sJangral%2C%20Gujarat%20384285!5e0!3m2!1sen!2sin!4v1754411094553!5m2!1sen!2sin"
                            width="900" height="450"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

            </div>
        </>
    );
}
export default Contact;