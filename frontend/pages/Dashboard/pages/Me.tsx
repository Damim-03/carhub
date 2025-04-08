
import { useState, useRef } from "react";
import { DashboardLayout } from "../components/layouts/dashboard-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Mail, MapPin, Calendar, Edit, FileText, Activity, Car, Bell, Camera } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

const Me = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        location: "San Francisco, CA",
        bio: "Professional driver with 5 years of experience in urban transportation.",
        avatarUrl: "https://github.com/shadcn.png"
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setProfileData({
            name: formData.get("name") as string || profileData.name,
            email: formData.get("email") as string || profileData.email,
            location: formData.get("location") as string || profileData.location,
            bio: formData.get("bio") as string || profileData.bio,
            avatarUrl: avatarPreview || profileData.avatarUrl,
        });

        setOpenDialog(false);
        setAvatarPreview(null);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setAvatarPreview(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                    <p className="text-muted-foreground">Manage your account information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <Card className="md:col-span-1 bg-[#0D121E] border-gray-800">
                        <CardHeader className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={profileData.avatarUrl} />
                                <AvatarFallback className="bg-purple-400 text-[#0D121E] text-xl">
                                    {profileData.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle>{profileData.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 justify-center mt-1">
                                <MapPin className="h-3 w-3" /> {profileData.location}
                            </CardDescription>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
                                    Premium
                                </Badge>
                                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
                                    Driver
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" /> {profileData.email}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" /> Joined April 2023
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button
                                className="mt-2 w-full"
                                variant="outline"
                                onClick={() => setOpenDialog(true)}
                            >
                                <Edit className="mr-2 h-4 w-4" /> Edit Profile
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Stats and Recent Activity */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-[#0D121E] border-gray-800">
                                <CardHeader className="pb-2">
                                    <CardDescription>Total Rides</CardDescription>
                                    <CardTitle className="text-2xl">128</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <span className="text-green-500">↑ 12%</span> from last month
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-[#0D121E] border-gray-800">
                                <CardHeader className="pb-2">
                                    <CardDescription>Documents</CardDescription>
                                    <CardTitle className="text-2xl">8</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <span className="text-green-500">↑ 4</span> new this week
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-[#0D121E] border-gray-800">
                                <CardHeader className="pb-2">
                                    <CardDescription>Rating</CardDescription>
                                    <CardTitle className="text-2xl">4.8/5</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        Based on 56 reviews
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card className="bg-[#0D121E] border-gray-800">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Recent Activity</CardTitle>
                                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/20">
                                        View All
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-purple-500/20 p-2 rounded-full">
                                            <Car className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">Completed ride to Downtown</p>
                                                <span className="text-xs text-muted-foreground">2h ago</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">You've earned $24.50</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-purple-500/20 p-2 rounded-full">
                                            <FileText className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">Updated driver license</p>
                                                <span className="text-xs text-muted-foreground">Yesterday</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">Document verified by admin</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-purple-500/20 p-2 rounded-full">
                                            <Activity className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">Account status updated</p>
                                                <span className="text-xs text-muted-foreground">3 days ago</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">Your account is now premium</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card className="bg-[#0D121E] border-gray-800">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Notifications</CardTitle>
                                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/20">
                                        Mark All Read
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-purple-500/20 p-2 rounded-full">
                                            <Bell className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">New feature available</p>
                                                <span className="text-xs text-muted-foreground">Just now</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">Check out the new document verification system</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-purple-500/20 p-2 rounded-full">
                                            <Bell className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">System maintenance</p>
                                                <span className="text-xs text-muted-foreground">1 day ago</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">The system will be down for maintenance on Sunday</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-[#0D121E] border-gray-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Make changes to your profile information here.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="grid gap-4 py-4">
                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Avatar className="h-24 w-24 cursor-pointer group relative" onClick={triggerFileInput}>
                                    <AvatarImage src={avatarPreview || profileData.avatarUrl} />
                                    <AvatarFallback className="bg-purple-400 text-[#0D121E] text-xl">
                                        {profileData.name.split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                        <Camera className="h-6 w-6 text-white" />
                                    </div>
                                </Avatar>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={triggerFileInput}
                                    className="mt-2"
                                >
                                    Change Avatar
                                </Button>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={profileData.name}
                                    className="bg-[#161F32] border-gray-700"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={profileData.email}
                                    className="bg-[#161F32] border-gray-700"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={profileData.location}
                                    className="bg-[#161F32] border-gray-700"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    defaultValue={profileData.bio}
                                    className="bg-[#161F32] border-gray-700"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => {
                                setOpenDialog(false);
                                setAvatarPreview(null);
                            }}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default Me;