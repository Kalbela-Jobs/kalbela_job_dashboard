import {
  Briefcase,
  GraduationCap,
  Home,
  MessageSquareText,
  Settings,
  Users,
} from "lucide-react";

export const navitems = [
  {
    title: "admin",
    icon: Home,
    link: "",
  },
  {
    title: "Jobs",
    icon: Briefcase,
    link: "jobs",
  },
  {
    title: "Condidates",
    icon: Users,
    link: "condidates",
  },
  {
    title: "Messager",
    icon: MessageSquareText,
    link: "messager",
  },
  {
    title: "Setting",
    icon: Settings,
    link: "setting",
  },
  {
    title: "Evaluation",
    icon: GraduationCap,
    link: "evaluation",
  },
];

export const skillsArray = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React.js" },
  { value: "Mui", label: "Material-UI" },
  { value: "Next", label: "Next.js" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "MySQL", label: "MySQL" },
  { value: "Mongoose", label: "Mongoose" },
  { value: "Express", label: "Express" },
  { value: "Bootstrap", label: "Bootstrap" },
  { value: "Tailwind", label: "Tailwind" },
];
