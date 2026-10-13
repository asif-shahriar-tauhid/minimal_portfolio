"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  User,
  Briefcase,
  GraduationCap,
  Share2,
  Mail,
  Plus,
  Trash2,
  Edit2,
  Save,
  LogOut,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  FolderGit2,
  Sparkles,
  Sliders,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  API_URL,
  apiRequest,
  getPortfolioData,
  updateProfileApi,
} from "@/lib/api";
import { getAdminToken, removeAdminToken } from "@/lib/auth-client";
import {
  Education,
  Experience,
  Message,
  Portfolio,
  Profile,
  Project,
  Skill,
  SkillCategory,
  SocialLink,
} from "@/lib/types";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [portfolio, setPortfolio] = React.useState<Portfolio | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  // Profile Form State
  const [profileForm, setProfileForm] = React.useState<Partial<Profile>>({});
  const [savingProfile, setSavingProfile] = React.useState(false);

  // Dialog States
  const [projectDialogOpen, setProjectDialogOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Partial<Project> | null>(null);

  const [skillDialogOpen, setSkillDialogOpen] = React.useState(false);
  const [editingSkill, setEditingSkill] = React.useState<Partial<Skill> | null>(null);

  const [categoryDialogOpen, setCategoryDialogOpen] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState("");

  const [expDialogOpen, setExpDialogOpen] = React.useState(false);
  const [editingExp, setEditingExp] = React.useState<Partial<Experience> | null>(null);

  const [eduDialogOpen, setEduDialogOpen] = React.useState(false);
  const [editingEdu, setEditingEdu] = React.useState<Partial<Education> | null>(null);

  const [socialDialogOpen, setSocialDialogOpen] = React.useState(false);
  const [editingSocial, setEditingSocial] = React.useState<Partial<SocialLink> | null>(null);

  // 1. Authenticate & Load Data
  const loadData = React.useCallback(async (authToken: string) => {
    try {
      setLoading(true);
      const data = await getPortfolioData();
      setPortfolio(data);
      if (data.profile) {
        setProfileForm(data.profile);
      }

      // Fetch messages
      try {
        const msgs = await apiRequest<Message[]>("/messages", "GET", authToken);
        setMessages(msgs || []);
      } catch {
        // server might be in local mode without db
        setMessages([]);
      }
    } catch {
      toast.error("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const t = getAdminToken();
    if (!t) {
      router.push("/dashboard/login");
      return;
    }
    setToken(t);
    loadData(t);
  }, [router, loadData]);

  const handleLogout = () => {
    removeAdminToken();
    toast.info("Logged out successfully");
    router.push("/dashboard/login");
  };

  // 2. Profile Actions
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSavingProfile(true);
    try {
      const updated = await updateProfileApi(profileForm, token);
      setPortfolio((prev) => (prev ? { ...prev, profile: updated } : prev));
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  // 3. Project Actions
  const handleSaveProject = async () => {
    if (!token || !editingProject) return;
    try {
      const isNew = !editingProject.id;
      const endpoint = isNew ? "/projects" : `/projects/${editingProject.id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        title: editingProject.title || "",
        slug:
          editingProject.slug ||
          (editingProject.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: editingProject.category || null,
        summary: editingProject.summary || "",
        description: editingProject.description || "",
        imageUrl: editingProject.imageUrl || null,
        techStack: Array.isArray(editingProject.techStack)
          ? editingProject.techStack
          : String(editingProject.techStack || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        liveUrl: editingProject.liveUrl || null,
        repoUrl: editingProject.repoUrl || null,
        challenges: editingProject.challenges || "",
        improvements: editingProject.improvements || "",
        featured: editingProject.featured ?? true,
        order: editingProject.order ?? 0,
      };

      await apiRequest<Project>(endpoint, method, token, payload);
      toast.success(isNew ? "Project created!" : "Project updated!");
      setProjectDialogOpen(false);
      setEditingProject(null);
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to save project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this project?")) return;
    try {
      await apiRequest(`/projects/${id}`, "DELETE", token);
      toast.success("Project deleted");
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete project");
    }
  };

  // 4. Skill Actions
  const handleSaveSkill = async () => {
    if (!token || !editingSkill) return;
    try {
      const isNew = !editingSkill.id;
      const endpoint = isNew ? "/skills" : `/skills/${editingSkill.id}`;
      const method = isNew ? "POST" : "PUT";

      await apiRequest<Skill>(endpoint, method, token, editingSkill);
      toast.success(isNew ? "Skill added!" : "Skill updated!");
      setSkillDialogOpen(false);
      setEditingSkill(null);
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to save skill");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!token || !confirm("Delete this skill?")) return;
    try {
      await apiRequest(`/skills/${id}`, "DELETE", token);
      toast.success("Skill deleted");
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete");
    }
  };

  const handleCreateCategory = async () => {
    if (!token || !newCategoryName.trim()) return;
    try {
      await apiRequest<SkillCategory>("/skill-categories", "POST", token, {
        name: newCategoryName.trim(),
        order: (portfolio?.skillCategories.length || 0) + 1,
      });
      toast.success("Category created!");
      setNewCategoryName("");
      setCategoryDialogOpen(false);
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to create category");
    }
  };

  // 5. Experience Actions
  const handleSaveExp = async () => {
    if (!token || !editingExp) return;
    try {
      const isNew = !editingExp.id;
      const endpoint = isNew ? "/experiences" : `/experiences/${editingExp.id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        role: editingExp.role || "",
        company: editingExp.company || "",
        companyUrl: editingExp.companyUrl || null,
        location: editingExp.location || null,
        employment: editingExp.employment || null,
        startDate: editingExp.startDate || "",
        endDate: editingExp.endDate || null,
        description: editingExp.description || null,
        highlights: Array.isArray(editingExp.highlights)
          ? editingExp.highlights
          : String(editingExp.highlights || "")
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
        technologies: Array.isArray(editingExp.technologies)
          ? editingExp.technologies
          : String(editingExp.technologies || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        order: editingExp.order ?? 0,
      };

      await apiRequest<Experience>(endpoint, method, token, payload);
      toast.success(isNew ? "Experience created!" : "Experience updated!");
      setExpDialogOpen(false);
      setEditingExp(null);
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to save experience");
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!token || !confirm("Delete this experience entry?")) return;
    try {
      await apiRequest(`/experiences/${id}`, "DELETE", token);
      toast.success("Experience deleted");
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete");
    }
  };

  // 6. Education Actions
  const handleSaveEdu = async () => {
    if (!token || !editingEdu) return;
    try {
      const isNew = !editingEdu.id;
      const endpoint = isNew ? "/education" : `/education/${editingEdu.id}`;
      const method = isNew ? "POST" : "PUT";

      await apiRequest<Education>(endpoint, method, token, editingEdu);
      toast.success(isNew ? "Education added!" : "Education updated!");
      setEduDialogOpen(false);
      setEditingEdu(null);
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to save education");
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (!token || !confirm("Delete this education entry?")) return;
    try {
      await apiRequest(`/education/${id}`, "DELETE", token);
      toast.success("Education entry deleted");
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete");
    }
  };

  // 7. Social Link Actions
  const handleSaveSocial = async () => {
    if (!token || !editingSocial) return;
    try {
      const isNew = !editingSocial.id;
      const endpoint = isNew ? "/social-links" : `/social-links/${editingSocial.id}`;
      const method = isNew ? "POST" : "PUT";

      await apiRequest<SocialLink>(endpoint, method, token, editingSocial);
      toast.success(isNew ? "Social link added!" : "Social link updated!");
      setSocialDialogOpen(false);
      setEditingSocial(null);
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to save social link");
    }
  };

  const handleDeleteSocial = async (id: string) => {
    if (!token || !confirm("Delete this social link?")) return;
    try {
      await apiRequest(`/social-links/${id}`, "DELETE", token);
      toast.success("Social link deleted");
      loadData(token);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete");
    }
  };

  // 8. Messages
  const handleToggleMessageRead = async (msg: Message) => {
    if (!token) return;
    try {
      await apiRequest(`/messages/${msg.id}`, "PATCH", token, { read: !msg.read });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: !m.read } : m))
      );
      toast.success(msg.read ? "Marked as unread" : "Marked as read");
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to update message");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!token || !confirm("Delete this message?")) return;
    try {
      await apiRequest(`/messages/${id}`, "DELETE", token);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success("Message deleted");
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete message");
    }
  };

  if (loading && !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-2 text-neutral-500">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
          <span>Connecting to Portfolio Backend Console...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm tracking-tight flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-500" />
              <span>Portfolio Dashboard</span>
            </span>
            <Badge variant="outline" className="font-mono text-[10px] hidden sm:inline-flex">
              Prisma 7 • Postgres
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => token && loadData(token)}
              className="text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="text-xs">
                <span>View Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="text-xs"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs">
              Profile &amp; Hero
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-xs">
              Projects ({portfolio?.projects.length || 0})
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">
              Skills
            </TabsTrigger>
            <TabsTrigger value="experience" className="text-xs">
              Experience ({portfolio?.experiences.length || 0})
            </TabsTrigger>
            <TabsTrigger value="education" className="text-xs">
              Education ({portfolio?.education.length || 0})
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs">
              Social Links
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs">
              Inbox ({messages.filter((m) => !m.read).length})
            </TabsTrigger>
          </TabsList>

          {/* ──────────────── TAB 1: OVERVIEW ──────────────── */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardDescription className="text-xs font-mono">Projects</CardDescription>
                  <CardTitle className="text-2xl font-bold">{portfolio?.projects.length || 0}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardDescription className="text-xs font-mono">Skills Listed</CardDescription>
                  <CardTitle className="text-2xl font-bold">
                    {portfolio?.skillCategories.reduce((acc, c) => acc + (c.skills?.length || 0), 0) || 0}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardDescription className="text-xs font-mono">Experiences</CardDescription>
                  <CardTitle className="text-2xl font-bold">{portfolio?.experiences.length || 0}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardDescription className="text-xs font-mono">Unread Messages</CardDescription>
                  <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {messages.filter((m) => !m.read).length}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Backend &amp; Database Architecture</CardTitle>
                <CardDescription className="text-xs">
                  Connected endpoint: <code className="font-mono text-neutral-800 dark:text-neutral-200">{API_URL}</code>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <p>
                  Every change made in this dashboard writes directly to your PostgreSQL database through Express 5 and Prisma 7.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">Express 5.3</Badge>
                  <Badge variant="secondary">Prisma 7.10</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">JWT Auth</Badge>
                  <Badge variant="secondary">Zod Validation</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ──────────────── TAB 2: PROFILE & HERO ──────────────── */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Profile &amp; Intro Settings</CardTitle>
                <CardDescription className="text-xs">
                  Updates your hero section, bio, designation, photo, resume link, and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-name" className="text-xs font-mono">Full Name</Label>
                      <Input
                        id="prof-name"
                        value={profileForm.name || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-alias" className="text-xs font-mono">Alias / Badge</Label>
                      <Input
                        id="prof-alias"
                        value={profileForm.alias || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, alias: e.target.value })}
                        placeholder="aka [AT]"
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-desig" className="text-xs font-mono">Designation</Label>
                      <Input
                        id="prof-desig"
                        value={profileForm.designation || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                        required
                        placeholder="Full Stack Developer & Systems Learner"
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-loc" className="text-xs font-mono">Location</Label>
                      <Input
                        id="prof-loc"
                        value={profileForm.location || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="Dhaka, Bangladesh"
                        className="text-xs"
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="prof-avail"
                        checked={profileForm.isAvailable ?? true}
                        onCheckedChange={(checked) => setProfileForm({ ...profileForm, isAvailable: checked })}
                      />
                      <Label htmlFor="prof-avail" className="text-xs font-mono">Available for Work</Label>
                    </div>
                    <Input
                      value={profileForm.availabilityText || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, availabilityText: e.target.value })}
                      placeholder="Available for work"
                      className="text-xs max-w-xs"
                    />
                  </div>

                  {/* Photo & Resume URLs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-photo" className="text-xs font-mono">Photo URL</Label>
                      <Input
                        id="prof-photo"
                        value={profileForm.photoUrl || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, photoUrl: e.target.value })}
                        placeholder="https://..."
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-resume" className="text-xs font-mono">Resume Download URL</Label>
                      <Input
                        id="prof-resume"
                        value={profileForm.resumeUrl || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        className="text-xs"
                      />
                    </div>
                  </div>

                  {/* Hero narrative */}
                  <div className="space-y-1.5">
                    <Label htmlFor="prof-intro" className="text-xs font-mono">Hero Narrative Intro</Label>
                    <Textarea
                      id="prof-intro"
                      rows={2}
                      value={profileForm.heroIntro || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, heroIntro: e.target.value })}
                      required
                      className="text-xs"
                    />
                  </div>

                  {/* About Me paragraphs */}
                  <div className="space-y-1.5">
                    <Label htmlFor="prof-about" className="text-xs font-mono">
                      About Me Paragraphs (One paragraph per double newline)
                    </Label>
                    <Textarea
                      id="prof-about"
                      rows={6}
                      value={profileForm.aboutParagraphs?.join("\n\n") || ""}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          aboutParagraphs: e.target.value
                            .split("\n\n")
                            .map((p) => p.trim())
                            .filter(Boolean),
                        })
                      }
                      className="text-xs"
                    />
                  </div>

                  {/* Highlights Chips */}
                  <div className="space-y-1.5">
                    <Label htmlFor="prof-high" className="text-xs font-mono">
                      Highlights Chips (Comma separated)
                    </Label>
                    <Input
                      id="prof-high"
                      value={profileForm.highlights?.join(", ") || ""}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          highlights: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="text-xs"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-email" className="text-xs font-mono">Email</Label>
                      <Input
                        id="prof-email"
                        type="email"
                        value={profileForm.email || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        required
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-phone" className="text-xs font-mono">Phone</Label>
                      <Input
                        id="prof-phone"
                        value={profileForm.phone || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+880 1937 165042"
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-wa" className="text-xs font-mono">WhatsApp</Label>
                      <Input
                        id="prof-wa"
                        value={profileForm.whatsapp || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                        placeholder="+880 1570 234257"
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="prof-footer" className="text-xs font-mono">Footer Signature</Label>
                    <Input
                      id="prof-footer"
                      value={profileForm.footerText || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, footerText: e.target.value })}
                      placeholder="Built with precision."
                      className="text-xs"
                    />
                  </div>

                  <Button type="submit" disabled={savingProfile} className="text-xs">
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    {savingProfile ? "Saving to Database..." : "Save Profile Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ──────────────── TAB 3: PROJECTS ──────────────── */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">Featured Projects</h3>
                <p className="text-xs text-neutral-500">Manage case studies, stack details, challenges &amp; URLs</p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setEditingProject({
                    title: "",
                    slug: "",
                    category: "",
                    summary: "",
                    description: "",
                    imageUrl: "",
                    techStack: [],
                    liveUrl: "",
                    repoUrl: "",
                    challenges: "",
                    improvements: "",
                    featured: true,
                    order: (portfolio?.projects.length || 0),
                  });
                  setProjectDialogOpen(true);
                }}
                className="text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio?.projects.map((proj) => (
                <Card key={proj.id} className="relative flex flex-col justify-between">
                  <CardHeader className="p-4 pb-2 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                          {proj.title}
                          {proj.category && (
                            <Badge variant="outline" className="text-[10px] font-mono">
                              {proj.category}
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-xs line-clamp-2 mt-1">
                          {proj.summary}
                        </CardDescription>
                      </div>
                    </div>
                    {proj.imageUrl && (
                      <div className="rounded-md overflow-hidden h-32 border border-neutral-200 dark:border-neutral-800">
                        <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover object-top" />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 pt-1 space-y-2">
                    <div className="text-[11px] font-mono text-neutral-500 line-clamp-1">
                      {proj.techStack?.join(", ")}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono"
                      >
                        <Eye className="w-3 h-3" /> Preview
                      </Link>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingProject(proj);
                            setProjectDialogOpen(true);
                          }}
                          className="h-7 text-xs"
                        >
                          <Edit2 className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProject(proj.id)}
                          className="h-7 text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ──────────────── TAB 4: SKILLS ──────────────── */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">Skills &amp; Technology Stack</h3>
                <p className="text-xs text-neutral-500">Categorize skills and assign proficiency percentages</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCategoryDialogOpen(true)}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Category
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const firstCat = portfolio?.skillCategories[0]?.id || "";
                    setEditingSkill({
                      name: "",
                      icon: "⚡",
                      level: 80,
                      categoryId: firstCat,
                      order: 0,
                    });
                    setSkillDialogOpen(true);
                  }}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Skill
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {portfolio?.skillCategories.map((cat) => (
                <Card key={cat.id}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                      {cat.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <div className="flex flex-wrap gap-2">
                      {cat.skills?.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center gap-2 p-1.5 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs"
                        >
                          {s.icon && <span>{s.icon}</span>}
                          <span className="font-medium">{s.name}</span>
                          <span className="font-mono text-neutral-400 text-[10px]">({s.level}%)</span>
                          <button
                            onClick={() => {
                              setEditingSkill(s);
                              setSkillDialogOpen(true);
                            }}
                            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(s.id)}
                            className="text-neutral-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ──────────────── TAB 5: EXPERIENCE ──────────────── */}
          <TabsContent value="experience" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">Professional Experience</h3>
                <p className="text-xs text-neutral-500">Roles, contracts, companies and achievements</p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setEditingExp({
                    role: "",
                    company: "",
                    companyUrl: "",
                    location: "Remote",
                    employment: "Freelance",
                    startDate: "2024",
                    endDate: "Present",
                    description: "",
                    highlights: [],
                    technologies: [],
                    order: (portfolio?.experiences.length || 0),
                  });
                  setExpDialogOpen(true);
                }}
                className="text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Experience
              </Button>
            </div>

            <div className="space-y-3">
              {portfolio?.experiences.map((exp) => (
                <Card key={exp.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm font-bold">
                          {exp.role} <span className="text-neutral-400 font-normal">at</span> {exp.company}
                        </CardTitle>
                        <CardDescription className="text-xs font-mono">
                          {exp.startDate} – {exp.endDate || "Present"} • {exp.location}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingExp(exp);
                            setExpDialogOpen(true);
                          }}
                          className="h-7 text-xs"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteExp(exp.id)}
                          className="h-7 text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                    {exp.description && <p>{exp.description}</p>}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1 font-mono text-[10px]">
                        {exp.technologies.map((t, i) => (
                          <Badge key={i} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ──────────────── TAB 6: EDUCATION ──────────────── */}
          <TabsContent value="education" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">Educational Qualifications</h3>
                <p className="text-xs text-neutral-500">Degree programs, coursework, and institutions</p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setEditingEdu({
                    degree: "",
                    institution: "",
                    location: "Dhaka, Bangladesh",
                    startDate: "",
                    endDate: "",
                    result: "",
                    coursework: "",
                    description: "",
                    order: (portfolio?.education.length || 0),
                  });
                  setEduDialogOpen(true);
                }}
                className="text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Education
              </Button>
            </div>

            <div className="space-y-3">
              {portfolio?.education.map((edu) => (
                <Card key={edu.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm font-bold">{edu.degree}</CardTitle>
                        <CardDescription className="text-xs font-mono">
                          {edu.institution} • {edu.endDate}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingEdu(edu);
                            setEduDialogOpen(true);
                          }}
                          className="h-7 text-xs"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteEdu(edu.id)}
                          className="h-7 text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                    {edu.coursework && (
                      <p>
                        <strong className="text-neutral-700 dark:text-neutral-300">Coursework:</strong> {edu.coursework}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ──────────────── TAB 7: SOCIAL LINKS ──────────────── */}
          <TabsContent value="social" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">Social Media Profiles</h3>
                <p className="text-xs text-neutral-500">GitHub, LinkedIn, X, Facebook, and network links</p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setEditingSocial({
                    label: "",
                    url: "",
                    showInHero: true,
                    order: (portfolio?.socialLinks.length || 0),
                  });
                  setSocialDialogOpen(true);
                }}
                className="text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Social Link
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolio?.socialLinks.map((s) => (
                <Card key={s.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs flex items-center gap-2">
                      <span>{s.label}</span>
                      {s.showInHero && <Badge variant="secondary" className="text-[10px]">Hero</Badge>}
                    </div>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 font-mono truncate max-w-xs block hover:underline"
                    >
                      {s.url}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingSocial(s);
                        setSocialDialogOpen(true);
                      }}
                      className="h-7 text-xs"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSocial(s.id)}
                      className="h-7 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ──────────────── TAB 8: MESSAGES INBOX ──────────────── */}
          <TabsContent value="messages" className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">Contact Messages</h3>
              <p className="text-xs text-neutral-500">Direct inquiries received from visitors via the portfolio website</p>
            </div>

            {messages.length === 0 ? (
              <Card className="p-8 text-center text-xs text-neutral-500 font-mono">
                No contact messages yet. Test the contact form on your portfolio to see submissions arrive here!
              </Card>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <Card
                    key={m.id}
                    className={`p-4 transition ${
                      !m.read
                        ? "border-blue-500/50 bg-blue-50/20 dark:bg-blue-950/20"
                        : "border-neutral-200 dark:border-neutral-800"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                      <div>
                        <div className="font-semibold text-xs flex items-center gap-2">
                          <span>{m.name}</span>
                          <a
                            href={`mailto:${m.email}`}
                            className="text-blue-600 dark:text-blue-400 font-mono font-normal hover:underline"
                          >
                            &lt;{m.email}&gt;
                          </a>
                          {!m.read && <Badge className="text-[10px] bg-blue-600">New</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                        <span>{new Date(m.createdAt).toLocaleString()}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleMessageRead(m)}
                          className="h-7 text-xs"
                        >
                          {m.read ? "Mark Unread" : "Mark Read"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteMessage(m.id)}
                          className="h-7 text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="pt-2 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                      {m.body}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* ──────────────── PROJECT MODAL DIALOG ──────────────── */}
      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">
              {editingProject?.id ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Fill in all project specifications. These are instantly reflected on your portfolio.
            </DialogDescription>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Project Title *</Label>
                  <Input
                    value={editingProject.title || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="Red Humanity"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">URL Slug *</Label>
                  <Input
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="red-humanity"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Category Tag</Label>
                  <Input
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="Emergency Health"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Image URL (Screenshot)</Label>
                  <Input
                    value={editingProject.imageUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Summary (Card Preview)</Label>
                <Textarea
                  rows={2}
                  value={editingProject.summary || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  placeholder="Real-time emergency blood donation matching platform..."
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Full Detailed Description</Label>
                <Textarea
                  rows={3}
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Full architectural overview and features..."
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Tech Stack (Comma Separated)</Label>
                <Input
                  value={
                    Array.isArray(editingProject.techStack)
                      ? editingProject.techStack.join(", ")
                      : editingProject.techStack || ""
                  }
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  placeholder="Next.js, TypeScript, PostgreSQL, Prisma, Socket.io"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Live Project URL</Label>
                  <Input
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://redhumanity.app"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">GitHub Repository URL (Client)</Label>
                  <Input
                    value={editingProject.repoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, repoUrl: e.target.value })}
                    placeholder="https://github.com/asiftauhid/..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Challenges Faced</Label>
                <Textarea
                  rows={2}
                  value={editingProject.challenges || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, challenges: e.target.value })}
                  placeholder="Ensuring low-latency bidirectional socket state..."
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Potential Improvements &amp; Future Plans</Label>
                <Textarea
                  rows={2}
                  value={editingProject.improvements || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, improvements: e.target.value })}
                  placeholder="Integrating automated hospital blood-bank inventory Webhooks..."
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveProject}>
              Save Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ──────────────── SKILL MODAL DIALOG ──────────────── */}
      <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">
              {editingSkill?.id ? "Edit Skill" : "Add New Skill"}
            </DialogTitle>
          </DialogHeader>

          {editingSkill && (
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <Label className="text-xs">Skill Name *</Label>
                <Input
                  value={editingSkill.name || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="React / PostgreSQL / Docker"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Icon / Emoji</Label>
                  <Input
                    value={editingSkill.icon || ""}
                    onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                    placeholder="⚛️ / 🐘 / 📦"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Proficiency Level ({editingSkill.level || 70}%)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={editingSkill.level ?? 70}
                    onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Category</Label>
                <select
                  value={editingSkill.categoryId || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, categoryId: e.target.value })}
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-2"
                >
                  {portfolio?.skillCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setSkillDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveSkill}>
              Save Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ──────────────── CATEGORY MODAL DIALOG ──────────────── */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">New Skill Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-xs">
            <Label>Category Name</Label>
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Cloud &amp; AI"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreateCategory}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ──────────────── EXPERIENCE MODAL DIALOG ──────────────── */}
      <Dialog open={expDialogOpen} onOpenChange={setExpDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">
              {editingExp?.id ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
          </DialogHeader>

          {editingExp && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Role Title *</Label>
                  <Input
                    value={editingExp.role || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    placeholder="Full Stack Engineer"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Company Name *</Label>
                  <Input
                    value={editingExp.company || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    placeholder="Freelance / Tech Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Company URL</Label>
                  <Input
                    value={editingExp.companyUrl || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, companyUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1">
                  <Label>Location</Label>
                  <Input
                    value={editingExp.location || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    placeholder="Dhaka / Remote"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Start Date *</Label>
                  <Input
                    value={editingExp.startDate || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    placeholder="2024"
                  />
                </div>
                <div className="space-y-1">
                  <Label>End Date</Label>
                  <Input
                    value={editingExp.endDate || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    placeholder="Present"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={editingExp.description || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label>Technologies (Comma separated)</Label>
                <Input
                  value={
                    Array.isArray(editingExp.technologies)
                      ? editingExp.technologies.join(", ")
                      : editingExp.technologies || ""
                  }
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      technologies: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  placeholder="React, Next.js, PostgreSQL"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setExpDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveExp}>
              Save Experience
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ──────────────── EDUCATION MODAL DIALOG ──────────────── */}
      <Dialog open={eduDialogOpen} onOpenChange={setEduDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">
              {editingEdu?.id ? "Edit Education" : "Add Education"}
            </DialogTitle>
          </DialogHeader>

          {editingEdu && (
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <Label>Degree Title *</Label>
                <Input
                  value={editingEdu.degree || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  placeholder="B.Sc. in Computer Science & Engineering"
                />
              </div>

              <div className="space-y-1">
                <Label>Institution *</Label>
                <Input
                  value={editingEdu.institution || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  placeholder="Undergraduate Degree Program"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Start Date</Label>
                  <Input
                    value={editingEdu.startDate || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, startDate: e.target.value })}
                    placeholder="2022"
                  />
                </div>
                <div className="space-y-1">
                  <Label>End Date</Label>
                  <Input
                    value={editingEdu.endDate || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, endDate: e.target.value })}
                    placeholder="Present (Expected 2026)"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Core Coursework</Label>
                <Textarea
                  rows={2}
                  value={editingEdu.coursework || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, coursework: e.target.value })}
                  placeholder="Data Structures, DBMS, Operating Systems..."
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEduDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdu}>
              Save Education
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ──────────────── SOCIAL LINK MODAL DIALOG ──────────────── */}
      <Dialog open={socialDialogOpen} onOpenChange={setSocialDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">
              {editingSocial?.id ? "Edit Social Link" : "Add Social Link"}
            </DialogTitle>
          </DialogHeader>

          {editingSocial && (
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <Label>Label *</Label>
                <Input
                  value={editingSocial.label || ""}
                  onChange={(e) => setEditingSocial({ ...editingSocial, label: e.target.value })}
                  placeholder="GitHub / LinkedIn / X / Facebook"
                />
              </div>

              <div className="space-y-1">
                <Label>URL *</Label>
                <Input
                  value={editingSocial.url || ""}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Switch
                  id="soc-hero"
                  checked={editingSocial.showInHero ?? true}
                  onCheckedChange={(checked) =>
                    setEditingSocial({ ...editingSocial, showInHero: checked })
                  }
                />
                <Label htmlFor="soc-hero" className="text-xs">
                  Display in Hero section
                </Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setSocialDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveSocial}>
              Save Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
