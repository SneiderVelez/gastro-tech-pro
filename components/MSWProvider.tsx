'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isMSWReady, setIsMSWReady] = useState(false);

  useEffect(() => {
    // Solo inicializamos MSW en desarrollo y si estamos en el cliente
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const initMSW = async () => {
        const { worker } = await import('@/mocks/browser');
        // bypass bypasses unhandled request warnings
        await worker.start({ onUnhandledRequest: 'bypass' });
        setIsMSWReady(true);
      };
      
      initMSW();
    } else {
      setIsMSWReady(true);
    }
  }, []);

  if (!isMSWReady) {
    // Evitamos renderizar la app principal hasta que el Service Worker se haya registrado.
    // Esto asegura que la primera petición (incluso en el render inicial) sea interceptada.
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-gray-500 font-medium">Inicializando entorno de simulación (MSW)...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
