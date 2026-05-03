import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRegistrations } from '@/hooks/useRegistrations';
import {
  LogOut,
  Search,
  Download,
  Users,
  GraduationCap,
  IndianRupee,
  CheckCircle2,
  Clock,
  ArrowLeft,
} from 'lucide-react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'whitehouse2026';

export default function Admin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('wh_admin') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { registrations, loading, error, verifyPayment, exportToCSV } = useRegistrations();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('wh_admin', 'true');
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('wh_admin');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const matchesSearch =
        searchQuery === '' ||
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.guardianContact.includes(searchQuery) ||
        r.paymentRefNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClass =
        filterClass === 'all' || r.class.toString() === filterClass;

      const matchesStatus =
        filterStatus === 'all' || r.paymentStatus === filterStatus;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [registrations, searchQuery, filterClass, filterStatus]);

  const stats = useMemo(() => {
    return {
      total: registrations.length,
      verified: registrations.filter((r) => r.paymentStatus === 'verified')
        .length,
      pending: registrations.filter((r) => r.paymentStatus === 'pending').length,
      revenue: registrations
        .filter((r) => r.paymentStatus === 'verified')
        .reduce((sum, r) => sum + r.totalAmount, 0),
    };
  }, [registrations]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-violet-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Login
              </h1>
              <p className="text-gray-500 mt-1">
                The White House Dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              {loginError && (
                <p className="text-sm text-red-600">{loginError}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700"
              >
                Login
              </Button>
            </form>

            <Link
              to="/"
              className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-violet-600 mx-auto transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-violet-600" />
            <h1 className="font-bold text-xl text-gray-900 hidden sm:block">
              The White House — Admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="hidden sm:flex"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <Users className="w-8 h-8 text-violet-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Verified</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.verified}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold text-violet-700">
                    Rs. {stats.revenue}
                  </p>
                </div>
                <IndianRupee className="w-8 h-8 text-violet-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Registrations
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Select value={filterClass} onValueChange={setFilterClass}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={exportToCSV}
                  className="shrink-0"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                Error loading registrations: {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-12 text-gray-500">
                Loading registrations...
              </div>
            ) : (
            <div className="overflow-x-auto -mx-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Guardian</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ref #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        className="text-center text-gray-500 py-8"
                      >
                        No registrations found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRegistrations.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">
                          {r.fullName}
                        </TableCell>
                        <TableCell>{r.age}</TableCell>
                        <TableCell>Class {r.class}</TableCell>
                        <TableCell className="max-w-[120px] truncate">
                          {r.schoolName}
                        </TableCell>
                        <TableCell>{r.guardianContact}</TableCell>
                        <TableCell className="max-w-[160px]">
                          <span className="text-xs">
                            {r.selectedSubjects.join(', ')}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          Rs. {r.totalAmount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              r.paymentStatus === 'verified'
                                ? 'default'
                                : 'secondary'
                            }
                            className={
                              r.paymentStatus === 'verified'
                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                            }
                          >
                            {r.paymentStatus === 'verified'
                              ? 'Verified'
                              : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-mono">
                          {r.paymentRefNumber}
                        </TableCell>
                        <TableCell className="text-xs whitespace-nowrap">
                          {new Date(r.registrationDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {r.paymentStatus === 'pending' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => verifyPayment(r.id)}
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                              Verify
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Done
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
