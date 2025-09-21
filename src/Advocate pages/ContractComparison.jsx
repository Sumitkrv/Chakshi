import axios from "axios";
import { useState, useRef } from "react";

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
    { id: 'comparison', name: 'Contract Comparison', icon: '🔄' },
    { id: 'risk', name: 'Risk Analysis', icon: '⚠️' },
    { id: 'summary', name: 'Document Summarizer', icon: '📋' },
    { id: 'authenticity', name: 'Authenticity Check', icon: '🔍' },
    { id: 'compliance', name: 'Compliance Generator', icon: '✅' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Contract Analysis Suite</h1>
        <p className="text-gray-600">Powered by N8N automation - supports PDF, DOCX, PNG, JPEG, JPG formats</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Processing...</span>
            </div>
          </div>
        )}

        {/* Contract Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Comparison Tool</h3>
            <p className="text-gray-600 mb-6">Compare two contracts side-by-side to identify changes, additions, and modifications</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Contract</label>
                <input
                  ref={file1Ref}
                  type="file"
                  accept=".pdf,.docx,.png,.jpeg,.jpg"
                  onChange={(e) => setFile1(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {file1 && <p className="text-sm text-green-600 mt-1">✓ {file1.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Second Contract</label>
                <input
                  ref={file2Ref}
                  type="file"
                  accept=".pdf,.docx,.png,.jpeg,.jpg"
                  onChange={(e) => setFile2(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {file2 && <p className="text-sm text-green-600 mt-1">✓ {file2.name}</p>}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleContractComparison}
                disabled={loading || !file1 || !file2}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Comparing...' : 'Compare Contracts'}
              </button>
              
              <button
                onClick={clearFiles}
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
              >
                Clear Files
              </button>
            </div>
          </div>
        )}

        {/* Single Document Analysis Tabs */}
        {(activeTab === 'risk' || activeTab === 'summary' || activeTab === 'authenticity') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {activeTab === 'risk' && 'Contract Risk Analysis'}
              {activeTab === 'summary' && 'Document Summarizer'}
              {activeTab === 'authenticity' && 'Document Authenticity Checker'}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {activeTab === 'risk' && 'Analyze contract for missing clauses and risk evaluation'}
              {activeTab === 'summary' && 'Convert complex contracts into plain-language summaries'}
              {activeTab === 'authenticity' && 'Check for signatures, watermarks, and signs of tampering or forgery'}
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Document</label>
              <input
                ref={singleFileRef}
                type="file"
                accept=".pdf,.docx,.png,.jpeg,.jpg"
                onChange={(e) => setSingleFile(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {singleFile && <p className="text-sm text-green-600 mt-1">✓ {singleFile.name}</p>}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={
                  activeTab === 'risk' ? handleRiskAnalysis :
                  activeTab === 'summary' ? handleDocumentSummarizer :
                  handleAuthenticityCheck
                }
                disabled={loading || !singleFile}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 
                  activeTab === 'risk' ? 'Analyze Risk' :
                  activeTab === 'summary' ? 'Summarize Document' :
                  'Check Authenticity'
                }
              </button>
              
              <button
                onClick={clearFiles}
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
              >
                Clear File
              </button>
            </div>
          </div>
        )}

        {/* Compliance Generator Tab */}
        {activeTab === 'compliance' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Task Generator</h3>
            <p className="text-gray-600 mb-6">Generate automated regulatory checklists based on jurisdiction and company type</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regulation Type</label>
                <input
                  type="text"
                  placeholder="e.g., labor law, corporate law, tax law"
                  value={complianceData.regulation}
                  onChange={(e) => setComplianceData({...complianceData, regulation: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  value={complianceData.country}
                  onChange={(e) => setComplianceData({...complianceData, country: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="INDIA">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="CANADA">Canada</option>
                  <option value="AUSTRALIA">Australia</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
                <input
                  type="text"
                  placeholder="e.g., justice, technology, healthcare"
                  value={complianceData.companyType}
                  onChange={(e) => setComplianceData({...complianceData, companyType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleComplianceGeneration}
              disabled={loading || !complianceData.regulation || !complianceData.country || !complianceData.companyType}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Compliance Tasks'}
            </button>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {results.type} Results
              </h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{results.timestamp}</span>
                <button
                  onClick={() => setResults(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {results.error ? (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800">Error: {results.error}</p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-md p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-96 overflow-y-auto">
                  {typeof results.data === 'string' 
                    ? results.data 
                    : JSON.stringify(results.data, null, 2)
                  }
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractComparison;
