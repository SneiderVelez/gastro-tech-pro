'use client';

import { useState } from 'react';
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function ReservasPage() {
  const [open, setOpen] = useState(false);
  const [reservas, setReservas] = useState([
    { id: 'r1', cliente: 'Juan Pérez', mesaId: '3', fechaHora: '2026-03-20T20:00:00', personas: 4 },
    { id: 'r2', cliente: 'María López', mesaId: '6', fechaHora: '2026-03-20T21:30:00', personas: 8 },
  ])

  const handleConfirmarReserva = () => {
    toast.success("Reserva pre-confirmada (Fase 0). La mesa ha sido apartada.");
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">GastroTech · Gestión de Reservas</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              + Nueva Reserva
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir Reserva</DialogTitle>
              <DialogDescription>
                Ingresa los datos del cliente, mesa deseada y cantidad de comensales.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cliente" className="text-right">
                  Cliente
                </Label>
                <Input id="cliente" placeholder="Nombre completo" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mesa" className="text-right">
                  Mesa
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una mesa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Mesa 1 (Cap: 2)</SelectItem>
                      <SelectItem value="2">Mesa 2 (Cap: 4)</SelectItem>
                      <SelectItem value="3">Mesa 3 (Cap: 6)</SelectItem>
                      <SelectItem value="5">Mesa 5 (Cap: 4)</SelectItem>
                      <SelectItem value="6">Mesa 6 (Cap: 8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fecha" className="text-right">
                  Fecha & Hora
                </Label>
                <Input id="fecha" type="datetime-local" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="personas" className="text-right">
                  Personas
                </Label>
                <Input id="personas" type="number" min="1" max="10" placeholder="Ej: 4" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleConfirmarReserva}>
                Confirmar Reserva
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservas.map(res => (
          <Card key={res.id}>
             <CardHeader className="pb-2 border-b">
                <CardTitle className="flex justify-between items-center text-lg">
                  {res.cliente}
                  <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">#{res.id}</span>
                </CardTitle>
                <CardDescription className="flex flex-col gap-1 mt-1 text-gray-500">
                   <span>📅 {new Date(res.fechaHora).toLocaleDateString()} · ⏰ {new Date(res.fechaHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </CardDescription>
             </CardHeader>
             <CardContent className="pt-4 flex justify-between items-center bg-gray-50/50">
               <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Mesa Asignada</span>
                  <span className="font-medium text-gray-900 text-lg">Mesa {res.mesaId}</span>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Comensales</span>
                  <span className="font-medium text-gray-900 text-lg flex items-center gap-1">👥 {res.personas}</span>
               </div>
             </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
