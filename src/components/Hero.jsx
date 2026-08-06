import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// import profile from "../assets/images/profile/MM.png";


const stats = [
  {
    value: "10+",
    label: "Projets réalisés"
  },
  {
    value: "5+",
    label: "Années d'expérience"
  },
  {
    value: "15+",
    label: "Technologies"
  }
];


export default function Hero() {

  return (

    <section
      className="
      relative
      min-h-screen
      flex
      items-center
      overflow-hidden
      pt-24
      "
    >

      {/* Background glow */}

      <div
        className="
        absolute
        inset-0
        -z-10
        bg-gradient-to-br
        from-primary/20
        via-transparent
        to-purple-500/20
        "
      />


      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        grid
        md:grid-cols-2
        gap-12
        items-center
        "
      >


        {/* Text */}

        <motion.div

          initial={{
            opacity:0,
            x:-50
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:0.8
          }}

        >


          <div
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            border-white/10
            bg-white/5
            backdrop-blur
            text-sm
            mb-6
            "
          >

            <Sparkles size={16}/>

            Full Stack Developer • AI • Digital Solutions

          </div>



          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            "
          >

            Je transforme

            <span
              className="
              block
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
              "
            >

              des idées complexes

            </span>


            en expériences digitales performantes.

          </h1>



          <p
            className="
            mt-6
            text-lg
            text-gray-400
            max-w-xl
            "
          >

            Développeuse Full Stack spécialisée dans la création
            d'applications web modernes, plateformes SaaS,
            solutions IA et expériences digitales innovantes.

          </p>



          <div
            className="
            flex
            flex-wrap
            gap-4
            mt-8
            "
          >

            <Link
              to="/projects"
              className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-black
              text-white
              hover:scale-105
              transition
              "
            >

              Voir mes projets

              <ArrowRight size={18}/>

            </Link>



            <a

              href="/CV-Milinda-Mendy.pdf"

              download

              className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              border
              border-white/20
              hover:bg-white/10
              transition
              "

            >

              Télécharger CV

              <Download size={18}/>

            </a>


          </div>



          <div
            className="
            grid
            grid-cols-3
            gap-6
            mt-12
            "
          >

            {stats.map((item,index)=>(

              <motion.div

                key={index}

                whileHover={{
                  y:-5
                }}

                className="
                p-4
                rounded-2xl
                bg-white/5
                border
                border-white/10
                "

              >

                <h3
                  className="
                  text-3xl
                  font-bold
                  "
                >

                  {item.value}

                </h3>


                <p
                  className="
                  text-sm
                  text-gray-400
                  "
                >

                  {item.label}

                </p>


              </motion.div>

            ))}


          </div>


        </motion.div>



        {/* Image */}

        <motion.div

          initial={{
            opacity:0,
            scale:0.8
          }}

          animate={{
            opacity:1,
            scale:1
          }}

          transition={{
            duration:0.8
          }}

          className="
          flex
          justify-center
          "

        >


          <div
            className="
            relative
            "
          >

            <div
              className="
              absolute
              inset-0
              rounded-full
              bg-blue-500/30
              blur-3xl
              "
            />


            <img

              src="/images/profile/MM.png"

              alt="Milinda Mendy"
              loading="lazy"

              className="
              relative
              w-72
              h-72
              md:w-96
              md:h-96
              object-cover
              rounded-full
              border-4
              border-white/10
              "

            />


          </div>


        </motion.div>


      </div>


    </section>

  );

}