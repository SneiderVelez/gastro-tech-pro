'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { EstadoMesa, mesa } from '@/types/salon';

export default function SalonPage() {
  // Datos simulados (Mocks estáticos interactivos Fase 0)
  const [mesas, setMesas] = useState<mesa[]>([])
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({})

  const handleAbrirMesa = (index: number) => {
    toast.success(`La mesa ${mesas[index].numero} ha sido abierta con rotación inicial.`)
    const nuevasMesas = [...mesas]
    nuevasMesas[index].estado = EstadoMesa.OCUPADA
    setMesas(nuevasMesas)
  }

  const handleCheckout = (index: number) => {
    toast.success(`Pago procesado exitosamente. La mesa ${mesas[index].numero} pasa a estado sucio.`)
    const nuevasMesas = [...mesas]
    nuevasMesas[index].estado = EstadoMesa.SUCIA
    setMesas(nuevasMesas)
    setOpenDialogs({...openDialogs, [mesas[index].id]: false})
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'disponible': return 'bg-green-100 border-green-500 text-green-700'
      case 'ocupada': return 'bg-red-100 border-red-500 text-red-700'
      case 'reservada': return 'bg-blue-100 border-blue-500 text-blue-700'
      case 'sucia': return 'bg-yellow-100 border-yellow-500 text-yellow-700'
      default: return 'bg-gray-100 border-gray-500 text-gray-700'
    }
  }

  const [allTables, setAllTables] = useState(false)

useEffect(() => {
  const obtenerMesas = async () => {
    console.log("entrando al useEffect")
    setAllTables(true)
    const respuesta = await fetch('/api/mesas')
    console.log(respuesta)
    const data = await respuesta.json()
    console.log('datos listos',data)
    setAllTables(false)
    setMesas(data)
  }
  obtenerMesas()
},[])

const [titulo, setTitulo] = useState('GastroTech · Salón ')
const [sucias, setSucias] = useState(0)
useEffect(() => {
  if(mesas.length > 0){
    setSucias(mesas.filter((mesa) => mesa.estado === EstadoMesa.SUCIA).length)
    setTitulo(`GastroTech · Salón - ${sucias} sucias`)
  }
},[mesas])


  
  return (
    <>
    {allTables ? <div>Cargando mesas...</div> :  
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold md:text-3xl">{titulo}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mesas !==undefined && mesas.map((mesa : any, index : any) => (
          <Card key={mesa.id} className={`border-2 ${getStatusColor(mesa.estado)} cursor-pointer transition-transform hover:scale-105`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center text-lg">
                Mesa {mesa.numero}
                <span className="text-sm font-normal px-2 py-1 bg-white/50 rounded-full capitalize">
                  {mesa.estado}
                </span>
              </CardTitle>
              <CardDescription className="text-current opacity-80">
                {mesa.zona} · Cap: {mesa.capacidad}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 mt-2">
                {mesa.estado === 'sucia' ? (
                  <Button disabled variant="secondary" className="w-full bg-white/80">
                    Requiere Limpieza
                  </Button>
                ) : (
                  <Dialog 
                    open={openDialogs[mesa.id] || false} 
                    onOpenChange={(open) => setOpenDialogs({...openDialogs, [mesa.id]: open})}
                  >
                    <DialogTrigger asChild>
                      <Button 
                        variant="secondary"
                        onClick={(e) => {
                          if (mesa.estado === 'disponible') {
                            e.preventDefault();
                            handleAbrirMesa(index);
                          }
                        }}
                        className="w-full bg-white/80 hover:bg-white text-gray-800"
                      >
                        {mesa.estado === 'disponible' ? 'Abrir Mesa' : 'Ver Comanda'}
                      </Button>
                    </DialogTrigger>
                    {mesa.estado !== 'disponible' && (
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Comanda de Mesa {mesa.numero}</DialogTitle>
                          <DialogDescription>
                            Detalle del consumo y liquidación de cuenta.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex flex-col gap-2 border p-3 rounded bg-muted/30">
                            <span className="text-sm font-semibold">Consumo Actual</span>
                            <div className="flex justify-between text-sm">
                              <span>2x Hamburguesa Clásica</span>
                              <span>$24.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>1x Refresco</span>
                              <span>$2.50</span>
                            </div>
                            <div className="flex justify-between font-bold border-t pt-2 mt-2">
                              <span>Total</span>
                              <span>$26.50</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4 mt-2">
                            <Label htmlFor="metodo-pago" className="text-right text-sm">
                              Método de Pago
                            </Label>
                            <div className="col-span-3">
                              <Select defaultValue="efectivo">
                                <SelectTrigger id="metodo-pago">
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="efectivo">Efectivo</SelectItem>
                                  <SelectItem value="tarjeta">Tarjeta (+5%)</SelectItem>
                                  <SelectItem value="cripto">Cripto</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={() => handleCheckout(index)}
                          >
                            Procesar Checkout
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>}


   
    </>

  )
}
