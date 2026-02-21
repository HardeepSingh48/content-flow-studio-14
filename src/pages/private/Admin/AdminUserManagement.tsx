// src/pages/AdminUserManagement.tsx

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN' | 'TESTER';
    createdAt: string;
}

export default function AdminUserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await api.adminGetUsers();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await api.adminUpdateUserRole(userId, newRole);
            // Optimistic update or refresh
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as any } : u));
            toast.success('User role updated');
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-white">User Management</h1>

            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Current Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium text-white">{user.name || 'N/A'}</TableCell>
                                <TableCell className="text-white/70">{user.email}</TableCell>
                                <TableCell>
                                    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold", user.role === 'ADMIN' ? 'bg-primary/20 text-primary' :
                                        user.role === 'TESTER' ? 'bg-info-500/20 text-info-400' :
                                            'bg-white/10 text-white/70'
                                    )}>
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={user.role}
                                        onValueChange={(val) => handleRoleChange(user.id, val)}
                                    >
                                        <SelectTrigger className="w-[120px] bg-white/5 border-white/10 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USER">User</SelectItem>
                                            <SelectItem value="TESTER">Tester</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
