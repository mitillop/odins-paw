import { Dog, Cat } from "lucide-react";

export default function PatternBackground() {
  const gridSize = 25; 
  const numRows = 35;
  const numCols = 84;

  return (
    <div 
      className="fixed inset-0 -z-10 bg-white overflow-hidden pointer-events-none" 
      style={{ 
        backgroundAttachment: 'fixed',
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        className="opacity-10"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        {Array.from({ length: numRows }).map((_, row) =>
          Array.from({ length: numCols }).map((_, col) => {
            const Icon = (row + col) % 2 === 0 ? Dog : Cat;
            return (
              <foreignObject
                key={`${row}-${col}`}
                x={col * gridSize}
                y={row * gridSize}
                width={gridSize}
                height={gridSize}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Icon size={32} />
                </div>
              </foreignObject>
            );
          })
        )}
      </svg>
    </div>
  );
}
