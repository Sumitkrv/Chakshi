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
          className="bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-6 text-center cursor-pointer transition-all duration-200 hover:bg-gray-50"
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {file ? 'Change file' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOCX, PNG, JPEG, JPG (max 10MB)</p>
            </div>
          </div>
        </div>
        {file && (
          <div className="mt-3 flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">{file.name}</p>
                <p className="text-xs text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contract Analysis Suite</h1>
                <p className="text-gray-600 text-sm">Professional legal document analysis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-200 rounded-md">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-green-700">AI Services Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
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
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                <Loader className="w-6 h-6 text-white animate-spin" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Processing Document</h3>
                <p className="text-gray-600 text-sm">AI is analyzing your files...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Contract Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Scale className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Contract Comparison</h3>
                <p className="text-gray-600 text-sm">Compare two contracts side-by-side</p>
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
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Scale className="w-4 h-4" />
                  <span>{loading ? 'Comparing...' : 'Compare Contracts'}</span>
                </button>
                
                <button
                  onClick={clearFiles}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Files</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
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
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                {activeTab === 'risk' && <AlertTriangle className="w-5 h-5 text-gray-700" />}
                {activeTab === 'summary' && <BookOpen className="w-5 h-5 text-gray-700" />}
                {activeTab === 'authenticity' && <Search className="w-5 h-5 text-gray-700" />}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {activeTab === 'risk' && 'Risk Analysis'}
                  {activeTab === 'summary' && 'Document Summarizer'}
                  {activeTab === 'authenticity' && 'Authenticity Check'}
                </h3>
                <p className="text-gray-600 text-sm">
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
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
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
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
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
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Compliance Generator</h3>
                <p className="text-gray-600 text-sm">Generate regulatory checklists and tasks</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Regulation Type</label>
                <input
                  type="text"
                  placeholder="e.g., labor law, tax law"
                  value={complianceData.regulation}
                  onChange={(e) => setComplianceData({...complianceData, regulation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  value={complianceData.country}
                  onChange={(e) => setComplianceData({...complianceData, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200"
                >
                  <option value="INDIA">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CANADA">Canada</option>
                  <option value="AUSTRALIA">Australia</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Company Type</label>
                <input
                  type="text"
                  placeholder="e.g., technology, healthcare"
                  value={complianceData.companyType}
                  onChange={(e) => setComplianceData({...complianceData, companyType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200"
                />
              </div>
            </div>

            <button
              onClick={handleComplianceGeneration}
              disabled={loading || !complianceData.regulation || !complianceData.country || !complianceData.companyType}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{loading ? 'Generating...' : 'Generate Compliance Tasks'}</span>
            </button>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Eye className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{results.type} Results</h3>
                  <p className="text-gray-600 text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {results.timestamp}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setResults(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {results.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <h4 className="font-semibold text-red-800">Analysis Error</h4>
                    <p className="text-red-700 text-sm mt-1">{results.error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 flex items-center text-sm">
                    <FileCheck className="w-4 h-4 mr-2 text-green-600" />
                    Analysis Complete
                  </h4>
                  <div className="flex items-center space-x-1 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="bg-white rounded border border-gray-200 p-3">
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
  );
}

export default ContractComparison;
