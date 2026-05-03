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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  RefreshCw,
} from 'lucide-react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'whitehouse2026';

function RegistrationTable({
  rows,
  onVerify,
}: {
  rows: ReturnType<typeof useRegistrations>['registrations'];
  onVerify: (id: string) => void;
}) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No registrations found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>School</TableHead>
            <TableHead className="whitespace-nowrap">Guardian #</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="whitespace-nowrap">Ref #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id} className="hover:bg-gray-50">
              <TableCell className="font-medium whitespace-nowrap">{r.fullName}</TableCell>
              <TableCell>{r.age}</TableCell>
              <TableCell className="max-w-[140px] truncate text-sm">{r.schoolName}</TableCell>
              <TableCell className="whitespace-nowrap text-sm">{r.guardianContact}</TableCell>
              <TableCell className="font-semibold text-violet-700">Rs. {r.totalAmount}</TableCell>
              <TableCell>
                <Badge
                  className={
                    r.paymentStatus === 'verified'
                      ? 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200'
                  }
                >
                  {r.paymentStatus === 'verified' ? '✓ Verified' : '⏳ Pending'}
                </Badge>
              </TableCell>
              <TableCell className="text-xs font-mono text-gray-600">{r.paymentRefNumber}</TableCell>
              <TableCell className="text-xs whitespace-nowrap text-gray-500">
                {new Date(r.registrationDate).toLocaleDateString('en-NP')}
              </TableCell>
              <TableCell>
                {r.paymentStatus === 'pending' ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onVerify(r.id)}
                    className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 whitespace-nowrap"
                  >
                    Verify ✓
                  </Button>
                ) : (
                  <span className="text-xs text-gray-400">Done</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('wh_admin') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { registrations, loading, error, verifyPayment, exportToCSV, refetch } = useRegistrations();
  const [searchQuery, setSearchQuery] = useState('');
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

  const filterRows = (rows: typeof registrations) =>
    rows.filter((r) => {
      const matchesSearch =
        searchQuery === '' ||
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.guardianContact.includes(searchQuery) ||
        r.paymentRefNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || r.paymentStatus === filterStatus;
      return matchesSearch && matchesStatus;
    });

  const class8Rows = useMemo(
    () => filterRows(registrations.filter((r) => r.class === 8)),
    [registrations, searchQuery, filterStatus]
  );
  const class10Rows = useMemo(
    () => filterRows(registrations.filter((r) => r.class === 10)),
    [registrations, searchQuery, filterStatus]
  );
  const allRows = useMemo(
    () => filterRows(registrations),
    [registrations, searchQuery, filterStatus]
  );

  const stats = useMemo(() => ({
    total: registrations.length,
    class8: registrations.filter((r) => r.class === 8).length,
    class10: registrations.filter((r) => r.class === 10).length,
    verified: registrations.filter((r) => r.paymentStatus === 'verified').length,
    pending: registrations.filter((r) => r.paymentStatus === 'pending').length,
    revenue: registrations
      .filter((r) => r.paymentStatus === 'verified')
      .reduce((sum, r) => sum + r.totalAmount, 0),
  }), [registrations]);

  // ─── Login screen ───
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-violet-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-500 mt-1">The White House Dashboard</p>
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
              <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
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

  // ─── Dashboard ───
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-violet-600" />
            <h1 className="font-bold text-lg text-gray-900 hidden sm:block">
              The White House — Admin
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="hidden sm:flex"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: Users, color: 'text-gray-900' },
            { label: 'Class 8', value: stats.class8, icon: GraduationCap, color: 'text-blue-600' },
            { label: 'Class 10', value: stats.class10, icon: GraduationCap, color: 'text-indigo-600' },
            { label: 'Verified', value: stats.verified, icon: CheckCircle2, color: 'text-green-600' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
            { label: 'Revenue', value: `Rs.${stats.revenue}`, icon: IndianRupee, color: 'text-violet-700' },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className={`text-xl font-bold ${color}`}>{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Registrations Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-bold text-gray-900">Registrations</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search name, school, ref..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-60"
                  />
                </div>
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
                <Button variant="outline" onClick={exportToCSV} className="shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                Error: {error}
              </div>
            )}

            {/* Loading */}
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading registrations...</div>
            ) : (
              /* Class-wise tabs */
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">
                    All ({allRows.length})
                  </TabsTrigger>
                  <TabsTrigger value="class8">
                    Class 8 ({class8Rows.length})
                  </TabsTrigger>
                  <TabsTrigger value="class10">
                    Class 10 ({class10Rows.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <RegistrationTable rows={allRows} onVerify={verifyPayment} />
                </TabsContent>
                <TabsContent value="class8">
                  <RegistrationTable rows={class8Rows} onVerify={verifyPayment} />
                </TabsContent>
                <TabsContent value="class10">
                  <RegistrationTable rows={class10Rows} onVerify={verifyPayment} />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
