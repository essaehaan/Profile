import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconCloudDemo from "@/components/globe";
import { Code2, Paintbrush, Database, Layout, Cpu, Cloud } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaFigma,
  FaAws,
  FaHtml5,
  FaCss3,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiJest,
  SiWebpack,
  SiRedux,
  SiFirebase,
  SiVercel,
  SiVite,
  SiFlutter,
  SiDart,
  SiGetx,
  SiJavascript,
  SiWordpress,
  SiShopify,
  SiWebflow,
  SiWix,
  SiReact,
  SiBootstrap,
  SiKotlin,
  SiAdobe,
  SiDribbble,
  SiJetbrains,
  SiElementor,
  SiPagekit,
  SiWoocommerce,
  SiLiquibase,
  SiGit,
  SiAndroidstudio,
  SiJupyter,
  SiAnaconda,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { MdAnimation } from "react-icons/md";
import { FcWorkflow } from "react-icons/fc";

const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <Card className="group relative overflow-hidden bg-gray-900/80 border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer"></div>
    <CardContent className="p-6 relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`p-3 rounded-xl bg-gray-800/50 ${color} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="outline"
            className="group/badge relative bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span className="transform group-hover/badge:scale-110 transition-transform duration-300">
              {skill.icon}
            </span>
            <span className="font-medium">{skill.name}</span>
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Mobile Development",
      color: "text-blue-400",
      skills: [
        { name: "Flutter", icon: <SiFlutter className="w-4 h-4 text-[#02569B]" />},
        {
          name: "Dart",
          icon: <SiDart className="w-4 h-4 text-[#42A5F5]" />,
        },
        {
          name: "Firebase",
          icon: <SiFirebase className="w-4 h-4 text-[#FFCA28]" />,
        },
          {
          name: "REST APIs",
          icon: <BsGrid1X2 className="w-4 h-4 text-[#FF6C37]" />,
        },
        {
          name: "GetX",
         icon: <SiGetx className="w-4 h-4 text-[#FFD43B]" />,
        },
        {
          name: "Provider",
          icon: <SiFlutter className="w-4 h-4 text-[#007ACC]"  />,
        },
        {
          name: "Kotlin",
          icon: <SiKotlin className="w-4 h-4 text-[#E10098]" />,
        },
        {
          name: "Java",
          icon: <FaJava className="w-4 h-4 text-[#007396]" />,
        },
      ],
    },
    {
      icon: Code2,
      title: "Web Development",
      color: "text-green-400",
      skills: [
        {
          name: "HTML",
          icon: <FaHtml5 className="w-4 h-4 text-[#339933]" />,
        },
        {
          name: "CSS",
          icon: <FaCss3 className="w-4 h-4 text-[#3776AB]" />,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" />,
        },
        
        {
          name: "Reat",
          icon: <SiReact className="w-4 h-4 text-[#61DAFB]" />,
        },
        {
          name: "Next",
          icon: <SiNextdotjs className="w-4 h-4 text-[#FFFFFF]" />,
        },
       {
          name: "Liquid",
          icon: <SiLiquibase className="w-4 h-4 text-[#FFFFFF]" />,
        },
 


        {
          name: "BootStrap",
          icon: <SiBootstrap className="w-4 h-4 text-[#563d7c]" />,
        },
      ],
    },
    {
      icon: Layout,
      title: "UI/UX Design(Familiar)",
      color: "text-purple-400",
      skills: [
        { name: "Figma", icon: <FaFigma className="w-4 h-4 text-[#F24E1E]" /> },
        {
          name: "Responsive Design",
          icon: <Layout className="w-4 h-4 text-[#38B2AC]" />,
        },
        {
          name: "Adobe XD",
          icon: <SiAdobe className="w-4 h-4 text-[#FF61F6]" />,
        },
        {
          name: "Dribble",
          icon: <SiDribbble className="w-4 h-4 text-[#F59E0B]" />,
        },
      ],
    },
    {
      icon: Layout,
      title: "CMS & E-commerce",
      color: "text-orange-400",
      skills: [
       {
          name: "WordPress",
          icon: <SiWordpress className="w-4 h-4 text-[#47A248]" />,
        },
        {
          name: "Shopify",
          icon: <SiShopify className="w-4 h-4 text-[#FF6C37]" />,
        },
        {
          name: "WebFlow",
          icon: <SiWebflow className="w-4 h-4 text-[#146EF5]" />,
        },
        {
          name: "Wix",
          icon: <SiWix className="w-4 h-4 text-[#FAAD4D]" />,
        },
         {
          name: "Elementor",
          icon: <SiElementor className="w-4 h-4 text-[#007ACC ]" />,
        },
        {
          name: "WpBakery",
          icon: <SiPagekit className="w-4 h-4 text-[#007ACC]" />,
        },
        {
          name: "WooCommerce",
          icon: <SiWoocommerce className="w-4 h-4 text-[#007ACC]" />,
        },
      ],
    },
    {
      icon: Cpu,
      title: "Tools & Technologies",
      color: "text-pink-400",
      skills: [
        {
          name: "VS Code",
          icon: <TbBrandVscode className="w-4 h-4 text-[#007ACC]" />,
        },
        { name: "JetBrains", icon: <SiJetbrains className="w-4 h-4 text-[#7A5DC7`]" /> },
        {
          name: "Git",
          icon: <SiGit className="w-4 h-4 text-[#8DD6F9]" />,
        },
        { name: "Android Studio", icon: <SiAndroidstudio className="w-4 h-4 text-[#3DDC84]" /> },
        {
          name: "Firebase",
          icon: <SiFirebase className="w-4 h-4 text-[#FFCA28]" />,
        },
        { name: "Vercel", icon: <SiVercel className="w-4 h-4 text-white" /> },
        { name: "Jupyter", icon: <SiJupyter className="w-4 h-4 text-[#F37626]" /> },
        { name: "Anaconda", icon: <SiAnaconda className="w-4 h-4 text-[#42BE61]" /> },
      ],
    },
    {
      icon: Paintbrush,
      title: "Creative Skills",
      color: "text-yellow-400",
      skills: [
        {
          name: "UI Animation",
          icon: <MdAnimation className="w-4 h-4 text-[#FF4081]" />,
        },
        {
          name: "SVG Animation",
          icon: <MdAnimation className="w-4 h-4 text-[#00C853]" />,
        },
        {
          name: "3D Modeling",
          icon: <Cpu className="w-4 h-4 text-[#7C4DFF]" />,
        },
        {
          name: "Motion Graphics",
          icon: <MdAnimation className="w-4 h-4 text-[#FF6D00]" />,
        },
      ],
    },
  ];

  return (
    <main className="pt-15 lg:pt-0 text-white min-h-screen bg-[#04081A] relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <section className="container mx-auto px-4 py-11 relative z-10">
        <div className="flex justify-center items-center ">
          <IconCloudDemo />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
            />
          ))}
        </div>
      </section>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }
      `}</style>
    </main>
  );
};

export default SkillsSection;
