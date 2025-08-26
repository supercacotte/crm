import React, { useState } from 'react';
import { Menu, X, User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ProspectList from './components/ProspectList';
import { ClientList } from './components/ClientList';
import ContactDetail from './components/ContactDetail';
import PipelinePage from './components/PipelinePage';
import CalendarPage from './components/CalendarPage';
import SessionsPage from './components/SessionsPage';
import SettingsPage from './components/SettingsPage';
import BillingPage from './components/BillingPage';
import StaffManagementPage from './components/StaffManagementPage';
import DashboardPage from './components/DashboardPage';
import AccessDeniedPage from './components/AccessDeniedPage';
import { Client } from './types/Client';
import { User, DEFAULT_PERMISSIONS } from './types/User';

// Simple Login Component
const LoginPage: React.FC<{ onLogin: (role: 'admin' | 'coach') => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@coachcrm.com');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'coach'>('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CoachCRM</h1>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rôle de démonstration
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'coach')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="admin">Administrateur</option>
              <option value="coach">Coach</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold"
          >
            Se connecter
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Compte de démonstration :</p>
          <p>Email: admin@coachcrm.com</p>
          <p>Mot de passe: admin123</p>
          <p className="mt-2 text-blue-600 font-medium">
            Choisissez "Administrateur" ou "Coach" pour tester les différentes interfaces
          </p>
        </div>
      </div>
    </div>
  );
};

interface Prospect {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'lead' | 'contacted' | 'meeting_scheduled' | 'proposal_sent' | 'negotiation' | 'closed_won' | 'closed_lost';
  tags: string[];
  lastContact: string;
  starred: boolean;
  coachingGoals?: string;
  budget?: string;
  timeline?: string;
  notes?: string;
  assignedCoachId?: number;
}

