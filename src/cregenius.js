import React, { useState } from 'react';
import { Upload, FileText, Send, ChevronDown} from 'lucide-react';

function Cregenius() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleStartAnalysis = () => {
    console.log('Starting analysis with file:', selectedFile);
    console.log('Question:', question);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full bg-orange-450 shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-orange-400">
        <div 
          className="p-2 cursor-pointer flex justify-center items-center"
          onClick={toggleOpen}
        >
          <Brain className="h-6 w-6 text-white mx-1" />
          <h2 className="text-white rounded-md text-lg font-semibold">CreGenius AI</h2>
          <ChevronDown className={`text-white transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-8 space-y-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="sr-only"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  className="flex items-center justify-center px-4 py-3 border border-orange-300 rounded-md shadow-sm text-sm font-medium text-orange-800 bg-white hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <Upload className="mr-2 h-5 w-5 text-orange-600" />
                  Choose File
                </label>
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..." 
                  value={question}
                  onChange={handleQuestionChange}
                  className="pl-10 pr-4 py-3 bg-white border-orange-400 focus:border-orange-300 focus:ring-orange-300 rounded-md shadow-sm w-full text-orange-800 placeholder-orange-300"
                />
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500" />
              </div>
            </div>
            
            <div 
              className="border-2 border-dashed border-orange-400 rounded-xl p-8 text-center bg-white shadow-inner cursor-pointer transition-all duration-300 hover:bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <p className="text-gray-800 font-medium">
                {selectedFile ? `Selected: ${selectedFile.name}` : "Drag 'n' drop files here, or click to select"}
              </p>
            </div>
            
            <button 
              onClick={handleStartAnalysis} 
              className="w-full bg-orange-800 hover:bg-orange-900 text-white font-bold py-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <Send className="mr-2 h-5 w-5" />
              Start AI Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cregenius;