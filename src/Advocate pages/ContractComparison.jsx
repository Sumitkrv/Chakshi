import axios from "axios";
import { useState, useRef } from "react";
import { 
  Upload, 
  FileText, 
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
  Clock
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
      description: 'Compare two contracts side-by-side'
    },
    { 
      id: 'risk', 
      name: 'Risk Analysis', 
      icon: AlertTriangle,
      description: 'Analyze contract risks and missing clauses'
    },
    { 
      id: 'summary', 
      name: 'Document Summarizer', 
      icon: BookOpen,
      description: 'Convert contracts to plain language'
    },
    { 
      id: 'authenticity', 
      name: 'Authenticity Check', 
      icon: Search,
      description: 'Verify document authenticity'
    },
    { 
      id: 'compliance', 
      name: 'Compliance Generator', 
      icon: CheckCircle,
      description: 'Generate regulatory checklists'
    }
  ];

  const FileUploadArea = ({ label, file, onFileChange, fileRef, accept = ".pdf,.docx,.png,.jpeg,.jpg", multiple = false }) => (
    <div className="space-y-3">
      <label className="block text-sm font-semibold" style={{ color: '#1f2839' }}>{label}</label>
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
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'rgba(182, 157, 116, 0.25)',
            backdropFilter: 'blur(6px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#b69d74';
            e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgba(182, 157, 116, 0.25)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          }}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(182, 157, 116, 0.12)' }}>
              <Upload className="w-6 h-6" style={{ color: '#b69d74' }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#1f2839' }}>
                {file ? 'Change file' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs mt-1" style={{ color: '#6b7280' }}>PDF, DOCX, PNG, JPEG, JPG (max 10MB)</p>
            </div>
          </div>
        </div>
        {file && (
          <div className="mt-3 flex items-center justify-between p-3 rounded-lg" style={{
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.20)'
          }}>
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4" style={{ color: '#10b981' }} />
              <div>
                <p className="text-sm font-medium" style={{ color: '#10b981' }}>{file.name}</p>
                <p className="text-xs" style={{ color: '#10b981' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: '#f5f5ef',
      backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(182, 157, 116, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(182, 157, 116, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(182, 157, 116, 0.02) 0%, transparent 50%)
      `
    }}>
      {/* Header */}
      <div className="border-b p-6" style={{
        background: 'linear-gradient(135deg, #f5f5ef 0%, rgba(255, 255, 255, 0.8) 100%)',
        borderBottomColor: 'rgba(182, 157, 116, 0.15)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#1f2839' }}>
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#1f2839' }}>Contract Analysis Suite</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>Professional legal document analysis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-md" style={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                borderColor: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid'
              }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                <span className="text-xs font-medium" style={{ color: '#10b981' }}>AI Services Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b overflow-x-auto" style={{
        background: 'linear-gradient(135deg, #f5f5ef 0%, rgba(255, 255, 255, 0.9) 100%)',
        borderBottomColor: 'rgba(182, 157, 116, 0.15)',
        backdropFilter: 'blur(6px)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-1 py-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id 
                      ? '#1f2839'
                      : 'transparent',
                    color: activeTab === tab.id 
                      ? '#ffffff'
                      : '#6b7280',
                    boxShadow: activeTab === tab.id 
                      ? '0 4px 15px rgba(31, 40, 57, 0.20)'
                      : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.08)';
                      e.target.style.color = '#1f2839';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#6b7280';
                    }
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(31, 40, 57, 0.50)' }}>
          <div className="rounded-lg p-6 max-w-sm w-full mx-4" style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(182, 157, 116, 0.20)',
            boxShadow: '0 25px 50px rgba(31, 40, 57, 0.25)'
          }}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#b69d74' }}>
                <Loader className="w-6 h-6 text-white animate-spin" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1" style={{ color: '#1f2839' }}>Processing Document</h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>AI is analyzing your files...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Contract Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="rounded-lg p-6 mb-6" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(182, 157, 116, 0.25)',
            boxShadow: '0 8px 32px rgba(31, 40, 57, 0.12), 0 0 0 1px rgba(182, 157, 116, 0.10)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #b69d74, #c7a97d, #b69d74)'
            }}></div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(182, 157, 116, 0.12)' }}>
                <Scale className="w-5 h-5" style={{ color: '#b69d74' }} />
              </div>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: '#1f2839' }}>Contract Comparison</h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>Compare two contracts side-by-side</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FileUploadArea
                label="First Contract"
                file={file1}
                onFileChange={(e) => setFile1(e.target.files[0])}
                fileRef={file1Ref}
              />
              
              <FileUploadArea
                label="Second Contract"
                file={file2}
                onFileChange={(e) => setFile2(e.target.files[0])}
                fileRef={file2Ref}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleContractComparison}
                  disabled={loading || !file1 || !file2}
                  className="text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  style={{
                    background: 'linear-gradient(135deg, #b69d74 0%, #a68b63 50%, #b69d74 100%)',
                    boxShadow: '0 4px 15px rgba(182, 157, 116, 0.40), 0 0 20px rgba(182, 157, 116, 0.20)',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && file1 && file2) {
                      e.target.style.boxShadow = '0 6px 25px rgba(182, 157, 116, 0.60), 0 0 30px rgba(182, 157, 116, 0.30)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.background = 'linear-gradient(135deg, #c7a97d 0%, #b69d74 50%, #c7a97d 100%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = '0 4px 15px rgba(182, 157, 116, 0.40), 0 0 20px rgba(182, 157, 116, 0.20)';
                    e.target.style.transform = 'translateY(0px)';
                    e.target.style.background = 'linear-gradient(135deg, #b69d74 0%, #a68b63 50%, #b69d74 100%)';
                  }}
                >
                  <Scale className="w-4 h-4" />
                  <span>{loading ? 'Comparing...' : 'Compare Contracts'}</span>
                </button>
                
                <button
                  onClick={clearFiles}
                  className="px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(182, 157, 116, 0.15)',
                    color: '#6b7280',
                    backdropFilter: 'blur(6px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.08)';
                    e.target.style.color = '#1f2839';
                    e.target.style.borderColor = 'rgba(182, 157, 116, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    e.target.style.color = '#6b7280';
                    e.target.style.borderColor = 'rgba(182, 157, 116, 0.15)';
                  }}
                >
                  <X className="w-4 h-4" />
                  <span>Clear Files</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 text-xs" style={{ color: '#6b7280' }}>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>30-60 seconds</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Single Document Analysis Tabs */}
        {(activeTab === 'risk' || activeTab === 'summary' || activeTab === 'authenticity') && (
          <div className="rounded-lg p-6 mb-6" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(182, 157, 116, 0.20)',
            boxShadow: '0 8px 32px rgba(31, 40, 57, 0.08)'
          }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(182, 157, 116, 0.12)' }}>
                {activeTab === 'risk' && <AlertTriangle className="w-5 h-5" style={{ color: '#b69d74' }} />}
                {activeTab === 'summary' && <BookOpen className="w-5 h-5" style={{ color: '#b69d74' }} />}
                {activeTab === 'authenticity' && <Search className="w-5 h-5" style={{ color: '#b69d74' }} />}
              </div>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: '#1f2839' }}>
                  {activeTab === 'risk' && 'Risk Analysis'}
                  {activeTab === 'summary' && 'Document Summarizer'}
                  {activeTab === 'authenticity' && 'Authenticity Check'}
                </h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {activeTab === 'risk' && 'Analyze contract for risks and compliance issues'}
                  {activeTab === 'summary' && 'Convert contracts to plain language summaries'}
                  {activeTab === 'authenticity' && 'Verify document authenticity and integrity'}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <FileUploadArea
                label="Select Document"
                file={singleFile}
                onFileChange={(e) => setSingleFile(e.target.files[0])}
                fileRef={singleFileRef}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={
                    activeTab === 'risk' ? handleRiskAnalysis :
                    activeTab === 'summary' ? handleDocumentSummarizer :
                    handleAuthenticityCheck
                  }
                  disabled={loading || !singleFile}
                  className="text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  style={{
                    background: 'linear-gradient(135deg, #b69d74 0%, #a68b63 50%, #b69d74 100%)',
                    boxShadow: '0 4px 15px rgba(182, 157, 116, 0.40), 0 0 20px rgba(182, 157, 116, 0.20)',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && singleFile) {
                      e.target.style.boxShadow = '0 6px 25px rgba(182, 157, 116, 0.60), 0 0 30px rgba(182, 157, 116, 0.30)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.background = 'linear-gradient(135deg, #c7a97d 0%, #b69d74 50%, #c7a97d 100%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = '0 4px 15px rgba(182, 157, 116, 0.40), 0 0 20px rgba(182, 157, 116, 0.20)';
                    e.target.style.transform = 'translateY(0px)';
                    e.target.style.background = 'linear-gradient(135deg, #b69d74 0%, #a68b63 50%, #b69d74 100%)';
                  }}
                >
                  {activeTab === 'risk' && <AlertTriangle className="w-4 h-4" />}
                  {activeTab === 'summary' && <BookOpen className="w-4 h-4" />}
                  {activeTab === 'authenticity' && <Search className="w-4 h-4" />}
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
                  className="px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(182, 157, 116, 0.15)',
                    color: '#6b7280',
                    backdropFilter: 'blur(6px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.08)';
                    e.target.style.color = '#1f2839';
                    e.target.style.borderColor = 'rgba(182, 157, 116, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    e.target.style.color = '#6b7280';
                    e.target.style.borderColor = 'rgba(182, 157, 116, 0.15)';
                  }}
                >
                  <X className="w-4 h-4" />
                  <span>Clear File</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Generator Tab */}
        {activeTab === 'compliance' && (
          <div className="rounded-lg p-6 mb-6" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(182, 157, 116, 0.20)',
            boxShadow: '0 8px 32px rgba(31, 40, 57, 0.08)'
          }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(182, 157, 116, 0.12)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: '#b69d74' }} />
              </div>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: '#1f2839' }}>Compliance Generator</h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>Generate regulatory checklists and tasks</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: '#1f2839' }}>Regulation Type</label>
                <input
                  type="text"
                  placeholder="e.g., labor law, tax law"
                  value={complianceData.regulation}
                  onChange={(e) => setComplianceData({...complianceData, regulation: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(182, 157, 116, 0.15)',
                    color: '#1f2839'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#b69d74';
                    e.target.style.boxShadow = '0 0 0 3px rgba(182, 157, 116, 0.10)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(182, 157, 116, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: '#1f2839' }}>Country</label>
                <select
                  value={complianceData.country}
                  onChange={(e) => setComplianceData({...complianceData, country: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(182, 157, 116, 0.15)',
                    color: '#1f2839'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#b69d74';
                    e.target.style.boxShadow = '0 0 0 3px rgba(182, 157, 116, 0.10)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(182, 157, 116, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="INDIA">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CANADA">Canada</option>
                  <option value="AUSTRALIA">Australia</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: '#1f2839' }}>Company Type</label>
                <input
                  type="text"
                  placeholder="e.g., technology, healthcare"
                  value={complianceData.companyType}
                  onChange={(e) => setComplianceData({...complianceData, companyType: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(182, 157, 116, 0.15)',
                    color: '#1f2839'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#b69d74';
                    e.target.style.boxShadow = '0 0 0 3px rgba(182, 157, 116, 0.10)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(182, 157, 116, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleComplianceGeneration}
              disabled={loading || !complianceData.regulation || !complianceData.country || !complianceData.companyType}
              className="text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              style={{
                background: 'linear-gradient(135deg, #b69d74 0%, #a68b63 50%, #b69d74 100%)',
                boxShadow: '0 4px 15px rgba(182, 157, 116, 0.40), 0 0 20px rgba(182, 157, 116, 0.20)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                if (!loading && complianceData.regulation && complianceData.country && complianceData.companyType) {
                  e.target.style.boxShadow = '0 6px 25px rgba(182, 157, 116, 0.60), 0 0 30px rgba(182, 157, 116, 0.30)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.background = 'linear-gradient(135deg, #c7a97d 0%, #b69d74 50%, #c7a97d 100%)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 4px 15px rgba(182, 157, 116, 0.40), 0 0 20px rgba(182, 157, 116, 0.20)';
                e.target.style.transform = 'translateY(0px)';
                e.target.style.background = 'linear-gradient(135deg, #b69d74 0%, #a68b63 50%, #b69d74 100%)';
              }}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{loading ? 'Generating...' : 'Generate Compliance Tasks'}</span>
            </button>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="rounded-lg p-6" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(182, 157, 116, 0.20)',
            boxShadow: '0 8px 32px rgba(31, 40, 57, 0.08)'
          }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(182, 157, 116, 0.12)' }}>
                  <Eye className="w-5 h-5" style={{ color: '#b69d74' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#1f2839' }}>{results.type} Results</h3>
                  <p className="text-sm flex items-center" style={{ color: '#6b7280' }}>
                    <Clock className="w-3 h-3 mr-1" />
                    {results.timestamp}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(182, 157, 116, 0.15)',
                  color: '#6b7280',
                  backdropFilter: 'blur(6px)'
                }}>
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setResults(null)}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{ color: '#6b7280' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#1f2839';
                    e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6b7280';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {results.error ? (
              <div className="rounded-lg p-4" style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.20)'
              }}>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5" style={{ color: '#ef4444' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#dc2626' }}>Analysis Error</h4>
                    <p className="text-sm mt-1" style={{ color: '#dc2626' }}>{results.error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg p-4" style={{
                backgroundColor: 'rgba(182, 157, 116, 0.08)',
                border: '1px solid rgba(182, 157, 116, 0.20)'
              }}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center text-sm" style={{ color: '#1f2839' }}>
                    <FileCheck className="w-4 h-4 mr-2" style={{ color: '#10b981' }} />
                    Analysis Complete
                  </h4>
                  <div className="flex items-center space-x-1 text-sm" style={{ color: '#10b981' }}>
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="rounded p-3" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(182, 157, 116, 0.15)',
                  backdropFilter: 'blur(6px)'
                }}>
                  <pre className="whitespace-pre-wrap text-sm max-h-96 overflow-y-auto font-mono leading-relaxed" style={{ color: '#1f2839' }}>
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
  );
}

export default ContractComparison;
