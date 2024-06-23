import { Injectable } from '@nestjs/common';
import { Client, types } from 'cassandra-driver';

@Injectable()
export class CassandraService {
  private client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: [process.env.CONTACT_POINT],
      localDataCenter: process.env.LOCAL_DATA_CENTER,
      keyspace: process.env.KEY_SPACES,
      pooling: {
        coreConnectionsPerHost: {
          [types.distance.local]: 2, // Número de conexiones iniciales por host local
          [types.distance.remote]: 1, // Número de conexiones iniciales por host remoto
        },
        maxRequestsPerConnection: 1000, // Número máximo de solicitudes por conexión
        // Otras opciones de configuración de pooling
      },
    });

    this.client
      .connect()
      .then(() => console.log('Connected to Cassandra'))
      .catch((err) => console.error('Error connecting to Cassandra:', err));
  }

  async execute(query: string, params: any[] = []): Promise<any> {
    const result = await this.client.execute(query, params, { prepare: true });
    return result;
  }

  async onModuleDestroy() {
    await this.client.shutdown();
    console.log('Cassandra client disconnected');
  }
}
