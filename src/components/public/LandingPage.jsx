import { useState, useEffect, useRef } from "react";
import Navbar from "../landing-page-component/Navbar";
import Hero from "../landing-page-component/Hero";
import Service from "../landing-page-component/Services";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import ViewApps from "../landing-page-component/ViewApps";
import Faq from "../landing-page-component/Faq";
import ContactUs from "../landing-page-component/ContactUs";
import { Toaster } from "react-hot-toast";
import Footer from "../landing-page-component/Footer";

export default function LandingPage() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  // Ref for custom cursor postion tracking
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.1;
      position.current.y += (mouse.current.y - position.current.y) * 0.1;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${
          mouse.current.x - 6
        }px, ${mouse.current.y - 6}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${
          position.current.x - 20
        }px, ${position.current.y - 20}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navigate = useNavigate();

  // Cek token ketika komponen pertama kali dirender
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp > now) {
          // token masih berlaku -> langsung ke dashboard
          navigate("/dashboard");
        } else {
          // token kadaluwarsa -> hapus
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token invalid:", error);
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  return (
    <div className="dark:bg-black relative cursor-none">
      <Toaster />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <Service />
      <ViewApps />
      <Faq />
      <ContactUs />
      <Footer />

      {/* Custom Cursor Ring */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primaryy pointer-events-none z-[9999]"
        style={{ transition: "transform 0.1s ease-out" }}
      ></div>

      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-primaryy pointer-events-none z-[9999]"
      ></div>
    </div>
  );
}
