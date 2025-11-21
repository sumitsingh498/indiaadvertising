import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-white via-yellow-50/40 to-white">
      <div className="px-4 mx-auto max-w-7xl">

        {/* Heading */}
        <motion.h2
          className="mb-12 text-4xl font-extrabold tracking-wide text-center sm:text-6xl text-navy-900"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Profile
        </motion.h2>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-6 bg-white/90 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-yellow-300/40 backdrop-blur-md transition"
          >
            <h3 className="mb-5 text-2xl font-semibold text-navy-800">Company Details</h3>
            <div className="space-y-2 text-base text-navy-700">
              <p><strong>Established:</strong> 2018 (7+ Years)</p>
              <p><strong>MD:</strong> Mr. Naseem Ahmad</p>
              <p><strong>Turnover:</strong> 20+ Cr.</p>
              <p><strong>Staff:</strong> 20+</p>
              <p><strong>GST:</strong> 09BEDPA0157E1Z3</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-6 bg-white/90 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-yellow-300/40 backdrop-blur-md transition"
          >
            <h3 className="mb-5 text-2xl font-semibold text-navy-800">Services</h3>
            <ul className="space-y-2 text-base text-navy-700">
              <li>• Outdoor Branding</li>
              <li>• Indoor Branding</li>
              <li>• Facade (Front Elevations)</li>
              <li>• Interior Design Concepts</li>
            </ul>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-6 bg-white/90 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-yellow-300/40 backdrop-blur-md transition"
          >
            <h3 className="mb-5 text-2xl font-semibold text-navy-800">Contact</h3>
            <div className="space-y-2 text-base text-navy-700">
              <p><strong>Address:</strong>Plot No. H-27, First Floor, Sector-9 Gautam Buddha Nagar, Noida, UP-201301</p>
              <p><strong>Phone:</strong> 9899572539 , 0120-4486192</p>
              <p><strong>Email:</strong> info@indiaadvertising.in</p>
              <p><strong>Website:</strong> www.indiadvertising.com</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission Box */}
        <motion.div
          className="p-8 mt-16 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] 
                     bg-gradient-to-r from-yellow-100/60 via-white to-yellow-50/80 
                     border border-yellow-200 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-6 text-3xl font-bold text-center text-navy-900">
            Our Mission
          </h3>
          <p className="text-lg italic leading-relaxed text-center text-navy-700">
            We have one mission: To simplify and amplify your brand's story through
            creative media solutions. We outline your product or service, ensuring it's
            easy to find and remember—from full designs to signage implementation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
