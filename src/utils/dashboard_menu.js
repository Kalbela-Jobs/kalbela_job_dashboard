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
            link: "/admin/dashboard",
      },
      {
            title: "Category",
            icon: List,
            link: "/admin/category",
      },
      {
            title: "Job Type",
            icon: List,
            link: "/admin/job-type",
      },
      {
            title: "Career Resources",
            icon: List,
            link: "/admin/career-resources",
      },

      {
            title: "Configuration",
            icon: List,
            link: "/admin/configuration",
      },
      {
            title: "Jobs",
            icon: Briefcase,
            link: "/admin/jobs",
      },
      {
            title: "Govt Jobs",
            icon: List,
            link: "/admin/govt-jobs",
      },
      // {
      //       title: "Bank/BIMA/NGO",
      //       icon: List,
      //       link: "/admin/bank-bima-ngo",
      // },
      {
            title: "Candidates",
            icon: Users,
            link: "/admin/candidates",
      },
      {
            title: "Hr Management",
            icon: Users,
            link: "/admin/hr-management",
      },
      {
            title: "Organization",
            icon: Users,
            link: "/admin/organization",
      }, {
            title: "Job Sicker",
            icon: Users,
            link: "/admin/all-candidates",
      },
      {
            title: "Setting",
            icon: Settings,
            link: "/admin/setting",
      },
      {
            title: "Evaluation",
            icon: GraduationCap,
            link: "/admin/evaluation",
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
