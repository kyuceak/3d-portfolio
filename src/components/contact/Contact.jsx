import "./contact.css";

import { motion } from "motion/react";

const Contact = () => {

    
  return (
    <div className="contact">
      <motion.h1
        initial={{ y: 150, opacity: 0 }} // Start 50px below with 0 opacity
        whileInView={{ y: 0, opacity: 1 }} // Animate to its natural position with full opacity
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: false, amount: 1 }} 
        
      >
        Feel free to reach out,
        <br />
        kutay1747@hotmail.com
      </motion.h1>
    </div>
  );
};

export default Contact;

