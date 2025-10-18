"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Eye,
  Star,
  Bookmark,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
  FileText
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AppearanceSettingsProps {
  themeColors: {
    primary: string
    secondary: string
    accent: string
  }
  setThemeColors: (colors: { primary: string; secondary: string; accent: string }) => void
  setActiveTab: (tab: string) => void
}

export default function AppearanceSettings({
  themeColors,
  setThemeColors,
  setActiveTab
}: AppearanceSettingsProps) {
  // Theme Management State
  const [savedPresets, setSavedPresets] = useState<Array<{
    name: string
    colors: typeof themeColors
  }>>([])
  const [presetName, setPresetName] = useState("")

  // Database Themes (Supabase - umumiy)
  const [databaseThemes, setDatabaseThemes] = useState<Array<{
    id: number
    name: string
    description?: string
    colors: typeof themeColors
    is_default: boolean
  }>>([])
  const [isLoadingThemes, setIsLoadingThemes] = useState(false)

  // Appearance Tab State (Tab navigatsiya uchun)
  const [appearanceTab, setAppearanceTab] = useState<"editor" | "presets" | "saved" | "create">("editor")

  // New Theme Creation State
  const [isCreatingTheme, setIsCreatingTheme] = useState(false)
  const [newTheme, setNewTheme] = useState({
    name: "",
    description: "",
    colors: { primary: "#2563EB", secondary: "#9333EA", accent: "#16A34A" }
  })
  const [isSavingTheme, setIsSavingTheme] = useState(false)

  // Load saved presets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('superadmin-user-presets')
    if (saved) {
      try {
        setSavedPresets(JSON.parse(saved))
      } catch (error) {
        console.error('Error parsing saved presets:', error)
      }
    }
  }, [])

  // Load theme colors from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('superadmin-theme-colors')
    if (saved) {
      try {
        const colors = JSON.parse(saved)
        setThemeColors(colors)
      } catch (error) {
        console.error('Error parsing theme colors:', error)
      }
    }
  }, [setThemeColors])

  // Set default colors when switching to create tab
  useEffect(() => {
    if (appearanceTab === "create") {
      setNewTheme(prev => ({
        ...prev,
        colors: themeColors
      }))
    }
  }, [appearanceTab, themeColors])

  // Fetch themes from database
  useEffect(() => {
    fetchDatabaseThemes()
  }, [])

  // Save theme colors to localStorage
  const saveThemeColors = (colors: typeof themeColors) => {
    localStorage.setItem('superadmin-theme-colors', JSON.stringify(colors))
    alert('✅ Ranglar saqlandi!')
  }

  // Reset theme colors to default
  const resetThemeColors = () => {
    const defaultColors = { primary: "#2563EB", secondary: "#9333EA", accent: "#16A34A" }
    setThemeColors(defaultColors)
    saveThemeColors(defaultColors)
  }

  // Save as preset
  const saveAsPreset = () => {
    if (!presetName.trim()) {
      alert('❌ Preset nomini kiriting!')
      return
    }

    const newPreset = {
      name: presetName.trim(),
      colors: themeColors
    }

    const updatedPresets = [...savedPresets, newPreset]
    setSavedPresets(updatedPresets)
    localStorage.setItem('superadmin-user-presets', JSON.stringify(updatedPresets))
    
    setPresetName("")
    alert('✅ Preset muvaffaqiyatli saqlandi!')
  }

  // Delete preset
  const deletePreset = (index: number) => {
    if (!confirm('Bu preset\'ni o\'chirmoqchimisiz?')) return
    
    const updatedPresets = savedPresets.filter((_, i) => i !== index)
    setSavedPresets(updatedPresets)
    localStorage.setItem('superadmin-user-presets', JSON.stringify(updatedPresets))
    alert('✅ Preset o\'chirildi!')
  }

  // Create new theme and save to database
  const createNewTheme = async () => {
    if (!newTheme.name.trim()) {
      alert('❌ Theme nomi kiriting!')
      return
    }

    setIsSavingTheme(true)
    try {
      const response = await fetch('/api/themes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTheme.name.trim(),
          colors: newTheme.colors
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(`❌ Xatolik: ${result.error || 'Theme yaratishda xatolik'}`)
        return
      }

      // Success
      alert('✅ Yangi theme muvaffaqiyatli yaratildi!')
      
      // Reset form
      setNewTheme({
        name: "",
        description: "",
        colors: { primary: "#2563EB", secondary: "#9333EA", accent: "#16A34A" }
      })
      setIsCreatingTheme(false)
      
      // Refresh themes list
      fetchDatabaseThemes()
    } catch (error) {
      console.error('Theme yaratishda xatolik:', error)
      alert('❌ Server bilan bog\'lanishda xatolik')
    } finally {
      setIsSavingTheme(false)
    }
  }

  // Delete theme from database
  const deleteTheme = async (id: number, name: string) => {
    if (!confirm(`"${name}" rangini o'chirmoqchimisiz?\n\nBu amal qaytarilmaydi!`)) {
      return
    }

    try {
      const response = await fetch(`/api/themes?id=${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok) {
        alert(`❌ Xatolik: ${result.error || 'Theme o\'chirishda xatolik'}`)
        return
      }

      // Success
      alert('✅ Theme muvaffaqiyatli o\'chirildi!')
      
      // Refresh themes list
      fetchDatabaseThemes()
    } catch (error) {
      console.error('Theme o\'chirishda xatolik:', error)
      alert('❌ Server bilan bog\'lanishda xatolik')
    }
  }

  // Fetch themes from database
  const fetchDatabaseThemes = async () => {
    setIsLoadingThemes(true)
    try {
      const response = await fetch('/api/themes')
      const result = await response.json()
      
      if (result.success && result.data) {
        const themes = result.data.map((theme: any) => ({
          ...theme,
          colors: typeof theme.colors === 'string' ? JSON.parse(theme.colors) : theme.colors
        }))
        setDatabaseThemes(themes)
      }
    } catch (error) {
      console.error('Themes yuklashda xatolik:', error)
    } finally {
      setIsLoadingThemes(false)
    }
  }

  return (
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
          
          <div className="relative z-10">
            {/* Text Content */}
            <div className="text-center space-y-6">
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
        </div>
      </Card>

      {/* 📱 TAB NAVIGATION */}
      <Tabs value={appearanceTab} onValueChange={(v) => setAppearanceTab(v as "editor" | "presets" | "saved" | "create")} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-14 rounded-2xl p-1 bg-muted">
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
          <TabsTrigger value="create" className="rounded-xl text-base">
            <Plus className="mr-2 h-5 w-5" />
            Yangi Rang
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
                      <p className="text-xs text-muted-foreground">Gradient boshlanishi</p>
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
                      <p className="text-xs text-muted-foreground">Gradient tugashi</p>
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
                  onClick={() => {
                    const name = prompt('Preset nomi:')
                    if (name) {
                      setPresetName(name)
                      saveAsPreset()
                    }
                  }}
                  variant="outline"
                  className="flex-1 min-w-[200px] rounded-2xl h-12"
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
                    Professional dizaynerlarga mo'ljallangan ranglar to'plami.
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
                </div>
              ) : databaseThemes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {databaseThemes.map((theme, index) => (
                    <motion.div
                      key={theme.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group p-5 rounded-2xl border-2 hover:border-primary transition-all relative hover:shadow-xl cursor-pointer"
                      whileHover={{ scale: 1.03, y: -4 }}
                      onClick={() => {
                        setThemeColors(theme.colors)
                        setAppearanceTab("editor")
                      }}
                    >
                      {/* Delete Button */}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteTheme(theme.id, theme.name)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

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
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-2xl bg-muted/20">
                  <svg className="h-16 w-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Tayyor ranglar topilmadi</p>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={fetchDatabaseThemes}
                    className="rounded-2xl mt-4"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Yuklash
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
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

        {/* 🎨 TAB 4: YANGI RANG YARATISH (Create New Theme) */}
        <TabsContent value="create" className="space-y-6 mt-6">
          {/* Live Preview Card - Yuqorida */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-3xl border-2 overflow-hidden">
              <div 
                className="h-48 p-8 text-white transition-all duration-500 relative"
                style={{
                  background: `linear-gradient(135deg, ${newTheme.colors.primary} 0%, ${newTheme.colors.secondary} 50%, ${newTheme.colors.accent} 100%)`
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                      <Eye className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/80">Live Preview</p>
                      <p className="text-xs text-white/60">Real-time ko'rinish</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">
                      {newTheme.name || "Theme Nomi"}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {newTheme.description || "Theme tavsifini kiriting"}
                    </p>
                  </div>
                  
                  {/* Color Indicators */}
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white shadow-lg"></div>
                      <span className="text-xs font-mono text-white/80">{newTheme.colors.primary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/70 shadow-lg"></div>
                      <span className="text-xs font-mono text-white/80">{newTheme.colors.secondary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/40 shadow-lg"></div>
                      <span className="text-xs font-mono text-white/80">{newTheme.colors.accent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Form Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Theme Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="rounded-3xl border-2 h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Ma'lumotlar
                  </CardTitle>
                  <CardDescription>
                    Theme nomi va tavsifini kiriting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="themeName" className="text-base font-semibold flex items-center gap-2">
                      <span>Theme Nomi</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="themeName"
                      placeholder="Masalan: Yozgi Ranglar"
                      value={newTheme.name}
                      onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                      className="rounded-2xl h-14 text-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Bu nom barcha foydalanuvchilarga ko'rinadi
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="themeDescription" className="text-base font-semibold">
                      Tavsif (Ixtiyoriy)
                    </Label>
                    <Input
                      id="themeDescription"
                      placeholder="Masalan: Issiq va quvnoq yozgi ranglar"
                      value={newTheme.description}
                      onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
                      className="rounded-2xl h-14 text-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Theme haqida qisqacha ma'lumot
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Color Pickers Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="rounded-3xl border-2 h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Ranglar Palitasi
                  </CardTitle>
                  <CardDescription>
                    3 ta rang tanlang va gradient yarating
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Primary Color */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">1. Asosiy Rang</Label>
                      <Badge variant="secondary" className="rounded-xl">Primary</Badge>
                    </div>
                    <div className="flex gap-3">
                      <div className="relative">
                        <div 
                          className="h-16 w-16 rounded-2xl cursor-pointer shadow-lg relative overflow-hidden"
                          style={{
                            backgroundColor: newTheme.colors.primary
                          }}
                        >
                          <Input
                            type="color"
                            value={newTheme.colors.primary}
                            onChange={(e) => setNewTheme({ 
                              ...newTheme, 
                              colors: { ...newTheme.colors, primary: e.target.value }
                            })}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            style={{
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              border: 'none',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>
                      <Input
                        type="text"
                        value={newTheme.colors.primary}
                        onChange={(e) => setNewTheme({ 
                          ...newTheme, 
                          colors: { ...newTheme.colors, primary: e.target.value }
                        })}
                        className="flex-1 rounded-2xl h-14 font-mono text-base uppercase"
                        placeholder="#2563EB"
                      />
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">2. O'rta Rang</Label>
                      <Badge variant="secondary" className="rounded-xl">Secondary</Badge>
                    </div>
                    <div className="flex gap-3">
                      <div className="relative">
                        <div 
                          className="h-16 w-16 rounded-2xl cursor-pointer shadow-lg relative overflow-hidden"
                          style={{
                            backgroundColor: newTheme.colors.secondary
                          }}
                        >
                          <Input
                            type="color"
                            value={newTheme.colors.secondary}
                            onChange={(e) => setNewTheme({ 
                              ...newTheme, 
                              colors: { ...newTheme.colors, secondary: e.target.value }
                            })}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            style={{
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              border: 'none',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>
                      <Input
                        type="text"
                        value={newTheme.colors.secondary}
                        onChange={(e) => setNewTheme({ 
                          ...newTheme, 
                          colors: { ...newTheme.colors, secondary: e.target.value }
                        })}
                        className="flex-1 rounded-2xl h-14 font-mono text-base uppercase"
                        placeholder="#9333EA"
                      />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">3. Tugash Rangi</Label>
                      <Badge variant="secondary" className="rounded-xl">Accent</Badge>
                    </div>
                    <div className="flex gap-3">
                      <div className="relative">
                        <div 
                          className="h-16 w-16 rounded-2xl cursor-pointer shadow-lg relative overflow-hidden"
                          style={{
                            backgroundColor: newTheme.colors.accent
                          }}
                        >
                          <Input
                            type="color"
                            value={newTheme.colors.accent}
                            onChange={(e) => setNewTheme({ 
                              ...newTheme, 
                              colors: { ...newTheme.colors, accent: e.target.value }
                            })}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            style={{
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              border: 'none',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>
                      <Input
                        type="text"
                        value={newTheme.colors.accent}
                        onChange={(e) => setNewTheme({ 
                          ...newTheme, 
                          colors: { ...newTheme.colors, accent: e.target.value }
                        })}
                        className="flex-1 rounded-2xl h-14 font-mono text-base uppercase"
                        placeholder="#16A34A"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="rounded-3xl border-2">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewTheme({
                        name: "",
                        description: "",
                        colors: { primary: "#2563EB", secondary: "#9333EA", accent: "#16A34A" }
                      })
                    }}
                    className="h-14 rounded-2xl text-base"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Tozalash
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setNewTheme({ ...newTheme, colors: themeColors })
                    }}
                    variant="outline"
                    className="h-14 rounded-2xl text-base"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    Joriy Ranglar
                  </Button>
                  
                  <Button
                    onClick={createNewTheme}
                    disabled={isSavingTheme || !newTheme.name.trim()}
                    className="h-14 rounded-2xl text-base text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${newTheme.colors.primary}, ${newTheme.colors.secondary})`
                    }}
                  >
                    {isSavingTheme ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Saqlanmoqda...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        Saqlash
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
