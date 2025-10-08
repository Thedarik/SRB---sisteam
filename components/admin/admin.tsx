"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  Cloud,
  Download,
  FileText,
  Grid,
  Home,
  MapPin,
  Menu,
  MoreHorizontal,
  PanelLeft,
  Phone,
  Plus,
  QrCode,
  Search,
  Settings,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  UserCheck,
  Building,
  GraduationCap,
  Activity,
  RefreshCw,
  Download as DownloadIcon,
  UserPlus,
  FileCheck,
  AlertTriangle,
  Hash,
  Globe,
  Edit,
  Trash2,
  Upload,
  Save,
  User,
  Mail,
  BadgeCheck,
  Target,
  TrendingDown,
  AlertCircle,
  CheckSquare,
  XCircle,
  Clock3,
  Calendar as CalendarIcon,
  FileSpreadsheet,
  PieChart,
  BarChart,
  Bookmark,
  Archive,
  SendHorizontal,
  Copy,
  Share2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CertificateManagement } from "@/components/admin/CertificateManagement"
import { cn } from "@/lib/utils"

// TypeScript interfaces
interface AnalyticsData {
  name: string
  value: number | string
  change: number | string
  trend: "up" | "down"
  icon: React.ReactNode
  description: string
  target: number
  percentage: number
}

interface Course {
  id: number
  title: string
  description: string
  students: number
  totalStudents: number
  certificates: number
  startDate: string
  endDate: string
  status: "active" | "completed" | "upcoming"
  progress: number
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  instructor: string
  lastActivity: string
  thumbnail: string
}

interface Student {
  id: number
  name: string
  email: string
  phone: string
  course: string
  progress: number
  enrollDate: string
  lastActivity: string
  status: "active" | "completed" | "pending"
  certificates: number
  attendance: number
  avatar: string
}

interface Certificate {
  id: string
  studentName: string
  course: string
  issueDate: string
  status: "issued" | "draft" | "pending"
  downloads: number
  qrScans: number
  validUntil: string
  score: number
  grade: string
  issueTime: string
}

interface Activity {
  id: number
  type: "student_enrolled" | "assignment_submitted" | "certificate_issued" | "course_completed"
  message: string
  time: string
  icon: React.ReactNode
  color: string
}

interface SidebarItem {
  title: string
  icon: React.ReactNode
  badge?: string
  isActive: boolean
  onClick: () => void
}

interface Assignment {
  title: string
  course: string
  submitted: number
  total: number
  deadline: string
  status: "active" | "completed"
}

interface ReportCard {
  title: string
  desc: string
  icon: React.ReactNode
  color: string
}

interface AdminDashboardProps {
  onLogout?: () => void
}

// Certificate Template interfaces
interface CertificateTemplate {
  id: number
  name: string
  description: string
  category: "Modern" | "Classic" | "Elegant" | "Minimal" | "Colorful"
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  isActive: boolean
  downloads: number
  rating: number
  createdDate: string
}

// Certificate templates data
const certificateTemplates: CertificateTemplate[] = [
  {
    id: 1,
    name: "Zamonaviy Gradient",
    description: "Rangdor gradient dizayni bilan zamonaviy ko'rinish",
    category: "Modern",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#F59E0B"
    },
    isActive: true,
    downloads: 156,
    rating: 4.8,
    createdDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Klassik Elegant",
    description: "An'anaviy va professional ko'rinish",
    category: "Classic",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#1F2937",
      secondary: "#6B7280",
      accent: "#D97706"
    },
    isActive: false,
    downloads: 203,
    rating: 4.9,
    createdDate: "2024-02-10"
  },
  {
    id: 3,
    name: "Premium Gold",
    description: "Oltin rangli hashamatli dizayn",
    category: "Elegant",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#B45309",
      secondary: "#F59E0B",
      accent: "#FCD34D"
    },
    isActive: false,
    downloads: 89,
    rating: 4.7,
    createdDate: "2024-03-05"
  },
  {
    id: 4,
    name: "Minimal Clean",
    description: "Sodda va toza minimalist uslub",
    category: "Minimal",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#000000",
      secondary: "#6B7280",
      accent: "#10B981"
    },
    isActive: false,
    downloads: 127,
    rating: 4.6,
    createdDate: "2024-03-20"
  },
  {
    id: 5,
    name: "Rangdor Festival",
    description: "Yorqin va quvnoq ranglar bilan",
    category: "Colorful",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#EC4899",
      secondary: "#8B5CF6",
      accent: "#06B6D4"
    },
    isActive: false,
    downloads: 78,
    rating: 4.5,
    createdDate: "2024-04-01"
  },
  {
    id: 6,
    name: "Biznes Professional",
    description: "Biznes muhiti uchun professional dizayn",
    category: "Classic",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#1E40AF",
      secondary: "#3B82F6",
      accent: "#EF4444"
    },
    isActive: false,
    downloads: 234,
    rating: 4.8,
    createdDate: "2024-04-15"
  }
]

