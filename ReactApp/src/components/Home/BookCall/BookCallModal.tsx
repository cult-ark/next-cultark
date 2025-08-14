import { XIcon, ArrowLeft, Calendar, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const employees = [
  {
    name: 'Farah Nabil',
    bookingLink: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2dwKBE6giZQzJgWLDcu5F-pbkQCzB-78IruL-WeLl5Fude-FflNS8IitVWT2TOwTj8rc2Um2cH',
    role: 'Senior Account Manager',
  },
  {
    name: 'May Omar',
    bookingLink: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0gSvqeqmOwVDGztX5Ln682EaDoUO1HQsuvzliSdKrLflakNdWid7GnUMQVZz4m_vIkDvtdQELx',
    role: 'Senior Account Manager',
  },
  {
    name: 'Amira Kadry',
    bookingLink: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0drBFCE7UlFYa7uV4AWM3Y1NkfF1lU9QR3gXMgVdEHFJCIBO_pvVSmsRpoqNpcirvtcCeGD6gi',
    role: 'Senior Account Manager',
  },
  {
    name: 'Zeina Khaled',
    bookingLink: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2-SWb91UaTt4uc2XqcCLYD_cM-qjJZNSz6yH_cDD-mDybG_opnRJ74uny84bSiB2A9vwh6SAiF',
    role: 'Senior Account Manager',
  },
];

const BookCallModal = ({ open, setOpen }: Props) => {
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employees[0] | null>(null);
  const [iframeContent, setIframeContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasPrefetched = useRef(false);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open, setOpen]);

  // Reset selected employee when modal closes
  useEffect(() => {
    if (!open) {
      setSelectedEmployee(null);
      setIframeContent(null);
    }
  }, [open]);

  // Prefetch links when modal opens
  useEffect(() => {
    if (open && !hasPrefetched.current) {
      employees.forEach(employee => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = employee.bookingLink;
        document.head.appendChild(link);
      });
      hasPrefetched.current = true;
    }
  }, [open]);

  const handleEmployeeSelect = async (employee: typeof employees[0]) => {
    setSelectedEmployee(employee);
    setIsLoading(true);
    
    // Check cache first
    const cacheKey = `calendar-cache-${employee.name}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      const cacheData = JSON.parse(cached);
      // Use cached content if it's less than 1 hour old
      if (Date.now() - cacheData.timestamp < 3600000) {
        setIframeContent(cacheData.html);
        setIsLoading(false);
        return;
      }
    }

    // Fetch fresh content
    try {
      const response = await fetch(employee.bookingLink, {
        mode: 'no-cors', // Bypass CORS for this demo (may not work in all cases)
        credentials: 'omit'
      });
      const html = await response.text();
      
      // Cache with timestamp
      const cacheData = {
        html,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      
      setIframeContent(html);
    } catch (error) {
      console.error('Failed to load calendar', error);
      // Fallback to regular iframe by keeping iframeContent null
    }
    
    setIsLoading(false);
  };

  const handleBackClick = () => {
    setSelectedEmployee(null);
    setIframeContent(null);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const renderCalendar = () => {
    if (isLoading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cultark-blue"></div>
        </div>
      );
    }

    if (iframeContent) {
      return (
        <div 
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: iframeContent }} 
        />
      );
    }

    // Fallback to regular iframe if no cached content
    return (
      <iframe
        src={selectedEmployee?.bookingLink}
        className="w-full h-full border-0"
        title={`Book appointment with ${selectedEmployee?.name}`}
        allow="camera; microphone; fullscreen; display-capture"
      />
    );
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            {selectedEmployee && (
              <button
                onClick={handleBackClick}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-cultark-blue" />
              <h2 id="modal-title" className="text-xl md:text-2xl font-semibold text-gray-900">
                {selectedEmployee ? `Book with ${selectedEmployee.name}` : 'Book a Call'}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="h-full max-h-[calc(90vh-80px)] overflow-y-auto">
          {!selectedEmployee ? (
            /* Employee Selection */
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg">
                  Choose a team member to schedule your consultation
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {employees.map((employee) => (
                  <button
                    key={employee.name}
                    onClick={() => handleEmployeeSelect(employee)}
                    className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-cultark-blue hover:shadow-lg transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-cultark-blue/10 rounded-full flex items-center justify-center group-hover:bg-cultark-blue/20 transition-colors">
                        <User className="w-6 h-6 text-cultark-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cultark-blue transition-colors">
                          {employee.name}
                        </h3>
                        <p className="text-sm text-gray-500">{employee.role}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Calendar Container */
            <div className="h-full relative">
              <div className="aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] w-full">
                {renderCalendar()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCallModal;