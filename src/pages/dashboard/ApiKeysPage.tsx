"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Key, Plus, Copy, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { gsap } from "gsap"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  status: "active" | "inactive"
  permissions: string[]
}

export default function ApiKeysPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API",
      key: "sk_live_1234567890abcdef",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      status: "active",
      permissions: ["read", "write"],
    },
    {
      id: "2",
      name: "Development API",
      key: "sk_test_abcdef1234567890",
      created: "2024-01-10",
      lastUsed: "1 day ago",
      status: "active",
      permissions: ["read"],
    },
  ])
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(["read"])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current?.children) {
        gsap.from(Array.from(containerRef.current.children), {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        })
      }

      if (cardsRef.current?.children) {
        gsap.from(Array.from(cardsRef.current.children), {
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const createApiKey = () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_${selectedPermissions.includes("write") ? "live" : "test"}_${Math.random().toString(36).substring(2, 18)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      status: "active",
      permissions: selectedPermissions,
    }

    setApiKeys((prev) => [...prev, newKey])
    setIsCreateDialogOpen(false)
    setNewKeyName("")
    setSelectedPermissions(["read"])
  }

  const deleteApiKey = (keyId: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== keyId))
  }

  const maskKey = (key: string) => {
    return key.substring(0, 12) + "..." + key.substring(key.length - 4)
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">API Keys</h1>
          <p className="text-gray-400">Manage your API keys and access tokens</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription className="text-gray-400">
                Generate a new API key for your application
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input
                  id="keyName"
                  placeholder="Enter a name for your API key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="flex flex-wrap gap-2">
                  {["read", "write", "delete"].map((permission) => (
                    <label key={permission} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPermissions((prev) => [...prev, permission])
                          } else {
                            setSelectedPermissions((prev) => prev.filter((p) => p !== permission))
                          }
                        }}
                        className="rounded border-white/20 bg-white/10"
                      />
                      <span className="text-sm capitalize">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={createApiKey}
                disabled={!newKeyName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* API Keys List */}
      <div ref={cardsRef} className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="glass-effect border-white/20 hover:glow-effect transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-600/50">
                    <Key className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{apiKey.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      Created on {apiKey.created} • Last used {apiKey.lastUsed}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`${
                      apiKey.status === "active"
                        ? "bg-green-600/20 text-green-400 border-green-600/50"
                        : "bg-gray-600/20 text-gray-400 border-gray-600/50"
                    }`}
                  >
                    {apiKey.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteApiKey(apiKey.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/10 font-mono text-sm">
                    <span className="text-white">{showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="border-white/20 text-gray-300 hover:text-white"
                  >
                    {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="border-white/20 text-gray-300 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Permissions:</span>
                    <div className="flex space-x-1">
                      {apiKey.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="border-blue-600/50 text-blue-400 text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Guidelines */}
      <Card className="glass-effect border-white/20 glow-effect">
        <CardHeader>
          <CardTitle className="text-white">API Usage Guidelines</CardTitle>
          <CardDescription className="text-gray-400">Important information about using your API keys</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-400 font-semibold mb-2">Security Best Practices</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Never expose API keys in client-side code</li>
                <li>• Rotate keys regularly for enhanced security</li>
                <li>• Use environment variables to store keys</li>
                <li>• Monitor key usage for suspicious activity</li>
              </ul>
            </div>
            <div className="p-4 bg-green-600/10 rounded-lg border border-green-600/30">
              <h4 className="text-green-400 font-semibold mb-2">Rate Limits</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Pro Plan: 1,000 requests per minute</li>
                <li>• Basic Plan: 100 requests per minute</li>
                <li>• Burst limit: 2x rate limit for 1 minute</li>
                <li>• Contact support for higher limits</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
