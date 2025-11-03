import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSystemSettings } from "../context/SystemSettingsContext";

function Contact() {
  const systemSettings = useSystemSettings().settings;

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 py-10">
      {/* Top section: form + contact info */}
      <div className="flex flex-col lg:flex-row w-full gap-10 py-10">
        
        {/* Form Section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            How can we help you?
          </h1>

          <form className="w-full max-w-2xl">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
                className="p-3 w-full border-2 rounded-lg border-slate-300 hover:border-blue-500"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className="p-3 w-full border-2 rounded-lg border-slate-300 hover:border-blue-500"
              />
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Message"
                required
                className="p-3 w-full border-2 rounded-lg border-slate-300 hover:border-blue-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="border-2 p-2 rounded-lg border-slate-300 hover:border-blue-500 w-fit self-center px-6"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col gap-6 text-lg w-full lg:w-1/3 justify-center items-start px-2 md:px-8">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faPhone} className="text-blue-600" />
            <span>{systemSettings.contact.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
            <span>{systemSettings.contact.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faLocationDot} className="text-blue-600" />
            <span>{systemSettings.contact.address}</span>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3 bg-gray-200 p-2 rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58386.683126442265!2d72.0811260855728!3d23.84817822230307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c87925f115695%3A0x6f1db1097c4ff9ce!2sPatan%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1762014453636!5m2!1sen!2sin"
            className="w-full h-64 md:h-80 lg:h-96 rounded-lg"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