// Sample data with proper typing - CRM UCHUN
const adminAnalytics: AnalyticsData[] = [
  {
    name: "Jami O'quvchilar",
    value: 247,
    change: 15,
    trend: "up",
    icon: <Users className="h-4 w-4" />,
    description: "Ushbu oyda yangi qo'shildi",
    target: 300,
    percentage: 82
  },
  {
    name: "Oylik Daromad",
    value: "45.2M",
    change: "+12%",
    trend: "up",
    icon: <TrendingUp className="h-4 w-4" />,
    description: "UZS - Joriy oy",
    target: 50,
    percentage: 90
  },
  {
    name: "O'rtacha Davomad",
    value: "92%",
    change: "+5%",
    trend: "up",
    icon: <Activity className="h-4 w-4" />,
    description: "Shu haftalik davomad",
    target: 100,
    percentage: 92
  },
  {
    name: "Faol Kurslar",
    value: 12,
    change: 3,
    trend: "up",
    icon: <BookOpen className="h-4 w-4" />,
    description: "Hozirda olib borilmoqda",
    target: 15,
    percentage: 80
  },
]

const adminCourses: Course[] = [
  {
    id: 1,
    title: "Frontend Development",
    description: "React, Next.js va TypeScript asoslari",
    students: 25,
    totalStudents: 30,
    certificates: 18,
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "active",
    progress: 75,
    duration: "5 oy",
    level: "Intermediate",
    category: "IT",
    instructor: "Admin User",
    lastActivity: "2 soat oldin",
    thumbnail: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "SMM, SEO va kontentni boshqarish",
    students: 18,
    totalStudents: 20,
    certificates: 15,
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    status: "completed",
    progress: 100,
    duration: "3 oy",
    level: "Beginner",
    category: "Marketing",
    instructor: "Admin User",
    lastActivity: "1 kun oldin",
    thumbnail: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 3,
    title: "Graphic Design Basics",
    description: "Photoshop, Illustrator va dizayn printsiplari",
    students: 12,
    totalStudents: 25,
    certificates: 0,
    startDate: "2024-06-01",
    endDate: "2024-08-01",
    status: "upcoming",
    progress: 15,
    duration: "2 oy",
    level: "Beginner",
    category: "Design",
    instructor: "Admin User",
    lastActivity: "Hali boshlanmagan",
    thumbnail: "/placeholder.svg?height=60&width=60"
  },
]

const students: Student[] = [
  {
    id: 1,
    name: "Abdullayev Jasur",
    email: "jasur@gmail.com",
    phone: "+998 90 123 45 67",
    course: "Frontend Development",
    progress: 85,
    enrollDate: "2024-01-15",
    lastActivity: "2 soat oldin",
    status: "active",
    certificates: 1,
    attendance: 92,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 2,
    name: "Karimova Malika",
    email: "malika@gmail.com",
    phone: "+998 91 234 56 78",
    course: "Digital Marketing",
    progress: 100,
    enrollDate: "2024-02-01",
    lastActivity: "1 kun oldin",
    status: "completed",
    certificates: 1,
    attendance: 98,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 3,
    name: "Rakhmonov Bekzod",
    email: "bekzod@gmail.com",
    phone: "+998 92 345 67 89",
    course: "Frontend Development",
    progress: 45,
    enrollDate: "2024-01-20",
    lastActivity: "5 soat oldin",
    status: "active",
    certificates: 0,
    attendance: 78,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 4,
    name: "Nazarova Dilnoza",
    email: "dilnoza@gmail.com",
    phone: "+998 93 456 78 90",
    course: "Graphic Design Basics",
    progress: 15,
    enrollDate: "2024-06-01",
    lastActivity: "1 soat oldin",
    status: "active",
    certificates: 0,
    attendance: 89,
    avatar: "/placeholder.svg?height=40&width=40"
  },
]

const certificatesHistory: Certificate[] = [
  {
    id: "CERT-2024-001247",
    studentName: "Karimova Malika",
    course: "Digital Marketing",
    issueDate: "2024-05-01",
    status: "issued",
    downloads: 5,
    qrScans: 12,
    validUntil: "2027-05-01",
    score: 95,
    grade: "A+",
    issueTime: "2 kun oldin"
  },
  {
    id: "CERT-2024-001245",
    studentName: "Abdullayev Jasur",
    course: "Frontend Development",
    issueDate: "2024-06-10",
    status: "draft",
    downloads: 0,
    qrScans: 0,
    validUntil: "2027-06-10",
    score: 88,
    grade: "A",
    issueTime: "Tayyorlanmoqda"
  },
]

