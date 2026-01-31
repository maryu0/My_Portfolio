import { motion } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { useState, FormEvent } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Spam protection
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Reset status
    setStatus({ type: null, message: "" });

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSending(true);

    try {
      // Use different API URL based on environment
      const apiUrl = import.meta.env.DEV
        ? "http://localhost:3001/api/contact"
        : "/api/contact";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "", honeypot: "" });
        setErrors({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative mb-12 sm:mb-16 md:mb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="font-mono text-xs sm:text-sm text-neon-orange tracking-widest">
              GET IN TOUCH
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-neon-orange to-transparent" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-album-paper">
            CONTACT
          </h2>
          <p className="text-album-beige/70 font-mono mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base">
            Let's collaborate on your next project. Drop me a message and I'll
            get back to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Form - Album Liner Notes Style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-vinyl-light border border-vinyl-accent rounded-lg p-4 sm:p-6 md:p-8 relative overflow-hidden">
              {/* Vinyl texture overlay */}
              <div className="absolute inset-0 noise-texture opacity-30 pointer-events-none" />

              {/* Decorative vinyl grooves */}
              <div className="hidden sm:block absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 opacity-5">
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

              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6 relative z-10"
              >
                <h3 className="font-display text-2xl sm:text-3xl text-album-paper mb-4 sm:mb-6">
                  LINER NOTES
                </h3>

                {/* Status Messages */}
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 sm:p-4 rounded-lg border-2 ${
                      status.type === "success"
                        ? "bg-neon-cyan/10 border-neon-cyan text-neon-cyan"
                        : "bg-neon-pink/10 border-neon-pink text-neon-pink"
                    } font-mono text-xs sm:text-sm`}
                  >
                    {status.message}
                  </motion.div>
                )}

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) =>
                    setFormData({ ...formData, honeypot: e.target.value })
                  }
                  style={{ position: "absolute", left: "-9999px" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name Field */}
                <div className="relative">
                  <label
                    className="block font-mono text-xs text-neon-cyan tracking-wider mb-2"
                    htmlFor="contact-name"
                  >
                    YOUR NAME
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    className={`w-full bg-vinyl-accent border-2 ${
                      errors.name
                        ? "border-neon-pink"
                        : "border-vinyl-accent focus:border-neon-orange"
                    } text-album-paper px-3 sm:px-4 py-2 sm:py-3 rounded transition-colors outline-none font-mono text-sm sm:text-base`}
                    required
                    disabled={isSending}
                  />
                  {errors.name && (
                    <p className="text-neon-pink text-xs font-mono mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label
                    className="block font-mono text-xs text-neon-cyan tracking-wider mb-2"
                    htmlFor="contact-email"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={`w-full bg-vinyl-accent border-2 ${
                      errors.email
                        ? "border-neon-pink"
                        : "border-vinyl-accent focus:border-neon-orange"
                    } text-album-paper px-3 sm:px-4 py-2 sm:py-3 rounded transition-colors outline-none font-mono text-sm sm:text-base`}
                    required
                    disabled={isSending}
                  />
                  {errors.email && (
                    <p className="text-neon-pink text-xs font-mono mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    className="block font-mono text-xs text-neon-cyan tracking-wider mb-2"
                    htmlFor="contact-message"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    rows={5}
                    className={`w-full bg-vinyl-accent border-2 ${
                      errors.message
                        ? "border-neon-pink"
                        : "border-vinyl-accent focus:border-neon-orange"
                    } text-album-paper px-3 sm:px-4 py-2 sm:py-3 rounded transition-colors outline-none font-mono resize-none text-sm sm:text-base`}
                    required
                    disabled={isSending}
                  />
                  {errors.message && (
                    <p className="text-neon-pink text-xs font-mono mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-neon-orange hover:bg-neon-pink text-vinyl-dark font-mono tracking-wider py-3 sm:py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base touch-manipulation"
                  whileHover={{ scale: isSending ? 1 : 1.02 }}
                  whileTap={{ scale: isSending ? 1 : 0.98 }}
                >
                  {isSending ? (
                    <>
                      <motion.div
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-vinyl-dark border-t-transparent rounded-full"
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
                      <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
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
            className="space-y-4 sm:space-y-6"
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
                className="bg-vinyl-light border border-vinyl-accent hover:border-neon-orange transition-all duration-300 rounded-lg p-4 sm:p-6 group cursor-pointer block"
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-${color}/20 border-2 border-${color} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
                  >
                    <Icon className={`text-${color}`} size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-xs text-album-beige/60 tracking-wider mb-1">
                      {label}
                    </div>
                    <div className="text-album-paper font-mono text-sm sm:text-base truncate">
                      {value}
                    </div>
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
              className="bg-gradient-to-br from-neon-orange/10 to-neon-pink/10 border border-neon-orange rounded-lg p-4 sm:p-6 mt-6 sm:mt-8"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <motion.div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-neon-orange mt-1 flex-shrink-0"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 107, 53, 0.7)",
                      "0 0 0 10px rgba(255, 107, 53, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div>
                  <h4 className="font-mono text-base sm:text-lg text-album-paper mb-2">
                    Currently Available
                  </h4>
                  <p className="text-album-beige/70 text-xs sm:text-sm">
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
              className="relative mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 bg-vinyl-light border-2 border-album-beige/20 rounded-lg"
            >
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 text-4xl sm:text-6xl text-neon-orange/20 font-display">
                "
              </div>
              <p className="text-album-paper text-sm sm:text-base md:text-lg italic relative z-10 mt-4 sm:mt-6">
                Great things in business are never done by one person. They're
                done by a team of people.
              </p>
              <p className="text-neon-cyan font-mono text-xs sm:text-sm mt-3 sm:mt-4 text-right">
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
