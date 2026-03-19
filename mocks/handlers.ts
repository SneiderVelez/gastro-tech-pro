import { http, HttpResponse, delay } from 'msw'

// Variables en memoria para simular base de datos
let mesasMock = [
  { id: '1', numero: 1, capacidad: 2, zona: 'Terraza', estado: 'disponible' },
  { id: '2', numero: 2, capacidad: 4, zona: 'Salón', estado: 'ocupada' },
  { id: '3', numero: 3, capacidad: 6, zona: 'VIP', estado: 'reservada' },
  { id: '4', numero: 4, capacidad: 2, zona: 'Terraza', estado: 'sucia' },
  { id: '5', numero: 5, capacidad: 4, zona: 'Salón', estado: 'disponible' },
  { id: '6', numero: 6, capacidad: 8, zona: 'VIP', estado: 'disponible' },
]

let reservasMock = [
  { id: 'r1', cliente: 'Juan Pérez', mesaId: '3', fechaHora: '2026-03-20T20:00:00', personas: 4 }
]

export const handlers = [
  // 1. Salón de Mesas (GET /api/mesas)
  http.get('/api/mesas', async () => {
    await delay(1000)
    return HttpResponse.json(mesasMock)

  }),

  // 2. Menú Gastronómico (GET /api/menu)
  http.get('/api/menu', async () => {
    await delay(500)
    return HttpResponse.json([
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
    ])
  }),

  // 3. Gestión de Reservas (GET & POST /api/reservas)
  http.get('/api/reservas', async () => {
    await delay(800)
    return HttpResponse.json(reservasMock)
  }),

  http.post('/api/reservas', async ({ request }) => {
    await delay(1000)
    const body = await request.json() as any
    const mesaObjetivo = mesasMock.find(m => m.id === body.mesaId)
    
    // Simulación de Validaciones
    // Caso de Negocio: Capacidad insuficiente (400)
    if (mesaObjetivo && body.personas > mesaObjetivo.capacidad) {
      return new HttpResponse(
        JSON.stringify({ message: `La mesa seleccionada no tiene capacidad suficiente para ${body.personas} personas` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Caso de Negocio: Mesa ya reservada u ocupada (409)
    const tieneReserva = reservasMock.find(r => r.mesaId === body.mesaId && r.fechaHora === body.fechaHora)
    if (tieneReserva || (mesaObjetivo && (mesaObjetivo.estado === 'reservada' || mesaObjetivo.estado === 'ocupada'))) {
      return new HttpResponse(
        JSON.stringify({ message: `Ya existe una reserva para la mesa ${body.mesaId} en el bloque horario seleccionado o está en uso.` }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const nuevaReserva = { id: `r${Math.floor(Math.random() * 1000)}`, ...body };
    reservasMock.push(nuevaReserva);

    return HttpResponse.json(nuevaReserva, { status: 201 })
  }),

  // 4. Ciclo de Vida del Pedido (PATCH /api/comandas/:id)
  http.patch('/api/comandas/:id', async ({ params, request }) => {
    await delay(600)
    const { id } = params
    const body = await request.json() as any
    
    // Edge case: Transición inválida (Ej: No puede pasar de cocina a entregado sin estar listo)
    let currentState: string = 'cocina'; // Asumimos que inicialmente estaba en cocina
    if (body.nuevoEstado === 'entregado' && currentState !== 'listo') {
       return new HttpResponse(
        JSON.stringify({ message: "Transición inválida: No puede entregarse si no está 'listo' primero." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return HttpResponse.json({ id, estado: body.nuevoEstado })
  }),

  // 5. Checkout y Pago (POST /api/pagos)
  http.post('/api/pagos', async ({ request }) => {
    await delay(1500)
    const body = await request.json() as any
    
    // Regla de Negocio
    const totalBase = 50.00; // Mock de un total
    let totalConComision = totalBase;
    
    if (body.metodo === 'tarjeta') {
      totalConComision = totalBase * 1.05; // 5% de recargo
    }

    return HttpResponse.json({
      transaccionId: `txn_${Math.floor(Math.random() * 10000)}`,
      totalConComision,
      estado: 'exitoso'
    })
  }),
]
