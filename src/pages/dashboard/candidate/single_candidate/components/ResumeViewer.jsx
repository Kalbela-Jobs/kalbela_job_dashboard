export default function ResumeViewer({ data }) {

      const resume_url = data.resume_url


      const downloadAndOpenPdf = () => {
            window.open(resume_url, '_blank');
      };
      return (
            <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Resume</h3>
                        <a
                              href={resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                              Open Resume
                        </a>
                  </div>

                  {resume_url && <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between text-white mb-4">
                              <div className="flex items-center gap-4">
                                    <button className="p-2 hover:bg-gray-700 rounded">
                                          <MenuIcon />
                                    </button>
                                    <span>Resume</span>
                                    <span>1 / 1</span>
                              </div>
                              <div className="flex items-center gap-4">
                                    <button className="p-2 hover:bg-gray-700 rounded">-</button>
                                    <span>100%</span>
                                    <button className="p-2 hover:bg-gray-700 rounded">+</button>
                                    <button onClick={downloadAndOpenPdf} className="p-2 hover:bg-gray-700 rounded">
                                          <FullscreenIcon />
                                    </button>
                                    <button className="p-2 hover:bg-gray-700 rounded">
                                          <RefreshIcon />
                                    </button>
                                    <button onClick={downloadAndOpenPdf} className="p-2 hover:bg-gray-700 rounded">
                                          <DownloadIcon />
                                    </button>
                                    <button className="p-2 hover:bg-gray-700 rounded">
                                          <PrinterIcon />
                                    </button>
                                    <button className="p-2 hover:bg-gray-700 rounded">
                                          <MoreIcon />
                                    </button>
                              </div>
                        </div>
                        <div className="bg-white rounded min-h-[600px] flex items-center justify-center">
                              <iframe
                                    src={`${resume_url}#toolbar=0&navpanes=0&scrollbar=0`}
                                    className="w-full h-[600px] border-none"
                                    title="Resume PDF"
                              />
                        </div>
                  </div>}
            </div>
      )
}

function MenuIcon() {
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
}

function FullscreenIcon() {
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0-4l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
}

function RefreshIcon() {
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
}

function DownloadIcon() {
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
}

function PrinterIcon() {
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
}

function MoreIcon() {
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
}
