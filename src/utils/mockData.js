export const mockStats = [
      { icon: "👥", label: "Active Candidates", count: 12, color: "bg-red-100" },
      { icon: "💼", label: "Active Jobs", count: 5, color: "bg-pink-100" },
      { icon: "📝", label: "Draft Jobs", count: 3, color: "bg-orange-100" },
      { icon: "👥", label: "Team Members", count: 8, color: "bg-blue-100" }
];

export const mockApplicants = [
      { id: 1, name: "John Doe", position: "Frontend Developer", status: "Pending" },
      { id: 2, name: "Jane Smith", position: "UX Designer", status: "Interviewed" },
      { id: 3, name: "Mike Johnson", position: "Backend Developer", status: "Rejected" },
];

export const mockJobs = [
      { id: 1, title: "Senior React Developer", applicants: 15, status: "Active", deadline: "2023-12-31" },
      { id: 2, title: "UX/UI Designer", applicants: 8, status: "Active", deadline: "2023-12-15" },
      { id: 3, title: "DevOps Engineer", applicants: 5, status: "Draft", deadline: "2024-01-15" },
];
