import { useEffect, useRef } from "react"

const Salary_Expectation = ({ value = "--" }) => {
      const canvasRef = useRef(null)

      useEffect(() => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            const dpr = window.devicePixelRatio || 1

            // Set canvas dimensions accounting for device pixel ratio
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)

            // Clear canvas
            ctx.clearRect(0, 0, rect.width, rect.height)

            // Draw circle
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const radius = Math.min(centerX, centerY) * 0.8

            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.fillStyle = "#ebf5ff"
            ctx.fill()

            // Add center text
            ctx.fillStyle = "#4a5568"
            ctx.font = "bold 24px Arial"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(value, centerX, centerY)
      }, [value])

      return (
            <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 mb-2">Salary Expectation </div>
                  <div className="w-full h-40  relative">
                        <canvas ref={canvasRef} className="w-full h-full"></canvas>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">Salary Expectation is not yet available</div>
            </div>
      )
}

export default Salary_Expectation
