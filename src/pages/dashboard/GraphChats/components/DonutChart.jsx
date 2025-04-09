"use client"

import { useEffect, useRef } from "react"

const DonutChart = ({ percentages = [70, 30], colors = ["#4299e1", "#ebf5ff"] }) => {
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

            // Draw donut chart
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const radius = Math.min(centerX, centerY) * 0.8
            const innerRadius = radius * 0.6

            let startAngle = -Math.PI / 2 // Start at the top

            // Draw each segment
            percentages.forEach((percentage, index) => {
                  const endAngle = startAngle + (percentage / 100) * Math.PI * 2

                  ctx.beginPath()
                  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
                  ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
                  ctx.closePath()

                  ctx.fillStyle = colors[index]
                  ctx.fill()

                  startAngle = endAngle
            })

            // Add center text
            ctx.fillStyle = "#4a5568"
            ctx.font = "bold 16px Arial"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(`${percentages[0]}%`, centerX, centerY)
      }, [percentages, colors])

      return (
            <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 mb-2">Filled</div>
                  <div className="w-full h-40 relative">
                        <canvas ref={canvasRef} className="w-full h-full"></canvas>
                  </div>
                  <div className="flex justify-between w-full text-xs text-gray-500 mt-2">
                        <div>0.0%</div>
                        <div>100.0%</div>
                  </div>
            </div>
      )
}

export default DonutChart
