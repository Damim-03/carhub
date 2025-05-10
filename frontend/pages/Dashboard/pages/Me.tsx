import { useState, useRef, useEffect } from "react";
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
import { Mail, MapPin, Calendar, Edit, Camera } from "lucide-react";
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
import axios from "axios";
import { useToast } from "../hooks/use-toast.ts";

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    avatarUrl: string;
    joinDate?: string;
    status?: "active" | "inactive";
}

const Me = () => {
    const { toast } = useToast();
    const [openDialog, setOpenDialog] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "0123456789",
        location: "San Francisco, CA",
        bio: "Professional driver with 5 years of experience in urban transportation.",
        avatarUrl: "https://github.com/shadcn.png",
        joinDate: "April 2023"
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch profile data from API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_URI}/api/user`);
                setProfileData({
                    ...res.data,
                    joinDate: res.data.joinDate || "April 2023" // Default if not provided
                });
            } catch (err) {
                console.error("Failed to fetch profile", err);
                toast({
                    title: "Error",
                    description: "Failed to load profile data",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [toast]);

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const updatedProfile = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            location: formData.get("location") as string,
            bio: formData.get("bio") as string,
            avatarUrl: avatarPreview || profileData.avatarUrl,
        };

        try {
            // If new avatar was selected, upload it first
            if (fileInputRef.current?.files?.[0]) {
                const avatarFile = fileInputRef.current.files[0];
                const uploadResponse = await axios.post('/api/upload-avatar', {
                    file: avatarFile
                });
                updatedProfile.avatarUrl = uploadResponse.data.url;
            }

            await axios.put('/api/update-profile', updatedProfile);
            setProfileData(prev => ({ ...prev, ...updatedProfile }));

            toast({
                title: "Success",
                description: "Profile updated successfully",
            });

            setOpenDialog(false);
            setAvatarPreview(null);
        } catch (err) {
            console.error("Failed to update profile", err);
            toast({
                title: "Error",
                description: "Failed to update profile",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type and size
            if (!file.type.startsWith('image/')) {
                toast({
                    title: "Invalid file",
                    description: "Please select an image file",
                    variant: "destructive",
                });
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast({
                    title: "File too large",
                    description: "Please select an image smaller than 5MB",
                    variant: "destructive",
                });
                return;
            }

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

    if (loading) return (
        <DashboardLayout>
            <div className="flex items-center justify-center h-64">
                <p>Loading profile...</p>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                    <p className="text-muted-foreground">Manage your account information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <Card className="md:col-span-1 dark:bg-[#0D121E] dark:border-gray-800">
                        <CardHeader className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                                <AvatarFallback className="bg-purple-400 dark:text-[#0D121E] text-xl">
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
                                    <Calendar className="h-4 w-4" /> Joined {profileData.joinDate}
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

                    {/* Stats Section - Add your custom stats here */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="dark:bg-[#0D121E] dark:border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg">Activity</CardTitle>
                                <CardDescription>Recent actions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">No recent activity</p>
                            </CardContent>
                        </Card>

                        <Card className="dark:bg-[#0D121E] dark:border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg">Statistics</CardTitle>
                                <CardDescription>Performance metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">No statistics available</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog open={openDialog} onOpenChange={(open) => {
                if (!open) {
                    setAvatarPreview(null);
                }
                setOpenDialog(open);
            }}>
                <DialogContent className="dark:bg-[#0D121E] dark:border-gray-800 dark:text-white sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Make changes to your profile information here.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Avatar className="h-24 w-24 cursor-pointer group relative" onClick={triggerFileInput}>
                                    <AvatarImage src={avatarPreview || profileData.avatarUrl} alt={profileData.name} />
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

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={profileData.name}
                                        className="dark:bg-[#161F32] dark:border-gray-700"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={profileData.email}
                                        className="dark:bg-[#161F32] dark:border-gray-700"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        defaultValue={profileData.phone}
                                        className="dark:bg-[#161F32] dark:border-gray-700"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        defaultValue={profileData.location}
                                        className="dark:bg-[#161F32] dark:border-gray-700"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        defaultValue={profileData.bio}
                                        className="dark:bg-[#161F32] dark:border-gray-700"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setOpenDialog(false);
                                    setAvatarPreview(null);
                                }}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default Me;