function App() {
  const [activeSection, setActiveSection] = useState('/admin/dashboard');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [userRole, setUserRole] = useState<'ADMIN' | 'COACH'>('ADMIN');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  
  // Initialize current user (admin by default)
  const [currentUser, setCurrentUser] = useState<User>({
    id: 1,
    name: userRole === 'ADMIN' ? 'Admin User' : 'Marie Coach',
    email: userRole === 'ADMIN' ? 'admin@coachcrm.com' : 'marie@coachcrm.com',
    phone: '+33 6 12 34 56 78',
    role: userRole,
    permissions: DEFAULT_PERMISSIONS[userRole],
    isActive: true,
    createdAt: '2024-01-01',
    specialties: userRole === 'ADMIN' ? ['Leadership', 'Développement personnel'] : ['Confiance en soi', 'Carrière']
  });
  
  const [prospects, setProspects] = useState<Prospect[]>([
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      source: 'Site web',
      status: 'meeting_scheduled',
      tags: ['Confiance en soi', 'Carrière'],
      lastContact: '2 jours',
      starred: true,
      coachingGoals: 'Développer sa confiance pour évoluer professionnellement',
      budget: '150-200€/mois',
      timeline: '6 mois',
      assignedCoachId: 2,
    },
    {
      id: 2,
      name: 'Pierre Martin',
      email: 'pierre.martin@email.com',
      phone: '+33 6 23 45 67 89',
      source: 'Recommandation',
      status: 'proposal_sent',
      tags: ['Stress', 'Équilibre vie pro/perso'],
      lastContact: '1 semaine',
      starred: false,
      coachingGoals: 'Gérer le stress et trouver un meilleur équilibre',
      budget: '100-150€/mois',
      timeline: '3-4 mois',
      assignedCoachId: 1,
    },
  ]);
  
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'Sophie Laurent',
      email: 'sophie.laurent@email.com',
      phone: '+33 6 34 56 78 90',
      company: '',
      status: 'active',
      tags: ['Leadership', 'Confiance'],
      lastContact: '3 jours',
      starred: true,
      coachingProgram: 'Leadership & Confiance - 12 séances',
      startDate: '2024-01-15',
      sessionsCompleted: 8,
      totalSessions: 12,
      nextSession: '2024-01-25 14:00',
      goals: ['Développer son leadership', 'Prendre la parole en public', 'Gérer une équipe'],
      progress: 'Excellents progrès, plus à l\'aise en réunion',
      value: 1800,
      assignedCoachId: 2,
      billing: {
        hourlyRate: 150,
        packagePrice: 1800,
        paymentMethod: 'package',
        invoices: [
          {
            id: 1,
            clientId: 1,
            invoiceNumber: 'INV-2024-001',
            date: '2024-01-15',
            dueDate: '2024-02-15',
            amount: 1800,
            status: 'paid',
            items: [
              {
                id: 1,
                description: 'Programme Leadership & Confiance - 12 séances',
                quantity: 1,
                unitPrice: 1800,
                total: 1800
              }
            ]
          }
        ],
        totalPaid: 1800,
        totalDue: 0
      }
    },
    {
      id: 2,
      name: 'Thomas Rousseau',
      email: 'thomas.rousseau@email.com',
      phone: '+33 6 45 67 89 01',
      company: '',
      status: 'active',
      tags: ['Reconversion', 'Motivation'],
      lastContact: '1 semaine',
      starred: false,
      coachingProgram: 'Reconversion Professionnelle - 8 séances',
      startDate: '2024-01-08',
      sessionsCompleted: 4,
      totalSessions: 8,
      nextSession: '2024-01-28 10:00',
      goals: ['Clarifier son projet professionnel', 'Développer un plan d\'action', 'Retrouver la motivation'],
      progress: 'Projet se précise, motivation en hausse',
      value: 1200,
      assignedCoachId: 2,
      billing: {
        hourlyRate: 150,
        packagePrice: 1200,
        paymentMethod: 'package',
        invoices: [
          {
            id: 2,
            clientId: 2,
            invoiceNumber: 'INV-2024-002',
            date: '2024-01-08',
            dueDate: '2024-02-08',
            amount: 600,
            status: 'paid',
            items: [
              {
                id: 1,
                description: 'Acompte Programme Reconversion - 50%',
                quantity: 1,
                unitPrice: 600,
                total: 600
              }
            ]
          },
          {
            id: 3,
            clientId: 2,
            invoiceNumber: 'INV-2024-003',
            date: '2024-01-22',
            dueDate: '2024-02-22',
            amount: 600,
            status: 'sent',
            items: [
              {
                id: 1,
                description: 'Solde Programme Reconversion - 50%',
                quantity: 1,
                unitPrice: 600,
                total: 600
              }
            ]
          }
        ],
        totalPaid: 600,
        totalDue: 600
      }
    },
    {
      id: 3,
      name: 'Isabelle Moreau',
      email: 'isabelle.moreau@email.com',
      phone: '+33 6 56 78 90 12',
      company: '',
      status: 'completed',
      tags: ['Confiance en soi', 'Prise de parole'],
      lastContact: '2 semaines',
      starred: false,
      coachingProgram: 'Confiance & Communication - 10 séances',
      startDate: '2023-11-01',
      sessionsCompleted: 10,
      totalSessions: 10,
      goals: ['Prendre confiance en soi', 'Améliorer sa communication', 'Oser s\'exprimer'],
      progress: 'Objectifs atteints avec succès',
      value: 1500,
      assignedCoachId: 1,
      billing: {
        hourlyRate: 150,
        packagePrice: 1500,
        paymentMethod: 'package',
        invoices: [
          {
            id: 4,
            clientId: 3,
            invoiceNumber: 'INV-2023-015',
            date: '2023-11-01',
            dueDate: '2023-12-01',
            amount: 1500,
            status: 'paid',
            items: [
              {
                id: 1,
                description: 'Programme Confiance & Communication - 10 séances',
                quantity: 1,
                unitPrice: 1500,
                total: 1500
              }
            ]
          }
        ],
        totalPaid: 1500,
        totalDue: 0
      }
    },
  ]);

  const [staff, setStaff] = useState<User[]>([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@coachcrm.com',
      phone: '+33 6 12 34 56 78',
      role: 'ADMIN',
      permissions: DEFAULT_PERMISSIONS['ADMIN'],
      isActive: true,
      createdAt: '2024-01-01',
      specialties: ['Leadership', 'Développement personnel']
    },
    {
      id: 2,
      name: 'Marie Coach',
      email: 'marie@coachcrm.com',
      phone: '+33 6 23 45 67 89',
      role: 'COACH',
      permissions: DEFAULT_PERMISSIONS['COACH'],
      isActive: true,
      createdAt: '2024-01-15',
      specialties: ['Confiance en soi', 'Carrière']
    }
  ]);

  // Mettre à jour l'utilisateur actuel quand le rôle change
  React.useEffect(() => {
    const newUser: User = {
      id: userRole === 'ADMIN' ? 1 : 2,
      name: userRole === 'ADMIN' ? 'Admin User' : 'Marie Coach',
      email: userRole === 'ADMIN' ? 'admin@coachcrm.com' : 'marie@coachcrm.com',
      phone: '+33 6 12 34 56 78',
      role: userRole,
      permissions: DEFAULT_PERMISSIONS[userRole],
      isActive: true,
      createdAt: '2024-01-01',
      specialties: userRole === 'ADMIN' ? ['Leadership', 'Développement personnel'] : ['Confiance en soi', 'Carrière']
    };
    setCurrentUser(newUser);
    
    // Rediriger vers la page appropriée selon le rôle
    if (userRole === 'ADMIN' && !activeSection.startsWith('/admin/')) {
      setActiveSection('/admin/dashboard');
    } else if (userRole === 'COACH' && !activeSection.startsWith('/coach/')) {
      setActiveSection('/coach/pipeline');
    }
  }, [userRole, activeSection]);
  const handleSelectProspect = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setSelectedClient(null);
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setSelectedProspect(null);
  };

  const handleCloseDetail = () => {
    setSelectedProspect(null);
    setSelectedClient(null);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    setSelectedClient(updatedClient);
  };

  const handleAddProspect = (newProspect: Prospect) => {
    setProspects([...prospects, newProspect]);
  };

  const handleAddClient = (newClient: Client) => {
    setClients([...clients, newClient]);
  };

  const handleCreateSession = (newSession: any) => {
    setSessions([...sessions, newSession]);
  };

  const handleAddStaff = (newUser: User) => {
    setStaff([...staff, newUser]);
  };

  const handleUpdateStaff = (updatedUser: User) => {
    setStaff(staff.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleDeleteStaff = (userId: number) => {
    if (userId === currentUser.id) {
      alert('Vous ne pouvez pas supprimer votre propre compte');
      return;
    }
    setStaff(staff.filter(user => user.id !== userId));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
  };

  const handleLogin = (role: 'ADMIN' | 'COACH') => {
    setIsAuthLoading(true);
    // Simulate auth loading
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserRole(role);
      setIsAuthLoading(false);
    }, 1000);
  };

  const handleProfileClick = () => {
    setActiveSection('settings');
    setIsUserMenuOpen(false);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    // Apply theme to document
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleDensityChange = (newDensity: 'comfortable' | 'compact') => {
    setDensity(newDensity);
    // Apply density to document
    document.documentElement.classList.toggle('compact', newDensity === 'compact');
  };

  // Filtrer les données selon le rôle
  const getFilteredData = () => {
    if (currentUser.role === 'ADMIN') {
      return {
        prospects,
        clients,
        sessions,
        staff
      };
    } else {
      // Coach ne voit que ses données
      return {
        prospects: prospects.filter(p => p.assignedCoachId === currentUser.id),
        clients: clients.filter(c => c.assignedCoachId === currentUser.id),
        sessions: sessions.filter(s => {
          const client = clients.find(c => c.id === s.clientId);
          return client && client.assignedCoachId === currentUser.id;
        }),
        staff: staff.filter(s => s.id === currentUser.id) // Coach ne voit que lui-même
      };
    }
  };

  const filteredData = getFilteredData();
  
  // Route guard function
  const requireAdmin = () => {
    return currentUser.role === 'ADMIN';
  };
  
  // Get page title from route
  const getPageTitle = (route: string) => {
    const routeMap: Record<string, string> = {
      '/admin/dashboard': 'Dashboard',
      '/admin/pipeline': 'Pipeline',
      '/admin/clients': 'Clients',
      '/admin/calendrier': 'Calendrier',
      '/admin/seances': 'Séances',
      '/admin/facturation': 'Facturation',
      '/admin/equipe': 'Équipe',
      '/admin/settings': 'Paramètres',
      '/coach/pipeline': 'Pipeline',
      '/coach/clients': 'Clients',
      '/coach/calendrier': 'Calendrier',
      '/coach/seances': 'Séances',
      '/coach/facturation': 'Facturation',
      '/coach/settings': 'Paramètres',
    };
    return routeMap[route] || 'Page non trouvée';
  };
  
  const renderMainContent = () => {
    // Admin routes
    if (activeSection.startsWith('/admin/')) {
      if (!requireAdmin()) {
        return <AccessDeniedPage />;
      }
      
      const adminRoute = activeSection.replace('/admin/', '');
      switch (adminRoute) {
        case 'dashboard':
          return (
            <DashboardPage 
              clients={clients}
              prospects={prospects}
              sessions={sessions}
              staff={staff}
            />
          );
        case 'pipeline':
          return (
            <PipelinePage 
              prospects={prospects}
              onSelectProspect={handleSelectProspect}
              selectedProspectId={selectedProspect?.id || null}
              onAddProspect={handleAddProspect}
              currentUser={currentUser}
              staff={staff}
            />
          );
        case 'clients':
          return (
            <ClientList 
              onSelectClient={handleSelectClient} 
              selectedClientId={selectedClient?.id || null}
              clients={clients}
              onAddClient={handleAddClient}
              staff={staff}
              currentUser={currentUser}
              sessions={sessions}
            />
          );
        case 'calendrier':
          return <CalendarPage clients={clients} prospects={prospects} staff={staff} currentUser={currentUser} />;
        case 'seances':
          return <SessionsPage clients={clients} sessions={sessions} onUpdateSessions={setSessions} />;
        case 'facturation':
          return <BillingPage clients={clients} onUpdateClient={handleUpdateClient} currentUser={currentUser} />;
        case 'equipe':
          return (
            <StaffManagementPage
              currentUser={currentUser}
              staff={staff}
              onAddStaff={handleAddStaff}
              onUpdateStaff={handleUpdateStaff}
              onDeleteStaff={handleDeleteStaff}
            />
          );
        case 'settings':
          return (
            <SettingsPage 
              theme={theme}
              density={density}
              onThemeChange={handleThemeChange}
              onDensityChange={handleDensityChange}
              currentUser={currentUser}
            />
          );
        default:
          return <NotFoundPage />;
      }
    }
    
    // Coach routes
    if (activeSection.startsWith('/coach/')) {
      if (currentUser.role !== 'COACH') {
        return <AccessDeniedPage />;
      }
      
      const coachRoute = activeSection.replace('/coach/', '');
      switch (coachRoute) {
        case 'pipeline':
          return (
            <PipelinePage 
              prospects={filteredData.prospects}
              onSelectProspect={handleSelectProspect}
              selectedProspectId={selectedProspect?.id || null}
              onAddProspect={handleAddProspect}
              currentUser={currentUser}
              staff={staff}
            />
          );
        case 'clients':
          return (
            <ClientList 
              onSelectClient={handleSelectClient} 
              selectedClientId={selectedClient?.id || null}
              clients={filteredData.clients}
              onAddClient={handleAddClient}
              staff={staff}
              currentUser={currentUser}
              sessions={filteredData.sessions}
            />
          );
        case 'calendrier':
          return <CalendarPage clients={filteredData.clients} prospects={filteredData.prospects} staff={staff} currentUser={currentUser} />;
        case 'seances':
          return <SessionsPage clients={filteredData.clients} sessions={filteredData.sessions} onUpdateSessions={setSessions} />;
        case 'facturation':
          return <BillingPage clients={filteredData.clients} onUpdateClient={handleUpdateClient} currentUser={currentUser} />;
        case 'settings':
          return (
            <SettingsPage 
              theme={theme}
              density={density}
              onThemeChange={handleThemeChange}
              onDensityChange={handleDensityChange}
              currentUser={currentUser}
            />
          );
        default:
          return <NotFoundPage />;
      }
    }
    
    // Fallback routes
    switch (activeSection) {
      case '403':
        return <AccessDeniedPage />;
      case '404':
        return <NotFoundPage />;
      default:
        // Redirect to appropriate default route
        if (currentUser.role === 'ADMIN') {
          setActiveSection('/admin/dashboard');
        return (
          <DashboardPage 
            clients={clients}
            prospects={prospects}
            sessions={sessions}
            staff={staff}
          />
        );
        } else {
          setActiveSection('/coach/pipeline');
        return (
          <PipelinePage 
            prospects={filteredData.prospects}
            onSelectProspect={handleSelectProspect}
            selectedProspectId={selectedProspect?.id || null}
            onAddProspect={handleAddProspect}
            currentUser={currentUser}
            staff={staff}
          />
        );
        }
    }
  };
  
  // Show login page if not logged in
  if (!isLoggedIn || isAuthLoading) {
    if (isAuthLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Connexion en cours...</p>
          </div>
        </div>
      );
    }
    return <LoginPage onLogin={handleLogin} />;
  }
  
  return (
    <div className={`app-wrapper bg-gray-50 ${theme === 'dark' ? 'dark' : ''} ${density === 'compact' ? 'compact' : ''}`}>
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentUser={currentUser}
      />
      
      {/* Main Content Area */}
      <div className="main-content">
        {/* Header */}
        <header className="header sticky-header bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Page Title - Hidden on mobile when sidebar is open */}
            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl font-bold text-gray-900 capitalize lg:hidden">
                {getPageTitle(activeSection)}
              </h1>
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 min-w-0"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="text-sm font-semibold text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-left hidden sm:block min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-600 truncate">{currentUser.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </button>
              
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-semibold text-white">
                            {currentUser.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
                          <p className="text-xs text-gray-600 truncate">{currentUser.email}</p>
                          <p className="text-xs text-blue-600 font-medium">
                            {currentUser.role === 'ADMIN' ? 'Administrateur' : 'Coach'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                    >
                      <UserIcon className="w-4 h-4 mr-3" />
                      Mon profil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="page-container">
          {renderMainContent()}
        </main>
      </div>
      
      {/* Contact Detail Sidebar */}
      {(selectedProspect || selectedClient) && (
        <ContactDetail 
          prospect={selectedProspect}
          client={selectedClient} 
          sessions={sessions}
          onClose={handleCloseDetail}
          onUpdateClient={handleUpdateClient}
          onCreateSession={handleCreateSession}
        />
      )}
    </div>
  );
}

export default App;