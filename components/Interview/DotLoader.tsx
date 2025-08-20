import React from 'react';

const DotLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <div style={{
      width: '8px',
      height: '8px',
      backgroundColor: '#6B7280',
      borderRadius: '50%',
      animation: 'dotBounce 1.4s ease-in-out infinite both',
      animationDelay: '0s'
    }}></div>
    <div style={{
      width: '8px',
      height: '8px',
      backgroundColor: '#6B7280',
      borderRadius: '50%',
      animation: 'dotBounce 1.4s ease-in-out infinite both',
      animationDelay: '0.16s'
    }}></div>
    <div style={{
      width: '8px',
      height: '8px',
      backgroundColor: '#6B7280',
      borderRadius: '50%',
      animation: 'dotBounce 1.4s ease-in-out infinite both',
      animationDelay: '0.32s'
    }}></div>
    <style jsx>{`
      @keyframes dotBounce {
        0%, 80%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

export default DotLoader;