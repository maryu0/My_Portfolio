import { motion } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { useState, FormEvent } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSending(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen py-24 px-6 relative mb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="font-mono text-sm text-neon-orange tracking-widest">
              GET IN TOUCH
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-neon-orange to-transparent" />
          </div>
          <h2 className="font-display text-7xl text-album-paper">CONTACT</h2>
          <p className="text-album-beige/70 font-mono mt-4 max-w-2xl">
            Let's collaborate on your next project. Drop me a message and I'll
            get back to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form - Album Liner Notes Style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-vinyl-light border border-vinyl-accent rounded-lg p-8 relative overflow-hidden">
              {/* Vinyl texture overlay */}
              <div className="absolute inset-0 noise-texture opacity-30 pointer-events-none" />

              {/* Decorative vinyl grooves */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-5">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-orange"
                    style={{
                      width: `${(i + 1) * 16}px`,
                      height: `${(i + 1) * 16}px`,
                    }}
                  />
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h3 className="font-display text-3xl text-album-paper mb-6">
                  LINER NOTES
                </h3>

                {/* Name Field */}
                <div className="relative">
                  <label className="block font-mono text-xs text-neon-cyan tracking-wider mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-vinyl-accent border-2 border-vinyl-accent focus:border-neon-orange text-album-paper px-4 py-3 rounded transition-colors outline-none font-mono"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block font-mono text-xs text-neon-cyan tracking-wider mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-vinyl-accent border-2 border-vinyl-accent focus:border-neon-orange text-album-paper px-4 py-3 rounded transition-colors outline-none font-mono"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className="block font-mono text-xs text-neon-cyan tracking-wider mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full bg-vinyl-accent border-2 border-vinyl-accent focus:border-neon-orange text-album-paper px-4 py-3 rounded transition-colors outline-none font-mono resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-neon-orange hover:bg-neon-pink text-vinyl-dark font-mono tracking-wider py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: isSending ? 1 : 1.02 }}
                  whileTap={{ scale: isSending ? 1 : 0.98 }}
                >
                  {isSending ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-vinyl-dark border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      SENDING...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      SEND MESSAGE
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info - Recording Studio Style */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Info Cards */}
            {[
              {
                icon: Mail,
                label: "Email",
                value: "maryu.3738@gmail.com",
                color: "neon-cyan",
                href: "mailto:maryu.3738@gmail.com",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "github.com/maryu0",
                color: "neon-pink",
                href: "https://github.com/maryu0",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "ayush-kumar",
                color: "neon-orange",
                href: "https://linkedin.com/in/ayush-kumar-ab8a3a2ab",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Bhubaneswar, Odisha, India",
                color: "neon-yellow",
                href: "#",
              },
            ].map(({ icon: Icon, label, value, color, href }, index) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-vinyl-light border border-vinyl-accent hover:border-neon-orange transition-all duration-300 rounded-lg p-6 group cursor-pointer block"
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-${color}/20 border-2 border-${color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`text-${color}`} size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-album-beige/60 tracking-wider mb-1">
                      {label}
                    </div>
                    <div className="text-album-paper font-mono">{value}</div>
                  </div>
                </div>
              </motion.a>
            ))}{" "}
            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-neon-orange/10 to-neon-pink/10 border border-neon-orange rounded-lg p-6 mt-8"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-4 h-4 rounded-full bg-neon-orange mt-1"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 107, 53, 0.7)",
                      "0 0 0 10px rgba(255, 107, 53, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div>
                  <h4 className="font-mono text-lg text-album-paper mb-2">
                    Currently Available
                  </h4>
                  <p className="text-album-beige/70 text-sm">
                    I'm open to freelance projects and full-time opportunities.
                    Let's create something amazing together!
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Album Cover Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative mt-8 p-8 bg-vinyl-light border-2 border-album-beige/20 rounded-lg"
            >
              <div className="absolute top-4 left-4 text-6xl text-neon-orange/20 font-display">
                "
              </div>
              <p className="text-album-paper text-lg italic relative z-10 mt-4">
                Great things in business are never done by one person. They're
                done by a team of people.
              </p>
              <p className="text-neon-cyan font-mono text-sm mt-4 text-right">
                - Steve Jobs
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