const recentActivities: Activity[] = [
  {
    id: 1,
    type: "student_enrolled",
    message: "Nazarova Dilnoza 'Graphic Design' kursiga yozildi - 2,500,000 UZS to'landi",
    time: "1 soat oldin",
    icon: <UserPlus className="h-4 w-4" />,
    color: "text-blue-600"
  },
  {
    id: 2,
    type: "assignment_submitted",
    message: "15 ta o'quvchi bugungi darsda qatnashdi",
    time: "2 soat oldin",
    icon: <CheckCircle className="h-4 w-4" />,
    color: "text-green-600"
  },
  {
    id: 3,
    type: "certificate_issued",
    message: "3 ta yangi to'lov qabul qilindi - Jami: 7,200,000 UZS",
    time: "3 soat oldin",
    icon: <TrendingUp className="h-4 w-4" />,
    color: "text-emerald-600"
  },
  {
    id: 4,
    type: "student_enrolled",
    message: "Abdullayev Jasur - to'lov muddati tugayapti (3 kun qoldi)",
    time: "5 soat oldin",
    icon: <AlertCircle className="h-4 w-4" />,
    color: "text-orange-600"
  },
  {
    id: 5,
    type: "course_completed",
    message: "Frontend Development 5-modul dars yakunlandi",
    time: "1 kun oldin",
    icon: <CheckSquare className="h-4 w-4" />,
    color: "text-purple-600"
  },
]

const assignments: Assignment[] = [
  { title: "React Components Yaratish", course: "Frontend Development", submitted: 15, total: 25, deadline: "2024-06-20", status: "active" },
  { title: "SMM Strategiya Rejasi", course: "Digital Marketing", submitted: 18, total: 18, deadline: "2024-06-15", status: "completed" },
  { title: "Logo Dizayni", course: "Graphic Design", submitted: 5, total: 12, deadline: "2024-06-25", status: "active" },
]

const reportCards: ReportCard[] = [
  { title: "O'quvchilar Hisoboti", desc: "Davomad, rivojlanish va natijalar", icon: <Users className="h-6 w-6" />, color: "bg-blue-500" },
  { title: "Moliyaviy Hisobot", desc: "To'lovlar, daromad va xarajatlar", icon: <TrendingUp className="h-6 w-6" />, color: "bg-emerald-500" },
  { title: "Kurslar Samaradorligi", desc: "Tugallash va qoniqish darajasi", icon: <BookOpen className="h-6 w-6" />, color: "bg-green-500" },
  { title: "Davomad Tahlili", desc: "Kunlik va oylik davomad", icon: <Activity className="h-6 w-6" />, color: "bg-orange-500" },
  { title: "O'qituvchilar Hisoboti", desc: "Ishlash ko'rsatkichlari", icon: <UserCheck className="h-6 w-6" />, color: "bg-purple-500" },
  { title: "Umumiy Statistika", desc: "Barcha metrikalar va trendlar", icon: <PieChart className="h-6 w-6" />, color: "bg-pink-500" },
]

type TabType = "dashboard" | "courses" | "students" | "certificates" | "assignments" | "reports" | "settings"

