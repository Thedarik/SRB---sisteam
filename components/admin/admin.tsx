



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
  Info,
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

// Sample data with proper typing - CRM UCHUN (moved to component)

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

type TabType = "dashboard" | "courses" | "students" | "certificates" | "assignments" | "reports" | "settings" | "appearance" | "timetable"

// ✅ ASOSIY O'ZGARISH: Bu yerda export qilish kerak
export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<number>(5)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)
  
  // Add Student Dialog State
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState<boolean>(false)
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    passportNumber: "",
    phoneNumber: "",
    group: "",
    enrollDate: ""
  })
  const [availableGroups, setAvailableGroups] = useState<any[]>([])
  const [studentsData, setStudentsData] = useState<any[]>([])
  const [isLoadingStudents, setIsLoadingStudents] = useState(false)
  const [studentsError, setStudentsError] = useState<string | null>(null)
  const [groupsData, setGroupsData] = useState<any[]>([])
  const [isLoadingGroups, setIsLoadingGroups] = useState(false)
  const [groupsError, setGroupsError] = useState<string | null>(null)
  
  // Edit Group Dialog State
  const [isEditGroupDialogOpen, setIsEditGroupDialogOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<any>(null)
  const [editGroupData, setEditGroupData] = useState({
    name: "",
    course_type: "",
    schedule: "",
    room: "",
    time_slot: "",
    start_date: "",
    end_date: "",
    teacher_name: "",
    max_students: 30,
    status: "active"
  })

  // Edit Student Dialog State
  const [isEditStudentDialogOpen, setIsEditStudentDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any>(null)
  const [editStudentData, setEditStudentData] = useState({
    fullName: "",
    phoneNumber: "",
    passportNumber: "",
    group: "",
    status: "active"
  })

  // View Student Details Dialog State
  const [isViewStudentDialogOpen, setIsViewStudentDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // Time Table State
  const [rooms, setRooms] = useState<any[]>([])
  const [newRoomName, setNewRoomName] = useState("")
  const [isAddingRoom, setIsAddingRoom] = useState(false)
  const [isLoadingRooms, setIsLoadingRooms] = useState(false)
  const [roomsError, setRoomsError] = useState<string | null>(null)
  
  const timeSlots = [
    { start: "08:00", end: "10:00", label: "08:00 - 10:00" },
    { start: "10:00", end: "12:00", label: "10:00 - 12:00" },
    { start: "12:00", end: "14:00", label: "12:00 - 14:00" },
    { start: "14:00", end: "16:00", label: "14:00 - 16:00" },
    { start: "16:00", end: "18:00", label: "16:00 - 18:00" },
    { start: "18:00", end: "20:00", label: "18:00 - 20:00" },
  ]

  // Fetch rooms from Supabase
  const fetchRooms = async () => {
    setIsLoadingRooms(true)
    setRoomsError(null)
    try {
      const response = await fetch('/api/rooms')
      const result = await response.json()

      if (!response.ok) {
        setRoomsError(result.error || 'Ma\'lumotlarni yuklashda xatolik')
        console.error('Xonalarni yuklashda xatolik:', result)
      } else {
        setRooms(result.data || [])
      }
    } catch (error) {
      console.error('Xonalarni yuklashda xatolik:', error)
      setRoomsError('Server bilan bog\'lanishda xatolik')
    } finally {
      setIsLoadingRooms(false)
    }
  }

  // Load rooms on mount
  useEffect(() => {
    fetchRooms()
  }, [])

  // Add new room
  const handleAddRoom = async () => {
    if (!newRoomName.trim()) {
      alert("❌ Xona nomini kiriting!")
      return
    }

    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newRoomName.trim(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(`❌ Xatolik: ${result.error || "Noma'lum xatolik yuz berdi!"}`)
        return
      }

      // Success
      setNewRoomName("")
      setIsAddingRoom(false)
      alert("✅ Xona muvaffaqiyatli qo'shildi!")
      
      // Refresh rooms list
      fetchRooms()
    } catch (error) {
      console.error('Xona qo\'shishda xatolik:', error)
      alert('❌ Server bilan bog\'lanishda xatolik')
    }
  }

  // Delete room
  const handleDeleteRoom = async (roomId: string, roomName: string) => {
    if (!confirm(`"${roomName}" xonasini o'chirmoqchimisiz?`)) {
      return
    }

    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok) {
        alert(`❌ Xatolik: ${result.error || "Noma'lum xatolik yuz berdi!"}`)
        return
      }

      // Success
      alert("✅ Xona muvaffaqiyatli o'chirildi!")
      
      // Refresh rooms list
      fetchRooms()
    } catch (error) {
      console.error('Xonani o\'chirishda xatolik:', error)
      alert('❌ Server bilan bog\'lanishda xatolik')
    }
  }

  // Add Group State (inline form, not dialog)
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    course_type: "",
    schedule: "",
    room: "",
    time_slot: "",
    start_date: "",
    end_date: "",
    teacher_name: "",
    max_students: 30
  })

  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    groupId: "all",
    searchTerm: ""
  })

  // Theme Colors State (localStorage)
  const [themeColors, setThemeColors] = useState({
    primary: "#2563EB",    // blue-600
    secondary: "#9333EA",  // purple-600
    accent: "#16A34A"      // green-600
  })

  // User Saved Presets (localStorage - shaxsiy)
  const [savedPresets, setSavedPresets] = useState<Array<{
    name: string
    colors: typeof themeColors
  }>>([])
  const [presetName, setPresetName] = useState("")

  // New Theme Creation (for Database)
  const [isCreatingTheme, setIsCreatingTheme] = useState(false)
  const [newTheme, setNewTheme] = useState({
    name: "",
    description: "",
    colors: { primary: "#2563EB", secondary: "#9333EA", accent: "#16A34A" }
  })

  // Database Themes (Supabase - umumiy)
  const [databaseThemes, setDatabaseThemes] = useState<Array<{
    id: string
    name: string
    description?: string
    colors: typeof themeColors
    is_default: boolean
  }>>([])
  const [isLoadingThemes, setIsLoadingThemes] = useState(false)

  // Appearance Tab State (Yangi: Tab navigatsiya uchun)
  const [appearanceTab, setAppearanceTab] = useState<"editor" | "presets" | "saved">("editor")

  // Client-side initialization
  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())
    
    // Load theme colors from localStorage
    const savedColors = localStorage.getItem('educrm-theme-colors')
    if (savedColors) {
      try {
        const parsed = JSON.parse(savedColors)
        setThemeColors(parsed)
        console.log('✅ Saqlangan ranglar yuklandi:', parsed)
      } catch (error) {
        console.error('❌ Ranglarni yuklashda xatolik:', error)
      }
    }

    // Load user presets from localStorage
    const savedPresetsData = localStorage.getItem('educrm-user-presets')
    if (savedPresetsData) {
      try {
        const parsed = JSON.parse(savedPresetsData)
        setSavedPresets(parsed)
        console.log('✅ User preset\'lar yuklandi:', parsed.length)
      } catch (error) {
        console.error('❌ Preset\'larni yuklashda xatolik:', error)
      }
    }
  }, [])

  // Real-time clock (only on client)
  useEffect(() => {
    if (!isClient) return
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [isClient])

  // Fetch groups - Unified function
  const fetchGroupsForCourses = async () => {
    setIsLoadingGroups(true)
    setGroupsError(null)
    try {
      const response = await fetch('/api/groups')
      const result = await response.json()
      
      if (result.success) {
        setGroupsData(result.data || [])
        setAvailableGroups(result.data || [])  // Dropdown uchun ham yangilash
        console.log('✅ Guruhlar yuklandi:', result.data.length)
      } else {
        setGroupsError(result.error || 'Ma\'lumotlarni yuklashda xatolik')
        console.error('❌ API xatosi:', result.error)
      }
    } catch (error) {
      console.error('❌ Network xatosi:', error)
      setGroupsError('Server bilan bog\'lanishda xatolik')
    } finally {
      setIsLoadingGroups(false)
    }
  }

  // Load groups on component mount
  useEffect(() => {
    fetchGroupsForCourses()
  }, [])

  // Fetch themes from database
  const fetchDatabaseThemes = async () => {
    setIsLoadingThemes(true)
    try {
      const response = await fetch('/api/themes')
      const result = await response.json()
      
      if (result.success) {
        // Parse colors from TEXT to object
        const parsedThemes = result.data.map((theme: any) => ({
          ...theme,
          colors: typeof theme.colors === 'string' 
            ? JSON.parse(theme.colors) 
            : theme.colors,
          is_default: false // Default value
        }))
        setDatabaseThemes(parsedThemes || [])
        console.log('✅ Database theme\'lar yuklandi:', parsedThemes.length)
      } else {
        console.error('❌ Theme yuklashda xatolik:', result.error)
      }
    } catch (error) {
      console.error('❌ Network xatosi:', error)
    } finally {
      setIsLoadingThemes(false)
    }
  }

  // Load database themes on component mount
  useEffect(() => {
    fetchDatabaseThemes()
  }, [])

  // Fetch students - Real backend data
  const fetchStudents = async () => {
    setIsLoadingStudents(true)
    setStudentsError(null)
    try {
      const response = await fetch('/api/students')
      const result = await response.json()
      
      if (result.success) {
        setStudentsData(result.data || [])
        console.log('✅ O\'quvchilar yuklandi:', result.data.length)
      } else {
        setStudentsError(result.error || 'Ma\'lumotlarni yuklashda xatolik')
        console.error('❌ API xatosi:', result.error)
      }
    } catch (error) {
      console.error('❌ Network xatosi:', error)
      setStudentsError('Server bilan bog\'lanishda xatolik')
    } finally {
      setIsLoadingStudents(false)
    }
  }

  // Load students on component mount
  useEffect(() => {
    fetchStudents()
  }, [])

  // Open Edit Group Dialog
  const openEditGroupDialog = (group: any) => {
    setEditingGroup(group)
    setEditGroupData({
      name: group.name || "",
      course_type: group.course_type || "",
      schedule: group.schedule || "",
      room: group.room || "",
      time_slot: group.time_slot || "",
      start_date: group.start_date || "",
      end_date: group.end_date || "",
      teacher_name: group.teacher_name || "",
      max_students: group.max_students || 30,
      status: group.status || "active"
    })
    setIsEditGroupDialogOpen(true)
  }

  // Handle Edit Group
  const handleEditGroup = async () => {
    // Frontend validation
    if (!editGroupData.name?.trim()) {
      alert("❌ Guruh nomini kiriting!")
      return
    }

    if (!editGroupData.course_type?.trim()) {
      alert("❌ Kurs turini kiriting!")
      return
    }

    if (!editingGroup) {
      alert("❌ Tahrirlash uchun guruh tanlanmagan!")
      return
    }

    try {
      const response = await fetch(`/api/groups/${editingGroup.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editGroupData.name.trim(),
          course_type: editGroupData.course_type.trim(),
          schedule: editGroupData.schedule?.trim() || null,
          room: editGroupData.room?.trim() || null,
          time_slot: editGroupData.time_slot?.trim() || null,
          start_date: editGroupData.start_date || null,
          end_date: editGroupData.end_date || null,
          teacher_name: editGroupData.teacher_name?.trim() || null,
          max_students: editGroupData.max_students || 30,
          status: editGroupData.status || "active"
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("❌ Server xatosi:", result)
        alert(`❌ Xatolik: ${result.error || "Noma'lum xatolik yuz berdi!"}`)
        return
      }

      console.log("✅ Guruh muvaffaqiyatli yangilandi:", result.data)

      // Reset form and close dialog
      setEditingGroup(null)
      setEditGroupData({
        name: "",
        course_type: "",
        schedule: "",
        room: "",
        time_slot: "",
        start_date: "",
        end_date: "",
        teacher_name: "",
        max_students: 30,
        status: "active"
      })
      setIsEditGroupDialogOpen(false)
      
      // Success message
      alert("✅ Guruh muvaffaqiyatli yangilandi!")
      
      // Refresh groups list
      fetchGroupsForCourses()
    } catch (error) {
      console.error("❌ Network error:", error)
      alert("❌ Server bilan bog'lanishda xatolik! Iltimos, internet aloqangizni tekshiring.")
    }
  }

  // Open Edit Student Dialog
  const openEditStudentDialog = (student: any) => {
    setEditingStudent(student)
    setEditStudentData({
      fullName: student.full_name || "",
      phoneNumber: student.phone_number || "",
      passportNumber: student.passport_number || "",
      group: student.group_id || "",
      status: student.status || "active"
    })
    setIsEditStudentDialogOpen(true)
  }

  // Handle Edit Student
  const handleEditStudent = async () => {
    // Frontend validation
    if (!editStudentData.fullName?.trim()) {
      alert("❌ Ism sharifni kiriting!")
      return
    }

    if (!editStudentData.phoneNumber?.trim()) {
      alert("❌ Telefon raqamni kiriting!")
      return
    }

    if (!editStudentData.group) {
      alert("❌ Guruhni tanlang!")
      return
    }

    if (!editingStudent) {
      alert("❌ Tahrirlash uchun o'quvchi tanlanmagan!")
      return
    }

    try {
      const response = await fetch(`/api/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: editStudentData.fullName.trim(),
          phone_number: editStudentData.phoneNumber.trim(),
          passport_number: editStudentData.passportNumber?.trim() || null,
          group_id: editStudentData.group,
          status: editStudentData.status
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("❌ Server xatosi:", result)
        alert(`❌ Xatolik: ${result.error || "Noma'lum xatolik yuz berdi!"}`)
        return
      }

      console.log("✅ O'quvchi muvaffaqiyatli yangilandi:", result.data)

      // Reset form and close dialog
      setEditingStudent(null)
      setEditStudentData({
        fullName: "",
        phoneNumber: "",
        passportNumber: "",
        group: "",
        status: "active"
      })
      setIsEditStudentDialogOpen(false)
      
      // Success message
      alert("✅ O'quvchi muvaffaqiyatli yangilandi!")
      
      // Refresh students and groups lists
      fetchStudents()
      fetchGroupsForCourses()
    } catch (error) {
      console.error("❌ Network error:", error)
      alert("❌ Server bilan bog'lanishda xatolik! Iltimos, internet aloqangizni tekshiring.")
    }
  }

  // Handle Add Group
  const handleAddGroup = async () => {
    // Frontend validation
    if (!newGroup.name?.trim()) {
      alert("❌ Guruh nomini kiriting!")
      return
    }

    if (!newGroup.course_type?.trim()) {
      alert("❌ Kurs turini kiriting!")
      return
    }

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newGroup.name.trim(),
          course_type: newGroup.course_type.trim(),
          schedule: newGroup.schedule?.trim() || null,
          room: newGroup.room?.trim() || null,
          time_slot: newGroup.time_slot?.trim() || null,
          start_date: newGroup.start_date || null,
          end_date: newGroup.end_date || null,
          teacher_name: newGroup.teacher_name?.trim() || null,
          max_students: newGroup.max_students || 30,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("❌ Server xatosi:", result)
        alert(`❌ Xatolik: ${result.error || "Noma'lum xatolik yuz berdi!"}`)
        return
      }

      console.log("✅ Yangi guruh qo'shildi:", result.data)

      // Reset form
      setNewGroup({
        name: "",
        course_type: "",
        schedule: "",
        room: "",
        time_slot: "",
        start_date: "",
        end_date: "",
        teacher_name: "",
        max_students: 30
      })
      setIsAddingGroup(false)
      
      // Success message
      alert("✅ Guruh muvaffaqiyatli qo'shildi!")
      
      // Refresh groups list
      fetchGroupsForCourses()
    } catch (error) {
      console.error("❌ Network error:", error)
      alert("❌ Server bilan bog'lanishda xatolik! Iltimos, internet aloqangizni tekshiring.")
    }
  }

  // Handle Delete Student
  const handleDeleteStudent = async (student: any) => {
    // Confirmation
    const confirmed = confirm(
      `❓ Haqiqatan ham "${student.full_name}" ni o'chirmoqchimisiz?\n\n` +
      `Bu o'quvchining barcha ma'lumotlari o'chiriladi va qayta tiklab bo'lmaydi.`
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(`/api/students/${student.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("❌ Server xatosi:", result)
        alert(`❌ Xatolik: ${result.error || "Noma'lum xatolik yuz berdi!"}`)
        return
      }

      console.log("✅ O'quvchi muvaffaqiyatli o'chirildi")

      // Success message
      alert("✅ O'quvchi muvaffaqiyatli o'chirildi!")
      
      // Refresh students and groups lists
      fetchStudents()
      fetchGroupsForCourses()
    } catch (error) {
      console.error("❌ Network error:", error)
      alert("❌ Server bilan bog'lanishda xatolik! Iltimos, internet aloqangizni tekshiring.")
    }
  }

  // Handle Add Student
  const handleAddStudent = async () => {
    // Frontend validation
    if (!newStudent.fullName?.trim()) {
      alert("❌ Ism sharifni kiriting!")
      return
    }

    if (!newStudent.phoneNumber?.trim()) {
      alert("❌ Telefon raqamni kiriting!")
      return
    }

    if (!newStudent.group) {
      alert("❌ Guruhni tanlang!")
      return
    }

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: newStudent.fullName.trim(),
          phone_number: newStudent.phoneNumber.trim(),
          passport_number: newStudent.passportNumber?.trim() || null,
          group_id: newStudent.group,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        // User-friendly error messages
        console.error("❌ Server xatosi:", result)
        alert(`❌ Xatolik: ${result.error || "Noma'lum xatolik yuz berdi!"}`)
        return
      }

      console.log("✅ Yangi o'quvchi qo'shildi:", result.data)

      // Reset form
      setNewStudent({
        fullName: "",
        passportNumber: "",
        phoneNumber: "",
        group: "",
        enrollDate: ""
      })
      setIsAddStudentDialogOpen(false)
      
      // Success message
      alert("✅ O'quvchi muvaffaqiyatli qo'shildi!")
      
      // Refresh students AND groups lists (guruh soni yangilash uchun)
      fetchStudents()
      fetchGroupsForCourses()
    } catch (error) {
      console.error("❌ Network error:", error)
      alert("❌ Server bilan bog'lanishda xatolik! Iltimos, internet aloqangizni tekshiring.")
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
      badge: isClient ? studentsData.length.toString() : "0",
      isActive: activeTab === "students",
      onClick: () => setActiveTab("students")
    },
    {
      title: "Kurslar",
      icon: <BookOpen />,
      badge: isClient ? groupsData.length.toString() : "0",
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
      title: "Dars Jadvali",
      icon: <Calendar />,
      isActive: activeTab === "timetable",
      onClick: () => setActiveTab("timetable")
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

  // Format date to readable Uzbek format
  const formatDate = (dateString: string): string => {
    if (!dateString) return "—"
    
    try {
      const date = new Date(dateString)
      
      // Check if valid date
      if (isNaN(date.getTime())) return "—"
      
      const months = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
      ]
      
      const day = date.getDate()
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      
      return `${day} ${month} ${year}`
    } catch (error) {
      console.error('Date format error:', error)
      return "—"
    }
  }

  // Format date to short format (dd.mm.yyyy)
  const formatDateShort = (dateString: string): string => {
    if (!dateString) return "—"
    
    try {
      const date = new Date(dateString)
      
      if (isNaN(date.getTime())) return "—"
      
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      
      return `${day}.${month}.${year}`
    } catch (error) {
      return "—"
    }
  }

  // Format datetime with time (dd.mm.yyyy HH:MM)
  const formatDateTime = (dateString: string): string => {
    if (!dateString) return "—"
    
    try {
      const date = new Date(dateString)
      
      if (isNaN(date.getTime())) return "—"
      
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      
      return `${day}.${month}.${year} ${hours}:${minutes}`
    } catch (error) {
      return "—"
    }
  }

  // Filter Students
  const getFilteredStudents = () => {
    let filtered = [...studentsData]

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(student => student.status === filters.status)
    }

    // Filter by group
    if (filters.groupId !== "all") {
      filtered = filtered.filter(student => student.group_id === filters.groupId)
    }

    // Filter by search term
    if (filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(student => 
        student.full_name?.toLowerCase().includes(searchLower) ||
        student.phone_number?.toLowerCase().includes(searchLower) ||
        student.passport_number?.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }

  const filteredStudents = getFilteredStudents()

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      status: "all",
      groupId: "all",
      searchTerm: ""
    })
  }

  // Check if filters are active
  const hasActiveFilters = filters.status !== "all" || filters.groupId !== "all" || filters.searchTerm.trim() !== ""

  // Save theme colors to localStorage
  const saveThemeColors = (colors: typeof themeColors) => {
    setThemeColors(colors)
    localStorage.setItem('educrm-theme-colors', JSON.stringify(colors))
    console.log('✅ Ranglar saqlandi:', colors)
    alert('✅ Ranglar muvaffaqiyatli saqlandi!')
  }

  // Reset theme colors to default
  const resetThemeColors = () => {
    const defaultColors = {
      primary: "#2563EB",
      secondary: "#9333EA",
      accent: "#16A34A"
    }
    saveThemeColors(defaultColors)
  }

  // Save current colors as a preset
  const saveAsPreset = () => {
    if (!presetName.trim()) {
      alert("❌ Preset nomini kiriting!")
      return
    }

    const newPreset = {
      name: presetName.trim(),
      colors: { ...themeColors }
    }

    const updatedPresets = [...savedPresets, newPreset]
    setSavedPresets(updatedPresets)
    localStorage.setItem('educrm-user-presets', JSON.stringify(updatedPresets))
    
    setPresetName("")
    alert(`✅ "${newPreset.name}" preset saqlandi!`)
  }

  // Delete a preset
  const deletePreset = (index: number) => {
    const presetName = savedPresets[index].name
    const confirmed = confirm(`❓ "${presetName}" preset'ni o'chirmoqchimisiz?`)
    
    if (!confirmed) return

    const updatedPresets = savedPresets.filter((_, i) => i !== index)
    setSavedPresets(updatedPresets)
    localStorage.setItem('educrm-user-presets', JSON.stringify(updatedPresets))
    
    alert(`✅ "${presetName}" o'chirildi!`)
  }

  // Create New Theme and Save to Database
  const handleCreateTheme = async () => {
    if (!newTheme.name.trim()) {
      alert("❌ Theme nomini kiriting!")
      return
    }

    try {
      const response = await fetch('/api/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTheme.name.trim(),
          colors: newTheme.colors
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Theme yaratishda xatolik')
      }

      const createdTheme = await response.json()
      
      // Refresh database themes
      await fetchDatabaseThemes()
      
      // Reset form
      setNewTheme({
        name: "",
        description: "",
        colors: { primary: "#2563EB", secondary: "#9333EA", accent: "#16A34A" }
      })
      setIsCreatingTheme(false)
      
      alert("✅ Yangi theme database'ga saqlandi!")
    } catch (error) {
      console.error("❌ Theme yaratishda xatolik:", error)
      alert("❌ Theme yaratishda xatolik yuz berdi!")
    }
  }

  // Dynamic analytics data (only calculated on client after data loads)
  const adminAnalytics: AnalyticsData[] = isClient ? [
    {
      name: "Jami O'quvchilar",
      value: studentsData.length,
      change: studentsData.filter(s => s.status === 'active').length,
      trend: "up",
      icon: <Users className="h-4 w-4" />,
      description: "Faol o'quvchilar",
      target: 300,
      percentage: Math.round((studentsData.length / 300) * 100)
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
      name: "Faol Guruhlar",
      value: groupsData.filter(g => g.status === 'active').length,
      change: groupsData.length,
      trend: "up",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Jami guruhlar",
      target: 15,
      percentage: Math.round((groupsData.filter(g => g.status === 'active').length / 15) * 100)
    },
  ] : [
    {
      name: "Jami O'quvchilar",
      value: 0,
      change: 0,
      trend: "up",
      icon: <Users className="h-4 w-4" />,
      description: "Yuklanmoqda...",
      target: 300,
      percentage: 0
    },
    {
      name: "Oylik Daromad",
      value: "0",
      change: "0",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Yuklanmoqda...",
      target: 50,
      percentage: 0
    },
    {
      name: "O'rtacha Davomad",
      value: "0%",
      change: "0%",
      trend: "up",
      icon: <Activity className="h-4 w-4" />,
      description: "Yuklanmoqda...",
      target: 100,
      percentage: 0
    },
    {
      name: "Faol Guruhlar",
      value: 0,
      change: 0,
      trend: "up",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Yuklanmoqda...",
      target: 15,
      percentage: 0
    },
  ]

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
              <div 
                className="flex aspect-square size-12 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{
                  background: `linear-gradient(to bottom right, ${themeColors.primary}, ${themeColors.secondary}, ${themeColors.accent})`
                }}
              >
                <GraduationCap className="size-6" />
              </div>
            <div>
              <h2 className="font-bold text-lg">EduCRM</h2>
              <p className="text-xs text-muted-foreground">O'quv Markazlar CRM Tizimi</p>
            </div>
            </div>

            <div className="text-xs text-muted-foreground mb-3">
              {isClient && currentTime ? (
                `${currentTime.toLocaleTimeString()} • ${currentTime.toLocaleDateString()}`
              ) : (
                '...'
              )}
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
              <h1 
                className="text-xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
                }}
              >
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
                className="mb-8 overflow-hidden rounded-3xl p-8 text-white relative"
                style={{
                  background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary}, ${themeColors.accent})`
                }}
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
                          {isClient ? groupsData.filter(g => g.status === 'active').length : 0} Faol Guruh
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
                      <CardTitle className="text-xl">Faol Guruhlar</CardTitle>
                      <CardDescription>Hozirda olib borilayotgan guruhlar</CardDescription>
                    </div>
                    <Button variant="outline" className="rounded-2xl" onClick={() => setActiveTab("courses")}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Barcha Guruhlar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingGroups ? (
                    <div className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
                    </div>
                  ) : groupsData.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-sm text-muted-foreground">Hali guruhlar yo'q</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groupsData.slice(0, 6).map((group, index) => (
                        <motion.div
                          key={group.id}
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
                                  <CardTitle className="text-base leading-tight truncate">{group.name}</CardTitle>
                                  {getStatusBadge(group.status)}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-3 space-y-3">
                              <p className="text-sm text-muted-foreground">{group.course_type}</p>

                              <div className="space-y-2">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>O'quvchilar: {group.current_students || 0}/{group.max_students || 30}</span>
                                  <span>{Math.round(((group.current_students || 0) / (group.max_students || 30)) * 100)}%</span>
                                </div>
                                <Progress value={((group.current_students || 0) / (group.max_students || 30)) * 100} className="h-2" />
                              </div>

                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Jadval</p>
                                <p className="text-sm font-medium">{group.schedule || "—"}</p>
                              </div>

                              {group.teacher_name && (
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">O'qituvchi</p>
                                  <p className="text-sm font-medium">{group.teacher_name}</p>
                                </div>
                              )}
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
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              {/* Courses Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Guruhlar / Kurslar</h2>
                  <p className="text-muted-foreground">Barcha guruhlarni boshqaring va nazorat qiling</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="rounded-2xl"
                    onClick={fetchGroupsForCourses}
                    disabled={isLoadingGroups}
                  >
                    <RefreshCw className={cn("mr-2 h-4 w-4", isLoadingGroups && "animate-spin")} />
                    Yangilash
                  </Button>
                  <Button variant="outline" className="rounded-2xl">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr
                  </Button>
                  <Button 
                    className="rounded-2xl"
                    onClick={() => setIsAddingGroup(!isAddingGroup)}
                    variant={isAddingGroup ? "default" : "default"}
                  >
                    {isAddingGroup ? (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Bekor Qilish
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Yangi Guruh
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Add Group Form - Inline */}
              <AnimatePresence>
                {isAddingGroup && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-blue-50 to-purple-50">
                      <CardHeader>
                        <CardTitle 
                          className="text-2xl bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
                          }}
                        >
                          ➕ Yangi Guruh Yaratish
                        </CardTitle>
                        <CardDescription>
                          Barcha zarur ma'lumotlarni kiriting. O'quvchilar soni 0 dan boshlanadi.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Group Name */}
                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="newGroupName" className="flex items-center gap-2 text-base">
                              <BookOpen className="h-5 w-5 text-primary" />
                              Guruh Nomi <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="newGroupName"
                              placeholder="Masalan: Frontend Development - Ertalabki"
                              value={newGroup.name}
                              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                              className="rounded-2xl h-12 text-base"
                            />
                          </div>

                          {/* Course Type */}
                          <div className="space-y-2">
                            <Label htmlFor="newCourseType" className="flex items-center gap-2 text-base">
                              <GraduationCap className="h-5 w-5 text-primary" />
                              Kurs Turi <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="newCourseType"
                              placeholder="Masalan: Frontend Development"
                              value={newGroup.course_type}
                              onChange={(e) => setNewGroup({ ...newGroup, course_type: e.target.value })}
                              className="rounded-2xl h-12"
                            />
                          </div>

                          {/* Max Students */}
                          <div className="space-y-2">
                            <Label htmlFor="newMaxStudents" className="flex items-center gap-2 text-base">
                              <Users className="h-5 w-5 text-primary" />
                              Maksimal O'quvchilar
                            </Label>
                            <Input
                              id="newMaxStudents"
                              type="number"
                              min="1"
                              max="100"
                              value={newGroup.max_students}
                              onChange={(e) => setNewGroup({ ...newGroup, max_students: parseInt(e.target.value) || 30 })}
                              className="rounded-2xl h-12"
                            />
                          </div>

                          {/* Room Selection */}
                          <div className="space-y-2">
                            <Label htmlFor="newRoom" className="flex items-center gap-2 text-base">
                              <Building className="h-5 w-5 text-primary" />
                              Xona
                            </Label>
                            <Select 
                              value={newGroup.room} 
                              onValueChange={(value) => setNewGroup({ ...newGroup, room: value })}
                            >
                              <SelectTrigger className="rounded-2xl h-12">
                                <SelectValue placeholder="Xonani tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                {rooms.length > 0 ? (
                                  rooms.map((room) => (
                                    <SelectItem key={room.id} value={room.name}>
                                      {room.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="none" disabled>
                                    Avval xona qo'shing
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Time Slot Selection */}
                          <div className="space-y-2">
                            <Label htmlFor="newTimeSlot" className="flex items-center gap-2 text-base">
                              <Clock className="h-5 w-5 text-primary" />
                              Dars Vaqti
                            </Label>
                            <Select 
                              value={newGroup.time_slot} 
                              onValueChange={(value) => setNewGroup({ ...newGroup, time_slot: value })}
                            >
                              <SelectTrigger className="rounded-2xl h-12">
                                <SelectValue placeholder="Vaqtni tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot.label} value={slot.label}>
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Schedule (auto-generated or manual) */}
                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="newSchedule" className="flex items-center gap-2 text-base">
                              <CalendarIcon className="h-5 w-5 text-primary" />
                              Kunlar (ixtiyoriy)
                            </Label>
                            <Input
                              id="newSchedule"
                              placeholder="Masalan: Dush-Chor-Juma"
                              value={newGroup.schedule}
                              onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
                              className="rounded-2xl h-12"
                            />
                          </div>

                          {/* Teacher Name */}
                          <div className="space-y-2">
                            <Label htmlFor="newTeacherName" className="flex items-center gap-2 text-base">
                              <User className="h-5 w-5 text-primary" />
                              O'qituvchi
                            </Label>
                            <Input
                              id="newTeacherName"
                              placeholder="Masalan: Rustam Toshmatov"
                              value={newGroup.teacher_name}
                              onChange={(e) => setNewGroup({ ...newGroup, teacher_name: e.target.value })}
                              className="rounded-2xl h-12"
                            />
                          </div>

                          {/* Dates */}
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-base">
                              <CalendarIcon className="h-5 w-5 text-primary" />
                              Sanalar
                            </Label>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="newStartDate" className="text-xs text-muted-foreground">Boshlanish</Label>
                                <Input
                                  id="newStartDate"
                                  type="date"
                                  value={newGroup.start_date}
                                  onChange={(e) => setNewGroup({ ...newGroup, start_date: e.target.value })}
                                  className="rounded-xl mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="newEndDate" className="text-xs text-muted-foreground">Tugash</Label>
                                <Input
                                  id="newEndDate"
                                  type="date"
                                  value={newGroup.end_date}
                                  onChange={(e) => setNewGroup({ ...newGroup, end_date: e.target.value })}
                                  className="rounded-xl mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsAddingGroup(false)
                              setNewGroup({
                                name: "",
                                course_type: "",
                                schedule: "",
                                room: "",
                                time_slot: "",
                                start_date: "",
                                end_date: "",
                                teacher_name: "",
                                max_students: 30
                              })
                            }}
                            className="flex-1 rounded-2xl h-12"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Bekor Qilish
                          </Button>
                          <Button
                            onClick={handleAddGroup}
                            className="flex-1 rounded-2xl h-12 text-white hover:opacity-90 transition-opacity"
                            style={{
                              background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
                            }}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Guruh Yaratish
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading State */}
              {isLoadingGroups && !isAddingGroup && (
                <div className="text-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Guruhlar yuklanmoqda...</p>
                </div>
              )}

              {/* Error State */}
              {groupsError && (
                <Card className="rounded-3xl border-2 border-red-200 bg-red-50">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-red-900 mb-2">Xatolik yuz berdi</h3>
                    <p className="text-red-700 mb-4">{groupsError}</p>
                    <Button onClick={fetchGroupsForCourses} className="rounded-2xl">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Qayta urinish
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Empty State */}
              {!isLoadingGroups && !groupsError && groupsData.length === 0 && (
                <Card className="rounded-3xl border-2">
                  <CardContent className="p-12 text-center">
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-semibold text-xl mb-2">Hali guruhlar yo'q</h3>
                    <p className="text-muted-foreground mb-6">Birinchi guruhni qo'shish uchun yuqoridagi tugmani bosing</p>
                    <Button className="rounded-2xl">
                      <Plus className="mr-2 h-4 w-4" />
                      Birinchi Guruhni Qo'shish
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Courses Grid - Real Data */}
              {!isLoadingGroups && !groupsError && groupsData.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {groupsData.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-8 w-8 text-primary" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg">{group.name}</CardTitle>
                                {getStatusBadge(group.status)}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Kurs turi:</p>
                            <p className="text-sm font-semibold">{group.course_type}</p>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Schedule */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Dars jadvali</p>
                            <p className="font-medium text-sm">{group.schedule || "Jadval kiritilmagan"}</p>
                          </div>

                          {/* Students Progress */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">O'quvchilar</span>
                              <span className="font-medium">
                                {group.current_students || 0} / {group.max_students || 30}
                              </span>
                            </div>
                            <Progress 
                              value={((group.current_students || 0) / (group.max_students || 30)) * 100} 
                              className="h-2" 
                            />
                          </div>

                          {/* Dates */}
                          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Boshlanish</p>
                              <p className="font-medium text-xs">
                                {formatDateShort(group.start_date)}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Tugash</p>
                              <p className="font-medium text-xs">
                                {formatDateShort(group.end_date)}
                              </p>
                            </div>
                          </div>

                          {/* Teacher */}
                          {group.teacher_name && (
                            <div className="pt-2 border-t">
                              <p className="text-sm text-muted-foreground">O'qituvchi</p>
                              <p className="font-medium text-sm">{group.teacher_name}</p>
                            </div>
                          )}
                        </CardContent>

                        <CardFooter className="flex gap-2">
                          <Button variant="secondary" className="flex-1 rounded-2xl">
                            <Eye className="mr-2 h-4 w-4" />
                            Boshqarish
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 rounded-2xl"
                            onClick={() => openEditGroupDialog(group)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Tahrirlash
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
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
                  <Button 
                    variant="outline" 
                    className="rounded-2xl"
                    onClick={fetchStudents}
                    disabled={isLoadingStudents}
                  >
                    <RefreshCw className={cn("mr-2 h-4 w-4", isLoadingStudents && "animate-spin")} />
                    Yangilash
                  </Button>
                  <Button 
                    variant={hasActiveFilters ? "default" : "outline"} 
                    className="rounded-2xl"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr {hasActiveFilters && `(${filteredStudents.length})`}
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

              {/* Filter Panel */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Card className="rounded-3xl border-2 border-primary/20 bg-primary/5">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-lg">Filtrlar</h3>
                          </div>
                          {hasActiveFilters && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={resetFilters}
                              className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Tozalash
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Search */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Qidirish</Label>
                            <div className="relative">
                              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Ism, telefon yoki passport..."
                                value={filters.searchTerm}
                                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                                className="rounded-2xl pl-9"
                              />
                            </div>
                          </div>

                          {/* Status Filter */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Status</Label>
                            <Select 
                              value={filters.status} 
                              onValueChange={(value) => setFilters({ ...filters, status: value })}
                            >
                              <SelectTrigger className="rounded-2xl">
                                <SelectValue placeholder="Statusni tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Barchasi</SelectItem>
                                <SelectItem value="active">Faol</SelectItem>
                                <SelectItem value="inactive">Nofaol</SelectItem>
                                <SelectItem value="graduated">Bitirgan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Group Filter */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Guruh</Label>
                            <Select 
                              value={filters.groupId} 
                              onValueChange={(value) => setFilters({ ...filters, groupId: value })}
                            >
                              <SelectTrigger className="rounded-2xl">
                                <SelectValue placeholder="Guruhni tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Barcha guruhlar</SelectItem>
                                {availableGroups.map((group) => (
                                  <SelectItem key={group.id} value={group.id}>
                                    {group.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Filter Results Info */}
                        {hasActiveFilters && (
                          <div className="mt-4 p-3 rounded-2xl bg-background border">
                            <p className="text-sm text-muted-foreground">
                              <strong className="text-foreground">{filteredStudents.length} ta natija</strong> topildi 
                              {filters.status !== "all" && ` • Status: ${filters.status}`}
                              {filters.groupId !== "all" && ` • Guruh tanlangan`}
                              {filters.searchTerm && ` • Qidiruv: "${filters.searchTerm}"`}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Student Stats Quick View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { 
                    label: hasActiveFilters ? "Ko'rsatilmoqda" : "Jami O'quvchilar", 
                    value: filteredStudents.length.toString(), 
                    icon: <Users className="h-4 w-4" />, 
                    color: "text-blue-600", 
                    bgColor: "bg-blue-50" 
                  },
                  { 
                    label: "Faol", 
                    value: filteredStudents.filter(s => s.status === 'active').length.toString(), 
                    icon: <CheckCircle className="h-4 w-4" />, 
                    color: "text-green-600", 
                    bgColor: "bg-green-50" 
                  },
                  { 
                    label: "Nofaol", 
                    value: filteredStudents.filter(s => s.status === 'inactive').length.toString(), 
                    icon: <AlertCircle className="h-4 w-4" />, 
                    color: "text-orange-600", 
                    bgColor: "bg-orange-50" 
                  },
                  { 
                    label: "Bitirganlar", 
                    value: filteredStudents.filter(s => s.status === 'graduated').length.toString(), 
                    icon: <Award className="h-4 w-4" />, 
                    color: "text-purple-600", 
                    bgColor: "bg-purple-50" 
                  },
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

              {/* Loading State */}
              {isLoadingStudents && (
                <div className="text-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">O'quvchilar yuklanmoqda...</p>
                </div>
              )}

              {/* Error State */}
              {studentsError && (
                <Card className="rounded-3xl border-2 border-red-200 bg-red-50">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-red-900 mb-2">Xatolik yuz berdi</h3>
                    <p className="text-red-700 mb-4">{studentsError}</p>
                    <Button onClick={fetchStudents} className="rounded-2xl">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Qayta urinish
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Empty State */}
              {!isLoadingStudents && !studentsError && studentsData.length === 0 && (
                <Card className="rounded-3xl border-2">
                  <CardContent className="p-12 text-center">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-semibold text-xl mb-2">Hali o'quvchilar yo'q</h3>
                    <p className="text-muted-foreground mb-6">Birinchi o'quvchini qo'shish uchun yuqoridagi tugmani bosing</p>
                    <Button onClick={() => setIsAddStudentDialogOpen(true)} className="rounded-2xl">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Birinchi O'quvchini Qo'shish
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Students Grid - Real Data */}
              {!isLoadingStudents && !studentsError && studentsData.length > 0 && (
                <>
                  {/* Filter Active Badge */}
                  {hasActiveFilters && (
                    <div className="flex items-center gap-2 p-4 rounded-2xl bg-primary/10 border-2 border-primary/20">
                      <Filter className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        {filteredStudents.length} ta o'quvchi topildi
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={resetFilters}
                        className="ml-auto rounded-xl"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Filtrni Bekor Qilish
                      </Button>
                    </div>
                  )}

                  {filteredStudents.length === 0 ? (
                    <Card className="rounded-3xl border-2">
                      <CardContent className="p-12 text-center">
                        <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="font-semibold text-xl mb-2">Hech narsa topilmadi</h3>
                        <p className="text-muted-foreground mb-6">Filtr shartlariga mos o'quvchi yo'q</p>
                        <Button onClick={resetFilters} variant="outline" className="rounded-2xl">
                          <X className="mr-2 h-4 w-4" />
                          Filtrni Tozalash
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {filteredStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card 
                        className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
                        onClick={() => {
                          setSelectedStudent(student)
                          setIsViewStudentDialogOpen(true)
                        }}
                      >
                        <CardHeader className="pb-2 px-4 pt-4">
                          <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-16 w-16 border-2 border-primary/20">
                              <AvatarFallback className="text-lg">{formatInitials(student.full_name)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center w-full">
                              <CardTitle className="text-sm leading-tight truncate">{student.full_name}</CardTitle>
                              <div className="mt-1 flex justify-center">
                                {getStatusBadge(student.status)}
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-2 px-4 pb-4">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground truncate">{student.phone_number}</p>
                            <p className="text-xs font-medium truncate mt-1">
                              {student.groups?.name || 'Guruhsiz'}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
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

          {activeTab === "appearance" && (
            <div className="space-y-8">
              {/* 🎯 Header with Back Button */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    🎨 Ko'rinish Sozlamalari
                  </h2>
                  <p className="text-muted-foreground">Professional ranglar va gradient'lar bilan dashboardingizni shaxsiylashtering</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("settings")}
                  className="rounded-2xl"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Orqaga
                </Button>
              </div>

              {/* 🎨 HERO: Live Preview (Full Width) */}
              <Card className="rounded-3xl border-2 overflow-hidden shadow-2xl">
                <div 
                  className="relative p-12 text-white transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 50%, ${themeColors.accent} 100%)`
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">Live Preview</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                      Gradient Ko'rinish
                    </h3>
                    
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                      Ranglaringiz real vaqt rejimida yangilanadi. Har bir o'zgarish darhol ko'rinadi.
                    </p>
                    
                    {/* Color Codes Display */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                      <motion.div 
                        className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <p className="text-xs text-white/70 mb-1">Primary</p>
                        <p className="font-mono text-sm font-semibold">{themeColors.primary}</p>
                      </motion.div>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <motion.div 
                        className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <p className="text-xs text-white/70 mb-1">Secondary</p>
                        <p className="font-mono text-sm font-semibold">{themeColors.secondary}</p>
                      </motion.div>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <motion.div 
                        className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <p className="text-xs text-white/70 mb-1">Accent</p>
                        <p className="font-mono text-sm font-semibold">{themeColors.accent}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 📱 TAB NAVIGATION (New Professional Tabs) */}
              <Tabs value={appearanceTab} onValueChange={(v) => setAppearanceTab(v as "editor" | "presets" | "saved")} className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-14 rounded-2xl p-1 bg-muted">
                  <TabsTrigger value="editor" className="rounded-xl text-base">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Rang Tanlash
                  </TabsTrigger>
                  <TabsTrigger value="presets" className="rounded-xl text-base">
                    <Star className="mr-2 h-5 w-5" />
                    Tayyor Shablon
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="rounded-xl text-base">
                    <Bookmark className="mr-2 h-5 w-5" />
                    Mening Ranglarim
                  </TabsTrigger>
                </TabsList>

                {/* 🎨 TAB 1: RANG TANLASH (Color Editor) */}
                <TabsContent value="editor" className="space-y-6 mt-6">
                  <Card className="rounded-3xl border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        Ranglarni Tanlash
                      </CardTitle>
                      <CardDescription>
                        Har bir rang uchun aniq kod yoki color picker ishlatishingiz mumkin. O'zgarishlar darhol ko'rinadi.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Color Pickers Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Primary Color */}
                    <div className="space-y-4 p-6 rounded-2xl border-2 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full ring-4 ring-offset-2" style={{ backgroundColor: themeColors.primary }}></div>
                        <div>
                          <Label className="font-semibold text-base">Asosiy Rang</Label>
                          <p className="text-xs text-muted-foreground">Gradient boshlanishi (chap)</p>
                        </div>
                      </div>
                      <Input
                        type="color"
                        value={themeColors.primary}
                        onChange={(e) => setThemeColors({ ...themeColors, primary: e.target.value })}
                        className="h-20 rounded-2xl cursor-pointer w-full"
                      />
                      <Input
                        type="text"
                        value={themeColors.primary}
                        onChange={(e) => setThemeColors({ ...themeColors, primary: e.target.value })}
                        className="rounded-xl text-center font-mono text-lg"
                        placeholder="#2563EB"
                      />
                    </div>

                    {/* Secondary Color */}
                    <div className="space-y-4 p-6 rounded-2xl border-2 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full ring-4 ring-offset-2" style={{ backgroundColor: themeColors.secondary }}></div>
                        <div>
                          <Label className="font-semibold text-base">O'rta Rang</Label>
                          <p className="text-xs text-muted-foreground">Gradient markazi</p>
                        </div>
                      </div>
                      <Input
                        type="color"
                        value={themeColors.secondary}
                        onChange={(e) => setThemeColors({ ...themeColors, secondary: e.target.value })}
                        className="h-20 rounded-2xl cursor-pointer w-full"
                      />
                      <Input
                        type="text"
                        value={themeColors.secondary}
                        onChange={(e) => setThemeColors({ ...themeColors, secondary: e.target.value })}
                        className="rounded-xl text-center font-mono text-lg"
                        placeholder="#9333EA"
                      />
                    </div>

                    {/* Accent Color */}
                    <div className="space-y-4 p-6 rounded-2xl border-2 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full ring-4 ring-offset-2" style={{ backgroundColor: themeColors.accent }}></div>
                        <div>
                          <Label className="font-semibold text-base">Tugash Rangi</Label>
                          <p className="text-xs text-muted-foreground">Gradient tugashi (o'ng)</p>
                        </div>
                      </div>
                      <Input
                        type="color"
                        value={themeColors.accent}
                        onChange={(e) => setThemeColors({ ...themeColors, accent: e.target.value })}
                        className="h-20 rounded-2xl cursor-pointer w-full"
                      />
                      <Input
                        type="text"
                        value={themeColors.accent}
                        onChange={(e) => setThemeColors({ ...themeColors, accent: e.target.value })}
                        className="rounded-xl text-center font-mono text-lg"
                        placeholder="#16A34A"
                      />
                    </div>
                  </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button
                          variant="outline"
                          onClick={resetThemeColors}
                          className="flex-1 min-w-[200px] rounded-2xl h-12"
                        >
                          <RefreshCw className="mr-2 h-5 w-5" />
                          Standart Ranglar
                        </Button>
                        <Button
                          onClick={saveAsPreset}
                          variant="outline"
                          className="flex-1 min-w-[200px] rounded-2xl h-12"
                          disabled={!presetName.trim()}
                        >
                          <Bookmark className="mr-2 h-5 w-5" />
                          Preset Sifatida Saqlash
                        </Button>
                        <Button
                          onClick={() => saveThemeColors(themeColors)}
                          className="flex-1 min-w-[200px] rounded-2xl h-12 text-white hover:opacity-90 transition-opacity"
                          style={{
                            background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`
                          }}
                        >
                          <Save className="mr-2 h-5 w-5" />
                          Qo'llash va Saqlash
                        </Button>
                      </div>

                      {/* Preset Name Input (appears when save preset clicked) */}
                      {presetName && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <Input
                            type="text"
                            placeholder="Preset nomi, masalan: 'Yozgi Ranglar'..."
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            className="rounded-2xl h-12 text-base"
                            autoFocus
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ⭐ TAB 2: TAYYOR SHABLON (Database Themes) */}
                <TabsContent value="presets" className="space-y-6 mt-6">
                  <Card className="rounded-3xl border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl flex items-center gap-2">
                            <Star className="h-6 w-6 text-yellow-500" />
                            Tayyor Ranglar
                          </CardTitle>
                          <CardDescription>
                            Professional dizaynerlarga mo'ljallangan ranglar to'plami. Birini tanlang va darhol qo'llang.
                          </CardDescription>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={fetchDatabaseThemes}
                          disabled={isLoadingThemes}
                          className="rounded-2xl"
                        >
                          <RefreshCw className={cn("h-4 w-4 mr-2", isLoadingThemes && "animate-spin")} />
                          Yangilash
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isLoadingThemes ? (
                        <div className="text-center py-16">
                          <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                          <p className="text-lg font-medium">Tayyor ranglar yuklanmoqda...</p>
                          <p className="text-sm text-muted-foreground mt-2">Iltimos, kuting</p>
                        </div>
                      ) : databaseThemes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {databaseThemes.map((theme, index) => (
                            <motion.button
                              key={theme.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => {
                                setThemeColors(theme.colors)
                                setAppearanceTab("editor")
                              }}
                              className="group p-5 rounded-2xl border-2 hover:border-primary transition-all relative hover:shadow-xl"
                              title={theme.description || theme.name}
                              whileHover={{ scale: 1.03, y: -4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Gradient Preview */}
                              <div 
                                className="h-16 rounded-xl mb-4 ring-2 ring-offset-2 ring-transparent group-hover:ring-primary/50 transition-all shadow-md" 
                                style={{
                                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`
                                }}
                              >
                                <div className="h-full w-full rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-white font-medium text-sm">Tanlash</span>
                                </div>
                              </div>

                              {/* Theme Info */}
                              <div className="text-left">
                                <p className="text-sm font-semibold truncate mb-1">{theme.name}</p>
                                {theme.description && (
                                  <p className="text-xs text-muted-foreground truncate">{theme.description}</p>
                                )}
                              </div>

                              {/* Default Badge */}
                              {theme.is_default && (
                                <Badge className="absolute top-3 right-3 text-xs">Default</Badge>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-2xl bg-muted/20">
                          <svg className="h-16 w-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                          <p className="text-lg font-medium mb-2">Tayyor ranglar topilmadi</p>
                          <p className="text-sm text-muted-foreground mb-4">Database'dan ranglarni yuklang</p>
                          <Button 
                            variant="outline" 
                            size="lg" 
                            onClick={fetchDatabaseThemes}
                            className="rounded-2xl"
                          >
                            <RefreshCw className="mr-2 h-5 w-5" />
                            Yuklash
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Yangi Rang Yaratish - Faqat Super Adminlar uchun (keyingi versiyada qo'shiladi) */}
                </TabsContent>

                {/* 💾 TAB 3: MENING RANGLARIM (User's Saved Presets) */}
                <TabsContent value="saved" className="space-y-6 mt-6">
                  {savedPresets.length > 0 ? (
                    <Card className="rounded-3xl border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl flex items-center gap-2">
                              <Bookmark className="h-6 w-6 text-blue-500" />
                              Mening Ranglarim
                            </CardTitle>
                            <CardDescription>
                              Siz saqlagan {savedPresets.length} ta shaxsiy preset
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="text-lg px-4 py-2">{savedPresets.length}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {savedPresets.map((preset, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="relative group"
                            >
                              <button
                                onClick={() => {
                                  setThemeColors(preset.colors)
                                  setAppearanceTab("editor")
                                }}
                                className="w-full p-5 rounded-2xl border-2 hover:border-primary transition-all hover:shadow-xl"
                                title={preset.name}
                              >
                                <div 
                                  className="h-16 rounded-xl mb-4 ring-2 ring-offset-2 ring-transparent group-hover:ring-primary/50 transition-all shadow-md" 
                                  style={{
                                    background: `linear-gradient(135deg, ${preset.colors.primary}, ${preset.colors.secondary}, ${preset.colors.accent})`
                                  }}
                                >
                                  <div className="h-full w-full rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-medium text-sm">Tanlash</span>
                                  </div>
                                </div>
                                <p className="text-sm font-semibold truncate mb-1">{preset.name}</p>
                                <p className="text-xs text-muted-foreground">Shaxsiy preset</p>
                              </button>
                              <button
                                onClick={() => deletePreset(index)}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                                title="O'chirish"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="rounded-3xl border-2 border-dashed">
                      <CardContent className="text-center py-16">
                        <Bookmark className="h-20 w-20 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-2xl font-bold mb-2">Hali preset'lar yo'q</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          O'zingizga yoqqan ranglarni preset sifatida saqlang va keyinchalik tez ishlatishingiz mumkin bo'ladi.
                        </p>
                        <Button 
                          onClick={() => setAppearanceTab("editor")}
                          className="rounded-2xl"
                          size="lg"
                        >
                          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                          Rang Tanlashga O'tish
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Settings Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Sozlamalar</h2>
                <p className="text-muted-foreground">Profil va tizim sozlamalarini boshqaring</p>
              </div>

              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Card */}
                <Card className="rounded-3xl border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Profil Ma'lumotlari</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <Avatar className="mx-auto h-24 w-24 border-4 border-primary/20">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Admin" />
                      <AvatarFallback className="text-xl">AU</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">Admin User</h3>
                      <p className="text-sm text-muted-foreground">IT Academy Tashkent</p>
                      <p className="text-sm text-muted-foreground">admin@itacademy.uz</p>
                    </div>
                    <div className="space-y-2 pt-4">
                      <Button variant="outline" className="w-full rounded-2xl">
                        <Edit className="mr-2 h-4 w-4" />
                        Profilni Tahrirlash
                      </Button>
                      <Button variant="outline" className="w-full rounded-2xl">
                        <Shield className="mr-2 h-4 w-4" />
                        Xavfsizlik
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

                {/* System Settings */}
                <Card className="rounded-3xl border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Tizim Sozlamalari</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="default" 
                      className="w-full rounded-2xl justify-start text-white hover:opacity-90 transition-opacity"
                      onClick={() => setActiveTab("appearance")}
                      style={{
                        background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
                      }}
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Ko'rinish Sozlamalari
                    </Button>
                    <Button variant="secondary" className="w-full rounded-2xl justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Bildirishnomalar
                    </Button>
                    <Button variant="secondary" className="w-full rounded-2xl justify-start">
                      <Cloud className="mr-2 h-4 w-4" />
                      Zahira Nusxasi
                    </Button>
                    <Button variant="secondary" className="w-full rounded-2xl justify-start">
                      <Building className="mr-2 h-4 w-4" />
                      Tashkilot Ma'lumotlari
                    </Button>
                    <Button variant="secondary" className="w-full rounded-2xl justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Umumiy Sozlamalar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* TIME TABLE TAB */}
          {activeTab === "timetable" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">📅 Dars Jadvali</h2>
                  <p className="text-muted-foreground">Xonalar va dars vaqtlari jadvali - bo'sh xonalarni topish oson!</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Download className="mr-2 h-4 w-4" />
                    Excel yuklab olish
                  </Button>
                </div>
              </div>

              {/* Rooms Management */}
              <Card className="rounded-3xl border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">🏢 Xonalar Boshqaruvi</CardTitle>
                      <CardDescription>Oquv markazingizdagi xonalarni qo'shing va boshqaring</CardDescription>
                    </div>
                    <Button 
                      onClick={() => setIsAddingRoom(true)}
                      className="rounded-2xl"
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Xona Qo'shish
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {rooms.length === 0 ? (
                    <div className="text-center py-8">
                      <Building className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground mb-4">Hali xona qo'shilmagan</p>
                      <Button onClick={() => setIsAddingRoom(true)} variant="outline" className="rounded-2xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Birinchi Xonani Qo'shing
                      </Button>
                    </div>
                  ) : (
                    <>
                      {/* Add Room Form */}
                      {isAddingRoom && (
                        <div className="mb-4 p-4 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Xona nomi (masalan: Xona 4, A-xona, Katta zal)"
                              value={newRoomName}
                              onChange={(e) => setNewRoomName(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleAddRoom()}
                              className="rounded-2xl"
                              autoFocus
                            />
                            <Button onClick={handleAddRoom} className="rounded-2xl">
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setIsAddingRoom(false)
                                setNewRoomName("")
                              }}
                              className="rounded-2xl"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Rooms List */}
                      <div className="flex flex-wrap gap-2">
                        {rooms.map((room) => (
                          <div 
                            key={room.id}
                            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-muted/50 border-2"
                          >
                            <Building className="h-4 w-4 text-primary" />
                            <span className="font-medium">{room.name}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full hover:bg-red-100 hover:text-red-600"
                              onClick={() => handleDeleteRoom(room.id, room.name)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="rounded-3xl border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-white border-2"></div>
                      <span className="text-sm">Bo'sh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300"></div>
                      <span className="text-sm">Faol guruh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-300"></div>
                      <span className="text-sm">Nofaol</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time Table Grid */}
              <Card className="rounded-3xl border-2 overflow-x-auto">
                <CardContent className="p-0">
                  {rooms.length === 0 ? (
                    <div className="text-center py-12">
                      <Building className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="font-semibold text-xl mb-2">Xonalar mavjud emas</h3>
                      <p className="text-muted-foreground mb-6">
                        Jadval ko'rish uchun avval xonalarni qo'shing
                      </p>
                      <Button 
                        onClick={() => setIsAddingRoom(true)}
                        className="rounded-2xl"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Xona Qo'shish
                      </Button>
                    </div>
                  ) : (
                  <div className="min-w-[800px]">
                    {/* Header Row */}
                    <div 
                      className="grid border-b-2"
                      style={{ gridTemplateColumns: `200px repeat(${rooms.length}, minmax(150px, 1fr))` }}
                    >
                      <div className="p-4 bg-muted/50 font-bold border-r-2">
                        Vaqt / Xona
                      </div>
                      {rooms.map((room) => (
                        <div 
                          key={room.id}
                          className="p-4 bg-muted/30 font-bold text-center border-r last:border-r-0"
                        >
                          {room.name}
                        </div>
                      ))}
                    </div>

                    {/* Time Slots Rows */}
                    {timeSlots.map((slot, slotIndex) => (
                      <div 
                        key={slotIndex} 
                        className="grid border-b last:border-b-0"
                        style={{ gridTemplateColumns: `200px repeat(${rooms.length}, minmax(150px, 1fr))` }}
                      >
                        <div className="p-4 bg-muted/20 font-semibold border-r-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          {slot.label}
                        </div>
                        {rooms.map((room) => {
                          // Find group for this room and time slot
                          const groupInSlot = groupsData.find(group => {
                            // Direct matching: check room and time_slot fields
                            return group.room === room.name && group.time_slot === slot.label && group.status === 'active'
                          })

                          return (
                            <div 
                              key={room.id}
                              className={cn(
                                "p-3 border-r last:border-r-0 min-h-[80px] transition-all hover:shadow-inner",
                                groupInSlot 
                                  ? groupInSlot.status === 'active'
                                    ? "bg-green-50 border-green-100 hover:bg-green-100 cursor-pointer"
                                    : "bg-gray-50 border-gray-100"
                                  : "bg-white hover:bg-blue-50/30"
                              )}
                            >
                              {groupInSlot ? (
                                <div className="space-y-1">
                                  <p className="font-semibold text-xs truncate" title={groupInSlot.name}>
                                    {groupInSlot.name}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground truncate">
                                    {groupInSlot.teacher_name || "O'qituvchi"}
                                  </p>
                                  <Badge variant="secondary" className="text-[9px] px-1 py-0">
                                    {groupInSlot.current_students || 0}/{groupInSlot.max_students || 30}
                                  </Badge>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center h-full opacity-30">
                                  <Plus className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                  )}
                </CardContent>
              </Card>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-3xl border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Jami Xonalar</p>
                        <p className="text-3xl font-bold mt-1">{rooms.length}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-blue-50">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Vaqt Slotlari</p>
                        <p className="text-3xl font-bold mt-1">{timeSlots.length}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-green-50">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Band Xonalar</p>
                        <p className="text-3xl font-bold mt-1">
                          {groupsData.filter(g => g.status === 'active').length}
                        </p>
                      </div>
                      <div className="p-3 rounded-2xl bg-orange-50">
                        <CheckCircle className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Help Card */}
              <Card className="rounded-3xl border-2 border-blue-200 bg-blue-50/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-blue-100">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Qanday foydalanish kerak?</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Oq rangdagi katak - bo'sh xona va vaqt</li>
                        <li>• Yashil rangdagi katak - faol guruh bor</li>
                        <li>• Yangi guruh qo'shishda bo'sh vaqt va xonani osongina topishingiz mumkin</li>
                        <li>• Guruh kartasiga bosish orqali to'liq ma'lumotni ko'rishingiz mumkin</li>
                      </ul>
                    </div>
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
            <DialogTitle 
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
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
                {isClient && currentTime ? (
                  currentTime.toLocaleString('uz-UZ', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })
                ) : (
                  'Yuklanmoqda...'
                )}
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
              className="rounded-2xl text-white hover:opacity-90 transition-opacity"
              style={{
                background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              O'quvchi Qo'shish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Group Dialog */}
      <Dialog open={isEditGroupDialogOpen} onOpenChange={setIsEditGroupDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle 
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              Guruhni Tahrirlash
            </DialogTitle>
            <DialogDescription>
              Guruh ma'lumotlarini yangilang. Barcha o'zgarishlar avtomatik saqlanadi.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4 max-h-[500px] overflow-y-auto">
            {/* Group Name */}
            <div className="grid gap-2">
              <Label htmlFor="editGroupName" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Guruh Nomi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="editGroupName"
                placeholder="Masalan: Frontend Development - Ertalabki"
                value={editGroupData.name}
                onChange={(e) => setEditGroupData({ ...editGroupData, name: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Course Type */}
            <div className="grid gap-2">
              <Label htmlFor="editCourseType" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Kurs Turi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="editCourseType"
                placeholder="Masalan: Frontend Development"
                value={editGroupData.course_type}
                onChange={(e) => setEditGroupData({ ...editGroupData, course_type: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Room Selection */}
            <div className="grid gap-2">
              <Label htmlFor="editRoom" className="flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                Xona
              </Label>
              <Select 
                value={editGroupData.room} 
                onValueChange={(value) => setEditGroupData({ ...editGroupData, room: value })}
              >
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Xonani tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <SelectItem key={room.id} value={room.name}>
                        {room.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      Avval xona qo'shing
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Time Slot Selection */}
            <div className="grid gap-2">
              <Label htmlFor="editTimeSlot" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Dars Vaqti
              </Label>
              <Select 
                value={editGroupData.time_slot} 
                onValueChange={(value) => setEditGroupData({ ...editGroupData, time_slot: value })}
              >
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Vaqtni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.label} value={slot.label}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Schedule (Days) */}
            <div className="grid gap-2">
              <Label htmlFor="editSchedule" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                Kunlar (ixtiyoriy)
              </Label>
              <Input
                id="editSchedule"
                placeholder="Masalan: Dush-Chor-Juma"
                value={editGroupData.schedule}
                onChange={(e) => setEditGroupData({ ...editGroupData, schedule: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Teacher Name */}
            <div className="grid gap-2">
              <Label htmlFor="editTeacherName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                O'qituvchi
              </Label>
              <Input
                id="editTeacherName"
                placeholder="Masalan: Rustam Toshmatov"
                value={editGroupData.teacher_name}
                onChange={(e) => setEditGroupData({ ...editGroupData, teacher_name: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editStartDate" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  Boshlanish Sanasi
                </Label>
                <Input
                  id="editStartDate"
                  type="date"
                  value={editGroupData.start_date}
                  onChange={(e) => setEditGroupData({ ...editGroupData, start_date: e.target.value })}
                  className="rounded-2xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="editEndDate" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  Tugash Sanasi
                </Label>
                <Input
                  id="editEndDate"
                  type="date"
                  value={editGroupData.end_date}
                  onChange={(e) => setEditGroupData({ ...editGroupData, end_date: e.target.value })}
                  className="rounded-2xl"
                />
              </div>
            </div>

            {/* Max Students */}
            <div className="grid gap-2">
              <Label htmlFor="editMaxStudents" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Maksimal O'quvchilar Soni
              </Label>
              <Input
                id="editMaxStudents"
                type="number"
                min="1"
                max="100"
                value={editGroupData.max_students}
                onChange={(e) => setEditGroupData({ ...editGroupData, max_students: parseInt(e.target.value) || 30 })}
                className="rounded-2xl"
              />
            </div>

            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor="editStatus" className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Status
              </Label>
              <Select 
                value={editGroupData.status} 
                onValueChange={(value) => setEditGroupData({ ...editGroupData, status: value })}
              >
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Statusni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Faol</SelectItem>
                  <SelectItem value="inactive">Nofaol</SelectItem>
                  <SelectItem value="completed">Tugallangan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Current Group Info */}
            {editingGroup && (
              <div className="p-4 rounded-2xl bg-muted/50 border">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium">Joriy Ma'lumotlar</Label>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>O'quvchilar:</strong> {editingGroup.current_students || 0} / {editingGroup.max_students || 30}</p>
                  <p><strong>Yaratilgan:</strong> {formatDateTime(editingGroup.created_at)}</p>
                  {editingGroup.updated_at && (
                    <p><strong>Oxirgi yangilanish:</strong> {formatDateTime(editingGroup.updated_at)}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditGroupDialogOpen(false)}
              className="rounded-2xl"
            >
              <X className="mr-2 h-4 w-4" />
              Bekor Qilish
            </Button>
            <Button
              onClick={handleEditGroup}
              className="rounded-2xl text-white hover:opacity-90 transition-opacity"
              style={{
                background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditStudentDialogOpen} onOpenChange={setIsEditStudentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle 
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              O'quvchini Tahrirlash
            </DialogTitle>
            <DialogDescription>
              O'quvchi ma'lumotlarini yangilang. Guruhni o'zgartirsangiz, guruhlar soni avtomatik yangilanadi.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="editStudentFullName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Ism Sharifi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="editStudentFullName"
                placeholder="Masalan: Abdullayev Jasur Akmalovich"
                value={editStudentData.fullName}
                onChange={(e) => setEditStudentData({ ...editStudentData, fullName: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Phone Number */}
            <div className="grid gap-2">
              <Label htmlFor="editStudentPhone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Telefon Raqam <span className="text-red-500">*</span>
              </Label>
              <Input
                id="editStudentPhone"
                placeholder="+998 90 123 45 67"
                value={editStudentData.phoneNumber}
                onChange={(e) => setEditStudentData({ ...editStudentData, phoneNumber: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Passport Number */}
            <div className="grid gap-2">
              <Label htmlFor="editStudentPassport" className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Passport Raqami <span className="text-muted-foreground text-xs">(ixtiyoriy)</span>
              </Label>
              <Input
                id="editStudentPassport"
                placeholder="AA 1234567"
                value={editStudentData.passportNumber}
                onChange={(e) => setEditStudentData({ ...editStudentData, passportNumber: e.target.value })}
                className="rounded-2xl"
              />
            </div>

            {/* Group Selection */}
            <div className="grid gap-2">
              <Label htmlFor="editStudentGroup" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Guruh/Kurs <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={editStudentData.group} 
                onValueChange={(value) => setEditStudentData({ ...editStudentData, group: value })}
              >
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

            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor="editStudentStatus" className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Status
              </Label>
              <Select 
                value={editStudentData.status} 
                onValueChange={(value) => setEditStudentData({ ...editStudentData, status: value })}
              >
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Statusni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Faol</SelectItem>
                  <SelectItem value="inactive">Nofaol</SelectItem>
                  <SelectItem value="graduated">Bitirgan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Current Student Info */}
            {editingStudent && (
              <div className="p-4 rounded-2xl bg-muted/50 border">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium">Joriy Ma'lumotlar</Label>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Joriy guruh:</strong> {editingStudent.groups?.name || "Guruh tayinlanmagan"}</p>
                  <p><strong>Qo'shilgan sana:</strong> {formatDate(editingStudent.enrollment_date)}</p>
                  {editingStudent.updated_at && (
                    <p><strong>Oxirgi yangilanish:</strong> {formatDateTime(editingStudent.updated_at)}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditStudentDialogOpen(false)}
              className="rounded-2xl"
            >
              <X className="mr-2 h-4 w-4" />
              Bekor Qilish
            </Button>
            <Button
              onClick={handleEditStudent}
              className="rounded-2xl text-white hover:opacity-90 transition-opacity"
              style={{
                background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Student Details Dialog */}
      <Dialog open={isViewStudentDialogOpen} onOpenChange={setIsViewStudentDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle 
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              O'quvchi Ma'lumotlari
            </DialogTitle>
            <DialogDescription>
              To'liq ma'lumotlarni ko'ring va tahrirlang
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6 py-4">
              {/* Student Avatar and Name */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarFallback className="text-3xl">{formatInitials(selectedStudent.full_name)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{selectedStudent.full_name}</h3>
                  <div className="mt-2 flex justify-center">
                    {getStatusBadge(selectedStudent.status)}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Aloqa Ma'lumotlari
                </h4>
                <div className="grid gap-3 pl-7">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                    <span className="text-sm text-muted-foreground">Telefon</span>
                    <span className="font-medium">{selectedStudent.phone_number}</span>
                  </div>
                  {selectedStudent.passport_number && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                      <span className="text-sm text-muted-foreground">Passport</span>
                      <span className="font-medium">{selectedStudent.passport_number}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Education Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Ta'lim Ma'lumotlari
                </h4>
                <div className="grid gap-3 pl-7">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                    <span className="text-sm text-muted-foreground">Guruh</span>
                    <span className="font-medium">{selectedStudent.groups?.name || 'Guruh tayinlanmagan'}</span>
                  </div>
                  {selectedStudent.groups?.schedule && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                      <span className="text-sm text-muted-foreground">Jadval</span>
                      <span className="font-medium">{selectedStudent.groups.schedule}</span>
                    </div>
                  )}
                  {selectedStudent.groups?.teacher_name && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                      <span className="text-sm text-muted-foreground">O'qituvchi</span>
                      <span className="font-medium">{selectedStudent.groups.teacher_name}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                    <span className="text-sm text-muted-foreground">Qo'shilgan sana</span>
                    <span className="font-medium">{formatDate(selectedStudent.enrollment_date)}</span>
                  </div>
                  {selectedStudent.updated_at && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                      <span className="text-sm text-muted-foreground">Oxirgi yangilanish</span>
                      <span className="font-medium text-xs">{formatDateTime(selectedStudent.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Qo'shimcha Ma'lumotlar
                </h4>
                <div className="grid gap-3 pl-7">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                    <span className="text-sm text-muted-foreground">ID</span>
                    <span className="font-mono text-xs">{selectedStudent.id}</span>
                  </div>
                  {selectedStudent.groups?.course_type && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                      <span className="text-sm text-muted-foreground">Kurs turi</span>
                      <span className="font-medium">{selectedStudent.groups.course_type}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={() => setIsViewStudentDialogOpen(false)}
              className="rounded-2xl"
            >
              <X className="mr-2 h-4 w-4" />
              Yopish
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (selectedStudent) {
                  // SMS yuborish funksiyasi
                  alert(`SMS yuborish: ${selectedStudent.phone_number}`)
                }
              }}
              className="rounded-2xl"
            >
              <SendHorizontal className="mr-2 h-4 w-4" />
              SMS Yuborish
            </Button>
            <Button
              onClick={() => {
                if (selectedStudent) {
                  openEditStudentDialog(selectedStudent)
                  setIsViewStudentDialogOpen(false)
                }
              }}
              className="rounded-2xl"
              style={{
                background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Tahrirlash
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedStudent) {
                  setIsViewStudentDialogOpen(false)
                  handleDeleteStudent(selectedStudent)
                }
              }}
              className="rounded-2xl"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              O'chirish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}