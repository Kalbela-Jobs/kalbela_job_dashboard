import {
      Briefcase,
      GraduationCap,
      Home,
      MessageSquareText,
      Settings,
      ShoppingCart,
      List,
      Users,
} from "lucide-react";

export const nav_items = [
      {
            title: "Dashboard",
            icon: Home,
            link: "dashboard",
      },
      {
            title: "Category",
            icon: List,
            link: "category",
      },
      {
            title: "Job Type",
            icon: List,
            link: "job-type",
      },
      {
            title: "Career Resources",
            icon: List,
            link: "career-resources",
      },
      {
            title: "Jobs",
            icon: Briefcase,
            link: "jobs",
      },
      {
            title: "Candidates",
            icon: Users,
            link: "candidates",
      },
      {
            title: "Hr Management",
            icon: Users,
            link: "hr-management",
      },
      {
            title: "Organization",
            icon: Users,
            link: "organization",
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
