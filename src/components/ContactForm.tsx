import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      setStatusMsg("Please fill out all required fields.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: name,
          email: email,
          subject: subject || "New Portfolio Contact",
          message: message
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setStatusMsg("Message sent successfully! I will get back to you shortly.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setStatusMsg(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setStatusMsg("Failed to send message. Please check your network connection.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Contact Info Sidebar (2 cols) */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-accent-blue/5 rounded-full blur-[60px]" />
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-display">Get in touch</h3>
              <p className="text-xs leading-relaxed text-slate-400 font-light mb-8">
                Have an exciting project idea, a position open in your team, or just want to chat about AI and front-end engineering? Drop me a message and I'll get back to you within 24 hours.
              </p>

              <div className="space-y-5">
                <a
                  href="mailto:arina11mit@gmail.com"
                  className="flex items-center gap-4 group cursor-pointer text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <div className="p-3 bg-white/5 border border-white/5 rounded-2xl group-hover:bg-accent-purple/10 group-hover:text-accent-purple transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500">Email Me</div>
                    <div className="text-sm font-semibold mt-0.5">arina11mit@gmail.com</div>
                  </div>
                </a>

                <a
                  href="tel:+213670746904"
                  className="flex items-center gap-4 group cursor-pointer text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <div className="p-3 bg-white/5 border border-white/5 rounded-2xl group-hover:bg-accent-blue/10 group-hover:text-accent-blue transition-all duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500">Call Me</div>
                    <div className="text-sm font-semibold mt-0.5">+213 670746904</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-slate-400">
                  <div className="p-3 bg-white/5 border border-white/5 rounded-2xl">
                    <MapPin size={18} className="text-accent-cyan" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500">Location</div>
                    <div className="text-sm font-semibold mt-0.5">Algiers & Médéa, Algeria</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons footer */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
              <a
                href="https://github.com/ikhlass-ce"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 border border-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            </div>

          </div>
        </div>

        {/* Contact Form (3 cols) */}
        <div className="lg:col-span-3 text-left">
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-accent-cyan/5 rounded-full blur-[80px]" />
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              
              {/* Row: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono uppercase text-slate-500">
                    Full Name <span className="text-accent-purple">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple/50 focus:bg-white/[0.08] transition-all duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono uppercase text-slate-500">
                    Email Address <span className="text-accent-purple">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple/50 focus:bg-white/[0.08] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-[10px] font-mono uppercase text-slate-500">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Collaboration proposal"
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.08] transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] font-mono uppercase text-slate-500">
                  Your Message <span className="text-accent-purple">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                />
              </div>

              {/* Status Alert */}
              {status !== "idle" && (
                <div
                  className={`px-4 py-3 rounded-xl text-xs flex items-center gap-2 ${
                    status === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : status === "error"
                      ? "bg-red-500/10 border border-red-500/20 text-red-400"
                      : "bg-white/5 border border-white/10 text-slate-300"
                  }`}
                >
                  {status === "success" && <CheckCircle size={14} />}
                  <span>{status === "sending" ? "Sending your message..." : statusMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3.5 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan text-sm font-bold text-white rounded-xl shadow-lg border border-white/10 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 transition-all duration-300"
              >
                {status === "sending" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
