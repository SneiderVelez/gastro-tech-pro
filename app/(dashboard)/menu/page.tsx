import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MenuPage() {
  const menuItems = [
    { id: 'p1', nombre: 'Hamburguesa Clásica', precio: 12.00, tipo: 'simple' },
    { id: 'p2', nombre: 'Papas Fritas', precio: 4.50, tipo: 'simple' },
    { id: 'p3', nombre: 'Refresco', precio: 2.50, tipo: 'simple' },
    {
      id: 'c1', 
      nombre: 'Combo Burger', 
      precio: 15.00, 
      tipo: 'combo',
      items: [
        { id: 'p1', nombre: 'Hamburguesa Clásica', precio: 12.00, tipo: 'simple' },
        { id: 'p2', nombre: 'Papas Fritas', precio: 4.50, tipo: 'simple' },
        { id: 'p3', nombre: 'Refresco', precio: 2.50, tipo: 'simple' }
      ]
    }
  ]

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold md:text-3xl">GastroTech · Catálogo de Menú</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {menuItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className={item.tipo === 'combo' ? 'bg-orange-50' : ''}>
              <CardTitle className="flex justify-between items-center text-lg">
                {item.nombre}
                <span className="text-primary font-bold">${item.precio.toFixed(2)}</span>
              </CardTitle>
              <CardDescription>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 capitalize">
                  {item.tipo}
                </span>
              </CardDescription>
            </CardHeader>
            {item.items && (
              <CardContent className="bg-gray-50/50 pt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Composición del Combo:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                  {item.items.map((subItem: any, idx: number) => (
                     <li key={`${subItem.id}-${idx}`}>{subItem.nombre} - ${subItem.precio.toFixed(2)}</li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
