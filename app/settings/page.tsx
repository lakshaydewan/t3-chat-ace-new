"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, LogOut, Bell, Shield, User, Mail, Lock, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {

  const router = useRouter();

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#fbfaff" }}>
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#77347a" }}>
              Settings
            </h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <span className="flex gap-2">
            <Button onClick={() => router.back()} variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Button>
            <Button variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Section */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "#77347a" }}>
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback style={{ backgroundColor: "#a43e6b", color: "#fbfaff" }}>JD</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent"
                  style={{ borderColor: "#a43e6b", color: "#a43e6b" }}
                >
                  <Camera className="h-4 w-4" />
                  Change
                </Button>
              </div>

              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className="text-xs">
                      First Name
                    </Label>
                    <Input id="firstName" defaultValue="John" className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName" className="text-xs">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue="Doe" className="h-8" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="bio" className="text-xs">
                    Bio
                  </Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." className="min-h-[60px] text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "#77347a" }}>
                <Lock className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-xs">
                    Username
                  </Label>
                  <Input id="username" defaultValue="johndoe" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="currentPassword" className="text-xs">
                    Current Password
                  </Label>
                  <Input id="currentPassword" type="password" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="newPassword" className="text-xs">
                    New Password
                  </Label>
                  <Input id="newPassword" type="password" className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-xs">
                    Confirm Password
                  </Label>
                  <Input id="confirmPassword" type="password" className="h-8" />
                </div>
              </div>
              <Button size="sm" className="w-full" style={{ backgroundColor: "#a43e6b", color: "#fbfaff" }}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "#77347a" }}>
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Get notified via email</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Browser notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Marketing Emails</Label>
                    <p className="text-xs text-muted-foreground">Product updates & news</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Weekly Digest</Label>
                    <p className="text-xs text-muted-foreground">Summary of your activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Appearance */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "#77347a" }}>
                <Shield className="h-5 w-5" />
                Privacy & Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Profile Visibility</Label>
                    <p className="text-xs text-muted-foreground">Show profile to others</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Data Analytics</Label>
                    <p className="text-xs text-muted-foreground">Anonymous usage data</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent text-xs"
                      style={{ borderColor: "#a43e6b", color: "#a43e6b" }}
                    >
                      Light
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent text-xs"
                      style={{ borderColor: "#a43e6b", color: "#a43e6b" }}
                    >
                      Dark
                    </Button>
                    <Button size="sm" className="text-xs" style={{ backgroundColor: "#a43e6b", color: "#fbfaff" }}>
                      Auto
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Compact Mode</Label>
                    <p className="text-xs text-muted-foreground">Smaller interface</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Animations</Label>
                    <p className="text-xs text-muted-foreground">Interface transitions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle style={{ color: "#77347a" }}>Account Actions</CardTitle>
            <CardDescription>Manage your account and data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2" style={{ backgroundColor: "#a43e6b", color: "#fbfaff" }}>
                <Save className="h-4 w-4" />
                Save All Changes
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Mail className="h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                Reset Preferences
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-red-200 text-red-600 hover:bg-red-50 ml-auto bg-transparent"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
