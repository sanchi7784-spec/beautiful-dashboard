import React, { useState, useEffect } from 'react'
import { Upload, Link, Save, RotateCcw, ImageIcon } from 'lucide-react'

function Logo() {
  const [logoUrl, setLogoUrl] = useState('')
  const [inputUrl, setInputUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [uploadMethod, setUploadMethod] = useState('url') // 'url' or 'file'

  // Load saved logo from localStorage on component mount
  useEffect(() => {
    const savedLogo = localStorage.getItem('dashboardLogo')
    if (savedLogo) {
      setLogoUrl(savedLogo)
      setPreviewUrl(savedLogo)
      setInputUrl(savedLogo)
    } else {
      // Default logo
      const defaultLogo = 'https://readygrocery.razinsoft.com/assets/logo.png'
      setLogoUrl(defaultLogo)
      setPreviewUrl(defaultLogo)
      setInputUrl(defaultLogo)
    }
  }, [])

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle URL input change
  const handleUrlChange = (e) => {
    const url = e.target.value
    setInputUrl(url)
    setPreviewUrl(url)
  }

  // Save logo
  const handleSaveLogo = () => {
    if (previewUrl) {
      localStorage.setItem('dashboardLogo', previewUrl)
      setLogoUrl(previewUrl)
      
      // Dispatch custom event to update logo in header
      window.dispatchEvent(new CustomEvent('logoUpdated', { detail: previewUrl }))
      
      alert('Logo saved successfully!')
    } else {
      alert('Please provide a logo URL or upload a file')
    }
  }

  // Reset to default logo
  const handleReset = () => {
    const defaultLogo = 'https://readygrocery.razinsoft.com/assets/logo.png'
    setLogoUrl(defaultLogo)
    setPreviewUrl(defaultLogo)
    setInputUrl(defaultLogo)
    localStorage.removeItem('dashboardLogo')
    window.dispatchEvent(new CustomEvent('logoUpdated', { detail: defaultLogo }))
    alert('Logo reset to default!')
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">Logo Management</h1>
          <p className="text-gray-400">Update your website and dashboard logo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Logo Preview */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Current Logo Preview
            </h2>
            
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 flex items-center justify-center bg-gray-700 min-h-[300px]">
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Logo Preview" 
                  className="max-w-full max-h-[250px] object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x100?text=Invalid+Image'
                  }}
                />
              ) : (
                <div className="text-center text-gray-500">
                  <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                  <p>No logo selected</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveLogo}
                className="flex-1 bg-red-900 text-white px-4 py-3 rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Save className="w-5 h-5" />
                Save Logo
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-700 text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Right Column - Upload Options */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Method</h2>

            {/* Method Selection */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setUploadMethod('url')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  uploadMethod === 'url'
                    ? 'bg-red-900 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Link className="w-4 h-4" />
                URL
              </button>
              <button
                onClick={() => setUploadMethod('file')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  uploadMethod === 'file'
                    ? 'bg-red-900 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload File
              </button>
            </div>

            {/* URL Input */}
            {uploadMethod === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent outline-none placeholder-gray-400"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Enter the URL of your logo image
                  </p>
                </div>
              </div>
            )}

            {/* File Upload */}
            {uploadMethod === 'file' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Logo File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-red-900 hover:bg-gray-700 transition-colors bg-gray-750"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-300">Click to upload</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, SVG up to 10MB</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Choose an image file from your computer
                  </p>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-400 mb-2">💡 Tips:</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Recommended size: 200x80 pixels</li>
                <li>• Transparent background works best</li>
                <li>• Supported formats: PNG, JPG, SVG</li>
                <li>• Logo will update across the dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logo