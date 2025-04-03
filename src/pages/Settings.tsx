
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Save,
  Trash2
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Settings = () => {
  const [userSettings, setUserSettings] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Smith Insurance Inspections',
    phone: '(555) 123-4567',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    reportCompleted: true,
    reportFailed: true,
    weeklyDigest: false,
  });

  const [storageSettings, setStorageSettings] = useState({
    autoDeleteReports: false,
    autoDeleteDays: 30,
    compressPhotos: true,
    backupEnabled: false,
  });

  const handleUserSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationToggle = (settingName: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [settingName]: !prev[settingName],
    }));
  };

  const handleStorageToggle = (settingName: keyof typeof storageSettings) => {
    setStorageSettings((prev) => ({
      ...prev,
      [settingName]: !prev[settingName],
    }));
  };

  const handleStorageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStorageSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleClearData = () => {
    toast('Are you sure you want to clear all data?', {
      action: {
        label: 'Confirm',
        onClick: () => toast.success('All data cleared successfully!'),
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 container py-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <SettingsIcon className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="data">
              <Database className="h-4 w-4 mr-2" />
              Data & Storage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={userSettings.name} 
                      onChange={handleUserSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={userSettings.email} 
                      onChange={handleUserSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input 
                      id="company" 
                      name="company"
                      value={userSettings.company} 
                      onChange={handleUserSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={userSettings.phone} 
                      onChange={handleUserSettingsChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Update Password</Label>
                  <div className="flex items-center gap-4">
                    <Input type="password" id="password" placeholder="••••••••" />
                    <Button size="sm">Update</Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive email notifications about your reports
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="font-medium">Report Notifications</div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Report Completed</div>
                      <div className="text-sm text-muted-foreground">
                        Notify when a report has been successfully generated
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.reportCompleted}
                      onCheckedChange={() => handleNotificationToggle('reportCompleted')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Report Failed</div>
                      <div className="text-sm text-muted-foreground">
                        Notify when there was an error generating a report
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.reportFailed}
                      onCheckedChange={() => handleNotificationToggle('reportFailed')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Weekly Digest</div>
                      <div className="text-sm text-muted-foreground">
                        Receive a weekly summary of all your reports
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={() => handleNotificationToggle('weeklyDigest')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Manage how your data and reports are stored.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Compress Photos</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically compress photos to save storage space
                    </div>
                  </div>
                  <Switch 
                    checked={storageSettings.compressPhotos}
                    onCheckedChange={() => handleStorageToggle('compressPhotos')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Auto-Delete Old Reports</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically delete reports after specified days
                    </div>
                  </div>
                  <Switch 
                    checked={storageSettings.autoDeleteReports}
                    onCheckedChange={() => handleStorageToggle('autoDeleteReports')}
                  />
                </div>
                
                {storageSettings.autoDeleteReports && (
                  <div className="pl-6 border-l-2 border-muted space-y-2">
                    <Label htmlFor="autoDeleteDays">Days to keep reports</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="autoDeleteDays" 
                        name="autoDeleteDays"
                        type="number" 
                        min="1"
                        value={storageSettings.autoDeleteDays} 
                        onChange={handleStorageInputChange}
                        className="max-w-[100px]"
                      />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Enable Cloud Backup</div>
                    <div className="text-sm text-muted-foreground">
                      Backup all your reports and data to the cloud
                    </div>
                  </div>
                  <Switch 
                    checked={storageSettings.backupEnabled}
                    onCheckedChange={() => handleStorageToggle('backupEnabled')}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="destructive" onClick={handleClearData}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
