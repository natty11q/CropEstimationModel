import { useState } from 'react';

export default function App() {
  // State for context selection
  const [selectedFarm, setSelectedFarm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [cropType, setCropType] = useState('');
  const [plantingSeason, setPlantingSeason] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [modelVersion, setModelVersion] = useState('v2.3.1');
  
  // State for prediction outputs
  const [predictionResult, setPredictionResult] = useState(null);
  const [inferenceMode, setInferenceMode] = useState('standard');
  const [showConfidence, setShowConfidence] = useState(true);
  
  // State for UI
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('inputs');
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [actualYieldInput, setActualYieldInput] = useState('');
  const [anomalyNote, setAnomalyNote] = useState('');
  
  // Mock prediction history
  const [predictionHistory] = useState([
    {
      id: 1,
      date: '2026-01-28',
      crop: 'Wheat',
      field: 'Field A-12',
      predictedYield: 4.2,
      confidence: 87,
      modelVersion: 'v2.3.0',
      status: 'Complete',
      actualYield: 4.1
    },
    {
      id: 2,
      date: '2026-01-25',
      crop: 'Corn',
      field: 'Field B-7',
      predictedYield: 8.5,
      confidence: 92,
      modelVersion: 'v2.3.0',
      status: 'Complete',
      actualYield: 8.7
    },
    {
      id: 3,
      date: '2026-01-20',
      crop: 'Soybeans',
      field: 'Field C-3',
      predictedYield: 3.1,
      confidence: 78,
      modelVersion: 'v2.2.9',
      status: 'Complete',
      actualYield: null
    }
  ]);

  // Mock model inputs data
  const modelInputs = {
    environmental: {
      rainfall: { value: '245 mm', source: 'Weather Station WS-142', updated: '2026-02-02 08:00' },
      temperature: { value: '22°C avg', source: 'Weather Station WS-142', updated: '2026-02-02 08:00' },
      humidity: { value: '68%', source: 'Weather Station WS-142', updated: '2026-02-02 08:00' },
      solarRadiation: { value: '18.5 MJ/m²', source: 'Satellite Data', updated: '2026-02-02 06:00' }
    },
    soilAndField: {
      soilType: { value: 'Loamy Clay', source: 'Soil Survey 2024', updated: '2024-06-15' },
      soilMoisture: { value: '32%', source: 'IoT Sensor SM-445', updated: '2026-02-02 09:15' },
      nutrientIndicators: { value: 'N: 45, P: 28, K: 52', source: 'Lab Test LT-2401', updated: '2026-01-10' },
      fieldSize: { value: '12.5 hectares', source: 'Farm Registry', updated: '2025-03-20' },
      irrigationType: { value: 'Drip Irrigation', source: 'Farm Registry', updated: '2025-03-20' }
    },
    cropState: {
      growthStage: { value: 'Vegetative', source: 'Manual Entry', updated: '2026-02-01' },
      plantDensity: { value: '65,000 plants/ha', source: 'Planting Record', updated: '2025-11-15' },
      plantingMethod: { value: 'Direct Seeding', source: 'Planting Record', updated: '2025-11-15' },
      fertilizerUsage: { value: 'NPK 15-15-15, 200kg/ha', source: 'Application Log', updated: '2025-12-10' },
      pestDiseaseIndicators: { value: 'Low aphid pressure', source: 'Field Inspection', updated: '2026-01-28' }
    }
  };

  // Handler functions (placeholder implementations)
  const handleRunPrediction = () => {
    // TODO: Call AI model API endpoint
    console.log('Calling AI model with current inputs...');
    
    // Mock prediction result
    setPredictionResult({
      yieldPerHectare: 4.8,
      totalYield: 60.0,
      confidenceScore: 85,
      historicalComparison: '+12% vs 3-year avg',
      regionalComparison: '+5% vs regional avg',
      featureInfluence: [
        { feature: 'Rainfall', impact: 'High Positive', value: '+18%' },
        { feature: 'Soil Quality', impact: 'Moderate Positive', value: '+8%' },
        { feature: 'Temperature', impact: 'Neutral', value: '+2%' },
        { feature: 'Pest Pressure', impact: 'Low Negative', value: '-3%' },
        { feature: 'Nutrient Levels', impact: 'Moderate Positive', value: '+7%' }
      ],
      requestId: 'REQ-' + Math.random().toString(36).substr(2, 9),
      jobId: 'JOB-' + Math.random().toString(36).substr(2, 9),
      inferenceLatency: '1.24s',
      timestamp: new Date().toISOString()
    });
  };

  const handleResetForm = () => {
    setSelectedFarm('');
    setSelectedField('');
    setCropType('');
    setPlantingSeason('');
    setPlantingDate('');
    setPredictionResult(null);
  };

  const handleExportResults = () => {
    // TODO: Export prediction results to CSV/JSON
    console.log('Exporting results...');
  };

  const handleSubmitActualYield = (historyId) => {
    // TODO: Submit actual yield data to backend
    console.log(`Submitting actual yield for prediction ${historyId}: ${actualYieldInput}`);
    setActualYieldInput('');
    setSelectedHistoryItem(null);
  };

  const handleSaveAnomalyNote = () => {
    // TODO: Save anomaly note to backend
    console.log('Saving anomaly note:', anomalyNote);
  };

  const calculatePredictionError = (predicted, actual) => {
    if (!actual) return null;
    const error = ((actual - predicted) / predicted) * 100;
    return error.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crop Yield Estimation AI Dashboard</h1>
              <p className="text-gray-600 mt-1">Internal Testing & Model Validation Interface</p>
            </div>
            <div className="flex items-center gap-4">
              {/* System Status Indicators */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-md">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700">Model Healthy</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-md">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-700">Data: 98% Complete</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-50 rounded-md">
                  <span className="text-sm text-gray-700">Last Retrain: 2026-01-25</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Context and Inputs */}
          <div className="col-span-4 space-y-6">
            {/* Context Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Entry & Context Selection</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm</label>
                  <select 
                    value={selectedFarm}
                    onChange={(e) => setSelectedFarm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Farm...</option>
                    <option value="farm1">Greenfield Farms</option>
                    <option value="farm2">Sunrise Agriculture</option>
                    <option value="farm3">Valley View Farm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field / Plot</label>
                  <select 
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Field...</option>
                    <option value="field1">Field A-12 (12.5 ha)</option>
                    <option value="field2">Field B-7 (18.2 ha)</option>
                    <option value="field3">Field C-3 (9.8 ha)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                  <select 
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Crop...</option>
                    <option value="wheat">Wheat</option>
                    <option value="corn">Corn</option>
                    <option value="soybeans">Soybeans</option>
                    <option value="rice">Rice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planting Season</label>
                  <select 
                    value={plantingSeason}
                    onChange={(e) => setPlantingSeason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Season...</option>
                    <option value="spring2026">Spring 2026</option>
                    <option value="fall2025">Fall 2025</option>
                    <option value="winter2025">Winter 2025</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                  <input 
                    type="date"
                    value={plantingDate}
                    onChange={(e) => setPlantingDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model Version</label>
                  <select 
                    value={modelVersion}
                    onChange={(e) => setModelVersion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="v2.3.1">v2.3.1 (Latest)</option>
                    <option value="v2.3.0">v2.3.0</option>
                    <option value="v2.2.9">v2.2.9</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Prediction Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Prediction Controls</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inference Mode</label>
                  <select 
                    value={inferenceMode}
                    onChange={(e) => setInferenceMode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="fast">Fast (Lower Accuracy)</option>
                    <option value="detailed">Detailed (Slower)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id="showConfidence"
                    checked={showConfidence}
                    onChange={(e) => setShowConfidence(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showConfidence" className="text-sm text-gray-700">Show Confidence Scores</label>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleRunPrediction}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                  >
                    Run Prediction
                  </button>
                  <button
                    onClick={handleResetForm}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </div>

            {/* Permissions Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Permissions</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Current Role:</span>
                  <span className="text-sm font-medium text-gray-900">Admin</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <div>✓ View predictions</div>
                  <div>✓ Run models</div>
                  <div>✓ Access debug info</div>
                  <div>✓ Manage system settings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Model Inputs */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Model Input Panel</h2>
              
              {/* Tabs */}
              <div className="flex gap-2 mb-4 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('inputs')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'inputs' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Inputs
                </button>
                <button
                  onClick={() => setActiveTab('environmental')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'environmental' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Environmental
                </button>
                <button
                  onClick={() => setActiveTab('soil')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'soil' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Soil & Field
                </button>
                <button
                  onClick={() => setActiveTab('crop')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'crop' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Crop State
                </button>
              </div>

              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {/* Environmental Inputs */}
                {(activeTab === 'inputs' || activeTab === 'environmental') && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Environmental Inputs</h3>
                    {Object.entries(modelInputs.environmental).map(([key, data]) => (
                      <div key={key} className="mb-3 p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">{data.value}</span>
                        </div>
                        <div className="text-xs text-gray-600">Source: {data.source}</div>
                        <div className="text-xs text-gray-500">Updated: {data.updated}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Soil and Field Inputs */}
                {(activeTab === 'inputs' || activeTab === 'soil') && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Soil & Field Inputs</h3>
                    {Object.entries(modelInputs.soilAndField).map(([key, data]) => (
                      <div key={key} className="mb-3 p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">{data.value}</span>
                        </div>
                        <div className="text-xs text-gray-600">Source: {data.source}</div>
                        <div className="text-xs text-gray-500">Updated: {data.updated}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Crop State Inputs */}
                {(activeTab === 'inputs' || activeTab === 'crop') && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Crop State Inputs</h3>
                    {Object.entries(modelInputs.cropState).map(([key, data]) => (
                      <div key={key} className="mb-3 p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">{data.value}</span>
                        </div>
                        <div className="text-xs text-gray-600">Source: {data.source}</div>
                        <div className="text-xs text-gray-500">Updated: {data.updated}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Outputs and Explainability */}
          <div className="col-span-4 space-y-6">
            {/* Prediction Output */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">4. Prediction Output</h2>
                {predictionResult && (
                  <button
                    onClick={handleExportResults}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Export
                  </button>
                )}
              </div>
              
              {predictionResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-700 mb-1">Yield per Hectare</div>
                      <div className="text-2xl font-bold text-blue-900">
                        {predictionResult.yieldPerHectare} t/ha
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-700 mb-1">Total Estimated Yield</div>
                      <div className="text-2xl font-bold text-green-900">
                        {predictionResult.totalYield} tonnes
                      </div>
                    </div>
                  </div>

                  {showConfidence && (
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-purple-700 mb-2">Confidence Score</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-purple-200 rounded-full h-3">
                          <div 
                            className="bg-purple-600 h-3 rounded-full"
                            style={{ width: `${predictionResult.confidenceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-purple-900">
                          {predictionResult.confidenceScore}%
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-sm text-gray-700">Historical Comparison</span>
                      <span className="text-sm font-semibold text-green-600">
                        {predictionResult.historicalComparison}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-sm text-gray-700">Regional Comparison</span>
                      <span className="text-sm font-semibold text-green-600">
                        {predictionResult.regionalComparison}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 pt-2">
                    Generated: {new Date(predictionResult.timestamp).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-2">📊</div>
                  <p>No prediction generated yet</p>
                  <p className="text-sm mt-1">Select context and run prediction</p>
                </div>
              )}
            </div>

            {/* Explainability */}
            {predictionResult && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Explainability</h2>
                <p className="text-sm text-gray-600 mb-4">Feature influence on predicted yield:</p>
                
                <div className="space-y-3">
                  {predictionResult.featureInfluence.map((feature, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{feature.feature}</span>
                        <span className={`text-sm font-semibold ${
                          feature.impact.includes('Positive') ? 'text-green-600' : 
                          feature.impact.includes('Negative') ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {feature.value}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">{feature.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Debug Information */}
            {predictionResult && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <button
                  onClick={() => setShowDebugInfo(!showDebugInfo)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-900">8. System & Debug Information</h2>
                  <span className="text-gray-500">{showDebugInfo ? '▼' : '▶'}</span>
                </button>
                
                {showDebugInfo && (
                  <div className="mt-4 space-y-2 font-mono text-xs">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Request ID:</span>
                      <span className="text-gray-900">{predictionResult.requestId}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Job ID:</span>
                      <span className="text-gray-900">{predictionResult.jobId}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Inference Latency:</span>
                      <span className="text-gray-900">{predictionResult.inferenceLatency}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Data Freshness:</span>
                      <span className="text-green-600">All sources &lt; 24h</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Errors:</span>
                      <span className="text-green-600">None</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - History and Accuracy */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Prediction History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Prediction History</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Crop</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Field</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Predicted (t/ha)</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Actual (t/ha)</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Error</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Confidence</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Version</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {predictionHistory.map((item) => {
                    const error = calculatePredictionError(item.predictedYield, item.actualYield);
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{item.date}</td>
                        <td className="px-4 py-3 text-gray-900">{item.crop}</td>
                        <td className="px-4 py-3 text-gray-900">{item.field}</td>
                        <td className="px-4 py-3 text-right text-gray-900">{item.predictedYield}</td>
                        <td className="px-4 py-3 text-right">
                          {item.actualYield ? (
                            <span className="text-gray-900">{item.actualYield}</span>
                          ) : selectedHistoryItem === item.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                step="0.1"
                                value={actualYieldInput}
                                onChange={(e) => setActualYieldInput(e.target.value)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="0.0"
                              />
                              <button
                                onClick={() => handleSubmitActualYield(item.id)}
                                className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedHistoryItem(item.id)}
                              className="text-blue-600 hover:text-blue-700 text-xs"
                            >
                              Add
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {error ? (
                            <span className={`font-semibold ${
                              parseFloat(error) > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {error}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                            {item.confidence}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">{item.modelVersion}</td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-blue-600 hover:text-blue-700 text-xs">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>Showing {predictionHistory.length} predictions</span>
              <button className="text-blue-600 hover:text-blue-700">Load More</button>
            </div>
          </div>

          {/* Accuracy and Feedback */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Accuracy & Feedback</h2>
            
            {/* Accuracy Metrics */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900">Model Accuracy Trends</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-xs text-blue-700 mb-1">Mean Absolute Error</div>
                  <div className="text-2xl font-bold text-blue-900">3.2%</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-xs text-green-700 mb-1">Predictions within 5%</div>
                  <div className="text-2xl font-bold text-green-900">87%</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-xs text-purple-700 mb-1">Avg Confidence</div>
                  <div className="text-2xl font-bold text-purple-900">85%</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Accuracy Trend (Last 30 Days)</span>
                  <span className="text-sm text-green-600">↑ +2.1%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>

            {/* Anomaly Reporting */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Anomaly Notes</h3>
              
              <div className="space-y-3">
                <textarea
                  value={anomalyNote}
                  onChange={(e) => setAnomalyNote(e.target.value)}
                  placeholder="Report any anomalies or unexpected results..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={3}
                />
                <button
                  onClick={handleSaveAnomalyNote}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
                >
                  Submit Anomaly Report
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-yellow-900">Unusual pest pressure reported</div>
                      <div className="text-xs text-yellow-700 mt-1">Field B-7, 2026-01-25 - Confidence may be affected</div>
                    </div>
                    <span className="text-xs text-yellow-600">⚠</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-blue-900">Model performed well</div>
                      <div className="text-xs text-blue-700 mt-1">Field A-12, 2026-01-28 - Error within 2.4%</div>
                    </div>
                    <span className="text-xs text-blue-600">ℹ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
