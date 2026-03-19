import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CocinaPage() {
  const comandas = [
    { id: 'c1', mesa: 2, estado: 'cocina', items: ['Hamburguesa', 'Papas'] },
    { id: 'c2', mesa: 5, estado: 'listo', items: ['Ensalada', 'Agua'] },
    { id: 'c3', mesa: 1, estado: 'entregado', items: ['Combo Burger'] },
  ]

  const columnas = [
    { id: 'cocina', title: 'En Preparación 🍳', color: 'border-blue-500' },
    { id: 'listo', title: 'Listos para Servir 🔔', color: 'border-green-500' },
    { id: 'entregado', title: 'Entregados ✅', color: 'border-gray-200 opacity-60' },
  ]

  return (
     <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold md:text-3xl">GastroTech · Tablero de Cocina</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columnas.map(columna => (
          <div key={columna.id} className={`flex flex-col gap-4 bg-gray-50/50 p-4 rounded-xl border-t-4 ${columna.color}`}>
            <h2 className="font-semibold text-lg text-gray-700">{columna.title}</h2>
            
            {comandas.filter(c => c.estado === columna.id).length === 0 ? (
               <div className="text-sm text-gray-400 text-center py-8 border-2 border-dashed rounded-lg">
                 Sin comandas
               </div>
            ) : (
              comandas.filter(c => c.estado === columna.id).map(com => (
                <Card key={com.id} className="shadow-sm">
                  <CardHeader className="py-3 bg-white">
                    <CardTitle className="text-base flex justify-between">
                      Orden #{com.id}
                      <span className="text-sm font-normal text-gray-500">Mesa {com.mesa}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3">
                    <ul className="text-sm list-disc pl-4 space-y-1">
                      {com.items.map((item, idx) => (
                        <li key={idx} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
