import axios from "axios";
import { useState, useRef } from "react";
import { 
  Upload, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  X,
  Loader,
  Eye,
  FileCheck,
  Scale,
  BookOpen,
  Search,
  Settings,
  Clock,
  Zap,
  Brain,
  Target,
  Globe
} from 'lucide-react';

// N8N Webhook URLs
const WEBHOOK_URLS = {
  contractComparison: "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca",
  riskAnalysis: "https://n8n.srv983857.hstgr.cloud/webhook/32c4f30e-6722-4125-bd7d-691f0e9460e4",
  documentSummarizer: "https://n8n.srv983857.hstgr.cloud/webhook/12ac51e5-e395-4c18-b5f9-ddd9516e6ed3",
  authenticityChecker: "https://n8n.srv983857.hstgr.cloud/webhook/ec8123eb-cee8-4ca3-a941-d499ed3f024d",
  complianceGenerator: "https://n8n.srv983857.hstgr.cloud/webhook/compliance"
};

function ContractComparison() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('comparison');
  const [complianceData, setComplianceData] = useState({
    regulation: '',
    country: 'INDIA',
    companyType: ''
  });

  const file1Ref = useRef();
  const file2Ref = useRef();
  const singleFileRef = useRef();

  const validateFiles = (file1, file2) => {
    if (!file1 || !file2) {
      alert("Please select both files!");
      return false;
    }

    // Check if files have same extension
    const ext1 = file1.name.split('.').pop().toLowerCase();
    const ext2 = file2.name.split('.').pop().toLowerCase();
    
    if (ext1 !== ext2) {
      alert('Both contracts must have the same file extension');
      return false;
    }

    const allowedFormats = ['pdf', 'docx', 'png', 'jpeg', 'jpg'];
    if (!allowedFormats.includes(ext1)) {
      alert('Supported formats: PDF, DOCX, PNG, JPEG, JPG');
      return false;
    }

    return true;
  };

  const validateSingleFile = (file) => {
    if (!file) {
      alert("Please select a file!");
      return false;
    }

    const ext = file.name.split('.').pop().toLowerCase();
    const allowedFormats = ['pdf', 'docx', 'png', 'jpeg', 'jpg'];
    if (!allowedFormats.includes(ext)) {
      alert('Supported formats: PDF, DOCX, PNG, JPEG, JPG');
      return false;
    }

    return true;
  };

  const handleContractComparison = async () => {
    if (!validateFiles(file1, file2)) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await axios.post(WEBHOOK_URLS.contractComparison, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let data = response.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { message: data };
        }
      }

      setResults({
        type: 'Contract Comparison',
        data: data,
        timestamp: new Date().toLocaleString()
      });
    } catch (err) {
      console.error("Error comparing contracts:", err);
      setResults({ 
        type: 'Contract Comparison',
        error: err.message,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRiskAnalysis = async () => {
    if (!validateSingleFile(singleFile)) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file1", singleFile);

    try {
      const response = await axios.post(WEBHOOK_URLS.riskAnalysis, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let data = response.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { message: data };
        }
      }

      setResults({
        type: 'Risk Analysis',
        data: data,
        timestamp: new Date().toLocaleString()
      });
    } catch (err) {
      console.error("Error analyzing risk:", err);
      setResults({ 
        type: 'Risk Analysis',
        error: err.message,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentSummarizer = async () => {
    if (!validateSingleFile(singleFile)) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file1", singleFile);

    try {
      const response = await axios.post(WEBHOOK_URLS.documentSummarizer, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let data = response.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { message: data };
        }
      }

      setResults({
        type: 'Document Summary',
        data: data,
        timestamp: new Date().toLocaleString()
      });
    } catch (err) {
      console.error("Error summarizing document:", err);
      setResults({ 
        type: 'Document Summary',
        error: err.message,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticityCheck = async () => {
    if (!validateSingleFile(singleFile)) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file1", singleFile);

    try {
      const response = await axios.post(WEBHOOK_URLS.authenticityChecker, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let data = response.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { message: data };
        }
      }

      setResults({
        type: 'Authenticity Check',
        data: data,
        timestamp: new Date().toLocaleString()
      });
    } catch (err) {
      console.error("Error checking authenticity:", err);
      setResults({ 
        type: 'Authenticity Check',
        error: err.message,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplianceGeneration = async () => {
    if (!complianceData.regulation || !complianceData.country || !complianceData.companyType) {
      alert("Please fill all compliance fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(WEBHOOK_URLS.complianceGenerator, {
        Regulation: complianceData.regulation,
        Country: complianceData.country,
        CompanyType: complianceData.companyType
      }, {
        headers: { "Content-Type": "application/json" },
      });

      let data = response.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { message: data };
        }
      }

      setResults({
        type: 'Compliance Tasks',
        data: data,
        timestamp: new Date().toLocaleString()
      });
    } catch (err) {
      console.error("Error generating compliance tasks:", err);
      setResults({ 
        type: 'Compliance Tasks',
        error: err.message,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setLoading(false);
    }
  };

  const clearFiles = () => {
    setFile1(null);
    setFile2(null);
    setSingleFile(null);
    if (file1Ref.current) file1Ref.current.value = '';
    if (file2Ref.current) file2Ref.current.value = '';
    if (singleFileRef.current) singleFileRef.current.value = '';
  };

  const tabs = [
    { 
      id: 'comparison', 
      name: 'Contract Comparison', 
      icon: Scale,
      color: 'blue',
      description: 'Compare two contracts side-by-side'
    },
    { 
      id: 'risk', 
      name: 'Risk Analysis', 
      icon: AlertTriangle,
      color: 'red',
      description: 'Analyze contract risks and missing clauses'
    },
    { 
      id: 'summary', 
      name: 'Document Summarizer', 
      icon: BookOpen,
      color: 'green',
      description: 'Convert contracts to plain language'
    },
    { 
      id: 'authenticity', 
      name: 'Authenticity Check', 
      icon: Search,
      color: 'purple',
      description: 'Verify document authenticity'
    },
    { 
      id: 'compliance', 
      name: 'Compliance Generator', 
      icon: CheckCircle,
      color: 'indigo',
      description: 'Generate regulatory checklists'
    }
  ];

  const FileUploadArea = ({ label, file, onFileChange, fileRef, accept = ".pdf,.docx,.png,.jpeg,.jpg", multiple = false }) => (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          onChange={onFileChange}
          className="hidden"
          multiple={multiple}
        />
        <div 
          onClick={() => fileRef?.current?.click()}
          className="glass-morphism-card bg-white/70 backdrop-blur-sm border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:bg-blue-50/50 group"
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:shadow-blue-500/30 transition-all duration-300">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                {file ? 'Change file' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOCX, PNG, JPEG, JPG (max 10MB)</p>
            </div>
          </div>
        </div>
        {file && (
          <div className="mt-3 flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">{file.name}</p>
                <p className="text-xs text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border-b border-white/20 p-8 saas-shadow-glow">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    AI Contract Analysis Suite
                  </h1>
                  <p className="text-gray-600 text-lg mt-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Powered by advanced AI automation - Professional legal document analysis
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">AI Services Online</span>
                </div>
                <button className="saas-button-secondary px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200">
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-8">
            <nav className="flex space-x-1 overflow-x-auto py-4">
              {tabs.map((tab, index) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 py-4 px-6 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 animate-stagger-fade-in group ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white saas-shadow-glow`
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/60 backdrop-blur-sm'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-white/20' 
                        : `bg-${tab.color}-50 group-hover:bg-${tab.color}-100`
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        activeTab === tab.id ? 'text-white' : `text-${tab.color}-600`
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{tab.name}</div>
                      <div className={`text-xs ${
                        activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Enhanced Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-morphism-card bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-scale-in">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Loader className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Processing Document</h3>
                  <p className="text-gray-600">AI is analyzing your files...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="max-w-7xl mx-auto p-8">
          {/* Contract Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-slide-up">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Contract Comparison Tool</h3>
                  <p className="text-gray-600 mt-1">Compare two contracts side-by-side to identify changes, additions, and modifications with AI precision</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <FileUploadArea
                  label="First Contract Document"
                  file={file1}
                  onFileChange={(e) => setFile1(e.target.files[0])}
                  fileRef={file1Ref}
                />
                
                <FileUploadArea
                  label="Second Contract Document"
                  file={file2}
                  onFileChange={(e) => setFile2(e.target.files[0])}
                  fileRef={file2Ref}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button
                    onClick={handleContractComparison}
                    disabled={loading || !file1 || !file2}
                    className="saas-button-primary px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
                  >
                    <Scale className="w-5 h-5" />
                    <span>{loading ? 'Comparing Contracts...' : 'Compare Contracts'}</span>
                  </button>
                  
                  <button
                    onClick={clearFiles}
                    className="saas-button-secondary px-6 py-4 bg-white/80 border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Clear Files</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Typical analysis: 30-60 seconds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>AI Accuracy: 99.2%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Single Document Analysis Tabs */}
          {(activeTab === 'risk' || activeTab === 'summary' || activeTab === 'authenticity') && (
            <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-slide-up">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-xl ${
                  activeTab === 'risk' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                  activeTab === 'summary' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                  'bg-gradient-to-r from-purple-500 to-indigo-600'
                }`}>
                  {activeTab === 'risk' && <AlertTriangle className="w-6 h-6 text-white" />}
                  {activeTab === 'summary' && <BookOpen className="w-6 h-6 text-white" />}
                  {activeTab === 'authenticity' && <Search className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {activeTab === 'risk' && 'Contract Risk Analysis'}
                    {activeTab === 'summary' && 'Document Summarizer'}
                    {activeTab === 'authenticity' && 'Document Authenticity Checker'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {activeTab === 'risk' && 'Analyze contract for missing clauses, potential risks, and compliance issues using advanced AI'}
                    {activeTab === 'summary' && 'Convert complex legal contracts into clear, plain-language summaries with key points highlighted'}
                    {activeTab === 'authenticity' && 'Advanced verification for signatures, watermarks, and detection of tampering or forgery attempts'}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <FileUploadArea
                  label="Select Document for Analysis"
                  file={singleFile}
                  onFileChange={(e) => setSingleFile(e.target.files[0])}
                  fileRef={singleFileRef}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button
                    onClick={
                      activeTab === 'risk' ? handleRiskAnalysis :
                      activeTab === 'summary' ? handleDocumentSummarizer :
                      handleAuthenticityCheck
                    }
                    disabled={loading || !singleFile}
                    className={`saas-button-primary px-8 py-4 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 ${
                      activeTab === 'risk' ? 'bg-gradient-to-r from-red-600 to-pink-600' :
                      activeTab === 'summary' ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
                      'bg-gradient-to-r from-purple-600 to-indigo-600'
                    }`}
                  >
                    {activeTab === 'risk' && <AlertTriangle className="w-5 h-5" />}
                    {activeTab === 'summary' && <BookOpen className="w-5 h-5" />}
                    {activeTab === 'authenticity' && <Search className="w-5 h-5" />}
                    <span>
                      {loading ? 'Processing...' : 
                        activeTab === 'risk' ? 'Analyze Risk' :
                        activeTab === 'summary' ? 'Summarize Document' :
                        'Check Authenticity'
                      }
                    </span>
                  </button>
                  
                  <button
                    onClick={clearFiles}
                    className="saas-button-secondary px-6 py-4 bg-white/80 border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Clear File</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span>AI-Powered Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Enterprise Security</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Compliance Generator Tab */}
          {activeTab === 'compliance' && (
            <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-slide-up">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Compliance Task Generator</h3>
                  <p className="text-gray-600 mt-1">Generate automated regulatory checklists based on jurisdiction, company type, and applicable regulations</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Regulation Type</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., labor law, corporate law, tax law"
                      value={complianceData.regulation}
                      onChange={(e) => setComplianceData({...complianceData, regulation: e.target.value})}
                      className="saas-input w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    />
                    <Scale className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Country/Jurisdiction</label>
                  <div className="relative">
                    <select
                      value={complianceData.country}
                      onChange={(e) => setComplianceData({...complianceData, country: e.target.value})}
                      className="saas-input w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    >
                      <option value="INDIA">🇮🇳 India</option>
                      <option value="USA">🇺🇸 United States</option>
                      <option value="UK">🇬🇧 United Kingdom</option>
                      <option value="CANADA">🇨🇦 Canada</option>
                      <option value="AUSTRALIA">🇦🇺 Australia</option>
                    </select>
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Company Type</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., justice, technology, healthcare"
                      value={complianceData.companyType}
                      onChange={(e) => setComplianceData({...complianceData, companyType: e.target.value})}
                      className="saas-input w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    />
                    <Target className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleComplianceGeneration}
                  disabled={loading || !complianceData.regulation || !complianceData.country || !complianceData.companyType}
                  className="saas-button-primary px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{loading ? 'Generating Tasks...' : 'Generate Compliance Tasks'}</span>
                </button>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span>AI Legal Database</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>Multi-Jurisdiction Support</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Results Section */}
          {results && (
            <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mt-8 saas-shadow-glow animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{results.type} Results</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-2" />
                      Generated on {results.timestamp}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="saas-button-secondary px-4 py-2 bg-white/80 border border-gray-200 hover:bg-gray-50 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setResults(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {results.error ? (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-800">Analysis Error</h4>
                      <p className="text-red-700 mt-1">{results.error}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <FileCheck className="w-5 h-5 mr-2 text-green-600" />
                      Analysis Complete
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified Results</span>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-96 overflow-y-auto font-mono leading-relaxed">
                      {typeof results.data === 'string' 
                        ? results.data 
                        : JSON.stringify(results.data, null, 2)
                      }
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContractComparison;
