import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project }) {


  return (

    <motion.article

      initial={{
        opacity:0,
        y:40
      }}

      whileInView={{
        opacity:1,
        y:0
      }}

      viewport={{
        once:true,
        amount:0.2
      }}

      whileHover={{
        y:-8
      }}

      transition={{
        duration:0.4
      }}

      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      shadow-xl
      "
    >


      {/* Image */}

      <div
        className="
        relative
        overflow-hidden
        h-64
        "
      >

        <img

          src={project.image}

          alt={project.title}

          loading="lazy"

          className="
          w-full
          h-full
          object-cover
          transition
          duration-700
          group-hover:scale-110
          "

        />


        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-transparent
          opacity-80
          "
        />


        {/* Category */}

        <span

          className="
          absolute
          top-5
          left-5
          px-4
          py-2
          rounded-full
          text-xs
          bg-black/50
          backdrop-blur
          border
          border-white/20
          "
        >

          {project.category}

        </span>


      </div>




      {/* Content */}

      <div
        className="
        p-6
        "
      >


        <div
          className="
          flex
          items-start
          justify-between
          gap-4
          "
        >


          <h3
            className="
            text-2xl
            font-bold
            "
          >

            {project.title}

          </h3>


          <ArrowUpRight

            size={22}

            className="
            opacity-50
            group-hover:opacity-100
            transition
            "

          />


        </div>



        <p

          className="
          mt-4
          text-gray-400
          leading-relaxed
          line-clamp-3
          "

        >

          {project.description}

        </p>




        {/* Technologies */}

        <div

          className="
          flex
          flex-wrap
          gap-2
          mt-6
          "

        >

          {project.technologies?.map((tech,index)=>(

            <span

              key={index}

              className="
              px-3
              py-1
              rounded-full
              text-xs
              bg-white/10
              border
              border-white/10
              "

            >

              {tech}

            </span>

          ))}


        </div>




        {/* Impact */}

        {project.impact && (

          <div

            className="
            mt-6
            p-4
            rounded-2xl
            bg-black/20
            border
            border-white/10
            "

          >

            <p
              className="
              text-sm
              text-gray-300
              "
            >

              <strong>
                Impact :
              </strong>

              {" "}

              {project.impact}

            </p>


          </div>

        )}



        {/* Buttons */}


        <div

          className="
          flex
          gap-3
          mt-6
          "

        >


          {project.demo && (

            <a

              href={project.demo}

              target="_blank"

              rel="noopener noreferrer"

              className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-white
              text-black
              font-medium
              hover:scale-105
              transition
              "

            >

              Demo

              <ExternalLink size={16}/>

            </a>

          )}



          {project.github && (

            <a

              href={project.github}

              target="_blank"

              rel="noopener noreferrer"

              className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              border-white/20
              hover:bg-white/10
              transition
              "

            >

              GitHub

              <FaGithub size={16}/>

            </a>

          )}


        </div>



      </div>



    </motion.article>


  );

}