const MONGOOSE = require('mongoose');

const systemSettingSchema = new MONGOOSE.Schema(
  {
    logo: { type: String, required: true },  
    hero: { type: String, required: true },  
    about: { type: String, required: true }, 
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    }
  }
);

module.exports = MONGOOSE.model("SystemSetting", systemSettingSchema, "SystemSetting");