import { useEffect, useRef } from "react"

const TriangleChart = ({ value, label, percentages = [40, 30, 30] }) => {
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

            // Draw triangle
            const centerX = rect.width / 2
            const triangleHeight = rect.height * 0.7
            const triangleWidth = triangleHeight * 0.9

            // Draw triangle
            ctx.beginPath()
            ctx.moveTo(centerX, 20) // Top point
            ctx.lineTo(centerX - triangleWidth / 2, triangleHeight) // Bottom left
            ctx.lineTo(centerX + triangleWidth / 2, triangleHeight) // Bottom right
            ctx.closePath()
            ctx.fillStyle = "#3b82f6"
            ctx.fill()

            // Draw percentage lines
            const firstLine = 20 + (triangleHeight - 20) * (percentages[0] / 100)
            const secondLine = firstLine + (triangleHeight - 20) * (percentages[1] / 100)

            // First line
            ctx.beginPath()
            ctx.moveTo(centerX - (triangleWidth * (firstLine - 20)) / (triangleHeight - 20) / 2, firstLine)
            ctx.lineTo(centerX + (triangleWidth * (firstLine - 20)) / (triangleHeight - 20) / 2, firstLine)
            ctx.strokeStyle = "white"
            ctx.lineWidth = 2
            ctx.stroke()

            // Second line
            ctx.beginPath()
            ctx.moveTo(centerX - (triangleWidth * (secondLine - 20)) / (triangleHeight - 20) / 2, secondLine)
            ctx.lineTo(centerX + (triangleWidth * (secondLine - 20)) / (triangleHeight - 20) / 2, secondLine)
            ctx.strokeStyle = "white"
            ctx.lineWidth = 2
            ctx.stroke()

            // Add percentages
            ctx.fillStyle = "white"
            ctx.font = "bold 12px Arial"
            ctx.textAlign = "center"

            // Top percentage
            const topY = 20 + (firstLine - 20) / 2
            ctx.fillText(`${percentages[0]}%`, centerX, topY)

            // Middle percentage
            const middleY = firstLine + (secondLine - firstLine) / 2
            ctx.fillText(`${percentages[1]}%`, centerX, middleY)

            // Bottom percentage
            const bottomY = secondLine + (triangleHeight - secondLine) / 2
            ctx.fillText(`${percentages[2]}%`, centerX, bottomY)
      }, [value, percentages])

      return (
            <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-purple-700">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                  <div className="w-full h-40 relative">
                        <canvas ref={canvasRef} className="w-full h-full"></canvas>
                  </div>
            </div>
      )
}

export default TriangleChart
