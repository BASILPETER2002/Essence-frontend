import PageWrapper from '../animations/PageWrapper';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <PageWrapper>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif text-earth mb-6"
        >
          Contact Essence
        </motion.h1>

        <p className="text-earth/70 mb-10">
          Reach out to us for orders, wholesale enquiries, or collaborations.
        </p>

        <div className="space-y-6">
          <div>
            <p className="font-medium text-earth">📍 Location</p>
            <p className="text-earth/70">Wayanad, Kerala, India</p>
          </div>

          <div>
            <p className="font-medium text-earth">📞 Phone / WhatsApp</p>
            <p className="text-earth/70">+91 XXXXXXXXXX</p>
          </div>

          <div>
            <p className="font-medium text-earth">📧 Email</p>
            <p className="text-earth/70">essence@email.com</p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
