import React, { useState, useRef } from 'react';
import { 
  FileText, Search, Filter, Upload, Download, Eye, Edit, Trash2, Star, Lock, 
  Scan, FileSignature, Languages, Archive, Scale, Calculator, Map, CheckCircle, 
  AlertTriangle, Zap, Globe, Camera, Printer, Copy, Share, RefreshCw, X, Plus,
  BookOpen, Shield, Gavel, Building, Users, Clock, TrendingUp, Award, AlertCircle
} from 'lucide-react';
import { 
  compareContracts, 
  analyzeContractRisk, 
  summarizeDocument, 
  generateComplianceTasks,
  createMockFile 
} from '../lib/documentApi';
import ResultsModal from '../components/ResultsModal';

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const [showLandAnalyzer, setShowLandAnalyzer] = useState(false);
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [showAutoDrafting, setShowAutoDrafting] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [notifications, setNotifications] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileUploadRef = useRef(null);
  const ocrUploadRef = useRef(null);
  
  // Existing state
  const [loading, setLoading] = useState({});
  const [results, setResults] = useState({});
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [resultTitle, setResultTitle] = useState('');
  const [resultType, setResultType] = useState('');

  // Hero.js Color Palette
  const colors = {
    cream: '#f5f5ef',
    navy: '#1f2839',
    golden: '#b69d74',
    gray: '#6b7280',
    green: '#10b981',
    amber: '#f59e0b',
    blue: '#3b82f6',
    red: '#ef4444'
  };

  // Enhanced document data with Indian legal categories
  const [documents] = useState([
    {
      id: 1,
      name: 'Writ Petition - Right to Information.pdf',
      type: 'pdf',
      size: '2.4 MB',
      category: 'Petitions & Plaints',
      status: 'Filed',
      author: 'Adv. Rajesh Kumar',
      lastModified: '2024-10-08',
      createdDate: '2024-10-05',
      tags: ['RTI', 'Writ Petition', 'High Court', 'Tamil'],
      version: '1.3',
      downloads: 12,
      views: 45,
      isStarred: true,
      isLocked: false,
      description: 'Writ Petition filed in Madras High Court seeking RTI information from Revenue Department',
      caseId: 'WP-2024-001',
      language: 'tamil-english',
      ocrProcessed: true,
      riskScore: 15,
      confidenceLevel: 'High'
    },
    {
      id: 2,
      name: 'Written Statement - Property Dispute.docx',
      type: 'docx',
      size: '1.8 MB',
      category: 'Written Statements',
      status: 'Draft',
      author: 'Adv. Priya Malhotra',
      lastModified: '2024-10-07',
      createdDate: '2024-10-05',
      tags: ['Property', 'Civil Suit', 'Tamil Nadu', 'Land Records'],
      version: '2.1',
      downloads: 8,
      views: 23,
      isStarred: false,
      isLocked: true,
      description: 'Written Statement in response to property title dispute over Survey No. 45/2B',
      caseId: 'CS-2024-089',
      language: 'english',
      ocrProcessed: true,
      riskScore: 8,
      confidenceLevel: 'Medium'
    },
    {
      id: 3,
      name: 'Affidavit - Income Certificate.pdf',
      type: 'pdf',
      size: '0.9 MB',
      category: 'Affidavits',
      status: 'Notarized',
      author: 'Adv. Amit Agarwal',
      lastModified: '2024-10-06',
      createdDate: '2024-10-04',
      tags: ['Affidavit', 'Income Certificate', 'Government', 'Tamil'],
      version: '1.0',
      downloads: 5,
      views: 18,
      isStarred: true,
      isLocked: false,
      description: 'Sworn affidavit for income certificate application to Tahsildar office',
      caseId: 'MISC-2024-034',
      language: 'tamil',
      ocrProcessed: true,
      riskScore: 2,
      confidenceLevel: 'High'
    },
    {
      id: 4,
      name: 'Patta Document - Survey 123_4A.pdf',
      type: 'pdf',
      size: '3.2 MB',
      category: 'Evidence Documents',
      status: 'Verified',
      author: 'Revenue Inspector',
      lastModified: '2024-10-05',
      createdDate: '2024-09-28',
      tags: ['Patta', 'Land Records', 'Revenue', 'Tamil Nadu'],
      version: '1.0',
      downloads: 15,
      views: 67,
      isStarred: true,
      isLocked: true,
      description: 'Original Patta document for Survey No. 123/4A, Village Perungudi, Taluk Chennai',
      caseId: 'LAND-2024-012',
      language: 'tamil',
      ocrProcessed: true,
      riskScore: 5,
      confidenceLevel: 'High',
      landDetails: {
        surveyNo: '123/4A',
        village: 'Perungudi',
        taluk: 'Chennai',
        district: 'Chennai',
        area: '2.5 acres',
        classification: 'Dry Land',
        ownerName: 'Raman Krishnan',
        encumbranceVerified: true
      }
    },
    {
      id: 5,
      name: 'Court Order - Interim Injunction.pdf',
      type: 'pdf',
      size: '1.5 MB',
      category: 'Court Orders',
      status: 'Issued',
      author: 'Hon\'ble Justice M. Sathyanarayanan',
      lastModified: '2024-10-04',
      createdDate: '2024-10-04',
      tags: ['Court Order', 'Injunction', 'High Court', 'Property'],
      version: '1.0',
      downloads: 20,
      views: 89,
      isStarred: true,
      isLocked: true,
      description: 'Interim injunction order restraining defendant from alienating property',
      caseId: 'OSA-2024-156',
      language: 'english',
      ocrProcessed: true,
      riskScore: 0,
      confidenceLevel: 'High'
    },
    {
      id: 6,
      name: 'Sale Deed Agreement - Chennai Property.pdf',
      type: 'pdf',
      size: '2.8 MB',
      category: 'Contracts & Agreements',
      status: 'Executed',
      author: 'Sub-Registrar, Guindy',
      lastModified: '2024-10-03',
      createdDate: '2024-10-01',
      tags: ['Sale Deed', 'Property', 'Registration', 'Stamp Duty'],
      version: '1.0',
      downloads: 12,
      views: 34,
      isStarred: false,
      isLocked: false,
      description: 'Registered sale deed for residential property in T. Nagar, Chennai',
      caseId: 'REG-2024-890',
      language: 'english',
      ocrProcessed: true,
      riskScore: 12,
      confidenceLevel: 'Medium'
    },
    {
      id: 7,
      name: 'RTI Application - Municipality Records.pdf',
      type: 'pdf',
      size: '0.8 MB',
      category: 'RTI Applications',
      status: 'Submitted',
      author: 'Citizen Petitioner',
      lastModified: '2024-10-02',
      createdDate: '2024-10-02',
      tags: ['RTI', 'Municipality', 'Information', 'Transparency'],
      version: '1.0',
      downloads: 3,
      views: 15,
      isStarred: false,
      isLocked: false,
      description: 'RTI application seeking building plan approval records from Chennai Corporation',
      caseId: 'RTI-2024-445',
      language: 'english',
      ocrProcessed: true,
      riskScore: 1,
      confidenceLevel: 'High'
    },
    {
      id: 8,
      name: 'FIR Copy - Cheque Bounce Case.pdf',
      type: 'pdf',
      size: '1.2 MB',
      category: 'Police Complaints/FIRs',
      status: 'Filed',
      author: 'Inspector, Cyber Crime',
      lastModified: '2024-10-01',
      createdDate: '2024-09-30',
      tags: ['FIR', 'Cheque Bounce', 'Section 138', 'Criminal'],
      version: '1.0',
      downloads: 8,
      views: 28,
      isStarred: true,
      isLocked: true,
      description: 'FIR filed under Section 138 NI Act for dishonor of cheque worth ₹2.5 lakhs',
      caseId: 'CR-2024-234',
      language: 'english',
      ocrProcessed: true,
      riskScore: 18,
      confidenceLevel: 'High'
    }
  ]);

  // Enhanced categories for Indian legal practice
  const categories = [
    'All', 
    'Petitions & Plaints', 
    'Written Statements', 
    'Affidavits', 
    'Evidence Documents', 
    'Court Orders', 
    'Contracts & Agreements',
    'Government Applications',
    'RTI Applications', 
    'Police Complaints/FIRs'
  ];
  
  const statuses = ['All', 'Draft', 'Filed', 'Issued', 'Verified', 'Notarized', 'Executed', 'Submitted', 'Archived'];

  // Enhanced filter logic
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         doc.caseId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Enhanced metrics calculation
  const metrics = {
    totalDocuments: documents.length,
    activeDocuments: documents.filter(d => ['Filed', 'Issued', 'Verified', 'Executed'].includes(d.status)).length,
    totalSize: documents.reduce((sum, d) => sum + parseFloat(d.size), 0),
    starredDocuments: documents.filter(d => d.isStarred).length,
    ocrProcessed: documents.filter(d => d.ocrProcessed).length,
    tamilDocuments: documents.filter(d => d.language.includes('tamil')).length,
    avgRiskScore: (documents.reduce((sum, d) => sum + (d.riskScore || 0), 0) / documents.length).toFixed(1),
    landDocuments: documents.filter(d => d.landDetails).length
  };

  // Notification system
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => dismissNotification(notification.id), 5000);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'docx': case 'doc': return <FileSignature className="w-5 h-5" />;
      case 'zip': case 'rar': return <Archive className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getRiskColor = (score) => {
    if (score <= 5) return colors.green;
    if (score <= 15) return colors.amber;
    return colors.red;
  };

  const getLanguageFlag = (language) => {
    if (language.includes('tamil')) return '🇮🇳';
    if (language.includes('english')) return '🇬🇧';
    return '🌐';
  };

  // Enhanced handlers for new features
  const handleOCRScan = async (files) => {
    if (files && files.length > 0) {
      setIsUploading(true);
      setOcrProgress(0);
      
      // Simulate OCR processing
      const interval = setInterval(() => {
        setOcrProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            addNotification(`OCR processing completed for ${files.length} document(s). Tamil and English text extracted successfully.`, 'success');
            return 100;
          }
          return prev + 12;
        });
      }, 300);
    }
  };

  const handleAutoDrafting = (templateType) => {
    addNotification(`Auto-drafting ${templateType} template with smart clauses and risk analysis...`, 'info');
    
    setTimeout(() => {
      addNotification(`${templateType} draft generated successfully with 85% confidence score. Review suggested clauses.`, 'success');
    }, 2000);
  };

  const handleLandAnalysis = async (document) => {
    if (!document.landDetails) {
      addNotification('This document does not contain land record information', 'error');
      return;
    }

    setIsAnalyzing(true);
    addNotification('Analyzing land document with Tamil Nadu Revenue records...', 'info');
    
    setTimeout(() => {
      setIsAnalyzing(false);
      addNotification(`Land analysis completed for Survey No. ${document.landDetails.surveyNo}. Patta verification: ✓ Encumbrance check: ✓ Title clarity: 92%`, 'success');
    }, 3000);
  };

  const handleTranslation = (document, targetLanguage) => {
    addNotification(`Translating document to ${targetLanguage}...`, 'info');
    
    setTimeout(() => {
      addNotification(`Document translated successfully. Legal terminology preserved with 95% accuracy.`, 'success');
    }, 1500);
  };

  const handleDeepSearch = (query) => {
    if (!query.trim()) return;
    
    addNotification(`Searching across ${documents.length} documents for: "${query}"`, 'info');
    
    setTimeout(() => {
      const results = Math.floor(Math.random() * 15) + 5;
      addNotification(`Found ${results} relevant matches across documents, clauses, and case references.`, 'success');
    }, 1000);
  };

  const handleBulkExport = () => {
    addNotification('Preparing bulk export of selected documents...', 'info');
    
    setTimeout(() => {
      addNotification('Bulk export completed. ZIP file ready for download with watermarked documents.', 'success');
    }, 2000);
  };

  const handleDocumentAction = (action, documentId) => {
    const document = documents.find(d => d.id === documentId);
    
    switch (action) {
      case 'view':
        addNotification(`Opening ${document.name} in secure viewer...`, 'info');
        break;
      case 'download':
        addNotification(`Downloading ${document.name} with access log...`, 'info');
        break;
      case 'edit':
        addNotification(`Opening ${document.name} in collaborative editor...`, 'info');
        break;
      case 'translate':
        handleTranslation(document, selectedLanguage);
        break;
      case 'analyze':
        handleLandAnalysis(document);
        break;
      default:
        console.log(`${action} document:`, documentId);
    }
  };

  // API Handler Functions
  const handleContractComparison = async () => {
    if (selectedDocuments.length !== 2) {
      alert('Please select exactly 2 documents to compare');
      return;
    }

    const loadingKey = 'comparison';
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      // Create mock files from selected documents
      const file1 = createMockFile(selectedDocuments[0].name);
      const file2 = createMockFile(selectedDocuments[1].name);
      
      const result = await compareContracts(file1, file2);
      setResults(prev => ({ ...prev, comparison: result }));
      setShowComparisonModal(false);
      setSelectedDocuments([]);
      
      // Show results in modal
      setCurrentResult(result);
      setResultTitle(`Contract Comparison: ${selectedDocuments[0].name} vs ${selectedDocuments[1].name}`);
      setResultType('comparison');
      setShowResultsModal(true);
      
      console.log('Contract Comparison Result:', result);
    } catch (error) {
      alert('Contract comparison failed: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleRiskAnalysis = async (document) => {
    const loadingKey = `risk-${document.id}`;
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      const file = createMockFile(document.name);
      const result = await analyzeContractRisk(file);
      setResults(prev => ({ ...prev, [`risk-${document.id}`]: result }));
      
      // Show results in modal
      setCurrentResult(result);
      setResultTitle(`Risk Analysis: ${document.name}`);
      setResultType('risk');
      setShowResultsModal(true);
      
      console.log('Risk Analysis Result:', result);
    } catch (error) {
      alert('Risk analysis failed: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleDocumentSummary = async (document) => {
    const loadingKey = `summary-${document.id}`;
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      const file = createMockFile(document.name);
      const result = await summarizeDocument(file);
      setResults(prev => ({ ...prev, [`summary-${document.id}`]: result }));
      
      // Show results in modal
      setCurrentResult(result);
      setResultTitle(`Document Summary: ${document.name}`);
      setResultType('summary');
      setShowResultsModal(true);
      
      console.log('Document Summary Result:', result);
    } catch (error) {
      alert('Document summarization failed: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleComplianceTaskGeneration = async (regulation, country, companyType) => {
    const loadingKey = 'compliance';
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      const result = await generateComplianceTasks(regulation, country, companyType);
      setResults(prev => ({ ...prev, compliance: result }));
      setShowComplianceModal(false);
      
      // Show results in modal
      setCurrentResult(result);
      setResultTitle(`Compliance Tasks: ${regulation} - ${country}`);
      setResultType('compliance');
      setShowResultsModal(true);
      
      console.log('Compliance Tasks Result:', result);
    } catch (error) {
      alert('Compliance task generation failed: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  // Document selection for comparison
  const toggleDocumentSelection = (document) => {
    setSelectedDocuments(prev => {
      const isSelected = prev.find(d => d.id === document.id);
      if (isSelected) {
        return prev.filter(d => d.id !== document.id);
      } else if (prev.length < 2) {
        return [...prev, document];
      } else {
        alert('You can only select 2 documents for comparison');
        return prev;
      }
    });
  };

  return (
    <div className="min-h-screen" style={{ background: colors.cream }}>
      {/* Header */}
      <header className="border-b p-4 sm:p-6" style={{ 
        background: `rgba(255, 255, 255, 0.03)`,
        borderColor: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
      }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold" style={{ color: colors.navy }}>
              Document Library & Tools
            </h1>
            <p className="text-sm mt-1" style={{ color: colors.gray }}>
              Advanced document management with Tamil Nadu legal tools
            </p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <button 
              className="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                background: `rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.10)`,
                color: colors.blue,
                border: `1px solid rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.20)`
              }}
              onClick={() => setShowOCRScanner(true)}
            >
              <Scan className="w-4 h-4 inline mr-1" />
              OCR Scanner
            </button>
            
            <button 
              className="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                background: `rgba(${parseInt(colors.green.slice(1, 3), 16)}, ${parseInt(colors.green.slice(3, 5), 16)}, ${parseInt(colors.green.slice(5, 7), 16)}, 0.10)`,
                color: colors.green,
                border: `1px solid rgba(${parseInt(colors.green.slice(1, 3), 16)}, ${parseInt(colors.green.slice(3, 5), 16)}, ${parseInt(colors.green.slice(5, 7), 16)}, 0.20)`
              }}
              onClick={() => setShowAutoDrafting(true)}
            >
              <FileSignature className="w-4 h-4 inline mr-1" />
              Auto-Draft
            </button>
            
            <button 
              className="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                background: `rgba(${parseInt(colors.amber.slice(1, 3), 16)}, ${parseInt(colors.amber.slice(3, 5), 16)}, ${parseInt(colors.amber.slice(5, 7), 16)}, 0.10)`,
                color: colors.amber,
                border: `1px solid rgba(${parseInt(colors.amber.slice(1, 3), 16)}, ${parseInt(colors.amber.slice(3, 5), 16)}, ${parseInt(colors.amber.slice(5, 7), 16)}, 0.20)`
              }}
              onClick={() => setShowLandAnalyzer(true)}
            >
              <Map className="w-4 h-4 inline mr-1" />
              Land Analyzer
            </button>
            
            <button 
              className="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`,
                color: colors.golden,
                border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.20)`
              }}
              onClick={() => setShowTranslation(true)}
            >
              <Languages className="w-4 h-4 inline mr-1" />
              Translate
            </button>
            
            <button 
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-white"
              style={{
                background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
              }}
              onClick={() => fileUploadRef.current?.click()}
            >
              <Upload className="w-4 h-4 inline mr-1" />
              Upload
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { 
              label: 'Total Documents', 
              value: metrics.totalDocuments, 
              icon: <FileText className="w-5 h-5" />, 
              change: '+15%',
              color: colors.blue,
              subtitle: `${metrics.ocrProcessed} OCR processed`
            },
            { 
              label: 'Active Cases', 
              value: metrics.activeDocuments, 
              icon: <CheckCircle className="w-5 h-5" />, 
              change: '+8%',
              color: colors.green,
              subtitle: 'Filed & Verified'
            },
            { 
              label: 'Storage Used', 
              value: `${(metrics.totalSize / 1024).toFixed(1)} GB`, 
              icon: <Archive className="w-5 h-5" />, 
              change: '+22%',
              color: colors.golden,
              subtitle: `${metrics.tamilDocuments} Tamil docs`
            },
            { 
              label: 'Avg Risk Score', 
              value: `${metrics.avgRiskScore}/20`, 
              icon: <Shield className="w-5 h-5" />, 
              change: '-3%',
              color: getRiskColor(parseFloat(metrics.avgRiskScore)),
              subtitle: `${metrics.landDocuments} land records`
            }
          ].map((metric, index) => (
            <div key={index} className="p-4 rounded-lg backdrop-blur-sm transition-all hover:scale-105" style={{
              background: `rgba(255, 255, 255, 0.03)`,
              border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
            }}>
              <div className="flex justify-between items-center mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                  background: `rgba(${parseInt(metric.color.slice(1, 3), 16)}, ${parseInt(metric.color.slice(3, 5), 16)}, ${parseInt(metric.color.slice(5, 7), 16)}, 0.15)`,
                  color: metric.color
                }}>
                  {metric.icon}
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full" style={{
                  background: metric.change.startsWith('+') ? `${colors.green}15` : `${colors.red}15`,
                  color: metric.change.startsWith('+') ? colors.green : colors.red
                }}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: colors.navy }}>{metric.value}</h3>
              <p className="text-sm mb-1" style={{ color: colors.gray }}>{metric.label}</p>
              <p className="text-xs" style={{ color: colors.gray }}>{metric.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Deep Search Bar */}
        <div className="mb-6 p-4 rounded-lg backdrop-blur-sm" style={{
          background: `rgba(255, 255, 255, 0.03)`,
          border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
        }}>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.gray }} />
              <input
                type="text"
                placeholder="Deep search across all documents, case IDs, legal concepts..."
                className="pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 text-sm transition-all"
                style={{
                  background: `rgba(255, 255, 255, 0.03)`,
                  border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`,
                  color: colors.navy
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleDeepSearch(searchQuery)}
              />
            </div>
            <button 
              className="px-4 py-3 rounded-lg text-sm font-medium transition-colors text-white"
              style={{
                background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
              }}
              onClick={() => handleDeepSearch(searchQuery)}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Deep Search
            </button>
          </div>
        </div>

        {/* Document Library */}
        <div className="rounded-lg backdrop-blur-sm" style={{
          background: `rgba(255, 255, 255, 0.03)`,
          border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
        }}>
          {/* Enhanced Filters Bar */}
          <div className="p-4 border-b" style={{
            borderColor: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
          }}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold" style={{ color: colors.navy }}>Document Vault</h2>
                <span className="text-xs px-2 py-1 rounded-full" style={{
                  background: `${colors.golden}15`,
                  color: colors.golden
                }}>
                  {filteredDocuments.length} documents
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{
                    background: `rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.10)`,
                    color: colors.blue,
                    border: `1px solid rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.20)`
                  }}
                  onClick={() => setShowComparisonModal(true)}
                >
                  <Scale className="w-4 h-4 inline mr-1" />
                  Compare
                </button>
                
                <button 
                  className="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{
                    background: `rgba(${parseInt(colors.amber.slice(1, 3), 16)}, ${parseInt(colors.amber.slice(3, 5), 16)}, ${parseInt(colors.amber.slice(5, 7), 16)}, 0.10)`,
                    color: colors.amber,
                    border: `1px solid rgba(${parseInt(colors.amber.slice(1, 3), 16)}, ${parseInt(colors.amber.slice(3, 5), 16)}, ${parseInt(colors.amber.slice(5, 7), 16)}, 0.20)`
                  }}
                  onClick={handleBulkExport}
                >
                  <Download className="w-4 h-4 inline mr-1" />
                  Bulk Export
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-sm transition-all"
                style={{
                  background: `rgba(255, 255, 255, 0.03)`,
                  border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`,
                  color: colors.navy
                }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select 
                className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-sm transition-all"
                style={{
                  background: `rgba(255, 255, 255, 0.03)`,
                  border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`,
                  color: colors.navy
                }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <select 
                className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-sm transition-all"
                style={{
                  background: `rgba(255, 255, 255, 0.03)`,
                  border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`,
                  color: colors.navy
                }}
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="tamil">தமிழ்</option>
                <option value="hindi">हिंदी</option>
              </select>
            </div>
          </div>

          {/* Enhanced Documents Grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => {
                const fileIcon = getFileIcon(document.type);
                
                return (
                  <div 
                    key={document.id} 
                    className="p-4 rounded-lg backdrop-blur-sm transition-all hover:scale-[1.02] cursor-pointer"
                    style={{
                      background: `rgba(255, 255, 255, 0.03)`,
                      border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
                    }}
                  >
                    {/* Selection Checkbox for Contract Comparison */}
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.find(d => d.id === document.id) !== undefined}
                        onChange={() => toggleDocumentSelection(document)}
                        className="w-4 h-4 rounded focus:ring-2"
                        style={{ accentColor: colors.golden }}
                      />
                      <div className="flex items-center gap-2">
                        {document.ocrProcessed && (
                          <span className="text-xs px-2 py-1 rounded" style={{
                            background: `${colors.green}15`,
                            color: colors.green
                          }}>
                            OCR ✓
                          </span>
                        )}
                        <span className="text-xs" style={{ color: colors.gray }}>
                          {getLanguageFlag(document.language)}
                        </span>
                      </div>
                    </div>

                    {/* Document Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                          background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`,
                          color: colors.golden
                        }}>
                          {fileIcon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold truncate" style={{ color: colors.navy }}>
                            {document.name}
                          </h3>
                          <p className="text-xs" style={{ color: colors.gray }}>
                            {document.size} • v{document.version} • {document.caseId}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded" style={{
                              background: `${getRiskColor(document.riskScore)}15`,
                              color: getRiskColor(document.riskScore)
                            }}>
                              Risk: {document.riskScore}/20
                            </span>
                            <span className="text-xs" style={{ color: colors.gray }}>
                              {document.confidenceLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {document.isStarred && (
                          <Star className="w-4 h-4 fill-current" style={{ color: colors.amber }} />
                        )}
                        {document.isLocked && (
                          <Lock className="w-4 h-4" style={{ color: colors.gray }} />
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm line-clamp-2 mb-3" style={{ color: colors.gray }}>
                      {document.description}
                    </p>

                    {/* Status and Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium" 
                        style={{
                          backgroundColor: document.status === 'Filed' ? `${colors.blue}15` : 
                                         document.status === 'Draft' ? `${colors.amber}15` :
                                         document.status === 'Verified' ? `${colors.green}15` :
                                         document.status === 'Notarized' ? `${colors.golden}15` : `${colors.gray}15`,
                          color: document.status === 'Filed' ? colors.blue : 
                                 document.status === 'Draft' ? colors.amber :
                                 document.status === 'Verified' ? colors.green :
                                 document.status === 'Notarized' ? colors.golden : colors.gray
                        }}>
                        {document.status}
                      </span>
                      <span className="text-xs px-2 py-1 rounded" style={{
                        background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.05)`,
                        color: colors.gray
                      }}>
                        {document.category}
                      </span>
                    </div>

                    {/* Enhanced Metadata */}
                    <div className="space-y-2 mb-3 text-xs" style={{ color: colors.gray }}>
                      <div className="flex justify-between">
                        <span>By {document.author}</span>
                        <span>{document.views} views</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modified {new Date(document.lastModified).toLocaleDateString()}</span>
                        <span>{document.downloads} downloads</span>
                      </div>
                    </div>

                    {/* Enhanced Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {document.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.05)`,
                            color: colors.navy
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {document.tags.length > 3 && (
                        <span className="text-xs" style={{ color: colors.gray }}>
                          +{document.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Main Actions */}
                    <div className="flex gap-2 mb-3 pt-3 border-t" style={{
                      borderColor: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
                    }}>
                      <button 
                        className="flex-1 px-3 py-2 rounded text-sm font-medium transition-colors text-white"
                        style={{
                          background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
                        }}
                        onClick={() => handleDocumentAction('view', document.id)}
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        View
                      </button>
                      <button 
                        className="p-2 rounded transition-colors"
                        style={{
                          background: `rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.10)`,
                          color: colors.blue
                        }}
                        onClick={() => handleDocumentAction('download', document.id)}
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 rounded transition-colors"
                        style={{
                          background: `rgba(${parseInt(colors.green.slice(1, 3), 16)}, ${parseInt(colors.green.slice(3, 5), 16)}, ${parseInt(colors.green.slice(5, 7), 16)}, 0.10)`,
                          color: colors.green
                        }}
                        onClick={() => handleDocumentAction('edit', document.id)}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Enhanced Tool Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        className="px-2 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                        style={{
                          background: `rgba(${parseInt(colors.red.slice(1, 3), 16)}, ${parseInt(colors.red.slice(3, 5), 16)}, ${parseInt(colors.red.slice(5, 7), 16)}, 0.10)`,
                          color: colors.red
                        }}
                        onClick={() => handleRiskAnalysis(document)}
                        disabled={loading[`risk-${document.id}`]}
                        title="Analyze Contract Risk"
                      >
                        {loading[`risk-${document.id}`] ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <AlertTriangle className="w-3 h-3" />
                            <span>Risk Analysis</span>
                          </>
                        )}
                      </button>
                      
                      <button 
                        className="px-2 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                        style={{
                          background: `rgba(${parseInt(colors.green.slice(1, 3), 16)}, ${parseInt(colors.green.slice(3, 5), 16)}, ${parseInt(colors.green.slice(5, 7), 16)}, 0.10)`,
                          color: colors.green
                        }}
                        onClick={() => handleDocumentSummary(document)}
                        disabled={loading[`summary-${document.id}`]}
                        title="Summarize Document"
                      >
                        {loading[`summary-${document.id}`] ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <FileText className="w-3 h-3" />
                            <span>Summary</span>
                          </>
                        )}
                      </button>
                      
                      <button 
                        className="px-2 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                        style={{
                          background: `rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.10)`,
                          color: colors.blue
                        }}
                        onClick={() => handleDocumentAction('translate', document.id)}
                        title="Translate Document"
                      >
                        <Languages className="w-3 h-3" />
                        <span>Translate</span>
                      </button>
                      
                      {document.landDetails && (
                        <button 
                          className="px-2 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                          style={{
                            background: `rgba(${parseInt(colors.amber.slice(1, 3), 16)}, ${parseInt(colors.amber.slice(3, 5), 16)}, ${parseInt(colors.amber.slice(5, 7), 16)}, 0.10)`,
                            color: colors.amber
                          }}
                          onClick={() => handleDocumentAction('analyze', document.id)}
                          disabled={isAnalyzing}
                          title="Tamil Nadu Land Analysis"
                        >
                          {isAnalyzing ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <>
                              <Map className="w-3 h-3" />
                              <span>Land Check</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl rounded-full" style={{
                  background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`
                }}>
                  <FileText className="w-8 h-8" style={{ color: colors.golden }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.navy }}>No documents found</h3>
                <p className="mb-4 text-sm" style={{ color: colors.gray }}>
                  {searchQuery ? 'Try adjusting your search criteria' : 'Upload your first document to get started'}
                </p>
                <button 
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-white"
                  style={{
                    background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
                  }}
                  onClick={() => fileUploadRef.current?.click()}
                >
                  Upload Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OCR Scanner Modal */}
      {showOCRScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full max-w-2xl rounded-lg p-6" style={{
            background: colors.cream,
            border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.navy }}>
                OCR Document Scanner
              </h2>
              <button
                onClick={() => setShowOCRScanner(false)}
                className="p-2 rounded-lg transition-colors"
                style={{
                  background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`,
                  color: colors.golden
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center p-8 border-2 border-dashed rounded-lg transition-colors" style={{
                borderColor: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.30)`,
                background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.05)`
              }}>
                <Scan className="w-12 h-12 mx-auto mb-4" style={{ color: colors.golden }} />
                <p className="text-lg font-medium mb-2" style={{ color: colors.navy }}>
                  Upload documents for OCR processing
                </p>
                <p className="text-sm mb-4" style={{ color: colors.gray }}>
                  Tamil and English text extraction with legal term recognition
                </p>
                <button 
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white"
                  style={{
                    background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
                  }}
                  onClick={() => ocrUploadRef.current?.click()}
                >
                  Select Documents
                </button>
              </div>

              {isUploading && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{ color: colors.navy }}>
                      Processing OCR...
                    </span>
                    <span className="text-sm" style={{ color: colors.gray }}>
                      {ocrProgress}%
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{
                    background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
                  }}>
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${ocrProgress}%`,
                        background: `linear-gradient(90deg, ${colors.golden}, ${colors.golden}CC)`
                      }}
                    ></div>
                  </div>
                  <p className="text-xs" style={{ color: colors.gray }}>
                    Extracting Tamil and English text, identifying legal terms...
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg" style={{
                  background: `rgba(${parseInt(colors.green.slice(1, 3), 16)}, ${parseInt(colors.green.slice(3, 5), 16)}, ${parseInt(colors.green.slice(5, 7), 16)}, 0.10)`
                }}>
                  <h3 className="font-medium mb-2" style={{ color: colors.navy }}>Tamil Support</h3>
                  <p className="text-sm" style={{ color: colors.gray }}>
                    Full Unicode Tamil text recognition with legal terminology
                  </p>
                </div>
                <div className="p-4 rounded-lg" style={{
                  background: `rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.10)`
                }}>
                  <h3 className="font-medium mb-2" style={{ color: colors.navy }}>Smart Search</h3>
                  <p className="text-sm" style={{ color: colors.gray }}>
                    Full-text search across all processed documents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Drafting Modal */}
      {showAutoDrafting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg p-6" style={{
            background: colors.cream,
            border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.navy }}>
                Auto-Drafting Engine
              </h2>
              <button
                onClick={() => setShowAutoDrafting(false)}
                className="p-2 rounded-lg transition-colors"
                style={{
                  background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`,
                  color: colors.golden
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Writ Petition', category: 'Constitutional', templates: 15, icon: <Gavel className="w-6 h-6" /> },
                { title: 'Civil Suit Plaint', category: 'Civil Law', templates: 22, icon: <Scale className="w-6 h-6" /> },
                { title: 'Criminal Complaint', category: 'Criminal Law', templates: 18, icon: <Shield className="w-6 h-6" /> },
                { title: 'Property Sale Deed', category: 'Property', templates: 12, icon: <Building className="w-6 h-6" /> },
                { title: 'Employment Contract', category: 'Labor Law', templates: 8, icon: <Users className="w-6 h-6" /> },
                { title: 'RTI Application', category: 'Information', templates: 5, icon: <BookOpen className="w-6 h-6" /> },
                { title: 'Bail Application', category: 'Criminal Law', templates: 10, icon: <AlertCircle className="w-6 h-6" /> },
                { title: 'Divorce Petition', category: 'Family Law', templates: 14, icon: <Users className="w-6 h-6" /> },
                { title: 'Succession Certificate', category: 'Probate', templates: 7, icon: <Award className="w-6 h-6" /> }
              ].map((template, index) => (
                <div key={index} className="p-4 rounded-lg cursor-pointer transition-all hover:scale-105" style={{
                  background: `rgba(255, 255, 255, 0.03)`,
                  border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
                }}
                onClick={() => handleAutoDrafting(template.title)}>
                  <div className="w-12 h-12 rounded-lg mb-3 flex items-center justify-center" style={{
                    background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`,
                    color: colors.golden
                  }}>
                    {template.icon}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: colors.navy }}>{template.title}</h3>
                  <p className="text-sm mb-2" style={{ color: colors.gray }}>{template.category}</p>
                  <p className="text-xs" style={{ color: colors.gray }}>{template.templates} templates available</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg" style={{
              background: `rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.10)`
            }}>
              <h3 className="font-medium mb-2" style={{ color: colors.navy }}>Smart Features</h3>
              <ul className="text-sm space-y-1" style={{ color: colors.gray }}>
                <li>• Clause-level suggestions based on case type</li>
                <li>• Risk scoring for each legal clause</li>
                <li>• Auto-fill from existing case data</li>
                <li>• Tamil Nadu specific legal provisions</li>
                <li>• Recent case law integration</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Contract Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-374151 mb-4">Compare Contracts</h3>
            <p className="text-6B7280 mb-4">
              Select exactly 2 documents to compare. Currently selected: {selectedDocuments.length}/2
            </p>
            
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {documents.map(doc => (
                <div 
                  key={doc.id} 
                  className={`flex items-center p-2 rounded border cursor-pointer ${
                    selectedDocuments.find(d => d.id === doc.id) 
                      ? 'border-374151 bg-blue-50' 
                      : 'border-E5E7EB hover:border-9CA3AF'
                  }`}
                  onClick={() => toggleDocumentSelection(doc)}
                >
                  <input
                    type="checkbox"
                    checked={selectedDocuments.find(d => d.id === doc.id) !== undefined}
                    onChange={() => toggleDocumentSelection(doc)}
                    className="mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-374151">{doc.name}</p>
                    <p className="text-xs text-6B7280">{doc.category}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-374151 text-white rounded hover:bg-1E3A8A disabled:bg-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={handleContractComparison}
                disabled={selectedDocuments.length !== 2 || loading.comparison}
              >
                {loading.comparison ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Comparing Documents...
                  </>
                ) : (
                  <>
                    ⚖️ Compare Selected
                  </>
                )}
              </button>
              <button
                className="flex-1 px-4 py-2 border border-E5E7EB text-374151 rounded hover:bg-F9FAFB transition-colors"
                onClick={() => {
                  setShowComparisonModal(false);
                  setSelectedDocuments([]);
                }}
                disabled={loading.comparison}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tasks Modal */}
      {showComplianceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-374151 mb-4">Generate Compliance Tasks</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleComplianceTaskGeneration(
                formData.get('regulation'),
                formData.get('country'),
                formData.get('companyType')
              );
            }}>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-374151 mb-1">
                    Regulation
                  </label>
                  <select 
                    name="regulation" 
                    className="w-full px-3 py-2 border border-E5E7EB rounded focus:ring-2 focus:ring-374151"
                    required
                  >
                    <option value="">Select regulation...</option>
                    <option value="labor law">Labor Law</option>
                    <option value="data protection">Data Protection</option>
                    <option value="environmental law">Environmental Law</option>
                    <option value="corporate governance">Corporate Governance</option>
                    <option value="financial regulation">Financial Regulation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-374151 mb-1">
                    Country
                  </label>
                  <select 
                    name="country" 
                    className="w-full px-3 py-2 border border-E5E7EB rounded focus:ring-2 focus:ring-374151"
                    required
                  >
                    <option value="">Select country...</option>
                    <option value="INDIA">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CANADA">Canada</option>
                    <option value="AUSTRALIA">Australia</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-374151 mb-1">
                    Company Type
                  </label>
                  <select 
                    name="companyType" 
                    className="w-full px-3 py-2 border border-E5E7EB rounded focus:ring-2 focus:ring-374151"
                    required
                  >
                    <option value="">Select company type...</option>
                    <option value="justice">Legal/Justice</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-374151 text-white rounded hover:bg-1E3A8A disabled:bg-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={loading.compliance}
                >
                  {loading.compliance ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Generating Tasks...
                    </>
                  ) : (
                    <>
                      ✅ Generate Compliance Tasks
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 border border-E5E7EB text-374151 rounded hover:bg-F9FAFB transition-colors"
                  onClick={() => setShowComplianceModal(false)}
                  disabled={loading.compliance}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tamil Nadu Land Analyzer Modal */}
      {showLandAnalyzer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg p-6" style={{
            background: colors.cream,
            border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.navy }}>
                Tamil Nadu Land Document Analyzer
              </h2>
              <button
                onClick={() => setShowLandAnalyzer(false)}
                className="p-2 rounded-lg transition-colors"
                style={{
                  background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`,
                  color: colors.golden
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Analysis Tools */}
              <div className="space-y-4">
                <h3 className="font-semibold mb-4" style={{ color: colors.navy }}>Analysis Tools</h3>
                
                {[
                  { 
                    title: 'Patta Verification', 
                    desc: 'Cross-check with Revenue Department records',
                    icon: <CheckCircle className="w-5 h-5" />,
                    status: 'Available'
                  },
                  { 
                    title: 'Chitta Analysis', 
                    desc: 'Verify land ownership and survey details',
                    icon: <Map className="w-5 h-5" />,
                    status: 'Available'
                  },
                  { 
                    title: 'FMB Sketch Check', 
                    desc: 'Field Measurement Book validation',
                    icon: <Eye className="w-5 h-5" />,
                    status: 'Available'
                  },
                  { 
                    title: 'TSLR Integration', 
                    desc: 'Tamil Nadu State Land Records system',
                    icon: <Globe className="w-5 h-5" />,
                    status: 'Connected'
                  },
                  { 
                    title: 'Encumbrance Check', 
                    desc: 'Transaction history verification',
                    icon: <Clock className="w-5 h-5" />,
                    status: 'Real-time'
                  },
                  { 
                    title: 'Guideline Value', 
                    desc: 'Current market rate calculator',
                    icon: <Calculator className="w-5 h-5" />,
                    status: 'Updated'
                  }
                ].map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{
                    background: `rgba(255, 255, 255, 0.03)`,
                    border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
                  }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded flex items-center justify-center" style={{
                        background: `rgba(${parseInt(colors.green.slice(1, 3), 16)}, ${parseInt(colors.green.slice(3, 5), 16)}, ${parseInt(colors.green.slice(5, 7), 16)}, 0.15)`,
                        color: colors.green
                      }}>
                        {tool.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm" style={{ color: colors.navy }}>{tool.title}</h4>
                        <p className="text-xs" style={{ color: colors.gray }}>{tool.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded" style={{
                      background: `${colors.green}15`,
                      color: colors.green
                    }}>
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Land Documents */}
              <div className="space-y-4">
                <h3 className="font-semibold mb-4" style={{ color: colors.navy }}>Land Documents Available</h3>
                
                {documents.filter(doc => doc.landDetails).map((doc, index) => (
                  <div key={index} className="p-4 rounded-lg cursor-pointer transition-all hover:scale-105" style={{
                    background: `rgba(255, 255, 255, 0.03)`,
                    border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
                  }}
                  onClick={() => handleLandAnalysis(doc)}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm" style={{ color: colors.navy }}>{doc.name}</h4>
                      <span className="text-xs px-2 py-1 rounded" style={{
                        background: `${colors.amber}15`,
                        color: colors.amber
                      }}>
                        Land Document
                      </span>
                    </div>
                    
                    {doc.landDetails && (
                      <div className="space-y-1 text-xs" style={{ color: colors.gray }}>
                        <p>Survey No: {doc.landDetails.surveyNo}</p>
                        <p>Village: {doc.landDetails.village}, {doc.landDetails.taluk}</p>
                        <p>Area: {doc.landDetails.area} • {doc.landDetails.classification}</p>
                        <p>Owner: {doc.landDetails.ownerName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="flex items-center gap-1" style={{
                            color: doc.landDetails.encumbranceVerified ? colors.green : colors.amber
                          }}>
                            <CheckCircle className="w-3 h-3" />
                            Encumbrance {doc.landDetails.encumbranceVerified ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                <button 
                  className="w-full p-3 rounded-lg border-2 border-dashed transition-colors"
                  style={{
                    borderColor: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.30)`,
                    background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.05)`,
                    color: colors.golden
                  }}
                  onClick={() => fileUploadRef.current?.click()}
                >
                  <Upload className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-sm font-medium">Upload Land Document</span>
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg" style={{
                background: `rgba(${parseInt(colors.green.slice(1, 3), 16)}, ${parseInt(colors.green.slice(3, 5), 16)}, ${parseInt(colors.green.slice(5, 7), 16)}, 0.10)`
              }}>
                <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: colors.green }} />
                <h4 className="font-medium text-sm" style={{ color: colors.navy }}>Title Clarity</h4>
                <p className="text-xs" style={{ color: colors.gray }}>AI-powered risk assessment</p>
              </div>
              
              <div className="text-center p-4 rounded-lg" style={{
                background: `rgba(${parseInt(colors.blue.slice(1, 3), 16)}, ${parseInt(colors.blue.slice(3, 5), 16)}, ${parseInt(colors.blue.slice(5, 7), 16)}, 0.10)`
              }}>
                <AlertTriangle className="w-6 h-6 mx-auto mb-2" style={{ color: colors.blue }} />
                <h4 className="font-medium text-sm" style={{ color: colors.navy }}>Overlap Detection</h4>
                <p className="text-xs" style={{ color: colors.gray }}>Survey boundary conflicts</p>
              </div>
              
              <div className="text-center p-4 rounded-lg" style={{
                background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`
              }}>
                <Calculator className="w-6 h-6 mx-auto mb-2" style={{ color: colors.golden }} />
                <h4 className="font-medium text-sm" style={{ color: colors.navy }}>Value Calculator</h4>
                <p className="text-xs" style={{ color: colors.gray }}>Current guideline rates</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Translation Modal */}
      {showTranslation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full max-w-2xl rounded-lg p-6" style={{
            background: colors.cream,
            border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.navy }}>
                Document Translation
              </h2>
              <button
                onClick={() => setShowTranslation(false)}
                className="p-2 rounded-lg transition-colors"
                style={{
                  background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`,
                  color: colors.golden
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.navy }}>
                    From Language
                  </label>
                  <select className="w-full p-3 rounded-lg focus:outline-none transition-all" style={{
                    background: `rgba(255, 255, 255, 0.03)`,
                    border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`,
                    color: colors.navy
                  }}>
                    <option value="tamil">தமிழ் (Tamil)</option>
                    <option value="english">English</option>
                    <option value="hindi">हिंदी (Hindi)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.navy }}>
                    To Language
                  </label>
                  <select className="w-full p-3 rounded-lg focus:outline-none transition-all" style={{
                    background: `rgba(255, 255, 255, 0.03)`,
                    border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`,
                    color: colors.navy
                  }}>
                    <option value="english">English</option>
                    <option value="tamil">தமிழ் (Tamil)</option>
                    <option value="hindi">हिंदी (Hindi)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Legal Accuracy', percentage: '95%', color: colors.green },
                  { title: 'Term Preservation', percentage: '98%', color: colors.blue },
                  { title: 'Context Awareness', percentage: '92%', color: colors.golden }
                ].map((metric, index) => (
                  <div key={index} className="text-center p-4 rounded-lg" style={{
                    background: `rgba(${parseInt(metric.color.slice(1, 3), 16)}, ${parseInt(metric.color.slice(3, 5), 16)}, ${parseInt(metric.color.slice(5, 7), 16)}, 0.10)`
                  }}>
                    <div className="text-2xl font-bold mb-1" style={{ color: metric.color }}>
                      {metric.percentage}
                    </div>
                    <div className="text-sm" style={{ color: colors.gray }}>{metric.title}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="font-medium" style={{ color: colors.navy }}>Translation Features</h3>
                <ul className="text-sm space-y-2" style={{ color: colors.gray }}>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.green }} />
                    Legal terminology preservation across languages
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.green }} />
                    Tamil Nadu specific legal terms and provisions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.green }} />
                    Maintains document formatting and structure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.green }} />
                    Bilingual output with side-by-side comparison
                  </li>
                </ul>
              </div>

              <button 
                className="w-full py-3 rounded-lg text-sm font-medium transition-colors text-white"
                style={{
                  background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
                }}
                onClick={() => {
                  addNotification('Translation service will be available soon with legal term accuracy', 'info');
                  setShowTranslation(false);
                }}
              >
                <Languages className="w-4 h-4 inline mr-2" />
                Start Translation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Display Modal */}
      <ResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        result={currentResult}
        title={resultTitle}
        type={resultType}
      />

      <style jsx>{`
        .text-374151 { color: #374151; }
        .text-6B7280 { color: #6B7280; }
        .text-9CA3AF { color: #9CA3AF; }
        .bg-374151 { background-color: #374151; }
        .bg-F9FAFB { background-color: #F9FAFB; }
        .border-E5E7EB { border-color: #E5E7EB; }
        .hover\\:bg-F9FAFB:hover { background-color: #F9FAFB; }
        .hover\\:bg-1E3A8A:hover { background-color: #1E3A8A; }
        .focus\\:ring-374151:focus { ring-color: #374151; }
      `}</style>
    </div>
  );
};

export default DocumentsPage;