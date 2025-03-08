// http://127.0.0.1:8000/api/v1/tareas

/*

{
  "data": [
    {
      "id": 1,
      "nombre": "Voluptas aut alias.",
      "descripcion": "asd",
      "fecha_inicio": "2013-01-12",
      "fecha_fin": "1975-07-07",
      "estado": "en_proceso",
      "user": {
        "id": 2,
        "name": "Carlos Portillo",
        "email": "alejandro02@example.net",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 2,
      "nombre": "Quas odit aut itaque.",
      "descripcion": "asd",
      "fecha_inicio": "2003-11-26",
      "fecha_fin": "2003-09-27",
      "estado": "pendiente",
      "user": {
        "id": 2,
        "name": "Carlos Portillo",
        "email": "alejandro02@example.net",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 3,
      "nombre": "Iusto aut ut et.",
      "descripcion": "asd",
      "fecha_inicio": "1994-04-25",
      "fecha_fin": "2011-04-11",
      "estado": "pendiente",
      "user": {
        "id": 2,
        "name": "Carlos Portillo",
        "email": "alejandro02@example.net",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 4,
      "nombre": "Esse ut reiciendis.",
      "descripcion": "asd",
      "fecha_inicio": "2007-10-18",
      "fecha_fin": "2013-12-14",
      "estado": "en_proceso",
      "user": {
        "id": 2,
        "name": "Carlos Portillo",
        "email": "alejandro02@example.net",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 5,
      "nombre": "Quas illum et.",
      "descripcion": "asd",
      "fecha_inicio": "1984-08-23",
      "fecha_fin": "2014-01-10",
      "estado": "pendiente",
      "user": {
        "id": 2,
        "name": "Carlos Portillo",
        "email": "alejandro02@example.net",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 6,
      "nombre": "Dolore et beatae cumque.",
      "descripcion": "asd",
      "fecha_inicio": "2009-12-25",
      "fecha_fin": "2024-12-02",
      "estado": "terminada",
      "user": {
        "id": 3,
        "name": "Noelia Bernal",
        "email": "ltrevino@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 7,
      "nombre": "Aperiam sint aut.",
      "descripcion": "asd",
      "fecha_inicio": "2013-06-15",
      "fecha_fin": "1974-12-12",
      "estado": "pendiente",
      "user": {
        "id": 3,
        "name": "Noelia Bernal",
        "email": "ltrevino@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 8,
      "nombre": "Nihil dolorem aliquid.",
      "descripcion": "asd",
      "fecha_inicio": "1992-11-05",
      "fecha_fin": "1993-09-12",
      "estado": "pendiente",
      "user": {
        "id": 3,
        "name": "Noelia Bernal",
        "email": "ltrevino@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 9,
      "nombre": "Cumque delectus quisquam voluptatem.",
      "descripcion": "asd",
      "fecha_inicio": "1981-10-10",
      "fecha_fin": "1981-07-17",
      "estado": "terminada",
      "user": {
        "id": 3,
        "name": "Noelia Bernal",
        "email": "ltrevino@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 10,
      "nombre": "Rerum corporis qui.",
      "descripcion": "asd",
      "fecha_inicio": "1981-09-11",
      "fecha_fin": "2018-05-30",
      "estado": "en_proceso",
      "user": {
        "id": 3,
        "name": "Noelia Bernal",
        "email": "ltrevino@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 11,
      "nombre": "Ab est doloremque et.",
      "descripcion": "asd",
      "fecha_inicio": "1999-10-15",
      "fecha_fin": "2000-04-11",
      "estado": "pendiente",
      "user": {
        "id": 4,
        "name": "Lic. Naiara Marcos Tercero",
        "email": "laura.alcantar@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 12,
      "nombre": "Ut sequi neque.",
      "descripcion": "asd",
      "fecha_inicio": "2000-11-01",
      "fecha_fin": "2000-02-07",
      "estado": "terminada",
      "user": {
        "id": 4,
        "name": "Lic. Naiara Marcos Tercero",
        "email": "laura.alcantar@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 13,
      "nombre": "Sunt nobis.",
      "descripcion": "asd",
      "fecha_inicio": "1976-03-02",
      "fecha_fin": "1982-10-03",
      "estado": "en_proceso",
      "user": {
        "id": 4,
        "name": "Lic. Naiara Marcos Tercero",
        "email": "laura.alcantar@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 14,
      "nombre": "Ea possimus quia iste nulla.",
      "descripcion": "asd",
      "fecha_inicio": "2019-06-14",
      "fecha_fin": "1970-11-18",
      "estado": "pendiente",
      "user": {
        "id": 4,
        "name": "Lic. Naiara Marcos Tercero",
        "email": "laura.alcantar@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    },
    {
      "id": 15,
      "nombre": "Iusto voluptatem dolorem.",
      "descripcion": "asd",
      "fecha_inicio": "1995-06-22",
      "fecha_fin": "1982-09-11",
      "estado": "en_proceso",
      "user": {
        "id": 4,
        "name": "Lic. Naiara Marcos Tercero",
        "email": "laura.alcantar@example.com",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
      }
    }
  ],
  "links": {
    "first": "http://127.0.0.1:8000/api/v1/tareas?page=1",
    "last": "http://127.0.0.1:8000/api/v1/tareas?page=4",
    "prev": null,
    "next": "http://127.0.0.1:8000/api/v1/tareas?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 4,
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "http://127.0.0.1:8000/api/v1/tareas?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": "http://127.0.0.1:8000/api/v1/tareas?page=2",
        "label": "2",
        "active": false
      },
      {
        "url": "http://127.0.0.1:8000/api/v1/tareas?page=3",
        "label": "3",
        "active": false
      },
      {
        "url": "http://127.0.0.1:8000/api/v1/tareas?page=4",
        "label": "4",
        "active": false
      },
      {
        "url": "http://127.0.0.1:8000/api/v1/tareas?page=2",
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "path": "http://127.0.0.1:8000/api/v1/tareas",
    "per_page": 15,
    "to": 15,
    "total": 50
  }
}

*/

export const getTareas = async () => {

    const res = await fetch(`http://127.0.0.1:8000/api/v1/tareas`);
    const data = await res.json();

    if (!Array.isArray(data)) {
        throw new Error("La respuesta de la API no es una lista de tareas");
    }

    return data.map(tarea => ({
        id: tarea.id,
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        fecha_inicio: tarea.fecha_inicio,
        fecha_fin: tarea.fecha_fin,
        estado: tarea.estado,
        user_id: tarea.user.id,
    }));

};
