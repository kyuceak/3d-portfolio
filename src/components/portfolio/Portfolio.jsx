import "./portfolio.css";

import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    id: 1,
    img: p1,
    title: "Fulls Stack Blog application",
    desc: "Lorem ipsum dolor sit, amext consectetur adipisicing elit. Porro et esse dolore recusandae doloremque nihil numquam tempore nam assumenda voluptatem molestiae ea, sequi voluptate ullam est, veritatis rerum impedit explicabo?",
    link: "/",
  },
  {
    id: 2,
    img: p2,
    title: "React Blog application",
    desc: "Lorem ipsum dolor sit, amext consectetur adipisicing elit. Porro et esse dolore recusandae doloremque nihil numquam tempore nam assumenda voluptatem molestiae ea, sequi voluptate ullam est, veritatis rerum impedit explicabo?",
    link: "/",
  },
  {
    id: 3,
    img: p3,
    title: "Expressjs Blog application",
    desc: "Lorem ipsum dolor sit, amext consectetur adipisicing elit. Porro et esse dolore recusandae doloremque nihil numquam tempore nam assumenda voluptatem molestiae ea, sequi voluptate ullam est, veritatis rerum impedit explicabo?",
    link: "/",
  },
  {
    id: 4,
    img: p3,
    title: "Expressjs Blog application",
    desc: "Lorem ipsum dolor sit, amext consectetur adipisicing elit. Porro et esse dolore recusandae doloremque nihil numquam tempore nam assumenda voluptatem molestiae ea, sequi voluptate ullam est, veritatis rerum impedit explicabo?",
    link: "/",
  },
  {
    id: 5,
    img: p3,
    title: "Expressjs Blog application",
    desc: "Lorem ipsum dolor sit, amext consectetur adipisicing elit. Porro et esse dolore recusandae doloremque nihil numquam tempore nam assumenda voluptatem molestiae ea, sequi voluptate ullam est, veritatis rerum impedit explicabo?",
    link: "/",
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
        <motion.a  variants={textVariants}href={item.link}>
          <button>View project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);

  const ref = useRef(null);

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
    [0, -window.innerWidth * items.length]
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
      <section></section>
    </div>
  );
};

export default Portfolio;
