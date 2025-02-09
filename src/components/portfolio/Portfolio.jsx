import "./portfolio.css";

import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";
import p4 from "../../assets/p4.png";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    id: 1,
    img: p1,
    title: "E-commerce Frontend Application",
    desc: "A responsive web application for online shopping, featuring product browsing, search functionality, and a smooth user experience.",
    link: "https://ecommerce-app-tan-alpha.vercel.app/",
  },
  {
    id: 2,
    img: p2,
    title: "Poke-Memo",
    desc: "A React-based memory game where users select pokemon cards, avoiding previously selected ones. It is simple and fun!",
    link: "https://poke-game-zeta.vercel.app/",
  },
  {
    id: 3,
    img: p3,
    title: "Resume/CV Generator",
    desc: "A web-based tool allowing users to create professional resumes by filling in their information dynamically.",
    link: "https://ui-projects-tawny.vercel.app/",
  },
  {
    id: 4,
    img: p4,
    title: "UAV Management System Backend Application",
    desc: "A backend system designed for managing UAVs, teams are able to produce UAV parts and assemble aircrafts.",
    link: "https://github.com/kyuceak/uav-rental",
  },
 
];

const imgVariants = {
    initial:{
        x: -500,
        y: 500,
        opacity: 0,
    },
    animate: {
        x:0,
        y:0,
        opacity:1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const textVariants = {
    initial:{
        x: 500,
        y: 500,
        opacity: 0,
    },
    animate: {
        x:0,
        y:0,
        opacity:1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            staggerChildren: 0.05,
        },
    },
};

const ListItem = ({ item }) => {

    
  const ref = useRef();

  const isInView = useInView(ref,{ margin:"-100px"});

  return (
    <div className="item" ref={ref}>
      <motion.div variants={imgVariants} animate={isInView? "animate":"initial"} className="img">
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
      variants={textVariants}
      animate={isInView? "animate":"initial"}
       className="p-text">
        <motion.h1  variants={textVariants}>{item.title}</motion.h1>
        <motion.p  variants={textVariants}>{item.desc}</motion.p>
        <motion.a  variants={textVariants}href={item.link} target="_blank">
          <button>See Demo</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);

  const ref = useRef(null);
  const isPortfolioInView = useInView(ref, { margin: "-125px" });


  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);

      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });
  
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -document.documentElement.clientWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="p-list" style={{x:xTranslate}}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            //backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section></section>
      <section></section>
      <section></section>
      <section></section>

      <div className="progress">
       { isPortfolioInView && <svg width="100%" height="100%" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="#ddd" strokeWidth={20}></circle>
            <motion.circle cx="80" cy="80" r="70" fill="none" stroke="#dd4c62" strokeWidth={20} style={{pathLength: scrollYProgress} } transform="rotate(-90 80 80)"></motion.circle>

        </svg>}
        
      </div>
    </div>
  );
};

export default Portfolio;
