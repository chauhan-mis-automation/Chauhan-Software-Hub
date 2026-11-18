import { MessageCircle } from "lucide-react";
import { whatsappLink } from "../data/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi, I saw Chauhan Software Hub and want to know more about your software.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-wa px-4 py-3.5 text-sm font-semibold text-white shadow-xl shadow-wa/30 transition hover:scale-105"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