// ✅ ASOSIY O'ZGARISH: Bu yerda export qilish kerak
export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<number>(5)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  
  // Add Student Dialog State
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState<boolean>(false)
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    passportNumber: "",
    phoneNumber: "",
    group: "",
    enrollDate: new Date().toISOString()
  })
  const [availableGroups, setAvailableGroups] = useState<any[]>([])

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups')
        const result = await response.json()
        if (result.success) {
          setAvailableGroups(result.data)
        }
      } catch (error) {
        console.error('Error fetching groups:', error)
      }
    }
    fetchGroups()
  }, [])

  // Handle Add Student
  const handleAddStudent = async () => {
    if (!newStudent.fullName || !newStudent.phoneNumber || !newStudent.group) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!")
      return
    }

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: newStudent.fullName,
          phone_number: newStudent.phoneNumber,
          passport_number: newStudent.passportNumber || null,
          group_id: newStudent.group,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.error || "Xatolik yuz berdi!")
        return
      }

      console.log("Yangi o'quvchi qo'shildi:", result.data)

      // Reset form
      setNewStudent({
        fullName: "",
        passportNumber: "",
        phoneNumber: "",
        group: "",
        enrollDate: new Date().toISOString()
      })
      setIsAddStudentDialogOpen(false)
      
      // Success message
      alert("✅ O'quvchi muvaffaqiyatli qo'shildi!")
      
      // Reload page to show new student
      window.location.reload()
    } catch (error) {
      console.error("Error:", error)
      alert("Server bilan bog'lanishda xatolik!")
    }
  }

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: <Home />,
      isActive: activeTab === "dashboard",
      onClick: () => setActiveTab("dashboard")
    },
    {
      title: "O'quvchilar",
      icon: <Users />,
      badge: "247",
      isActive: activeTab === "students",
      onClick: () => setActiveTab("students")
    },
    {
      title: "Kurslar",
      icon: <BookOpen />,
      badge: "12",
      isActive: activeTab === "courses",
      onClick: () => setActiveTab("courses")
    },
    {
      title: "Moliyaviy",
      icon: <TrendingUp />,
      isActive: activeTab === "certificates",
      onClick: () => setActiveTab("certificates")
    },
    {
      title: "Davomad",
      icon: <CheckSquare />,
      isActive: activeTab === "assignments",
      onClick: () => setActiveTab("assignments")
    },
    {
      title: "Hisobotlar",
      icon: <BarChart3 />,
      isActive: activeTab === "reports",
      onClick: () => setActiveTab("reports")
    },
    {
      title: "Sozlamalar",
      icon: <Settings />,
      isActive: activeTab === "settings",
      onClick: () => setActiveTab("settings")
    },
  ]

  const getStatusBadge = (status: string): React.ReactNode => {
    const statusMap = {
      active: "Faol",
      completed: "Tugallangan",
      upcoming: "Boshlanmagan",
      pending: "Kutilmoqda",
      issued: "Berilgan",
      draft: "Tayyorlanmoqda"
    }

    return (
      <Badge
        variant={status === "active" || status === "issued" ? "default" : "secondary"}
        className="rounded-xl text-xs"
      >
        {statusMap[status as keyof typeof statusMap] || status}
      </Badge>
    )
  }

  const formatInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 25%, rgba(34, 197, 94, 0.1) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, rgba(34, 197, 94, 0.2) 25%, rgba(59, 130, 246, 0.1) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(147, 51, 234, 0.1) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 hidden w-72 transform border-r bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out md:block",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white shadow-lg">
                <GraduationCap className="size-6" />
              </div>
            <div>
              <h2 className="font-bold text-lg">EduCRM</h2>
              <p className="text-xs text-muted-foreground">O'quv Markazlar CRM Tizimi</p>
            </div>
            </div>

            <div className="text-xs text-muted-foreground mb-3">
              {currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString()}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="O'quvchi, kurs qidirish..."
                className="w-full rounded-2xl bg-muted/50 pl-9 pr-4 py-2"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.title}
                  onClick={item.onClick}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    item.isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted/70 hover:scale-[1.02]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">IT Academy Tashkent</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout} className="rounded-xl">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-72" : "md:pl-0")}>
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/80 backdrop-blur-md px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IT Academy Tashkent - CRM Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">O'quvchilar, moliya va o'quv jarayonini boshqaring</p>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl">
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Ma'lumotlarni yangilash</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                        >
                          {notifications}
                        </motion.span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bildirishnomalar</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <>
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 p-8 text-white relative"
              >
                <div className="relative z-10">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                        <Badge className="bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30 rounded-xl">
                          <Activity className="h-3 w-3 mr-1" />
                          3 Faol Kurs
                        </Badge>
                      </div>
                      <h2 className="text-3xl font-bold">
                        Xush kelibsiz! 👋
                      </h2>
                      <p className="max-w-[600px] text-white/80">
                        Bugun 15 ta o'quvchi darsda qatnashdi, 7.2M UZS to'lov qabul qilindi. Davomad ko'rsatkichi 92% ni tashkil etdi.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          className="rounded-2xl bg-white text-purple-700 hover:bg-white/90"
                          onClick={() => setIsAddStudentDialogOpen(true)}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Yangi O'quvchi Qo'shish
                        </Button>
                        <Button variant="outline" className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          To'lov Qabul Qilish
                        </Button>
                        <Button variant="outline" className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Yangi Kurs
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {adminAnalytics.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 rounded-xl bg-primary/10">
                            {item.icon}
                          </div>
                          <Badge variant={item.trend === "up" ? "default" : "secondary"} className="rounded-xl">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {item.change}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold">{item.value}</p>
                          <p className="text-sm text-muted-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                          <Progress value={item.percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {item.percentage}% dan {item.target} maqsad
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Recent Activities */}
                <div className="lg:col-span-2">
                  <Card className="rounded-3xl border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">Oxirgi Faoliyatlar</CardTitle>
                          <CardDescription>Eng so'nggi o'zgarishlar va yangilanishlar</CardDescription>
                        </div>
                        <Button variant="outline" className="rounded-2xl">
                          <Eye className="mr-2 h-4 w-4" />
                          Barchasini Ko'rish
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                          >
                            <div className={cn("p-2 rounded-xl bg-muted", activity.color)}>
                              {activity.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm">{activity.message}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div>
                  <Card className="rounded-3xl border-2">
                    <CardHeader>
                      <CardTitle className="text-xl">Tezkor Statistika</CardTitle>
                      <CardDescription>Asosiy ko'rsatkichlar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Bugungi davomad</span>
                          <span className="font-semibold">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">To'lovlar (oylik)</span>
                          <span className="font-semibold text-green-600">90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Kurs jarayoni</span>
                          <span className="font-semibold text-blue-600">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="pt-4 border-t space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Jami daromad</span>
                          <span className="font-semibold text-emerald-600">45.2M UZS</span>
                        </div>
                        <Button variant="secondary" className="w-full rounded-2xl">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Batafsil Hisobot
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Active Courses */}
              <Card className="rounded-3xl border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Faol Kurslar</CardTitle>
                      <CardDescription>Hozirda olib borilayotgan kurslar</CardDescription>
                    </div>
                    <Button variant="outline" className="rounded-2xl">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Barcha Kurslar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-base leading-tight truncate">{course.title}</CardTitle>
                                {getStatusBadge(course.status)}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-3 space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>O'quvchilar: {course.students}/{course.totalStudents}</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Davomiyligi</p>
                                <p className="font-semibold">{course.duration}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Daraja</p>
                                <p className="font-semibold">{course.level}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Sertifikatlar</p>
                                <p className="font-semibold">{course.certificates}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Kategoriya</p>
                                <p className="font-semibold">{course.category}</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex gap-2 pt-3">
                            <Button variant="secondary" className="flex-1 rounded-2xl text-xs">
                              <Eye className="mr-1 h-3 w-3" />
                              Boshqarish
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-2xl">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              {/* Courses Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Mening Kurslarim</h2>
                  <p className="text-muted-foreground">Barcha kurslarni boshqaring va nazorat qiling</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr
                  </Button>
                  <Button className="rounded-2xl">
                    <Plus className="mr-2 h-4 w-4" />
                    Yangi Kurs
                  </Button>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {adminCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                              <BookOpen className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                              {getStatusBadge(course.status)}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">O'quvchilar</span>
                            <span className="font-medium">{course.students}/{course.totalStudents}</span>
                          </div>
                          <Progress value={(course.students / course.totalStudents) * 100} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Kurs jarayoni</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Boshlanish</p>
                            <p className="font-medium text-xs">{course.startDate}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Tugash</p>
                            <p className="font-medium text-xs">{course.endDate}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                          <div className="text-center">
                            <p className="text-lg font-bold text-blue-600">{course.certificates}</p>
                            <p className="text-xs text-muted-foreground">Sertifikatlar</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-green-600">{course.duration}</p>
                            <p className="text-xs text-muted-foreground">Davomiyligi</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-purple-600">{course.level}</p>
                            <p className="text-xs text-muted-foreground">Daraja</p>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-2">
                        <Button variant="secondary" className="flex-1 rounded-2xl">
                          <Eye className="mr-2 h-4 w-4" />
                          Boshqarish
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-2xl">
                          <Edit className="mr-2 h-4 w-4" />
                          Tahrirlash
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              {/* Students Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">O'quvchilar Boshqaruvi</h2>
                  <p className="text-muted-foreground">Barcha o'quvchilar ro'yxati va ularning rivojlanishi</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr
                  </Button>
                  <Button variant="outline" className="rounded-2xl">
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    SMS Yuborish
                  </Button>
                  <Button variant="outline" className="rounded-2xl">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button 
                    className="rounded-2xl"
                    onClick={() => setIsAddStudentDialogOpen(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Yangi O'quvchi
                  </Button>
                </div>
              </div>

              {/* Student Stats Quick View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Jami O'quvchilar", value: "247", icon: <Users className="h-4 w-4" />, color: "text-blue-600", bgColor: "bg-blue-50" },
                  { label: "Faol", value: "198", icon: <CheckCircle className="h-4 w-4" />, color: "text-green-600", bgColor: "bg-green-50" },
                  { label: "To'lovda qarzdor", value: "49", icon: <AlertCircle className="h-4 w-4" />, color: "text-orange-600", bgColor: "bg-orange-50" },
                  { label: "Tugatganlar", value: "89", icon: <Award className="h-4 w-4" />, color: "text-purple-600", bgColor: "bg-purple-50" },
                ].map((stat, index) => (
                  <Card key={index} className="rounded-3xl border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-xl", stat.bgColor, stat.color)}>
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Students Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{formatInitials(student.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base leading-tight truncate">{student.name}</CardTitle>
                            {getStatusBadge(student.status)}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Kurs</p>
                          <p className="font-medium text-sm">{student.course}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rivojlanish</span>
                            <span className="font-medium">{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Davomad</p>
                            <p className="font-semibold">{student.attendance}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Sertifikatlar</p>
                            <p className="font-semibold">{student.certificates}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Oxirgi faollik</p>
                          <p className="font-medium text-xs">{student.lastActivity}</p>
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-2 pt-3">
                        <Button variant="secondary" className="flex-1 rounded-2xl text-xs">
                          <Eye className="mr-1 h-3 w-3" />
                          Profil
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl" title="SMS yuborish">
                          <SendHorizontal className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl" title="Tahrirlash">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl text-red-600 hover:bg-red-50" title="O'chirish">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-6">
              {/* Financial Dashboard Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Moliyaviy Boshqaruv</h2>
                  <p className="text-muted-foreground">To'lovlar, daromad va xarajatlarni kuzatib boring</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr
                  </Button>
                  <Button className="rounded-2xl">
                    <Plus className="mr-2 h-4 w-4" />
                    Yangi To'lov
                  </Button>
                </div>
              </div>

              {/* Financial Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: "Oylik Daromad", 
                    value: "45,200,000", 
                    unit: "UZS",
                    change: "+12%", 
                    icon: <TrendingUp className="h-5 w-5" />, 
                    color: "text-green-600",
                    bgColor: "bg-green-50"
                  },
                  { 
                    title: "To'langan O'quvchilar", 
                    value: "198", 
                    unit: "ta",
                    change: "+24", 
                    icon: <Users className="h-5 w-5" />, 
                    color: "text-blue-600",
                    bgColor: "bg-blue-50"
                  },
                  { 
                    title: "Kutilayotgan To'lovlar", 
                    value: "12,500,000", 
                    unit: "UZS",
                    change: "49 ta", 
                    icon: <Clock className="h-5 w-5" />, 
                    color: "text-orange-600",
                    bgColor: "bg-orange-50"
                  },
                  { 
                    title: "Oylik Xarajatlar", 
                    value: "18,750,000", 
                    unit: "UZS",
                    change: "-5%", 
                    icon: <AlertCircle className="h-5 w-5" />, 
                    color: "text-red-600",
                    bgColor: "bg-red-50"
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={cn("p-3 rounded-2xl", stat.bgColor, stat.color)}>
                            {stat.icon}
                          </div>
                          <Badge variant="secondary" className="rounded-xl">
                            {stat.change}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <span className="text-sm text-muted-foreground">{stat.unit}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Recent Payments and Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Payments */}
                <Card className="rounded-3xl border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Oxirgi To'lovlar</CardTitle>
                        <CardDescription>Eng so'nggi qabul qilingan to'lovlar</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-2xl">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Abdullayev Jasur", course: "Frontend Development", amount: "2,500,000", status: "paid", time: "1 soat oldin" },
                        { name: "Karimova Malika", course: "Digital Marketing", amount: "2,200,000", status: "paid", time: "3 soat oldin" },
                        { name: "Rakhmonov Bekzod", course: "Graphic Design", amount: "2,500,000", status: "pending", time: "5 soat oldin" },
                        { name: "Nazarova Dilnoza", course: "Frontend Development", amount: "2,500,000", status: "paid", time: "1 kun oldin" },
                      ].map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-2xl border hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{payment.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{payment.name}</p>
                              <p className="text-xs text-muted-foreground">{payment.course}</p>
                              <p className="text-xs text-muted-foreground">{payment.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">{payment.amount} UZS</p>
                            <Badge variant={payment.status === "paid" ? "default" : "secondary"} className="rounded-xl text-xs">
                              {payment.status === "paid" ? "To'landi" : "Kutilmoqda"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full rounded-2xl">
                      <Eye className="mr-2 h-4 w-4" />
                      Barcha To'lovlar
                    </Button>
                  </CardFooter>
                </Card>

                {/* Payment Statistics */}
                <Card className="rounded-3xl border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">To'lovlar Statistikasi</CardTitle>
                    <CardDescription>Oylik to'lovlar tahlili</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { month: "Yanvar", paid: 38500000, pending: 8500000 },
                      { month: "Fevral", paid: 42000000, pending: 7200000 },
                      { month: "Mart", paid: 45200000, pending: 6800000 },
                      { month: "Aprel", paid: 41000000, pending: 9500000 },
                    ].map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{month.month}</span>
                          <span className="text-muted-foreground">
                            {(month.paid / 1000000).toFixed(1)}M / {((month.paid + month.pending) / 1000000).toFixed(1)}M UZS
                          </span>
                        </div>
                        <Progress value={(month.paid / (month.paid + month.pending)) * 100} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="w-full flex justify-between items-center p-4 rounded-2xl bg-green-50 border border-green-200">
                      <span className="text-sm font-medium text-green-700">Sof foyda</span>
                      <span className="text-lg font-bold text-green-700">26.45M UZS</span>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Hisobot Yuklab Olish
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Expenses Breakdown */}
              <Card className="rounded-3xl border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Xarajatlar Taqsimoti</CardTitle>
                      <CardDescription>Oylik xarajatlar bo'yicha batafsil ma'lumot</CardDescription>
                    </div>
                    <Button variant="outline" className="rounded-2xl">
                      <Plus className="mr-2 h-4 w-4" />
                      Xarajat Qo'shish
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { category: "O'qituvchilar maoshi", amount: "12,000,000", percentage: 64, icon: <Users className="h-5 w-5" />, color: "bg-blue-500" },
                      { category: "Ofis va kommunal", amount: "4,500,000", percentage: 24, icon: <Building className="h-5 w-5" />, color: "bg-purple-500" },
                      { category: "Marketing", amount: "2,250,000", percentage: 12, icon: <TrendingUp className="h-5 w-5" />, color: "bg-green-500" },
                    ].map((expense, index) => (
                      <div key={index} className="p-6 rounded-3xl border-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={cn("p-3 rounded-2xl text-white", expense.color)}>
                            {expense.icon}
                          </div>
                          <Badge variant="secondary" className="rounded-xl">
                            {expense.percentage}%
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{expense.category}</p>
                          <p className="text-2xl font-bold">{expense.amount}</p>
                          <p className="text-xs text-muted-foreground">UZS / oy</p>
                        </div>
                        <Progress value={expense.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-6">
              {/* Attendance Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Davomad Boshqaruvi</h2>
                  <p className="text-muted-foreground">O'quvchilar davomadini kuzatib boring va boshqaring</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Calendar className="mr-2 h-4 w-4" />
                    Bugun
                  </Button>
                  <Button className="rounded-2xl">
                    <Plus className="mr-2 h-4 w-4" />
                    Davomatni Belgilash
                  </Button>
                </div>
              </div>

              {/* Attendance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: "Bugungi Davomad", value: "92%", icon: <CheckCircle className="h-5 w-5" />, color: "text-green-600", bgColor: "bg-green-50" },
                  { title: "Jami O'quvchilar", value: "247", icon: <Users className="h-5 w-5" />, color: "text-blue-600", bgColor: "bg-blue-50" },
                  { title: "Kelganlar", value: "227", icon: <UserCheck className="h-5 w-5" />, color: "text-emerald-600", bgColor: "bg-emerald-50" },
                  { title: "Kelmaganlar", value: "20", icon: <XCircle className="h-5 w-5" />, color: "text-red-600", bgColor: "bg-red-50" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={cn("p-3 rounded-2xl", stat.bgColor, stat.color)}>
                            {stat.icon}
                          </div>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Today's Attendance and Weekly Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Attendance */}
                <Card className="rounded-3xl border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Bugungi Davomad</CardTitle>
                    <CardDescription>Dars bo'yicha ishtirok etish</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { course: "Frontend Development", time: "09:00", present: 25, total: 30, status: "active" },
                        { course: "Digital Marketing", time: "11:00", present: 18, total: 20, status: "active" },
                        { course: "Graphic Design", time: "14:00", present: 12, total: 15, status: "upcoming" },
                        { course: "Backend Development", time: "16:00", present: 0, total: 25, status: "upcoming" },
                      ].map((lesson, index) => (
                        <div key={index} className="p-4 rounded-2xl border space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{lesson.course}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock3 className="h-3 w-3" />
                                {lesson.time}
                              </p>
                            </div>
                            <Badge variant={lesson.status === "active" ? "default" : "secondary"} className="rounded-xl">
                              {lesson.status === "active" ? "Davom etmoqda" : "Kutilmoqda"}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Ishtirok</span>
                              <span className="font-medium">{lesson.present}/{lesson.total}</span>
                            </div>
                            <Progress value={(lesson.present / lesson.total) * 100} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full rounded-2xl">
                      <Eye className="mr-2 h-4 w-4" />
                      Batafsil Ko'rish
                    </Button>
                  </CardFooter>
                </Card>

                {/* Weekly Attendance Stats */}
                <Card className="rounded-3xl border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Haftalik Davomad</CardTitle>
                    <CardDescription>Oxirgi 7 kunlik statistika</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { day: "Dushanba", percentage: 95, present: 235, total: 247 },
                      { day: "Seshanba", percentage: 88, present: 217, total: 247 },
                      { day: "Chorshanba", percentage: 92, present: 227, total: 247 },
                      { day: "Payshanba", percentage: 90, present: 222, total: 247 },
                      { day: "Juma", percentage: 85, present: 210, total: 247 },
                    ].map((day, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{day.day}</span>
                          <span className="text-muted-foreground">
                            {day.present}/{day.total} ({day.percentage}%)
                          </span>
                        </div>
                        <Progress value={day.percentage} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="w-full p-4 rounded-2xl bg-blue-50 border border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-700">Haftalik o'rtacha</span>
                        <span className="text-2xl font-bold text-blue-700">90%</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Davomad Hisoboti
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Students with Low Attendance */}
              <Card className="rounded-3xl border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Past Davomad Ko'rsatkichlari</CardTitle>
                      <CardDescription>E'tibor talab qilayotgan o'quvchilar</CardDescription>
                    </div>
                    <Button variant="outline" className="rounded-2xl">
                      <SendHorizontal className="mr-2 h-4 w-4" />
                      SMS Yuborish
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Rakhmonov Bekzod", course: "Frontend Development", attendance: 65, absent: 7, avatar: "/placeholder.svg" },
                      { name: "Tursunov Sherzod", course: "Digital Marketing", attendance: 70, absent: 6, avatar: "/placeholder.svg" },
                      { name: "Aliyeva Nigora", course: "Graphic Design", attendance: 72, absent: 5, avatar: "/placeholder.svg" },
                    ].map((student, index) => (
                      <div key={index} className="p-4 rounded-2xl border space-y-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-red-200">
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.course}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Davomad</span>
                            <span className="font-medium text-red-600">{student.attendance}%</span>
                          </div>
                          <Progress value={student.attendance} className="h-2" />
                          <p className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {student.absent} kun kelmadi
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              {/* Reports Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Hisobotlar va Tahlillar</h2>
                  <p className="text-muted-foreground">O'quv jarayoni va natijalar bo'yicha batafsil ma'lumotlar</p>
                </div>
                <Button className="rounded-2xl">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Hisobot Eksport Qilish
                </Button>
              </div>

              {/* Report Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportCards.map((report, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={cn("p-3 rounded-2xl text-white", report.color)}>
                            {report.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold">{report.title}</h3>
                            <p className="text-sm text-muted-foreground">{report.desc}</p>
                          </div>
                        </div>
                        <Button variant="secondary" className="w-full rounded-2xl">
                          <Eye className="mr-2 h-4 w-4" />
                          Hisobotni Ko'rish
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Settings Header */}
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Sozlamalar</h2>
                <p className="text-muted-foreground">Profilingizni va tizim sozlamalarini boshqaring</p>

                <Card className="max-w-md mx-auto rounded-3xl border-2">
                  <CardContent className="p-8 text-center space-y-4">
                    <Avatar className="mx-auto h-24 w-24 border-4 border-primary/20">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Admin" />
                      <AvatarFallback className="text-xl">AU</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">Admin User</h3>
                      <p className="text-sm text-muted-foreground">IT Academy Tashkent</p>
                      <p className="text-sm text-muted-foreground">admin@itacademy.uz</p>
                    </div>
                    <div className="space-y-3 pt-4">
                      <Button variant="outline" className="w-full rounded-2xl">
                        <Edit className="mr-2 h-4 w-4" />
                        Profilni Tahrirlash
                      </Button>
                      <Button variant="outline" className="w-full rounded-2xl">
                        <Shield className="mr-2 h-4 w-4" />
                        Xavfsizlik
                      </Button>
                      <Button variant="outline" className="w-full rounded-2xl">
                        <Settings className="mr-2 h-4 w-4" />
                        Tizim Sozlamalari
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-2xl text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={onLogout}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Chiqish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Settings Options */}
              <Card className="max-w-md mx-auto rounded-3xl border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Tizim Sozlamalari</CardTitle>
                  <CardDescription>Umumiy platforma sozlamalarini boshqaring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Bildirishnoma Sozlamalari</p>
                    <Button variant="secondary" className="w-full rounded-2xl">
                      <Bell className="mr-2 h-4 w-4" />
                      Bildirishnomalarni Sozlash
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Ma'lumotlar Zahirasi</p>
                    <Button variant="secondary" className="w-full rounded-2xl">
                      <Cloud className="mr-2 h-4 w-4" />
                      Zahira Nusxasini Yaratish
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Tashkilot Ma'lumotlari</p>
                    <Button variant="secondary" className="w-full rounded-2xl">
                      <Building className="mr-2 h-4 w-4" />
                      Tashkilotni Tahrirlash
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Yangi O'quvchi Qo'shish
            </DialogTitle>
            <DialogDescription>
              O'quvchi ma'lumotlarini kiriting. Qo'shilgan sana va vaqt avtomatik aniqlanadi.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Ism Sharifi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Masalan: Abdullayev Jasur Akmalovich"
                value={newStudent.fullName}
                onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Phone Number */}
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Telefon Raqam <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                placeholder="+998 90 123 45 67"
                value={newStudent.phoneNumber}
                onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Passport Number (Optional) */}
            <div className="grid gap-2">
              <Label htmlFor="passportNumber" className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Passport Raqami <span className="text-muted-foreground text-xs">(ixtiyoriy)</span>
              </Label>
              <Input
                id="passportNumber"
                placeholder="AA 1234567"
                value={newStudent.passportNumber}
                onChange={(e) => setNewStudent({ ...newStudent, passportNumber: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Group/Course Selection */}
            <div className="grid gap-2">
              <Label htmlFor="group" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Guruh/Kurs <span className="text-red-500">*</span>
              </Label>
              <Select value={newStudent.group} onValueChange={(value) => setNewStudent({ ...newStudent, group: value })}>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Guruhni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {availableGroups.length > 0 ? (
                    availableGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name} - {group.schedule}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled>
                      Guruhlar yuklanmoqda...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Enroll Date Info */}
            <div className="p-4 rounded-2xl bg-muted/50 border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <Label className="text-sm font-medium">Qo'shilish Sanasi va Vaqti</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleString('uz-UZ', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAddStudentDialogOpen(false)}
              className="rounded-2xl"
            >
              <X className="mr-2 h-4 w-4" />
              Bekor Qilish
            </Button>
            <Button
              onClick={handleAddStudent}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              O'quvchi Qo'shish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}